import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: session, error } = await supabase
    .from('game_sessions')
    .select('id, character_id, status, waves_cleared, loot_gained, started_at, ended_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !session) {
    return NextResponse.json({ error: 'session not found' }, { status: 404 })
  }

  return NextResponse.json({ session })
}
