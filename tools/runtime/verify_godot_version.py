from __future__ import annotations

import subprocess
import sys
from pathlib import Path

EXPECTED_PREFIX = "4.7.2"


def verify(binary: str) -> str:
    completed = subprocess.run(
        [binary, "--version"],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    )
    version = (completed.stdout or completed.stderr).strip()
    if not version.startswith(EXPECTED_PREFIX):
        raise RuntimeError(
            f"Godot {EXPECTED_PREFIX} is required; received {version or '<empty version>'}."
        )
    return version


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: verify_godot_version.py <godot-binary>", file=sys.stderr)
        return 2
    binary = str(Path(sys.argv[1]))
    try:
        print(verify(binary))
    except (OSError, subprocess.SubprocessError, RuntimeError) as error:
        print(str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
