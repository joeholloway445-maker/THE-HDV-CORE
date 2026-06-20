class_name AmbientNpc
extends Node3D
## A "mob" NPC going about a day-to-day task in a persistent world. Whether
## it reacts to the player at all is governed by GameModeManager's active
## mode (persistent_aware vs. persistent_incognito): in incognito, this NPC
## stays scripted/oblivious until the player directly interacts with it, and
## can't tell the player is different unless the player gives that away
## during the interaction. Recruitable NPCs can become companions, pets, or
## mounts once recruit() succeeds.

signal reaction_received(result: Dictionary)
signal recruited(npc_id: String, kind: String)

## "dream" | "hope" | "no_one" | "vision" | "apex" — passed straight through
## to PersonaMatrixClient, matching lib/personamatrix/types.ts's PersonaModule.
@export var persona_module: String = "dream"
@export var persona_role: String = "ambient_npc"
@export var npc_id: String = ""
@export var daily_task: String = "wandering"
## "" (not recruitable), "companion", "pet", or "mount".
@export var recruitable_as: String = ""

var _has_been_interacted_with: bool = false

func _should_react_to_player_presence() -> bool:
	return GameModeManager.is_aware() or _has_been_interacted_with

## Called when a player directly engages this NPC (dialogue, emote, combat,
## etc.) — the only way to get a reaction out of it in incognito mode.
func interact(player_id: String, give_away_difference: bool = false) -> void:
	_has_been_interacted_with = true
	if give_away_difference:
		# Player chose to reveal themselves mid-interaction; from here on this
		# NPC (and whatever it gossips to) treats them as aware would.
		_has_been_interacted_with = true
	_request_ai_reaction(player_id)

func _request_ai_reaction(player_id: String) -> void:
	if not _should_react_to_player_presence():
		return
	var task := {
		"npc_id": npc_id,
		"player_id": player_id,
		"daily_task": daily_task,
		"aware": GameModeManager.is_aware(),
	}
	var response := await PersonaMatrixClient.request_persona(persona_module, persona_role, task)
	reaction_received.emit(response)

func recruit(player_id: String) -> bool:
	if recruitable_as.is_empty():
		return false
	GameData.recruit_companion(npc_id, recruitable_as, name)
	recruited.emit(npc_id, recruitable_as)
	return true
