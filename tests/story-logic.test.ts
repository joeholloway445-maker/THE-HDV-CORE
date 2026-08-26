/**
 * tests/story-logic.test.ts — Unit tests for story wager and tally logic.
 * Run: node --import tsx --test tests/story-logic.test.ts
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  buildTallies,
  normalizeWagerCurrency,
  isValidWager,
  isValidCurrencyGrant,
  VALID_CURRENCIES,
} from '../lib/story-logic.js'

// ---------------------------------------------------------------------------
// buildTallies
// ---------------------------------------------------------------------------

test('buildTallies: empty wagers returns empty object', () => {
  assert.deepEqual(buildTallies([]), {})
})

test('buildTallies: single wager creates correct tally structure', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 100 },
  ])
  assert.equal(result['arc1'].byChoice['c1']['chip'], 100)
  assert.equal(result['arc1'].byFaction['red']['chip'], 100)
})

test('buildTallies: accumulates amounts for same choice and currency', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 100 },
    { arc_id: 'arc1', choice_id: 'c1', faction: 'blue', currency: 'chip', amount: 200 },
  ])
  assert.equal(result['arc1'].byChoice['c1']['chip'], 300)
})

test('buildTallies: accumulates amounts for same faction and currency', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 50 },
    { arc_id: 'arc1', choice_id: 'c2', faction: 'red', currency: 'chip', amount: 75 },
  ])
  assert.equal(result['arc1'].byFaction['red']['chip'], 125)
})

test('buildTallies: tracks multiple currencies separately', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 100 },
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'renown', amount: 50 },
  ])
  assert.equal(result['arc1'].byChoice['c1']['chip'], 100)
  assert.equal(result['arc1'].byChoice['c1']['renown'], 50)
})

test('buildTallies: handles multiple arcs independently', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 100 },
    { arc_id: 'arc2', choice_id: 'c2', faction: 'blue', currency: 'chip', amount: 200 },
  ])
  assert.equal(result['arc1'].byChoice['c1']['chip'], 100)
  assert.equal(result['arc2'].byChoice['c2']['chip'], 200)
  assert.equal(Object.keys(result).length, 2)
})

test('buildTallies: missing arc has empty tally structure', () => {
  const result = buildTallies([
    { arc_id: 'arc1', choice_id: 'c1', faction: 'red', currency: 'chip', amount: 10 },
  ])
  assert.deepEqual(result['arc99'] ?? { byChoice: {}, byFaction: {} }, { byChoice: {}, byFaction: {} })
})

// ---------------------------------------------------------------------------
// normalizeWagerCurrency
// ---------------------------------------------------------------------------

test("normalizeWagerCurrency: 'renown' maps to 'renown'", () => {
  assert.equal(normalizeWagerCurrency('renown'), 'renown')
})

test("normalizeWagerCurrency: 'chip' maps to 'chip'", () => {
  assert.equal(normalizeWagerCurrency('chip'), 'chip')
})

test("normalizeWagerCurrency: 'coin' maps to 'chip' (default)", () => {
  assert.equal(normalizeWagerCurrency('coin'), 'chip')
})

test("normalizeWagerCurrency: undefined maps to 'chip' (default)", () => {
  assert.equal(normalizeWagerCurrency(undefined), 'chip')
})

test("normalizeWagerCurrency: null maps to 'chip' (default)", () => {
  assert.equal(normalizeWagerCurrency(null), 'chip')
})

// ---------------------------------------------------------------------------
// isValidWager
// ---------------------------------------------------------------------------

test('isValidWager: valid arcId, choiceId, positive integer passes', () => {
  assert.equal(isValidWager('arc1', 'c1', 100), true)
})

test('isValidWager: zero amount fails', () => {
  assert.equal(isValidWager('arc1', 'c1', 0), false)
})

test('isValidWager: negative amount fails', () => {
  assert.equal(isValidWager('arc1', 'c1', -10), false)
})

test('isValidWager: float amount fails', () => {
  assert.equal(isValidWager('arc1', 'c1', 1.5), false)
})

test('isValidWager: non-string arcId fails', () => {
  assert.equal(isValidWager(123, 'c1', 100), false)
})

test('isValidWager: non-string choiceId fails', () => {
  assert.equal(isValidWager('arc1', null, 100), false)
})

// ---------------------------------------------------------------------------
// isValidCurrencyGrant
// ---------------------------------------------------------------------------

test('isValidCurrencyGrant: valid currency and positive integer passes', () => {
  for (const c of VALID_CURRENCIES) {
    assert.equal(isValidCurrencyGrant(c, 1), true, `expected ${c} to pass`)
  }
})

test('isValidCurrencyGrant: unknown currency fails', () => {
  assert.equal(isValidCurrencyGrant('gold', 100), false)
})

test('isValidCurrencyGrant: zero amount fails', () => {
  assert.equal(isValidCurrencyGrant('chip', 0), false)
})

test('isValidCurrencyGrant: negative amount fails', () => {
  assert.equal(isValidCurrencyGrant('chip', -1), false)
})

test('isValidCurrencyGrant: float amount fails', () => {
  assert.equal(isValidCurrencyGrant('chip', 1.5), false)
})

test('isValidCurrencyGrant: non-string currency fails', () => {
  assert.equal(isValidCurrencyGrant(42, 100), false)
})
