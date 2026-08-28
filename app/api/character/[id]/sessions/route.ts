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

  // Verify the character belongs to the caller.
  const { data: character } = await supabase
    .from('characters')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!character) {
    return NextResponse.json({ error: 'character not found' }, { status: 404 })
  }

  const { data: sessions, error } = await supabase
    .from('game_sessions')
    .select('id, status, waves_cleared, loot_gained, started_at, ended_at')
    .eq('character_id', id)
    .order('started_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ sessions: sessions ?? [] })
}
