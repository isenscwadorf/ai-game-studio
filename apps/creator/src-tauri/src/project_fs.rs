use std::{
    collections::HashSet,
    fs::{self},
    io::{self, Write},
    path::{Path, PathBuf},
};

use serde::{Deserialize, Serialize};
use serde_json::Value;
use tempfile::{NamedTempFile, TempPath};

#[cfg(not(windows))]
use std::fs::{File, OpenOptions};

const RECOVERY_DIRECTORY: &str = ".aigs-recovery";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum PathKind {
    File,
    Directory,
    Other,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct ProjectPayload {
    pub manifest: Value,
    pub characters: Vec<Value>,
    pub locations: Vec<Value>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum DefinitionCollection {
    Characters,
    Locations,
}

impl DefinitionCollection {
    const fn directory_name(self) -> &'static str {
        match self {
            Self::Characters => "characters",
            Self::Locations => "locations",
        }
    }

    const fn id_prefix(self) -> &'static str {
        match self {
            Self::Characters => "character.",
            Self::Locations => "location.",
        }
    }
}

#[tauri::command]
pub fn create_project(
    parent_dir: String,
    folder_name: String,
    payload: ProjectPayload,
) -> Result<ProjectPayload, String> {
    validate_payload(&payload)?;
    let parent = existing_project_directory(&parent_dir)?;
    let folder_name = safe_folder_name(&folder_name)?;
    let project_dir = parent.join(folder_name);
    if path_exists(&project_dir)? {
        ensure_real_directory(&project_dir)?;
        if fs::read_dir(&project_dir)
            .map_err(io_error)?
            .next()
            .is_some()
        {
            return Err("refusing to create a project in a non-empty target folder".to_owned());
        }
    } else {
        fs::create_dir(&project_dir).map_err(io_error)?;
    }
    save_project_at(&project_dir, &payload)?;
    Ok(payload)
}

#[tauri::command]
pub fn open_project(project_dir: String) -> Result<ProjectPayload, String> {
    let project_dir = existing_project_directory(&project_dir)?;
    Ok(ProjectPayload {
        manifest: read_json(&project_dir.join("project.json"))?,
        characters: read_collection(&project_dir, DefinitionCollection::Characters)?,
        locations: read_collection(&project_dir, DefinitionCollection::Locations)?,
    })
}

#[tauri::command]
pub fn save_project(
    project_dir: String,
    payload: ProjectPayload,
) -> Result<ProjectPayload, String> {
    validate_payload(&payload)?;
    let project_dir = existing_project_directory(&project_dir)?;
    save_project_at(&project_dir, &payload)?;
    Ok(payload)
}

fn save_project_at(project_dir: &Path, payload: &ProjectPayload) -> Result<(), String> {
    validate_save_paths(project_dir)?;
    atomic_write_json_with_recovery(
        &project_dir.join("project.json"),
        &payload.manifest,
        project_dir,
    )?;
    write_collection(
        project_dir,
        DefinitionCollection::Characters,
        &payload.characters,
    )?;
    write_collection(
        project_dir,
        DefinitionCollection::Locations,
        &payload.locations,
    )
}

fn validate_save_paths(project_dir: &Path) -> Result<(), String> {
    ensure_real_directory(project_dir)?;
    validate_existing_file_or_absent(&project_dir.join("project.json"))?;
    validate_recovery_root(project_dir)?;
    for collection in [
        DefinitionCollection::Characters,
        DefinitionCollection::Locations,
    ] {
        let directory = project_dir.join(collection.directory_name());
        if path_exists(&directory)? {
            ensure_real_directory(&directory)?;
            canonical_collection_files(&directory, collection)?;
        }
    }
    Ok(())
}

fn write_collection(
    project_dir: &Path,
    collection: DefinitionCollection,
    definitions: &[Value],
) -> Result<(), String> {
    let directory = collection_directory(project_dir, collection, true)?
        .ok_or_else(|| "failed to create collection directory".to_owned())?;
    let expected_files = collection_filenames(collection, definitions)?;
    for (definition, filename) in definitions.iter().zip(&expected_files) {
        atomic_write_json_with_recovery(&directory.join(filename), definition, project_dir)?;
    }
    for stale_file in canonical_collection_files(&directory, collection)? {
        if !expected_files
            .iter()
            .any(|filename| filename == &stale_file)
        {
            let relative = Path::new(collection.directory_name()).join(&stale_file);
            move_to_recovery(&directory.join(&stale_file), project_dir, &relative)?;
        }
    }
    Ok(())
}

