export type WagerRow = {
  arc_id: string
  choice_id: string
  faction: string
  currency: string
  amount: number
}

export type ArcTally = {
  byChoice: Record<string, Record<string, number>>
  byFaction: Record<string, Record<string, number>>
}

export function buildTallies(wagers: WagerRow[]): Record<string, ArcTally> {
  const tallies: Record<string, ArcTally> = {}
  for (const w of wagers) {
    const t = tallies[w.arc_id] ?? { byChoice: {}, byFaction: {} }
    t.byChoice[w.choice_id] = t.byChoice[w.choice_id] ?? {}
    t.byChoice[w.choice_id][w.currency] = (t.byChoice[w.choice_id][w.currency] ?? 0) + w.amount
    t.byFaction[w.faction] = t.byFaction[w.faction] ?? {}
    t.byFaction[w.faction][w.currency] = (t.byFaction[w.faction][w.currency] ?? 0) + w.amount
    tallies[w.arc_id] = t
  }
  return tallies
}

export function normalizeWagerCurrency(currency: unknown): 'chip' | 'renown' {
  return currency === 'renown' ? 'renown' : 'chip'
}

export function isValidWager(arcId: unknown, choiceId: unknown, amount: unknown): boolean {
  return typeof arcId === 'string' && typeof choiceId === 'string' && Number.isInteger(amount) && (amount as number) > 0
}

export const VALID_CURRENCIES = ['coin', 'chip', 'fragments', 'tokens', 'charges', 'renown'] as const

export function isValidCurrencyGrant(currency: unknown, amount: unknown): boolean {
  return (
    typeof currency === 'string' &&
    (VALID_CURRENCIES as readonly string[]).includes(currency) &&
    Number.isInteger(amount) &&
    (amount as number) > 0
  )
}
