import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VALID_FACTIONS = ['veiled_current', 'sovereign_crown', 'wildlands_ascendants'] as const

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { faction, race, frame, physical_mod } = await request.json()

  if (!VALID_FACTIONS.includes(faction)) {
    return NextResponse.json(
      { error: `faction must be one of: ${VALID_FACTIONS.join(', ')}` },
      { status: 400 },
    )
  }
  if (!race || typeof race !== 'string') {
    return NextResponse.json({ error: 'race is required' }, { status: 400 })
  }
  if (!frame || typeof frame !== 'string') {
    return NextResponse.json({ error: 'frame is required' }, { status: 400 })
  }
  if (!physical_mod || typeof physical_mod !== 'string') {
    return NextResponse.json({ error: 'physical_mod is required' }, { status: 400 })
  }

  // Check slot limit and find occupied slot numbers in one query.
  const [profileResult, existingResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('character_slots')
      .eq('id', user.id)
      .single(),
    supabase
      .from('characters')
      .select('slot_number')
      .eq('user_id', user.id)
      .order('slot_number', { ascending: true }),
  ])

  if (profileResult.error || !profileResult.data) {
    return NextResponse.json({ error: 'profile not found' }, { status: 404 })
  }

  const maxSlots: number = profileResult.data.character_slots
  const occupied = new Set((existingResult.data ?? []).map((c) => c.slot_number))

  if (occupied.size >= maxSlots) {
    return NextResponse.json(
      { error: `character slot limit reached (${maxSlots})` },
      { status: 409 },
    )
  }

  // Find the lowest unused slot number (1-based).
  let slot_number = 1
  while (occupied.has(slot_number)) slot_number++

  const { data: character, error } = await supabase
    .from('characters')
    .insert({
      user_id: user.id,
      faction,
      race,
      frame,
      physical_mod,
      slot_number,
    })
    .select('id, faction, race, frame, physical_mod, slot_number, prestige_level, xp, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ character }, { status: 201 })
}
