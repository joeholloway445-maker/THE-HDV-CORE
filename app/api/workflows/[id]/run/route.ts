/**
 * POST /api/workflows/[id]/run — trigger a workflow execution via VISION.
 *
 * The request body can include `triggerData` to seed the workflow's initial
 * state. VISION dispatches the workflow to the BullMQ queue and returns the
 * execution ID which can be polled via /api/executions/[executionId].
 */
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const WORKFLOW_API = (process.env.WORKFLOW_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const WORKFLOW_API_KEY = process.env.WORKFLOW_API_KEY ?? ''

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!WORKFLOW_API_KEY) {
    return NextResponse.json(
      { error: 'Workflow orchestrator not configured.' },
      { status: 503 },
    )
  }

  const { id } = await params
  const body = await request.json().catch(() => ({}))

  const resp = await fetch(`${WORKFLOW_API}/workflows/${id}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WORKFLOW_API_KEY}`,
      'x-hdv-user-id': user.id,
    },
    body: JSON.stringify({ triggerData: body.triggerData ?? {} }),
  })

  const data = await resp.json()
  return NextResponse.json(data, { status: resp.status })
}
