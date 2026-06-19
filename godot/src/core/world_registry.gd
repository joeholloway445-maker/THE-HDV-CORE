extends Node
## Registry of worlds reachable from the Periliminal.Space multiverse hub.
## "reality_layer" is one of the five HDV-CORE layers: supraliminal, liminal,
## periliminal, subliminal, hyperliminal. "scene_path" may be empty for worlds
## not yet built (e.g. cross-repo worlds like CATSINO.CASINO, loaded out of
## process rather than as a local .tscn).

const WORLDS: Array[Dictionary] = [
	{
		"id": "periliminal_hub", "name": "Periliminal.Space",
		"reality_layer": "periliminal",
		"description": "The shared threshold city — character creation, faction halls, and travel gates to every other layer.",
		"scene_path": "res://scenes/worlds/periliminal_hub.tscn",
		"requires_age_verification": false,
		"external": false,
	},
	{
		"id": "subliminal_sandbox", "name": "The Undercroft",
		"reality_layer": "subliminal",
		"description": "Private, unrestricted UGC sandbox. Content must pass community moderation before it can surface elsewhere.",
		"scene_path": "res://scenes/worlds/subliminal_sandbox.tscn",
		"requires_age_verification": false,
		"external": false,
	},
	{
		"id": "supraliminal_spire", "name": "The Spire Above",
		"reality_layer": "supraliminal",
		"description": "High-order overseer layer — pristine, oversaturated light, vertical architecture; where faction leadership and lore-critical events play out.",
		"scene_path": "res://scenes/worlds/supraliminal_spire.tscn",
		"requires_age_verification": false,
		"external": false,
	},
	{
		"id": "liminal_drift", "name": "The Drift",
		"reality_layer": "liminal",
		"description": "Transitional non-space between worlds — half-rendered corridors, signal noise, way-stations. Most travel gates pass through here.",
		"scene_path": "res://scenes/worlds/liminal_drift.tscn",
		"requires_age_verification": false,
		"external": false,
	},
	{
		"id": "hyperliminal_breach", "name": "The Breach",
		"reality_layer": "hyperliminal",
		"description": "Reality-overflow layer — corrupted geometry, unstable physics, endgame/raid content where the multiverse's rules start to fail.",
		"scene_path": "res://scenes/worlds/hyperliminal_breach.tscn",
		"requires_age_verification": false,
		"external": false,
	},
	{
		"id": "catsino_casino", "name": "Catsino Casino",
		"reality_layer": "periliminal",
		"description": "Cat-themed social casino MMO. Real gambling-style mechanics (slots, roulette, blackjack, crash) — gated behind age verification.",
		"scene_path": "",
		"requires_age_verification": true,
		"external": true,
		"external_repo": "CATSINO.CASINO",
	},
]

static func by_id(id: String) -> Dictionary:
	for world in WORLDS:
		if world["id"] == id:
			return world
	return {}

static func by_reality_layer(layer: String) -> Array[Dictionary]:
	var result: Array[Dictionary] = []
	for world in WORLDS:
		if world["reality_layer"] == layer:
			result.append(world)
	return result

static func accessible_worlds(age_verified: bool) -> Array[Dictionary]:
	var result: Array[Dictionary] = []
	for world in WORLDS:
		if not world["requires_age_verification"] or age_verified:
			result.append(world)
	return result
