extends Node3D
## Shared behavior for the five reality-layer world scenes: shows the
## layer name/description and provides a way back to the hub.

@export var world_id: String = ""

@onready var title_label: Label = $UI/Title
@onready var desc_label: Label = $UI/Description

func _ready() -> void:
	var world := WorldRegistry.by_id(world_id)
	if world.is_empty():
		return
	title_label.text = world.get("name", world_id)
	desc_label.text = world.get("description", "")
	if world_id == "supraliminal_spire":
		_discover_spawn_chunk()

## Demo wiring for the discover mechanic: the lone local player "discovers"
## whatever chunk they spawn into. Real parties will call
## DiscoveryManager.register_party_visit() with every member's pack as they
## move between chunks.
func _discover_spawn_chunk() -> void:
	var coord := DiscoveryManager.world_pos_to_chunk(global_position)
	var pack := GameData.build_influence_pack("local_player")
	DiscoveryManager.register_party_visit(coord, [pack])
	var chunk := DiscoveryManager.get_or_generate_chunk(coord)
	if chunk.is_hub:
		desc_label.text += "\n[Hub: %s]" % chunk.hub_id
	else:
		desc_label.text += "\n[Wild chunk %s — biome: %s]" % [coord, chunk.biome.get("biome", "?")]

func _on_back_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/worlds/world_select.tscn")
