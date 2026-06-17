// One-off import: Entity Roster + Omni Dex (exported from Drive as JSON) -> personas table.
//
// Usage:
//   1. In Google Drive, export the Entity Roster doc/sheet as JSON, an array of:
//      { id, module, name, tier, lore_summary, voice_style, behavioral_traits }
//      (module must be one of: dream, hope, no_one, vision, apex — most entries are "hope")
//   2. Save it as scripts/entity-roster.json (gitignored — it's source content, not code)
//   3. Run: npx tsx scripts/import-entity-roster.ts
//
// Requires SUPABASE_SERVICE_ROLE_KEY in the environment (never expose this key client-side).
import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

interface RosterEntry {
  id: number;
  module: string;
  name: string;
  tier?: string;
  lore_summary?: string;
  voice_style?: string;
  behavioral_traits?: string[];
}

function main() {
  const rosterPath = join(process.cwd(), "scripts", "entity-roster.json");
  let entries: RosterEntry[];
  try {
    entries = JSON.parse(readFileSync(rosterPath, "utf-8"));
  } catch {
    console.error(`Could not read ${rosterPath}. Export the Entity Roster from Drive as JSON first — see header comment.`);
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment first.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  (async () => {
    const rows = entries.map((e) => ({
      id: e.id,
      module: e.module,
      name: e.name,
      tier: e.tier ?? null,
      lore_summary: e.lore_summary ?? null,
      voice_style: e.voice_style ?? null,
      behavioral_traits: e.behavioral_traits ?? [],
      source: "entity_roster",
    }));

    const { error, count } = await supabase.from("personas").upsert(rows, { onConflict: "id", count: "exact" });
    if (error) {
      console.error("Import failed:", error.message);
      process.exit(1);
    }
    console.log(`Imported/updated ${count ?? rows.length} personas.`);
  })();
}

main();
