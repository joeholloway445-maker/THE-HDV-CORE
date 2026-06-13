'use client'

import { useCallback, useMemo, useState } from 'react'
import Script from 'next/script'
import {
  findClutterGroups,
  findLargeFiles,
  findStaleFiles,
  formatBytes,
  listAllFiles,
  trashFile,
  type ClutterGroup,
  type DriveFile,
} from '@/lib/google/drive'

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
  const [files, setFiles] = useState<DriveFile[] | null>(null)
  const [groups, setGroups] = useState<ClutterGroup[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyGroup, setBusyGroup] = useState<string | null>(null)
  const [busyFile, setBusyFile] = useState<string | null>(null)
  const [trashedIds, setTrashedIds] = useState<Set<string>>(new Set())

  // Settings
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [minDuplicates, setMinDuplicates] = useState(3)
  const [largeFileMb, setLargeFileMb] = useState(100)
  const [staleDays, setStaleDays] = useState(180)
  const [dryRun, setDryRun] = useState(true)
  const [enabledModules, setEnabledModules] = useState({
    duplicates: true,
    large: true,
    stale: true,
  })

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
    setFiles(null)
    setGroups(null)
    setScanned(0)
    setTrashedIds(new Set())
    try {
      const fetched = await listAllFiles(token, setScanned)
      setFiles(fetched)
      setGroups(enabledModules.duplicates ? findClutterGroups(fetched, minDuplicates) : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scan failed.')
    } finally {
      setScanning(false)
    }
  }, [token, enabledModules.duplicates, minDuplicates])

  const cleanGroup = useCallback(async (group: ClutterGroup) => {
    if (!token) return
    const groupKey = `${group.name}::${group.mimeType}`
    setBusyGroup(groupKey)
    setError(null)
    try {
      // Keep the most recently created item, trash the rest.
      const toTrash = group.files.slice(0, -1)
      if (!dryRun) {
        for (const file of toTrash) {
          await trashFile(token, file.id)
        }
      }
      setTrashedIds((prev) => new Set([...prev, ...toTrash.map((f) => f.id)]))
      setGroups((prev) => prev?.filter((g) => `${g.name}::${g.mimeType}` !== groupKey) ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Cleanup failed.')
    } finally {
      setBusyGroup(null)
    }
  }, [token, dryRun])

  const trashSingleFile = useCallback(async (file: DriveFile) => {
    if (!token) return
    setBusyFile(file.id)
    setError(null)
    try {
      if (!dryRun) {
        await trashFile(token, file.id)
      }
      setTrashedIds((prev) => new Set([...prev, file.id]))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Trash failed.')
    } finally {
      setBusyFile(null)
    }
  }, [token, dryRun])

  const largeFiles = useMemo(() => {
    if (!files || !enabledModules.large) return []
    return findLargeFiles(files, largeFileMb * 1024 * 1024).filter((f) => !trashedIds.has(f.id))
  }, [files, enabledModules.large, largeFileMb, trashedIds])

  const staleFiles = useMemo(() => {
    if (!files || !enabledModules.stale) return []
    return findStaleFiles(files, staleDays).filter((f) => !trashedIds.has(f.id))
  }, [files, enabledModules.stale, staleDays, trashedIds])

  const visibleGroups = useMemo(() => groups ?? [], [groups])

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

      {/* Settings & functions menu */}
      <div className="rounded-lg border border-purple-800 bg-[#1a1a2e]/50 p-4 font-mono text-sm">
        <button
          onClick={() => setSettingsOpen((v) => !v)}
          className="w-full flex items-center justify-between text-left text-purple-400 tracking-widest text-xs"
        >
          <span>⚙ SETTINGS &amp; FUNCTIONS</span>
          <span className="text-slate-500">{settingsOpen ? '−' : '+'}</span>
        </button>

        {settingsOpen && (
          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between gap-4 text-slate-300">
              <span>
                <span className="text-amber-300">Dry run</span> — preview only, never trash files
              </span>
              <input
                type="checkbox"
                checked={dryRun}
                onChange={(e) => setDryRun(e.target.checked)}
                className="accent-purple-500 w-4 h-4"
              />
            </label>

            <div className="border-t border-purple-900 pt-3 space-y-3">
              <div className="flex items-center justify-between gap-4 text-slate-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enabledModules.duplicates}
                    onChange={(e) =>
                      setEnabledModules((m) => ({ ...m, duplicates: e.target.checked }))
                    }
                    className="accent-purple-500 w-4 h-4"
                  />
                  <span>Duplicate &amp; recurring item scanner</span>
                </label>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>min copies</span>
                  <input
                    type="number"
                    min={2}
                    value={minDuplicates}
                    onChange={(e) => setMinDuplicates(Math.max(2, Number(e.target.value) || 2))}
                    className="w-16 bg-[#0f0f1a] border border-purple-900 rounded px-2 py-1 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-slate-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enabledModules.large}
                    onChange={(e) =>
                      setEnabledModules((m) => ({ ...m, large: e.target.checked }))
                    }
                    className="accent-purple-500 w-4 h-4"
                  />
                  <span>Large file finder</span>
                </label>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>min size (MB)</span>
                  <input
                    type="number"
                    min={1}
                    value={largeFileMb}
                    onChange={(e) => setLargeFileMb(Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 bg-[#0f0f1a] border border-purple-900 rounded px-2 py-1 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-slate-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enabledModules.stale}
                    onChange={(e) =>
                      setEnabledModules((m) => ({ ...m, stale: e.target.checked }))
                    }
                    className="accent-purple-500 w-4 h-4"
                  />
                  <span>Stale file finder</span>
                </label>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>inactive days</span>
                  <input
                    type="number"
                    min={1}
                    value={staleDays}
                    onChange={(e) => setStaleDays(Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 bg-[#0f0f1a] border border-purple-900 rounded px-2 py-1 text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-purple-900 pt-3 text-slate-600 text-xs leading-relaxed">
              <p className="text-slate-500 font-bold mb-1">COMING SOON</p>
              <p>Apps Script trigger audit — detect &amp; disable runaway automations (V2)</p>
              <p>AI chat history consolidation across apps (V3)</p>
              <p>Background activity tracker, desktop + mobile (V4)</p>
            </div>
          </div>
        )}
      </div>

      {!token && (
        <button
          onClick={connect}
          disabled={!gsiReady}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-mono text-sm tracking-widest rounded-lg border border-purple-500 transition-colors"
        >
          {gsiReady ? 'CONNECT GOOGLE DRIVE' : 'LOADING…'}
        </button>
      )}

      {token && !files && (
        <button
          onClick={scan}
          disabled={scanning}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-mono text-sm tracking-widest rounded-lg border border-purple-500 transition-colors"
        >
          {scanning ? `SCANNING… (${scanned} items)` : 'SCAN DRIVE'}
        </button>
      )}

      {error && (
        <div className="rounded-lg border border-red-700 bg-[#1a1a2e]/50 p-4 font-mono text-sm text-red-300">
          {error}
        </div>
      )}

      {files && (
        <div className="space-y-8">
          <div className="font-mono text-sm text-slate-400">
            Scanned {scanned} items.
            {dryRun && <span className="text-amber-400"> Dry run is ON — nothing will be trashed.</span>}
          </div>

          {/* Duplicates */}
          {enabledModules.duplicates && (
            <div className="space-y-4">
              <div className="font-mono text-xs text-purple-400 tracking-widest">
                RECURRING ITEMS {visibleGroups.length > 0 && `(${visibleGroups.length})`}
              </div>
              {visibleGroups.length === 0 ? (
                <div className="font-mono text-sm text-slate-500">No recurring clutter found.</div>
              ) : (
                visibleGroups.map((group) => {
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
                            : `${dryRun ? 'PREVIEW' : 'TRASH'} ${group.files.length - 1}, KEEP NEWEST`}
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* Large files */}
          {enabledModules.large && (
            <div className="space-y-4">
              <div className="font-mono text-xs text-purple-400 tracking-widest">
                LARGE FILES ≥ {largeFileMb} MB {largeFiles.length > 0 && `(${largeFiles.length})`}
              </div>
              {largeFiles.length === 0 ? (
                <div className="font-mono text-sm text-slate-500">No files at or above this size.</div>
              ) : (
                largeFiles.slice(0, 25).map((file) => (
                  <div
                    key={file.id}
                    className="rounded-lg border border-purple-800 bg-[#1a1a2e]/50 p-4 font-mono text-sm flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-slate-100 font-bold">{file.name}</div>
                      <div className="text-purple-400 mt-1">{formatBytes(Number(file.size ?? 0))}</div>
                      <div className="text-slate-500 text-xs mt-2">
                        Modified: {formatDate(file.modifiedTime)}
                      </div>
                    </div>
                    <button
                      onClick={() => trashSingleFile(file)}
                      disabled={busyFile === file.id}
                      className="shrink-0 px-4 py-2 bg-red-900/60 hover:bg-red-800/80 disabled:opacity-50 text-red-200 text-xs tracking-widest rounded-lg border border-red-700 transition-colors"
                    >
                      {busyFile === file.id ? '…' : dryRun ? 'PREVIEW TRASH' : 'TRASH'}
                    </button>
                  </div>
                ))
              )}
              {largeFiles.length > 25 && (
                <div className="font-mono text-xs text-slate-600">…and {largeFiles.length - 25} more.</div>
              )}
            </div>
          )}

          {/* Stale files */}
          {enabledModules.stale && (
            <div className="space-y-4">
              <div className="font-mono text-xs text-purple-400 tracking-widest">
                STALE FILES — INACTIVE {staleDays}+ DAYS {staleFiles.length > 0 && `(${staleFiles.length})`}
              </div>
              {staleFiles.length === 0 ? (
                <div className="font-mono text-sm text-slate-500">Nothing has been inactive that long.</div>
              ) : (
                staleFiles.slice(0, 25).map((file) => (
                  <div
                    key={file.id}
                    className="rounded-lg border border-purple-800 bg-[#1a1a2e]/50 p-4 font-mono text-sm flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-slate-100 font-bold">{file.name}</div>
                      <div className="text-slate-500 text-xs mt-2">
                        Last modified: {formatDate(file.modifiedTime)}
                        {file.viewedByMeTime && (
                          <>
                            <br />
                            Last viewed: {formatDate(file.viewedByMeTime)}
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => trashSingleFile(file)}
                      disabled={busyFile === file.id}
                      className="shrink-0 px-4 py-2 bg-red-900/60 hover:bg-red-800/80 disabled:opacity-50 text-red-200 text-xs tracking-widest rounded-lg border border-red-700 transition-colors"
                    >
                      {busyFile === file.id ? '…' : dryRun ? 'PREVIEW TRASH' : 'TRASH'}
                    </button>
                  </div>
                ))
              )}
              {staleFiles.length > 25 && (
                <div className="font-mono text-xs text-slate-600">…and {staleFiles.length - 25} more.</div>
              )}
            </div>
          )}

          <button
            onClick={scan}
            disabled={scanning}
            className="px-6 py-3 bg-[#1a1a2e] hover:bg-[#22223a] disabled:opacity-50 text-slate-300 font-mono text-sm tracking-widest rounded-lg border border-purple-800 transition-colors"
          >
            {scanning ? `SCANNING… (${scanned} items)` : 'RE-SCAN'}
          </button>
        </div>
      )}
    </div>
  )
}
