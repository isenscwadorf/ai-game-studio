use std::{
    collections::HashSet,
    fs::{self, File, OpenOptions},
    io::{self, Write},
    path::{Path, PathBuf},
};

use serde_json::Value;
use tempfile::{NamedTempFile, TempPath};

const DIALOGUE_DIRECTORY: &str = "dialogue";
const RECOVERY_DIRECTORY: &str = ".aigs-recovery";
const SCHEMA_ID: &str = "aigs.dialogue.scene";

#[tauri::command]
pub fn read_dialogue_definitions(project_dir: String) -> Result<Vec<Value>, String> {
    let project_dir = existing_project_directory(&project_dir)?;
    let dialogue_dir = project_dir.join(DIALOGUE_DIRECTORY);
    if !path_exists(&dialogue_dir)? {
        return Ok(Vec::new());
    }
    ensure_real_directory(&dialogue_dir)?;

    let mut filenames = canonical_dialogue_files(&dialogue_dir)?;
    filenames.sort_unstable();
    let mut definitions = Vec::with_capacity(filenames.len());
    for filename in filenames {
        let path = dialogue_dir.join(&filename);
        let definition = read_json(&path)?;
        validate_definition(&definition)?;
        let id = definition_id(&definition)?;
        if filename != format!("{id}.json") {
            return Err(format!(
                "dialogue definition ID in {} does not match its filename",
                path.display()
            ));
        }
        definitions.push(definition);
    }
    Ok(definitions)
}

#[tauri::command]
pub fn save_dialogue_definitions(
    project_dir: String,
    definitions: Vec<Value>,
) -> Result<Vec<Value>, String> {
    let project_dir = existing_project_directory(&project_dir)?;
    let dialogue_dir = project_dir.join(DIALOGUE_DIRECTORY);
    if !path_exists(&dialogue_dir)? {
        fs::create_dir(&dialogue_dir).map_err(io_error)?;
    }
    ensure_real_directory(&dialogue_dir)?;

    let mut expected = HashSet::with_capacity(definitions.len());
    for definition in &definitions {
        validate_definition(definition)?;
        let id = definition_id(definition)?;
        let filename = format!("{id}.json");
        if !expected.insert(filename.clone()) {
            return Err(format!("duplicate dialogue definition filename {filename:?}"));
        }
        atomic_write_json_with_recovery(
            &dialogue_dir.join(filename),
            definition,
            &project_dir,
        )?;
    }

    for stale in canonical_dialogue_files(&dialogue_dir)? {
        if !expected.contains(&stale) {
            move_to_recovery(
                &dialogue_dir.join(&stale),
                &project_dir,
                &Path::new(DIALOGUE_DIRECTORY).join(&stale),
            )?;
        }
    }
    Ok(definitions)
}

fn validate_definition(value: &Value) -> Result<(), String> {
    if value.get("schema_id").and_then(Value::as_str) != Some(SCHEMA_ID) {
        return Err("dialogue definition must use schema_id aigs.dialogue.scene".to_owned());
    }
    let id = definition_id(value)?;
    if !id.starts_with("dialogue.") {
        return Err(format!("dialogue definition ID {id:?} must start with dialogue."));
    }
    Ok(())
}

fn definition_id(value: &Value) -> Result<&str, String> {
    let id = value
        .get("id")
        .and_then(Value::as_str)
        .ok_or_else(|| "dialogue definition is missing a string id".to_owned())?;
    if !safe_definition_id(id) {
        return Err("dialogue definition ID is not a safe namespaced identifier".to_owned());
    }
    Ok(id)
}

fn safe_definition_id(id: &str) -> bool {
    let segments: Vec<_> = id.split('.').collect();
    if segments.len() < 2 {
        return false;
    }
    let first = segments[0];
    if first.is_empty()
        || !first.bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || (index > 0 && (byte.is_ascii_digit() || byte == b'_'))
        })
    {
        return false;
    }
    segments.iter().skip(1).all(|segment| {
        !segment.is_empty()
            && segment.bytes().enumerate().all(|(index, byte)| {
                byte.is_ascii_lowercase()
                    || byte.is_ascii_digit()
                    || (index > 0 && matches!(byte, b'_' | b'-'))
            })
    })
}

