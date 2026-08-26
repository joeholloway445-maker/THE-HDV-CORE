import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: characters, error } = await supabase
    .from('characters')
    .select('id, name, faction, race, frame, prestige, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const cookieStore = await cookies()
  const selectedId = cookieStore.get('selected_character_id')?.value ?? null

  return NextResponse.json({ characters: characters ?? [], selectedId })
}