fn read_collection(
    project_dir: &Path,
    collection: DefinitionCollection,
) -> Result<Vec<Value>, String> {
    let Some(directory) = collection_directory(project_dir, collection, false)? else {
        return Ok(Vec::new());
    };
    let mut definitions = Vec::new();
    for filename in canonical_collection_files(&directory, collection)? {
        let definition = read_json(&directory.join(&filename))?;
        let id = definition_id(&definition)?;
        if definition_filename(id)? != filename {
            return Err(format!(
                "definition ID in {} does not match its filename",
                directory.join(&filename).display()
            ));
        }
        definitions.push(definition);
    }
    Ok(definitions)
}

fn collection_filenames(
    collection: DefinitionCollection,
    definitions: &[Value],
) -> Result<Vec<String>, String> {
    let mut filenames = Vec::with_capacity(definitions.len());
    let mut seen = HashSet::with_capacity(definitions.len());
    for definition in definitions {
        let id = definition_id(definition)?;
        if !id.starts_with(collection.id_prefix()) {
            return Err(format!(
                "definition ID {id:?} does not belong in {}",
                collection.directory_name()
            ));
        }
        let filename = definition_filename(id)?;
        if !seen.insert(filename.clone()) {
            return Err(format!("duplicate definition filename {filename:?}"));
        }
        filenames.push(filename);
    }
    Ok(filenames)
}

fn validate_payload(payload: &ProjectPayload) -> Result<(), String> {
    collection_filenames(DefinitionCollection::Characters, &payload.characters)?;
    collection_filenames(DefinitionCollection::Locations, &payload.locations)?;
    Ok(())
}

fn existing_project_directory(path: &str) -> Result<PathBuf, String> {
    let path = Path::new(path);
    ensure_real_directory(path)?;
    fs::canonicalize(path).map_err(io_error)
}

fn collection_directory(
    project_dir: &Path,
    collection: DefinitionCollection,
    create: bool,
) -> Result<Option<PathBuf>, String> {
    let directory = project_dir.join(collection.directory_name());
    if !path_exists(&directory)? {
        if !create {
            return Ok(None);
        }
        fs::create_dir(&directory).map_err(io_error)?;
    }
    ensure_real_directory(&directory)?;
    Ok(Some(directory))
}

fn canonical_collection_files(
    directory: &Path,
    collection: DefinitionCollection,
) -> Result<Vec<String>, String> {
    let mut filenames = Vec::new();
    for entry in fs::read_dir(directory).map_err(io_error)? {
        let entry = entry.map_err(io_error)?;
        let filename = entry
            .file_name()
            .into_string()
            .map_err(|_| format!("invalid filename encoding in {}", directory.display()))?;
        if !filename.ends_with(".json") {
            continue;
        }
        let path = entry.path();
        ensure_regular_file(&path)?;
        let Some(id) = filename.strip_suffix(".json") else {
            return Err(format!("invalid definition filename {filename:?}"));
        };
        if !id.starts_with(collection.id_prefix()) || definition_filename(id).is_err() {
            return Err(format!(
                "invalid {} definition filename {filename:?}",
                collection.directory_name()
            ));
        }
        let definition = read_json(&path)?;
        let definition_id = definition_id(&definition)?;
        if definition_id != id {
            return Err(format!(
                "definition ID in {} does not match its filename",
                path.display()
            ));
        }
        filenames.push(filename);
    }
    filenames.sort_unstable();
    Ok(filenames)
}

fn definition_id(definition: &Value) -> Result<&str, String> {
    let Some(id) = definition.get("id").and_then(Value::as_str) else {
        return Err("definition is missing a string id".to_owned());
    };
    definition_filename(id)?;
    Ok(id)
}

