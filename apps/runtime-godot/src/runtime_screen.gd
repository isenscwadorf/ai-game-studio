extends Control

signal advance_requested
signal choice_requested(option_index: int)
signal location_requested(location_id: String)
signal npc_requested(character_id: String)
signal free_text_submitted(text: String)

var project: Dictionary = {}
var stage
var dialogue

func _ready() -> void:
    _ensure_layout()

func configure(project_data: Dictionary, stage_model, dialogue_model) -> void:
    project = project_data
    stage = stage_model
    dialogue = dialogue_model
    _ensure_layout()

func sprite_height_ratio(framing: String) -> float:
    return 0.68 if framing == "two_thirds" else 0.82

func render() -> void:
    _ensure_layout()
    _render_background()
    _render_sprites()
    _render_locations()
    _render_dialogue()
    _render_history()

func set_ai_status(text: String) -> void:
    _ensure_layout()
    get_node("DialoguePanel/VBox/AiStatus").text = text

func clear_free_text() -> void:
    _ensure_layout()
    get_node("DialoguePanel/VBox/InputRow/Input").text = ""

func _ensure_layout() -> void:
    if has_node("Background"):
        return
    set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)

    var background := TextureRect.new()
    background.name = "Background"
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    background.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    background.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
    background.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(background)

    var backdrop := ColorRect.new()
    backdrop.name = "BackdropFallback"
    backdrop.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    backdrop.color = Color(0.09, 0.11, 0.15, 1.0)
    backdrop.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(backdrop)
    move_child(backdrop, 0)

    var sprites := Control.new()
    sprites.name = "SpriteLayer"
    sprites.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    sprites.mouse_filter = Control.MOUSE_FILTER_PASS
    add_child(sprites)

    var location_menu := VBoxContainer.new()
    location_menu.name = "LocationMenu"
    location_menu.set_anchors_preset(Control.PRESET_TOP_LEFT)
    location_menu.position = Vector2(18, 18)
    location_menu.custom_minimum_size = Vector2(220, 0)
    add_child(location_menu)

    var history_panel := PanelContainer.new()
    history_panel.name = "HistoryPanel"
    history_panel.set_anchors_preset(Control.PRESET_TOP_RIGHT)
    history_panel.position = Vector2(-338, 18)
    history_panel.custom_minimum_size = Vector2(320, 180)
    var history_box := VBoxContainer.new()
    history_box.name = "VBox"
    history_panel.add_child(history_box)
    var history_title := Label.new()
    history_title.text = "History"
    history_box.add_child(history_title)
    var history_scroll := ScrollContainer.new()
    history_scroll.name = "Scroll"
    history_scroll.custom_minimum_size = Vector2(300, 135)
    history_box.add_child(history_scroll)
    var history_lines := VBoxContainer.new()
    history_lines.name = "Lines"
    history_scroll.add_child(history_lines)
    add_child(history_panel)

    var dialogue_panel := PanelContainer.new()
    dialogue_panel.name = "DialoguePanel"
    dialogue_panel.set_anchors_preset(Control.PRESET_BOTTOM_WIDE)
    dialogue_panel.offset_left = 28
    dialogue_panel.offset_right = -28
    dialogue_panel.offset_top = -238
    dialogue_panel.offset_bottom = -24
    var style := StyleBoxFlat.new()
    style.bg_color = Color(0.025, 0.03, 0.045, 0.88)
    style.corner_radius_top_left = 12
    style.corner_radius_top_right = 12
    style.corner_radius_bottom_left = 12
    style.corner_radius_bottom_right = 12
    style.content_margin_left = 20
    style.content_margin_right = 20
    style.content_margin_top = 16
    style.content_margin_bottom = 16
    dialogue_panel.add_theme_stylebox_override("panel", style)

    var box := VBoxContainer.new()
    box.name = "VBox"
    dialogue_panel.add_child(box)
    var speaker := Label.new()
    speaker.name = "Speaker"
    speaker.add_theme_font_size_override("font_size", 20)
    box.add_child(speaker)
    var text := Label.new()
    text.name = "Text"
    text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    text.add_theme_font_size_override("font_size", 18)
    box.add_child(text)
    var choices := VBoxContainer.new()
    choices.name = "Choices"
    box.add_child(choices)
    var input_row := HBoxContainer.new()
    input_row.name = "InputRow"
    var input := LineEdit.new()
    input.name = "Input"
    input.placeholder_text = "Type anything to the active character..."
    input.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    input.text_submitted.connect(_on_free_text_submitted)
    input_row.add_child(input)
    var send := Button.new()
    send.name = "Send"
    send.text = "Send"
    send.pressed.connect(func(): _on_free_text_submitted(input.text))
    input_row.add_child(send)
    box.add_child(input_row)
    var ai_status := Label.new()
    ai_status.name = "AiStatus"
    ai_status.text = "AI: authored play available"
    box.add_child(ai_status)
    add_child(dialogue_panel)

func _render_background() -> void:
    var background: TextureRect = get_node("Background")
    var visual: Dictionary = stage.location_background() if stage != null else {"mode": "placeholder"}
    background.texture = _load_texture(visual.get("project_path", "")) if visual.get("mode") == "asset" else null

