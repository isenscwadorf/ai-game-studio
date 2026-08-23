from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tools.schema_validation.registry import LocalSchemaRegistry


def validate_all(root: Path) -> dict:
    root = Path(root)
    registry = LocalSchemaRegistry(root)
    manifest = json.loads((root / "fixtures" / "schemas" / "manifest.json").read_text(encoding="utf-8"))
    mismatches = []
    for case in manifest["cases"]:
        document = case["instance"]
        errors = list(registry.iter_errors(case["schema_urn"], document))
        actual_valid = not errors
        if actual_valid != case["valid"]:
            mismatches.append({
                "name": case["name"],
                "expected_valid": case["valid"],
                "errors": [error.message for error in errors[:10]],
            })
    return {"total": len(manifest["cases"]), "mismatches": len(mismatches), "details": mismatches}


def main() -> int:
    summary = validate_all(ROOT)
    print(json.dumps(summary, indent=2))
    return 0 if summary["mismatches"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