fn safe_folder_name(name: &str) -> Result<&str, String> {
    if name.is_empty()
        || name == "."
        || name == ".."
        || name.ends_with(['.', ' '])
        || name.bytes().any(|byte| {
            byte < 32
                || matches!(
                    byte,
                    b'<' | b'>' | b':' | b'"' | b'/' | b'\\' | b'|' | b'?' | b'*'
                )
        })
        || is_windows_reserved_name(name)
    {
        return Err("folder name must be one safe path segment".to_owned());
    }
    Ok(name)
}

fn is_windows_reserved_name(name: &str) -> bool {
    let stem = name
        .split('.')
        .next()
        .unwrap_or_default()
        .to_ascii_uppercase();
    matches!(stem.as_str(), "CON" | "PRN" | "AUX" | "NUL")
        || (stem.len() == 4
            && (stem.starts_with("COM") || stem.starts_with("LPT"))
            && matches!(stem.as_bytes()[3], b'1'..=b'9'))
}

fn definition_filename(id: &str) -> Result<String, String> {
    let segments: Vec<_> = id.split('.').collect();
    let first_is_valid = !segments.is_empty()
        && segments[0].bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || (index > 0 && (byte.is_ascii_digit() || byte == b'_'))
        });
    let rest_are_valid = segments.iter().skip(1).all(|segment| {
        !segment.is_empty()
            && segment.bytes().enumerate().all(|(index, byte)| {
                byte.is_ascii_lowercase()
                    || byte.is_ascii_digit()
                    || (index > 0 && matches!(byte, b'_' | b'-'))
            })
    });
    if segments.len() < 2 || !first_is_valid || !rest_are_valid {
        return Err("definition ID is not a safe namespaced identifier".to_owned());
    }
    Ok(format!("{id}.json"))
}

fn path_exists(path: &Path) -> Result<bool, String> {
    match fs::symlink_metadata(path) {
        Ok(_) => Ok(true),
        Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(false),
        Err(error) => Err(io_error(error)),
    }
}

fn validate_existing_file_or_absent(path: &Path) -> Result<(), String> {
    if path_exists(path)? {
        ensure_regular_file(path)?;
    }
    Ok(())
}

fn ensure_real_directory(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path).map_err(io_error)?;
    validate_path_kind(
        &path.display().to_string(),
        path_kind(&metadata),
        PathKind::Directory,
        metadata.file_type().is_symlink(),
        is_reparse_point(path)?,
    )
}

fn ensure_regular_file(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path).map_err(io_error)?;
    validate_path_kind(
        &path.display().to_string(),
        path_kind(&metadata),
        PathKind::File,
        metadata.file_type().is_symlink(),
        is_reparse_point(path)?,
    )
}

fn path_kind(metadata: &fs::Metadata) -> PathKind {
    if metadata.is_file() {
        PathKind::File
    } else if metadata.is_dir() {
        PathKind::Directory
    } else {
        PathKind::Other
    }
}

fn validate_path_kind(
    boundary: &str,
    actual: PathKind,
    expected: PathKind,
    is_link: bool,
    is_reparse: bool,
) -> Result<(), String> {
    if is_link || is_reparse || actual != expected {
        return Err(format!(
            "refusing link, reparse point, or unsafe path at {boundary}"
        ));
    }
    Ok(())
}

#[cfg(windows)]
fn is_reparse_point(path: &Path) -> Result<bool, String> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::{
        GetFileAttributesW, FILE_ATTRIBUTE_REPARSE_POINT, INVALID_FILE_ATTRIBUTES,
    };

    let wide = path
        .as_os_str()
        .encode_wide()
        .chain(Some(0))
        .collect::<Vec<u16>>();
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

fn validate_recovery_root(project_dir: &Path) -> Result<(), String> {
    let recovery_root = project_dir.join(RECOVERY_DIRECTORY);
    if path_exists(&recovery_root)? {
        ensure_real_directory(&recovery_root)?;
    }
    Ok(())
}

