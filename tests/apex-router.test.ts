/**
 * tests/apex-router.test.ts — Unit tests for APEX MoE heuristic router.
 *
 * Run: node --import tsx --test tests/apex-router.test.ts
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { heuristicRoute, routeTask } from '../lib/apex-router.js';

describe('heuristicRoute — model selection', () => {
  test('security/high → opus', () =>
    assert.strictEqual(heuristicRoute('audit this', 'security', 'high'), 'claude-opus-5'));

  test('security/medium → sonnet', () =>
    assert.strictEqual(heuristicRoute('audit this', 'security', 'medium'), 'claude-sonnet-5'));

  test('audit/high → opus', () =>
    assert.strictEqual(heuristicRoute('full audit', 'audit', 'high'), 'claude-opus-5'));

  test('code/low → haiku', () =>
    assert.strictEqual(heuristicRoute('fix bug', 'code', 'low'), 'claude-haiku-4-5-20251001'));

  test('code/high → opus', () =>
    assert.strictEqual(heuristicRoute('deep refactor', 'code', 'high'), 'claude-opus-5'));

  test('analysis/medium → sonnet', () =>
    assert.strictEqual(heuristicRoute('analyze trends', 'analysis', 'medium'), 'claude-sonnet-5'));

  test('creative/high → fable', () =>
    assert.strictEqual(heuristicRoute('write a story', 'creative', 'high'), 'claude-fable-5'));

  test('simulation/high → fable', () =>
    assert.strictEqual(heuristicRoute('simulate scenario', 'simulation', 'high'), 'claude-fable-5'));

  test('vision/low → sonnet', () =>
    assert.strictEqual(heuristicRoute('describe image', 'vision', 'low'), 'claude-sonnet-5'));

  test('multimodal/high → sonnet', () =>
    assert.strictEqual(heuristicRoute('process frame', 'multimodal', 'high'), 'claude-sonnet-5'));

  test('chat/low → haiku', () =>
    assert.strictEqual(heuristicRoute('hello', 'chat', 'low'), 'claude-haiku-4-5-20251001'));

  test('support/low → haiku', () =>
    assert.strictEqual(heuristicRoute('help me', 'support', 'low'), 'claude-haiku-4-5-20251001'));

  test("default 'audit' keyword → opus", () =>
    assert.strictEqual(heuristicRoute('audit all policies', 'general', 'medium'), 'claude-opus-5'));

  test("default 'knoll' keyword → opus", () =>
    assert.strictEqual(heuristicRoute('run knoll check', 'general', 'medium'), 'claude-opus-5'));

  test("default 'dream' keyword → fable", () =>
    assert.strictEqual(heuristicRoute('dream up a scene', 'general', 'medium'), 'claude-fable-5'));

  test("default 'creat' keyword → fable", () =>
    assert.strictEqual(heuristicRoute('create a story', 'general', 'medium'), 'claude-fable-5'));

  test("default 'debug' keyword → sonnet", () =>
    assert.strictEqual(heuristicRoute('debug this path', 'general', 'medium'), 'claude-sonnet-5'));

  test("default 'refactor' keyword → sonnet", () =>
    assert.strictEqual(heuristicRoute('refactor the module', 'general', 'medium'), 'claude-sonnet-5'));

  test('default low budget → haiku', () =>
    assert.strictEqual(heuristicRoute('do something', 'general', 'low'), 'claude-haiku-4-5-20251001'));

  test('default medium budget → sonnet', () =>
    assert.strictEqual(heuristicRoute('do something', 'general', 'medium'), 'claude-sonnet-5'));

  test('preferSpeed overrides budget tier → haiku for code/medium', () =>
    assert.strictEqual(heuristicRoute('fix bug', 'code', 'medium', true), 'claude-haiku-4-5-20251001'));
});

describe('routeTask — RouteDecision shape', () => {
  test('returns correct model', () => {
    const d = routeTask('audit config', 'security', 'high');
    assert.strictEqual(d.model, 'claude-opus-5');
  });

  test('returns category and budgetTier', () => {
    const d = routeTask('write story', 'creative', 'high');
    assert.strictEqual(d.category, 'creative');
    assert.strictEqual(d.budgetTier, 'high');
  });

  test('reasoning includes category, budget, model', () => {
    const d = routeTask('fix bug', 'code', 'low');
    assert.ok(d.reasoning.includes('code'));
    assert.ok(d.reasoning.includes('low'));
    assert.ok(d.reasoning.includes('claude-haiku-4-5-20251001'));
  });

  test('defaults: general/medium → sonnet', () => {
    const d = routeTask('do something');
    assert.strictEqual(d.model, 'claude-sonnet-5');
    assert.strictEqual(d.category, 'general');
    assert.strictEqual(d.budgetTier, 'medium');
  });

  test('preferSpeed flag appears in reasoning', () => {
    const d = routeTask('fix bug', 'code', 'medium', true);
    assert.ok(d.reasoning.includes('speed=true'));
  });
});
