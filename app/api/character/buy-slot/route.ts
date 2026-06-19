import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SLOT_COST_COIN = 500

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const [{ data: profile }, { data: currencies }] = await Promise.all([
    supabase.from('profiles').select('character_slots').eq('id', user.id).single(),
    supabase.from('player_currencies').select('coin').eq('user_id', user.id).single(),
  ])

  if (!profile || !currencies) {
    return NextResponse.json({ error: 'profile not found' }, { status: 404 })
  }

  if (currencies.coin < SLOT_COST_COIN) {
    return NextResponse.json({ error: 'not enough coin' }, { status: 400 })
  }

  const { error: currencyError } = await supabase
    .from('player_currencies')
    .update({ coin: currencies.coin - SLOT_COST_COIN })
    .eq('user_id', user.id)

  if (currencyError) {
    return NextResponse.json({ error: currencyError.message }, { status: 500 })
  }

  const { error: slotError } = await supabase
    .from('profiles')
    .update({ character_slots: profile.character_slots + 1 })
    .eq('id', user.id)

  if (slotError) {
    return NextResponse.json({ error: slotError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, slots: profile.character_slots + 1 })
}
