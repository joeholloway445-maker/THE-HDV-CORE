extends Node
## Central runtime lookup hub for character-creation data (races/frames/mods)
## and the active player's current selections. Autoloaded as "GameData".

const RaceData = preload("res://src/data/race_data.gd")
const FrameData = preload("res://src/data/frame_data.gd")
const ModData = preload("res://src/data/mod_data.gd")

var selected_race_id: String = ""
var selected_frame_id: String = ""
var selected_mod_id: String = ""
var age_verified: bool = false

## Drives discover-mechanic influence weighting (DiscoveryManager) — not part
## of the race/frame/mod combat stat schema, separate progression track.
var perception: int = 1

func build_influence_pack(player_id: String) -> PlayerInfluencePack:
	return PlayerInfluencePack.from_loadout(player_id, current_loadout(), perception)

func get_race(id: String) -> Dictionary:
	return RaceData.by_id(id)

func get_frame(id: String) -> Dictionary:
	return FrameData.by_id(id)

func get_mod(id: String) -> Dictionary:
	return ModData.by_id(id)

func current_loadout() -> Dictionary:
	return {
		"race": get_race(selected_race_id),
		"frame": get_frame(selected_frame_id),
		"mod": get_mod(selected_mod_id),
	}