fn ensure_recovery_parent(project_dir: &Path, relative: &Path) -> Result<(), String> {
    let recovery_root = project_dir.join(RECOVERY_DIRECTORY);
    if !path_exists(&recovery_root)? {
        fs::create_dir(&recovery_root).map_err(io_error)?;
    }
    ensure_real_directory(&recovery_root)?;
    let Some(parent) = relative.parent() else {
        return Ok(());
    };
    let mut current = recovery_root;
    for component in parent.components() {
        let std::path::Component::Normal(component) = component else {
            return Err("recovery relative path must not traverse directories".to_owned());
        };
        current.push(component);
        if !path_exists(&current)? {
            fs::create_dir(&current).map_err(io_error)?;
        }
        ensure_real_directory(&current)?;
    }
    Ok(())
}

fn remove_regular_file(path: &Path) -> io::Result<()> {
    ensure_regular_file(path).map_err(io::Error::other)?;
    fs::remove_file(path)
}

#[cfg(test)]
fn atomic_write_json(target: &Path, value: &Value) -> Result<(), String> {
    let Some(recovery_root) = target.parent() else {
        return Err("JSON target must have a parent directory".to_owned());
    };
    atomic_write_json_with_recovery(target, value, recovery_root)
}

fn atomic_write_json_with_recovery(
    target: &Path,
    value: &Value,
    recovery_root: &Path,
) -> Result<(), String> {
    let parent = target
        .parent()
        .ok_or_else(|| "JSON target must have a parent directory".to_owned())?;
    let filename = target
        .file_name()
        .ok_or_else(|| "JSON target must have a filename".to_owned())?;
    let relative = target
        .strip_prefix(recovery_root)
        .map_err(|_| "JSON target escapes its project directory".to_owned())?;
    let backup = recovery_root
        .join(RECOVERY_DIRECTORY)
        .join(relative)
        .with_file_name(format!("{}.bak", filename.to_string_lossy()));
    ensure_real_directory(parent)?;
    validate_existing_file_or_absent(target)?;
    let bytes = serde_json::to_vec_pretty(value)
        .map_err(|error| format!("failed to serialize JSON: {error}"))?;
    let temp = write_synced_temp(parent, &bytes)?;
    let temp_path: &Path = temp.as_ref();
    if path_exists(target)? {
        ensure_recovery_parent(recovery_root, relative)?;
        validate_existing_file_or_absent(&backup)?;
        replace_existing(target, temp_path, &backup).map_err(io_error)?;
    } else {
        fs::rename(temp_path, target).map_err(io_error)?;
    }
    Ok(())
}

fn write_synced_temp(parent: &Path, bytes: &[u8]) -> Result<TempPath, String> {
    let mut temp = NamedTempFile::new_in(parent).map_err(io_error)?;
    temp.write_all(bytes).map_err(io_error)?;
    temp.write_all(b"\n").map_err(io_error)?;
    temp.as_file().sync_all().map_err(io_error)?;
    let temp = temp.into_temp_path();
    ensure_regular_file(temp.as_ref())?;
    Ok(temp)
}

fn replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    replace_existing_with(target, temp, backup, platform_replace_existing)
}

fn replace_existing_with<F>(
    target: &Path,
    temp: &Path,
    backup: &Path,
    operation: F,
) -> io::Result<()>
where
    F: FnOnce(&Path, &Path, &Path) -> io::Result<()>,
{
    let staged = stage_existing_recovery(backup)?;
    match operation(target, temp, backup) {
        Ok(()) => {
            if let Some(staged) = staged {
                remove_regular_file(&staged)?;
            }
            Ok(())
        }
        Err(error) => {
            if let Some(staged) = staged {
                restore_staged_recovery(&staged, backup)?;
            }
            Err(error)
        }
    }
}

fn restore_staged_recovery(staged: &Path, backup: &Path) -> io::Result<()> {
    match fs::symlink_metadata(backup) {
        Ok(_) => remove_regular_file(backup)?,
        Err(error) if error.kind() == io::ErrorKind::NotFound => {}
        Err(error) => return Err(error),
    }
    fs::rename(staged, backup)
}

