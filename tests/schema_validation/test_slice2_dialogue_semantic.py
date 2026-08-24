import unittest
from pathlib import Path

from tools.schema_validation.registry import LocalSchemaRegistry
from tools.schema_validation.semantic import SemanticValidator

ROOT = Path(__file__).resolve().parents[2]


def character(char_id="character.maria"):
    return {
        "schema_id": "aigs.character.definition",
        "schema_version": 1,
        "id": char_id,
        "kind": "character",
        "display_name": "Maria",
        "persona": {},
    }


def location(location_id="location.kitchen"):
    return {
        "schema_id": "aigs.location.definition",
        "schema_version": 1,
        "id": location_id,
        "kind": "location",
        "display_name": "Kitchen",
    }


def dialogue_scene(scene_id="dialogue.morning"):
    return {
        "schema_id": "aigs.dialogue.scene",
        "schema_version": 1,
        "id": scene_id,
        "kind": "dialogue_scene",
        "display_name": "Morning",
        "input_mode": "free",
        "entry_point": "line.start",
        "entries": [
            {
                "entry_id": "line.start",
                "kind": "line",
                "speaker_ref": {"ref": "character.maria"},
                "text": "The snow is getting worse.",
                "next": {"scene_ref": None, "entry_id": "choice.reply"},
            },
            {
                "entry_id": "choice.reply",
                "kind": "choice",
                "prompt": "What do you say?",
                "options": [
                    {
                        "label": "Check the generator",
                        "target": {"scene_ref": None, "entry_id": "line.generator"},
                    }
                ],
            },
            {
                "entry_id": "line.generator",
                "kind": "narration",
                "text": "You decide to check the generator.",
                "next": None,
            },
        ],
    }


class Slice2DialogueSemanticTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = LocalSchemaRegistry(ROOT)
        cls.validator = SemanticValidator(cls.registry)

    def codes(self, project):
        return {error["code"] for error in self.validator.validate_project(project)}

    def test_valid_dialogue_scene_is_accepted(self):
        errors = self.validator.validate_project(
            {"definitions": [character(), location(), dialogue_scene()]}
        )
        self.assertEqual(errors, [])

    def test_missing_dialogue_speaker_is_reported_with_specific_code(self):
        scene = dialogue_scene()
        scene["entries"][0]["speaker_ref"] = {"ref": "character.missing"}
        self.assertIn(
            "DIALOGUE_SPEAKER_NOT_FOUND",
            self.codes({"definitions": [location(), scene]}),
        )

    def test_missing_same_scene_target_is_reported(self):
        scene = dialogue_scene()
        scene["entries"][0]["next"] = {"scene_ref": None, "entry_id": "line.missing"}
        self.assertIn(
            "DIALOGUE_TARGET_NOT_FOUND",
            self.codes({"definitions": [character(), location(), scene]}),
        )

    def test_duplicate_entry_ids_are_reported(self):
        scene = dialogue_scene()
        scene["entries"][1]["entry_id"] = "line.start"
        self.assertIn(
            "DIALOGUE_DUPLICATE_ENTRY_ID",
            self.codes({"definitions": [character(), location(), scene]}),
        )

    def test_missing_entry_point_is_reported(self):
        scene = dialogue_scene()
        scene["entry_point"] = "line.missing"
        self.assertIn(
            "DIALOGUE_ENTRY_POINT_NOT_FOUND",
            self.codes({"definitions": [character(), location(), scene]}),
        )

    def test_cross_scene_target_must_resolve_scene_and_entry(self):
        scene = dialogue_scene()
        scene["entries"][0]["next"] = {
            "scene_ref": {"ref": "dialogue.other"},
            "entry_id": "line.other",
        }
        self.assertIn(
            "DIALOGUE_TARGET_SCENE_NOT_FOUND",
            self.codes({"definitions": [character(), location(), scene]}),
        )

    def test_dialogue_cycle_is_allowed(self):
        scene = dialogue_scene()
        scene["entries"][2]["next"] = {"scene_ref": None, "entry_id": "line.start"}
        errors = self.validator.validate_project(
            {"definitions": [character(), location(), scene]}
        )
        self.assertEqual(errors, [])

    def test_playtest_refs_and_location_destinations_require_expected_kinds(self):
        manifest = {
            "schema_id": "aigs.project.manifest",
            "schema_version": 1,
            "project_id": "project.slice2",
            "display_name": "Slice 2",
            "project_format_version": 1,
            "definition_roots": ["characters", "locations", "dialogue"],
            "playtest": {
                "start_location_ref": {"ref": "location.kitchen"},
                "entry_scene_ref": {"ref": "dialogue.morning"},
            },
        }
        kitchen = location()
        kitchen["destination_refs"] = [{"ref": "location.hall"}]
        hall = location("location.hall")
        errors = self.validator.validate_project(
            {"definitions": [manifest, character(), kitchen, hall, dialogue_scene()]}
        )
        self.assertEqual(errors, [])

    def test_old_slice1_documents_remain_valid(self):
        errors = self.validator.validate_project(
            {"definitions": [character(), location()]}
        )
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
