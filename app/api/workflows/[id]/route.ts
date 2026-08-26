/**
 * /api/workflows/[id] — single workflow CRUD proxy.
 */
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const WORKFLOW_API = (process.env.WORKFLOW_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const WORKFLOW_API_KEY = process.env.WORKFLOW_API_KEY ?? ''

function proxyHeaders(userId: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(WORKFLOW_API_KEY ? { Authorization: `Bearer ${WORKFLOW_API_KEY}` } : {}),
    'x-hdv-user-id': userId,
  }
}

function unavailable() {
  return NextResponse.json(
    { error: 'Workflow orchestrator not configured — set WORKFLOW_API_URL and WORKFLOW_API_KEY.' },
    { status: 503 },
  )
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!WORKFLOW_API_KEY) return unavailable()

  const { id } = await params
  const resp = await fetch(`${WORKFLOW_API}/workflows/${id}`, { headers: proxyHeaders(user.id) })
  return NextResponse.json(await resp.json(), { status: resp.status })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!WORKFLOW_API_KEY) return unavailable()

  const { id } = await params
  const body = await request.json()
  const resp = await fetch(`${WORKFLOW_API}/workflows/${id}`, {
    method: 'PUT',
    headers: proxyHeaders(user.id),
    body: JSON.stringify(body),
  })
  return NextResponse.json(await resp.json(), { status: resp.status })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!WORKFLOW_API_KEY) return unavailable()

  const { id } = await params
  const resp = await fetch(`${WORKFLOW_API}/workflows/${id}`, {
    method: 'DELETE',
    headers: proxyHeaders(user.id),
  })
  if (resp.status === 204) return new NextResponse(null, { status: 204 })
  return NextResponse.json(await resp.json(), { status: resp.status })
}