fn stage_existing_recovery(backup: &Path) -> io::Result<Option<PathBuf>> {
    match fs::symlink_metadata(backup) {
        Err(error) if error.kind() == io::ErrorKind::NotFound => return Ok(None),
        Err(error) => return Err(error),
        Ok(_) => ensure_regular_file(backup).map_err(io::Error::other)?,
    }
    let parent = backup
        .parent()
        .ok_or_else(|| io::Error::other("recovery backup has no parent"))?;
    let staged = unique_sibling_path(parent)?;
    fs::rename(backup, &staged)?;
    Ok(Some(staged))
}

fn unique_sibling_path(parent: &Path) -> io::Result<PathBuf> {
    let temp = NamedTempFile::new_in(parent)?;
    let path = temp.path().to_path_buf();
    drop(temp);
    Ok(path)
}

#[cfg(windows)]
fn platform_replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::ReplaceFileW;

    let wide = |path: &Path| {
        path.as_os_str()
            .encode_wide()
            .chain(Some(0))
            .collect::<Vec<u16>>()
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
fn platform_replace_existing(target: &Path, temp: &Path, backup: &Path) -> io::Result<()> {
    let mut source = File::open(target)?;
    let mut recovery = OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(backup)?;
    io::copy(&mut source, &mut recovery)?;
    recovery.sync_all()?;
    fs::rename(temp, target)
}

fn move_to_recovery(source: &Path, project_dir: &Path, relative: &Path) -> Result<(), String> {
    let filename = relative
        .file_name()
        .ok_or_else(|| "stale definition must have a filename".to_owned())?;
    let backup = project_dir
        .join(RECOVERY_DIRECTORY)
        .join(relative)
        .with_file_name(format!("{}.bak", filename.to_string_lossy()));
    ensure_regular_file(source)?;
    ensure_recovery_parent(project_dir, relative)?;
    validate_existing_file_or_absent(&backup)?;
    move_to_recovery_with(source, &backup, |source, backup| fs::rename(source, backup))
        .map_err(io_error)
}

fn move_to_recovery_with<F>(source: &Path, backup: &Path, operation: F) -> io::Result<()>
where
    F: FnOnce(&Path, &Path) -> io::Result<()>,
{
    let staged = stage_existing_recovery(backup)?;
    match operation(source, backup) {
        Ok(()) => {
            if let Some(staged) = staged {
                remove_regular_file(&staged)?;
            }
            Ok(())
        }
        Err(error) => {
            if let Some(staged) = staged {
                restore_staged_recovery(&staged, backup)?;
            }
            Err(error)
        }
    }
}

fn read_json(path: &Path) -> Result<Value, String> {
    ensure_regular_file(path)?;
    let bytes =
        fs::read(path).map_err(|error| format!("failed to read {}: {error}", path.display()))?;
    serde_json::from_slice(&bytes)
        .map_err(|error| format!("invalid JSON in {}: {error}", path.display()))
}

fn io_error(error: io::Error) -> String {
    error.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::{json, Value};
    use std::fs;

    #[test]
    fn rejects_unsafe_folder_and_definition_ids() {
        assert!(safe_folder_name("../escape").is_err());
        assert!(safe_folder_name("nested/project").is_err());
        assert!(definition_filename("../../escape").is_err());
        assert!(definition_filename("character..alex").is_err());
        assert!(definition_filename("Character.alex").is_err());
        assert_eq!(
            definition_filename("character.alex").unwrap(),
            "character.alex.json"
        );
    }

    #[test]
    fn save_replaces_json_and_keeps_last_recovery_copy() {
        let temp = tempfile::tempdir().unwrap();
        let target = temp.path().join("project.json");
        atomic_write_json(&target, &json!({"version": 1})).unwrap();
        atomic_write_json(&target, &json!({"version": 2})).unwrap();
        let current: Value = serde_json::from_slice(&fs::read(&target).unwrap()).unwrap();
        assert_eq!(current["version"], 2);
        let recovery = temp.path().join(".aigs-recovery/project.json.bak");
        assert!(recovery.exists());
        let previous: Value = serde_json::from_slice(&fs::read(recovery).unwrap()).unwrap();
        assert_eq!(previous["version"], 1);
    }

    #[test]
    fn create_project_refuses_to_merge_with_non_empty_target() {
        let temp = tempfile::tempdir().unwrap();
        let target = temp.path().join("existing");
        fs::create_dir(&target).unwrap();
        fs::write(target.join("keep.txt"), b"do not overwrite").unwrap();
        let error = create_project(
            temp.path().display().to_string(),
            "existing".to_owned(),
            empty_payload(),
        )
        .unwrap_err();
        assert!(error.contains("non-empty"));
        assert!(target.join("keep.txt").exists());
    }

    #[test]
    fn save_moves_stale_definition_files_into_recovery() {
        let temp = tempfile::tempdir().unwrap();
        let project_dir = temp.path().join("project");
        let characters_dir = project_dir.join("characters");
        fs::create_dir_all(&characters_dir).unwrap();
        let stale = characters_dir.join("character.old.json");
        fs::write(&stale, br#"{"id":"character.old"}"#).unwrap();
        save_project(
            project_dir.display().to_string(),
            payload_with_character("character.new"),
        )
        .unwrap();
        assert!(!stale.exists());
        assert!(project_dir
            .join(".aigs-recovery/characters/character.old.json.bak")
            .exists());
        assert!(characters_dir.join("character.new.json").exists());
    }

    #[test]
    fn open_project_reports_malformed_canonical_json() {
        let temp = tempfile::tempdir().unwrap();
        fs::write(temp.path().join("project.json"), b"not json").unwrap();
        let error = open_project(temp.path().display().to_string()).unwrap_err();
        assert!(error.contains("project.json"));
        assert!(error.contains("invalid JSON"));
    }

    #[test]
    fn open_project_only_loads_slice_one_definition_directories() {
        let temp = tempfile::tempdir().unwrap();
        atomic_write_json(&temp.path().join("project.json"), &json!({"project": 1})).unwrap();
        fs::create_dir(temp.path().join("characters")).unwrap();
        atomic_write_json(
            &temp.path().join("characters/character.alex.json"),
            &json!({"id": "character.alex"}),
        )
        .unwrap();
        fs::create_dir(temp.path().join("world")).unwrap();
        fs::write(temp.path().join("world/not-a-definition.json"), b"not json").unwrap();
        let payload = open_project(temp.path().display().to_string()).unwrap();
        assert_eq!(payload.characters, vec![json!({"id": "character.alex"})]);
        assert!(payload.locations.is_empty());
    }

    #[test]
    fn atomic_save_does_not_follow_a_predictable_temp_collision() {
        let temp = tempfile::tempdir().unwrap();
        let target = temp.path().join("project.json");
        let collision = temp.path().join(".project.json.tmp");
        fs::write(&collision, b"must not be truncated").unwrap();

        atomic_write_json(&target, &json!({"version": 1})).unwrap();

        assert_eq!(fs::read(&collision).unwrap(), b"must not be truncated");
    }

    #[test]
    fn failed_replacement_restores_the_previous_recovery_copy() {
        let temp = tempfile::tempdir().unwrap();
        let target = temp.path().join("project.json");
        let replacement = temp.path().join("replacement.tmp");
        let backup = temp.path().join("project.json.bak");
        fs::write(&target, b"current").unwrap();
        fs::write(&replacement, b"replacement").unwrap();
        fs::write(&backup, b"last recovery").unwrap();

        let error = replace_existing_with(&target, &replacement, &backup, |_, _, _| {
            Err(io::Error::other("simulated replacement failure"))
        })
        .unwrap_err();

        assert_eq!(error.kind(), io::ErrorKind::Other);
        assert_eq!(fs::read(&backup).unwrap(), b"last recovery");
        assert_eq!(fs::read(&target).unwrap(), b"current");
    }

    #[test]
    fn failed_replacement_restores_recovery_after_a_partial_backup_write() {
        let temp = tempfile::tempdir().unwrap();
        let target = temp.path().join("project.json");
        let replacement = temp.path().join("replacement.tmp");
        let backup = temp.path().join("project.json.bak");
        fs::write(&target, b"current").unwrap();
        fs::write(&replacement, b"replacement").unwrap();
        fs::write(&backup, b"last recovery").unwrap();

        replace_existing_with(&target, &replacement, &backup, |_, _, backup| {
            fs::write(backup, b"partial backup")?;
            Err(io::Error::other("simulated copy failure"))
        })
        .unwrap_err();

        assert_eq!(fs::read(&backup).unwrap(), b"last recovery");
    }

    #[test]
    fn failed_stale_recovery_move_restores_the_previous_recovery_copy() {
        let temp = tempfile::tempdir().unwrap();
        let source = temp.path().join("character.old.json");
        let backup = temp.path().join("character.old.json.bak");
        fs::write(&source, b"stale definition").unwrap();
        fs::write(&backup, b"last recovery").unwrap();

        move_to_recovery_with(&source, &backup, |_, backup| {
            fs::write(backup, b"partial backup")?;
            Err(io::Error::other("simulated recovery move failure"))
        })
        .unwrap_err();

        assert_eq!(fs::read(&source).unwrap(), b"stale definition");
        assert_eq!(fs::read(&backup).unwrap(), b"last recovery");
    }

    #[test]
    fn rejects_link_and_reparse_metadata_at_all_persistence_boundaries() {
        for boundary in ["manifest", "definition", "recovery"] {
            assert!(
                validate_path_kind(boundary, PathKind::File, PathKind::File, true, false).is_err()
            );
            assert!(validate_path_kind(
                boundary,
                PathKind::Directory,
                PathKind::Directory,
                false,
                true
            )
            .is_err());
        }
    }

    #[test]
    fn open_rejects_invalid_json_filenames_and_contents() {
        let temp = tempfile::tempdir().unwrap();
        fs::write(temp.path().join("project.json"), br#"{"version":1}"#).unwrap();
        let characters = temp.path().join("characters");
        fs::create_dir(&characters).unwrap();
        fs::write(
            characters.join("location.hall.json"),
            br#"{"id":"location.hall"}"#,
        )
        .unwrap();

        let filename_error = open_project(temp.path().display().to_string()).unwrap_err();
        assert!(filename_error.contains("characters"));
        let save_error =
            save_project(temp.path().display().to_string(), empty_payload()).unwrap_err();
        assert!(save_error.contains("characters"));

        fs::remove_file(characters.join("location.hall.json")).unwrap();
        fs::create_dir(characters.join("character.alex.json")).unwrap();
        let file_type_error = open_project(temp.path().display().to_string()).unwrap_err();
        assert!(file_type_error.contains("unsafe path"));
        fs::remove_dir(characters.join("character.alex.json")).unwrap();
        fs::write(characters.join("character.alex.json"), b"not json").unwrap();
        let json_error = open_project(temp.path().display().to_string()).unwrap_err();
        assert!(json_error.contains("invalid JSON"));
    }

    #[test]
    fn save_rejects_duplicate_and_collection_mismatched_definitions() {
        let temp = tempfile::tempdir().unwrap();
        let duplicate = ProjectPayload {
            characters: vec![
                json!({"id":"character.alex"}),
                json!({"id":"character.alex"}),
            ],
            ..empty_payload()
        };
        let duplicate_error =
            save_project(temp.path().display().to_string(), duplicate).unwrap_err();
        assert!(duplicate_error.contains("duplicate"));

        let mismatched = ProjectPayload {
            locations: vec![json!({"id":"character.alex"})],
            ..empty_payload()
        };
        let mismatch_error =
            save_project(temp.path().display().to_string(), mismatched).unwrap_err();
        assert!(mismatch_error.contains("does not belong"));
    }

    #[test]
    fn project_payload_deserialization_rejects_unknown_top_level_fields() {
        let result = serde_json::from_value::<ProjectPayload>(json!({
            "manifest": {"schema_id": "aigs.project.manifest"},
            "characters": [],
            "locations": [],
            "unexpected": {"must_not": "be ignored"}
        }));

        assert!(result.is_err());
    }

    fn empty_payload() -> ProjectPayload {
        ProjectPayload {
            manifest: json!({"schema_id": "aigs.project.manifest"}),
            characters: vec![],
            locations: vec![],
        }
    }

    fn payload_with_character(id: &str) -> ProjectPayload {
        ProjectPayload {
            characters: vec![json!({"id": id})],
            ..empty_payload()
        }
    }
}
