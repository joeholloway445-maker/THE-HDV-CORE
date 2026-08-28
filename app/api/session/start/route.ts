import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  // Accept explicit character_id in body, fall back to the session cookie.
  let characterId: string | undefined
  try {
    const body = await request.json().catch(() => ({}))
    characterId = typeof body.character_id === 'string' ? body.character_id : undefined
  } catch {
    // empty body is fine
  }

  if (!characterId) {
    const cookieStore = await cookies()
    characterId = cookieStore.get('selected_character_id')?.value
  }

  if (!characterId) {
    return NextResponse.json({ error: 'no character selected' }, { status: 400 })
  }

  const { data, error } = await supabase.rpc('start_session', {
    p_character_id: characterId,
  })

  if (error) {
    const status = error.message.includes('already active') ? 409 : 400
    return NextResponse.json({ error: error.message }, { status })
  }

  return NextResponse.json({ session: data }, { status: 201 })
}
