const DRIVE_API = 'https://www.googleapis.com/drive/v3'

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  createdTime: string
  size?: string
}

export interface ClutterGroup {
  name: string
  mimeType: string
  files: DriveFile[]
}

async function driveFetch(path: string, token: string, init?: RequestInit) {
  const res = await fetch(`${DRIVE_API}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Drive API error ${res.status}: ${body}`)
  }
  return res.json()
}

/** Fetches every non-trashed file/folder the user owns, paging through results. */
export async function listAllFiles(
  token: string,
  onProgress?: (count: number) => void,
): Promise<DriveFile[]> {
  const files: DriveFile[] = []
  let pageToken: string | undefined

  do {
    const params = new URLSearchParams({
      pageSize: '1000',
      fields: 'nextPageToken, files(id, name, mimeType, createdTime, size)',
      q: "trashed = false and 'me' in owners",
    })
    if (pageToken) params.set('pageToken', pageToken)

    const data = await driveFetch(`/files?${params.toString()}`, token)
    files.push(...(data.files ?? []))
    pageToken = data.nextPageToken
    onProgress?.(files.length)
  } while (pageToken)

  return files
}

export async function trashFile(token: string, fileId: string) {
  await driveFetch(`/files/${fileId}`, token, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trashed: true }),
  })
}

/**
 * Groups files/folders that share an exact name and type. Repeated names
 * (e.g. a folder recreated every few hours by a stale Apps Script trigger)
 * surface here as a group with many entries.
 */
export function findClutterGroups(files: DriveFile[], minCount = 3): ClutterGroup[] {
  const groups = new Map<string, DriveFile[]>()

  for (const f of files) {
    const key = `${f.name}::${f.mimeType}`
    const arr = groups.get(key)
    if (arr) arr.push(f)
    else groups.set(key, [f])
  }

  const result: ClutterGroup[] = []
  for (const [key, arr] of groups) {
    if (arr.length < minCount) continue
    const [name, mimeType] = key.split('::')
    arr.sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
    result.push({ name, mimeType, files: arr })
  }

  result.sort((a, b) => b.files.length - a.files.length)
  return result
}
