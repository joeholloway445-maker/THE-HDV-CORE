import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Respawn: marks a DEAD session as COMPLETED (acknowledging the run is over)
// and starts a fresh ACTIVE session for the same character. Returns both the
// closed session and the new session.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  // Fetch the dead session — must belong to caller and be DEAD.
  const { data: dead, error: fetchErr } = await supabase
    .from('game_sessions')
    .select('id, character_id, status, waves_cleared, loot_gained, started_at, ended_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchErr || !dead) {
    return NextResponse.json({ error: 'session not found' }, { status: 404 })
  }
  if (dead.status !== 'DEAD') {
    return NextResponse.json(
      { error: `cannot respawn from status '${dead.status}'` },
      { status: 409 },
    )
  }

  // Close the dead session as COMPLETED.
  await supabase
    .from('game_sessions')
    .update({ status: 'COMPLETED' })
    .eq('id', id)

  // Start a fresh session for the same character.
  const { data: fresh, error: startErr } = await supabase.rpc('start_session', {
    p_character_id: dead.character_id,
  })

  if (startErr) {
    return NextResponse.json({ error: startErr.message }, { status: 400 })
  }

  return NextResponse.json({ previous: { ...dead, status: 'COMPLETED' }, session: fresh }, { status: 201 })
}
