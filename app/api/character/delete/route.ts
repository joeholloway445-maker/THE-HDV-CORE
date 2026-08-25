import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { characterId } = await req.json()
  if (typeof characterId !== 'string') {
    return NextResponse.json({ error: 'characterId required' }, { status: 400 })
  }

  // Verify ownership before deletion.
  const { data: character, error: findErr } = await supabase
    .from('characters')
    .select('id')
    .eq('id', characterId)
    .eq('user_id', user.id)
    .single()

  if (findErr || !character) {
    return NextResponse.json({ error: 'character not found' }, { status: 404 })
  }

  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', characterId)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Clear the selected-character cookie if it pointed at the deleted character.
  const cookieStore = await cookies()
  const selected = cookieStore.get('selected_character_id')?.value
  const response = NextResponse.json({ ok: true })
  if (selected === characterId) {
    response.cookies.set('selected_character_id', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
  }
  return response
}
