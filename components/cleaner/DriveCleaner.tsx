'use client'

import { useCallback, useState } from 'react'
import Script from 'next/script'
import { findClutterGroups, listAllFiles, trashFile, type ClutterGroup } from '@/lib/google/drive'

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: { access_token?: string; error?: string }) => void
          }) => { requestAccessToken: () => void }
        }
      }
    }
  }
}

const SCOPE = 'https://www.googleapis.com/auth/drive'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

export default function DriveCleaner() {
  const [gsiReady, setGsiReady] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(0)
  const [groups, setGroups] = useState<ClutterGroup[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyGroup, setBusyGroup] = useState<string | null>(null)

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  const connect = useCallback(() => {
    if (!window.google || !clientId) return
    setError(null)
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (response) => {
        if (response.access_token) setToken(response.access_token)
        else setError('Google sign-in failed or was cancelled.')
      },
    })
    client.requestAccessToken()
  }, [clientId])

  const scan = useCallback(async () => {
    if (!token) return
    setScanning(true)
    setError(null)
    setGroups(null)
    setScanned(0)
    try {
      const files = await listAllFiles(token, setScanned)
      setGroups(findClutterGroups(files))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scan failed.')
    } finally {
      setScanning(false)
    }
  }, [token])

  const cleanGroup = useCallback(async (group: ClutterGroup) => {
    if (!token) return
    const groupKey = `${group.name}::${group.mimeType}`
    setBusyGroup(groupKey)
    setError(null)
    try {
      // Keep the most recently created item, trash the rest.
      const toTrash = group.files.slice(0, -1)
      for (const file of toTrash) {
        await trashFile(token, file.id)
      }
      setGroups((prev) => prev?.filter((g) => `${g.name}::${g.mimeType}` !== groupKey) ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Cleanup failed.')
    } finally {
      setBusyGroup(null)
    }
  }, [token])

  if (!clientId) {
    return (
      <div className="rounded-lg border border-amber-700 bg-[#1a1a2e]/50 p-4 font-mono text-sm text-amber-300">
        <p className="mb-2 font-bold">Setup needed</p>
        <p className="text-slate-400 leading-relaxed">
          Set <code className="text-amber-300">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to an OAuth 2.0 Client ID
          from the{' '}
          <a
            className="underline hover:text-amber-200"
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noreferrer"
          >
            Google Cloud Console
          </a>
          . Enable the Drive API, add the <code className="text-amber-300">drive</code> scope, and add
          this app&apos;s URL as an authorized JavaScript origin.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGsiReady(true)}
      />

      {!token && (
        <button
          onClick={connect}
          disabled={!gsiReady}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-mono text-sm tracking-widest rounded-lg border border-purple-500 transition-colors"
        >
          {gsiReady ? 'CONNECT GOOGLE DRIVE' : 'LOADING…'}
        </button>
      )}

      {token && !groups && (
        <button
          onClick={scan}
          disabled={scanning}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-mono text-sm tracking-widest rounded-lg border border-purple-500 transition-colors"
        >
          {scanning ? `SCANNING… (${scanned} items)` : 'SCAN DRIVE FOR CLUTTER'}
        </button>
      )}

      {error && (
        <div className="rounded-lg border border-red-700 bg-[#1a1a2e]/50 p-4 font-mono text-sm text-red-300">
          {error}
        </div>
      )}

      {groups && (
        <div className="space-y-4">
          <div className="font-mono text-sm text-slate-400">
            {groups.length === 0
              ? `Scanned ${scanned} items — no recurring clutter found.`
              : `Scanned ${scanned} items — found ${groups.length} group(s) of repeated items.`}
          </div>

          {groups.map((group) => {
            const groupKey = `${group.name}::${group.mimeType}`
            const isFolder = group.mimeType === 'application/vnd.google-apps.folder'
            const oldest = group.files[0]
            const newest = group.files[group.files.length - 1]

            return (
              <div
                key={groupKey}
                className="rounded-lg border border-purple-800 bg-[#1a1a2e]/50 p-4 font-mono text-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-slate-100 font-bold">
                      {group.name} <span className="text-slate-500">({isFolder ? 'folder' : 'file'})</span>
                    </div>
                    <div className="text-purple-400 mt-1">{group.files.length} copies</div>
                    <div className="text-slate-500 text-xs mt-2">
                      First created: {formatDate(oldest.createdTime)}
                      <br />
                      Most recent: {formatDate(newest.createdTime)}
                    </div>
                  </div>
                  <button
                    onClick={() => cleanGroup(group)}
                    disabled={busyGroup === groupKey}
                    className="shrink-0 px-4 py-2 bg-red-900/60 hover:bg-red-800/80 disabled:opacity-50 text-red-200 text-xs tracking-widest rounded-lg border border-red-700 transition-colors"
                  >
                    {busyGroup === groupKey
                      ? 'CLEANING…'
                      : `TRASH ${group.files.length - 1}, KEEP NEWEST`}
                  </button>
                </div>
              </div>
            )
          })}

          <button
            onClick={scan}
            disabled={scanning}
            className="px-6 py-3 bg-[#1a1a2e] hover:bg-[#22223a] disabled:opacity-50 text-slate-300 font-mono text-sm tracking-widest rounded-lg border border-purple-800 transition-colors"
          >
            RE-SCAN
          </button>
        </div>
      )}
    </div>
  )
}