func _render_sprites() -> void:
    var layer: Control = get_node("SpriteLayer")
    _clear_children(layer)
    if stage == null:
        return
    var ids: Array[String] = stage.visible_character_ids()
    var count := max(ids.size(), 1)
    for index in ids.size():
        var character_id := ids[index]
        var visual: Dictionary = stage.character_visual(character_id)
        var slot := Control.new()
        slot.name = "Sprite_%s" % character_id.replace(".", "_")
        var width := 0.72 / float(count)
        var center := 0.14 + (float(index) + 0.5) * (0.72 / float(count))
        slot.anchor_left = center - width * 0.5
        slot.anchor_right = center + width * 0.5
        var framing := str(visual.get("framing", "full_body"))
        var ratio := sprite_height_ratio(framing)
        slot.anchor_top = 0.79 - ratio
        slot.anchor_bottom = 0.79
        layer.add_child(slot)

        var texture := _load_texture(str(visual.get("project_path", ""))) if visual.get("mode") == "asset" else null
        if texture != null:
            var sprite := TextureRect.new()
            sprite.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
            sprite.texture = texture
            sprite.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
            sprite.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
            sprite.mouse_filter = Control.MOUSE_FILTER_STOP
            sprite.gui_input.connect(func(event):
                if event is InputEventMouseButton and event.pressed:
                    npc_requested.emit(character_id)
            )
            slot.add_child(sprite)
        else:
            var placeholder := PanelContainer.new()
            placeholder.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
            var label := Label.new()
            label.text = str(visual.get("name", character_id))
            label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
            label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
            placeholder.add_child(label)
            placeholder.gui_input.connect(func(event):
                if event is InputEventMouseButton and event.pressed:
                    npc_requested.emit(character_id)
            )
            slot.add_child(placeholder)

func _render_locations() -> void:
    var menu: VBoxContainer = get_node("LocationMenu")
    _clear_children(menu)
    var title := Label.new()
    var location: Dictionary = project.get("locations", {}).get(stage.current_location_ref, {}) if stage != null else {}
    title.text = str(location.get("display_name", "Locations"))
    menu.add_child(title)
    if stage == null:
        return
    for destination_id in stage.destination_ids():
        var destination: Dictionary = project.get("locations", {}).get(destination_id, {})
        var button := Button.new()
        button.text = str(destination.get("display_name", destination_id))
        button.pressed.connect(func(): location_requested.emit(destination_id))
        menu.add_child(button)

func _render_dialogue() -> void:
    var speaker: Label = get_node("DialoguePanel/VBox/Speaker")
    var text: Label = get_node("DialoguePanel/VBox/Text")
    var choices: VBoxContainer = get_node("DialoguePanel/VBox/Choices")
    var input_row: HBoxContainer = get_node("DialoguePanel/VBox/InputRow")
    _clear_children(choices)
    if dialogue == null:
        speaker.text = ""
        text.text = ""
        input_row.visible = false
        return
    var view: Dictionary = dialogue.current_view_model()
    if view.get("ended") == true:
        speaker.text = ""
        text.text = "Scene complete"
    else:
        var speaker_ref := str(view.get("speaker_ref", ""))
        var character: Dictionary = project.get("characters", {}).get(speaker_ref, {})
        speaker.text = str(character.get("display_name", ""))
        text.text = str(view.get("text", view.get("prompt", "")))
        if view.get("kind") == "choice":
            var options: Variant = view.get("options", [])
            for index in options.size():
                var option: Variant = options[index]
                var button := Button.new()
                button.text = str(option.get("label", "Choice"))
                button.pressed.connect(func(): choice_requested.emit(index))
                choices.add_child(button)
    input_row.visible = dialogue.free_input_allowed()

func _render_history() -> void:
    var lines: VBoxContainer = get_node("HistoryPanel/VBox/Scroll/Lines")
    _clear_children(lines)
    if dialogue == null:
        return
    for item in dialogue.history:
        var label := Label.new()
        label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
        var prefix := ""
        if item.get("kind") == "line":
            var character: Dictionary = project.get("characters", {}).get(item.get("speaker_ref", ""), {})
            prefix = "%s: " % character.get("display_name", item.get("speaker_ref", ""))
        label.text = prefix + str(item.get("text", ""))
        lines.add_child(label)

func _on_free_text_submitted(value: String) -> void:
    var trimmed := value.strip_edges()
    if not trimmed.is_empty():
        free_text_submitted.emit(trimmed)

func _load_texture(project_path: String) -> Texture2D:
    if project_path.is_empty() or typeof(project.get("root_path")) != TYPE_STRING:
        return null
    var absolute := str(project.root_path).path_join(project_path)
    if not FileAccess.file_exists(absolute):
        return null
    var image := Image.load_from_file(absolute)
    if image == null or image.is_empty():
        return null
    return ImageTexture.create_from_image(image)

func _clear_children(node: Node) -> void:
    for child in node.get_children():
        node.remove_child(child)
        child.queue_free()
