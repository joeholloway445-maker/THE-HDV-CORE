import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const died = body.died === true
  const loot = Array.isArray(body.loot) ? body.loot : []

  const { data, error } = await supabase.rpc('resolve_encounter', {
    p_session_id: id,
    p_died: died,
    p_loot: loot,
  })

  if (error) {
    const status = error.message.includes('not found') ? 404
      : error.message.includes('not active') ? 409
      : 400
    return NextResponse.json({ error: error.message }, { status })
  }

  return NextResponse.json({ session: data })
}
