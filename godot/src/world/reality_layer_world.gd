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

func _on_back_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/worlds/world_select.tscn")
