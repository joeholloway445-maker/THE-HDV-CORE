# The Views System (Perception & Rendering)

Status: **Design captured, not yet implemented.** This document records the
spec as described so implementation can pick up later.

## Overview

"Views" govern how every entity (player, companion, NPC, item) is *rendered*
depending on **who is looking at whom**. The same underlying entity (same
locked Blueprint stats — mesh size, attack rate, attack damage, attack type)
can appear very differently depending on the observer's relationship and
relative power to the observed.

Two axes combine to produce a View:

1. **Relationship** of the observed to the observer: `friendly` / `neutral` / `enemy`
2. **Relative power** of the observed vs. the observer: `stronger` / `equal` / `weaker`
3. **Direction**: "how *you* see *them*" vs. "how *they* see *you*"

`(3 relationships) x (3 power tiers) x (2 directions) = 18` combinations,
plus **View A** (self), for **19 total views (A–S)**.

## The 19 Views

| View | Description |
|------|-------------|
| A | Self-view — how you see yourself, your gear, and your companions |
| B | You → friendlies stronger than you |
| C | Friendlies stronger than you → you |
| D | You → neutrals stronger than you |
| E | Neutrals stronger than you → you |
| F | You → enemies stronger than you |
| G | Enemies stronger than you → you |
| H | You → friendlies equal-ish in power |
| I | Friendlies equal-ish in power → you |
| J | You → neutrals equal-ish in power |
| K | Neutrals equal-ish in power → you |
| L | You → enemies equal-ish in power |
| M | Enemies equal-ish in power → you |
| N | You → friendlies weaker than you |
| O | Friendlies weaker than you → you |
| P | You → neutrals weaker than you |
| Q | Neutrals weaker than you → you |
| R | You → enemies weaker than you |
| S | Enemies weaker than you → you |

Pattern: views B–S are generated from the 9 `(relationship x relative power)`
buckets, each producing a pair of views — one per direction
(you-look-at-them / they-look-at-you).

## The Fidelity Scale (Holographic <-> Distorted)

Every view (besides A, which is always "true/clean") sits on a continuous
visual-fidelity scale driven by the **power-tier delta** between observer and
observed:

- Each tier of difference shifts the rendering one step along the scale.
- The scale runs from **super holographic** (one extreme) to **super
  distorted** (the other extreme).
- Larger power gaps push further toward the extremes; smaller gaps (near
  "equal-ish") sit near the middle/neutral point of the scale.

Open implementation question (for later): which direction maps to which end
— e.g. does looking at something far stronger render it more "holographic"
(idealized/luminous) while looking at something far weaker renders it more
"distorted" (degraded/glitchy)? Or the reverse? This needs a decision before
building the renderer, but the *structure* (tier-delta -> position on a
holographic<->distorted continuum) is locked in.

## Interaction With Existing Systems

The View + fidelity scale acts as a **rendering modifier** layered on top of
the entity's base presentation, which is itself built from:

- **Race (20)** -> determines base **textures/visuals** (materials, particle
  effects, surface shaders)
- **Frame (20)** -> determines base **lights/sounds** (lighting rigs, ambient
  and combat audio profiles)
- **Morph Rig / Mod (20)** -> determines **physics & in-combat math** (locked
  gameplay numbers — unaffected by View; Views are perception-layer only)

So for any given entity instance:

```
final_presentation = base_visuals(Race)
                    x base_audio_lighting(Frame)
                    x view_fidelity_modifier(View letter, power-tier delta)

combat_math = Mod (unaffected by View — always "true" values)
```

Views never change Mod-driven combat math — two players fighting the same
entity get the same combat outcome regardless of which View they're seeing it
through. Views only change *how it looks/sounds* to each observer.

## Open Question: Apex Matrix (4096)

Still unresolved from earlier in this session: is the in-game "Apex Matrix
(4096)" referenced in the Omni Dex a **gameplay build-combination system**
(e.g., Race x Frame x Mod combination space, 20 x 20 x ~10 ≈ 4096-ish), or is
it unrelated to the flagged "APEX 64x64 / 4096 matrix" marketing-automation
project found in Drive (which described a social-bot network and will **not**
be built as part of this project regardless)? Needs confirmation before any
"Apex Matrix" feature work begins.

## Next Steps (not started)

- Decide the holographic <-> distorted direction mapping per power-tier delta
- Define data model for Race visual presets, Frame light/sound presets
- Define a `view_id` (A–S) + `tier_delta` -> fidelity-level lookup
- Wire view resolution into the renderer based on observer/observed
  relationship + power comparison
- Resolve Apex Matrix question above