fn canonical_dialogue_files(directory: &Path) -> Result<Vec<String>, String> {
    let mut result = Vec::new();
    for entry in fs::read_dir(directory).map_err(io_error)? {
        let entry = entry.map_err(io_error)?;
        let filename = entry
            .file_name()
            .into_string()
            .map_err(|_| "dialogue filename is not UTF-8".to_owned())?;
        if !filename.ends_with(".json") {
            continue;
        }
        ensure_regular_file(&entry.path())?;
        let Some(id) = filename.strip_suffix(".json") else {
            continue;
        };
        if !id.starts_with("dialogue.") || !safe_definition_id(id) {
            return Err(format!("invalid dialogue definition filename {filename:?}"));
        }
        result.push(filename);
    }
    Ok(result)
}

fn existing_project_directory(value: &str) -> Result<PathBuf, String> {
    let path = Path::new(value);
    ensure_real_directory(path)?;
    fs::canonicalize(path).map_err(io_error)
}

fn path_exists(path: &Path) -> Result<bool, String> {
    match fs::symlink_metadata(path) {
        Ok(_) => Ok(true),
        Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(false),
        Err(error) => Err(io_error(error)),
    }
}

fn ensure_real_directory(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path).map_err(io_error)?;
    if metadata.file_type().is_symlink() || !metadata.is_dir() || is_reparse_point(path)? {
        return Err(format!("refusing link, reparse point, or unsafe path at {}", path.display()));
    }
    Ok(())
}

fn ensure_regular_file(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path).map_err(io_error)?;
    if metadata.file_type().is_symlink() || !metadata.is_file() || is_reparse_point(path)? {
        return Err(format!("refusing link, reparse point, or unsafe path at {}", path.display()));
    }
    Ok(())
}

#[cfg(windows)]
fn is_reparse_point(path: &Path) -> Result<bool, String> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::{
        GetFileAttributesW, FILE_ATTRIBUTE_REPARSE_POINT, INVALID_FILE_ATTRIBUTES,
    };
    let wide = path.as_os_str().encode_wide().chain(Some(0)).collect::<Vec<u16>>();
    let attributes = unsafe { GetFileAttributesW(wide.as_ptr()) };
    if attributes == INVALID_FILE_ATTRIBUTES {
        return Err(io_error(io::Error::last_os_error()));
    }
    Ok(attributes & FILE_ATTRIBUTE_REPARSE_POINT != 0)
}

#[cfg(not(windows))]
fn is_reparse_point(_: &Path) -> Result<bool, String> {
    Ok(false)
}

fn read_json(path: &Path) -> Result<Value, String> {
    ensure_regular_file(path)?;
    let bytes = fs::read(path)
        .map_err(|error| format!("failed to read {}: {error}", path.display()))?;
    serde_json::from_slice(&bytes)
        .map_err(|error| format!("invalid JSON in {}: {error}", path.display()))
}

fn write_synced_temp(parent: &Path, value: &Value) -> Result<TempPath, String> {
    let bytes = serde_json::to_vec_pretty(value)
        .map_err(|error| format!("failed to serialize dialogue JSON: {error}"))?;
    let mut temp = NamedTempFile::new_in(parent).map_err(io_error)?;
    temp.write_all(&bytes).map_err(io_error)?;
    temp.write_all(b"\n").map_err(io_error)?;
    temp.as_file().sync_all().map_err(io_error)?;
    Ok(temp.into_temp_path())
}

fn recovery_path(project_dir: &Path, relative: &Path) -> Result<PathBuf, String> {
    let filename = relative
        .file_name()
        .ok_or_else(|| "dialogue recovery path requires a filename".to_owned())?;
    let parent = relative.parent().unwrap_or_else(|| Path::new(""));
    let directory = project_dir.join(RECOVERY_DIRECTORY).join(parent);
    fs::create_dir_all(&directory).map_err(io_error)?;
    ensure_real_directory(&directory)?;
    Ok(directory.join(format!("{}.bak", filename.to_string_lossy())))
}

