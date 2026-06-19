# Apex Matrix (4096) — UGC-as-NPC Companion Grid

Status: **Design captured, not yet implemented.**

## Concept

The Apex Matrix is a large grid of NPC "slots" (4096 total) that populate the
game world and its fiction. Instead of being hand-authored only, these slots
can be **filled by player UGC creations** — meaning a player's custom
companion/item build (made via the Blueprint deconstruct system, see
`docs/design/` UGC notes and `supabase/migrations/002_ugc_blueprints.sql`)
can be promoted into the world as an NPC that *other players* encounter,
complete with its own storyline/lore presence.

This makes player creations literally part of the game and its fiction, not
just cosmetic skins on the player's own roster — a strong differentiator.

## How it Connects to Existing Systems

- **Blueprint economy** (migration 002): a `player_creations` row is the
  source material. Its `blueprint_id` still locks gameplay shape
  (faction/role/tier -> mesh size, attack rate/damage/type); only
  name/skin/visual are player-authored.
- **UGC Pipeline** (4 stages: Initial Submission -> QA & Moderation ->
  Balancing & Stat Normalization -> Deployment & Instancing): a creation must
  pass all four stages before it's eligible for Apex Matrix promotion.
- **Views system**: once placed in a slot, the NPC is rendered to other
  players through the normal View resolution (relationship + power-tier
  delta -> holographic<->distorted fidelity), exactly like any other entity.
- **Race / Frame / Mod tiers**: the NPC's visuals (Race), lights/sounds
  (Frame), and physics/combat math (Mod) are inherited from the underlying
  creation, same as for the owning player.

## Open Design Questions (for later)

- Promotion criteria: how does a creation get selected/approved to fill an
  Apex Matrix slot (manual curation, automated QA score threshold, player
  voting, rotation)?
- Storyline authorship: who writes the "fiction" layer for a promoted
  creation — the original player, procedurally generated, or staff-curated?
- Slot structure: is 4096 a flat pool, or organized (e.g. by zone/faction/
  tier, similar to the 64x64 layout seen in the Omni Dex)?
- Ownership/attribution: does the original player retain credit/visibility
  when their creation appears as an NPC for others?
- Lifecycle: can a slot's NPC be rotated out, retired, or replaced; does the
  original player's own copy stay independent of the promoted instance?

## Next Steps (not started)

- Define `apex_matrix_slots` data model (slot id, occupant creation id,
  status, zone/placement, storyline ref)
- Define promotion pipeline hook at end of UGC Deployment & Instancing stage
- Decide slot organization (flat 4096 vs. structured grid)
- Tie slot rendering into the Views resolver from `views-system.md`
