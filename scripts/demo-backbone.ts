// Live demo of the PersonaMatrix backbone — runs the ACTUAL ported core
// (lib/personamatrix), the same code POST /api/personamatrix/request calls.
// Mirrors the original Python demo.py: a Dream streaming session where a
// filter_director persona reads "energy" and picks a filter chain, commenter
// personas spawn in bursts and chatter, and every spawn->execute->terminate
// lands in an in-memory ledger with its cost.
//
// Run: npx tsx scripts/demo-backbone.ts
import { request, buildLedgerEntry, getMatrixConfig } from "../lib/personamatrix/matrix";
import type { LedgerEntry } from "../lib/personamatrix/types";

const ledger: LedgerEntry[] = [];

function bill(module: "dream", role: string) {
  const { result, cost_usd } = request(module, role, role === "filter_director" ? { energy: Math.random() } : { context: "the proceedings" });
  ledger.push(buildLedgerEntry(module, role, result.persona as number, (result.persona_uid as string) ?? "?", cost_usd));
  return result;
}

console.log("=== PersonaMatrix Dream Session — LIVE (ported TS core) ===\n");
const cfg = getMatrixConfig();
console.log(`Matrix: ${cfg.matrix.name} v${cfg.matrix.version} — capacity ${cfg.matrix.total_capacity} personas, all ephemeral.\n`);

for (let tick = 0; tick < 10; tick++) {
  // One director decides the visual chain for this beat.
  const directive = bill("dream", "filter_director");
  const energy = (directive.energy as number).toFixed(2);
  console.log(`tick ${tick}  energy=${energy}  -> chain: ${directive.trigger_chain}`);

  // A burst of commenter personas reacts, then dies.
  const burst = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < burst; i++) {
    const chat = bill("dream", "commenter");
    console.log(`        persona_${chat.persona}: ${chat.text}`);
  }
}

// Billing report (same shape as /api/personamatrix/ledger).
const byModule: Record<string, number> = {};
let total = 0;
for (const e of ledger) {
  byModule[e.module] = (byModule[e.module] ?? 0) + e.cost_usd;
  total += e.cost_usd;
}

console.log("\n=== Apex Billing Ledger ===");
console.log(`executions: ${ledger.length}`);
console.log(`total spend: $${total.toFixed(8)}`);
console.log(`by module:`, Object.fromEntries(Object.entries(byModule).map(([k, v]) => [k, `$${v.toFixed(8)}`])));
console.log("\nEvery persona above spawned, ran one task, and is already dead. Nothing idles.");