fn atomic_write_json_with_recovery(
    target: &Path,
    value: &Value,
    project_dir: &Path,
) -> Result<(), String> {
    let parent = target
        .parent()
        .ok_or_else(|| "dialogue target requires a parent directory".to_owned())?;
    ensure_real_directory(parent)?;
    let relative = target
        .strip_prefix(project_dir)
        .map_err(|_| "dialogue target escapes project directory".to_owned())?;
    let backup = recovery_path(project_dir, relative)?;
    let temp = write_synced_temp(parent, value)?;
    if path_exists(target)? {
        ensure_regular_file(target)?;
        if path_exists(&backup)? {
            ensure_regular_file(&backup)?;
            fs::remove_file(&backup).map_err(io_error)?;
        }
        replace_existing(target, temp.as_ref(), &backup).map_err(io_error)?;
    } else {
        fs::rename(temp.as_ref(), target).map_err(io_error)?;
    }
    Ok(())
}

#[cfg(windows)]
fn replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::ReplaceFileW;
    let wide = |path: &Path| {
        path.as_os_str().encode_wide().chain(Some(0)).collect::<Vec<u16>>()
    };
    let target_w = wide(target);
    let temp_w = wide(temp);
    let backup_w = wide(backup);
    let replaced = unsafe {
        ReplaceFileW(
            target_w.as_ptr(),
            temp_w.as_ptr(),
            backup_w.as_ptr(),
            0,
            std::ptr::null_mut(),
            std::ptr::null_mut(),
        )
    };
    if replaced == 0 {
        Err(io::Error::last_os_error())
    } else {
        Ok(())
    }
}

#[cfg(not(windows))]
fn replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    let mut source = File::open(target)?;
    let mut recovery = OpenOptions::new().write(true).create_new(true).open(backup)?;
    io::copy(&mut source, &mut recovery)?;
    recovery.sync_all()?;
    fs::rename(temp, target)
}

fn move_to_recovery(source: &Path, project_dir: &Path, relative: &Path) -> Result<(), String> {
    ensure_regular_file(source)?;
    let backup = recovery_path(project_dir, relative)?;
    if path_exists(&backup)? {
        ensure_regular_file(&backup)?;
        fs::remove_file(&backup).map_err(io_error)?;
    }
    fs::rename(source, backup).map_err(io_error)
}

fn io_error(error: io::Error) -> String {
    error.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn scene(id: &str) -> Value {
        json!({
            "schema_id": SCHEMA_ID,
            "schema_version": 1,
            "id": id,
            "kind": "dialogue_scene",
            "display_name": "Scene",
            "input_mode": "free",
            "entry_point": "entry.start",
            "entries": [{
                "entry_id":"entry.start",
                "kind":"narration",
                "text":"Hello",
                "next":null
            }]
        })
    }

    #[test]
    fn saves_reads_and_recovers_dialogue_definitions() {
        let temp = tempfile::tempdir().unwrap();
        fs::write(temp.path().join("project.json"), b"{}").unwrap();
        save_dialogue_definitions(
            temp.path().display().to_string(),
            vec![scene("dialogue.intro")],
        )
        .unwrap();
        assert_eq!(
            read_dialogue_definitions(temp.path().display().to_string()).unwrap().len(),
            1
        );

        let mut changed = scene("dialogue.intro");
        changed["display_name"] = json!("Changed");
        save_dialogue_definitions(temp.path().display().to_string(), vec![changed]).unwrap();
        assert!(temp
            .path()
            .join(".aigs-recovery/dialogue/dialogue.intro.json.bak")
            .is_file());
    }

    #[test]
    fn rejects_unsafe_or_wrong_schema_dialogue() {
        let temp = tempfile::tempdir().unwrap();
        let mut wrong = scene("dialogue.intro");
        wrong["schema_id"] = json!("aigs.location.definition");
        assert!(save_dialogue_definitions(temp.path().display().to_string(), vec![wrong]).is_err());
        assert!(save_dialogue_definitions(
            temp.path().display().to_string(),
            vec![scene("dialogue...escape")],
        )
        .is_err());
    }

    #[test]
    fn stale_dialogue_moves_to_recovery() {
        let temp = tempfile::tempdir().unwrap();
        save_dialogue_definitions(
            temp.path().display().to_string(),
            vec![scene("dialogue.old")],
        )
        .unwrap();
        save_dialogue_definitions(temp.path().display().to_string(), vec![]).unwrap();
        assert!(!temp.path().join("dialogue/dialogue.old.json").exists());
        assert!(temp
            .path()
            .join(".aigs-recovery/dialogue/dialogue.old.json.bak")
            .exists());
    }
}
