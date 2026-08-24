use std::{
    fs::{self},
    io::Write,
    path::{Component, Path, PathBuf},
};

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tempfile::NamedTempFile;

const RECOVERY_DIRECTORY: &str = ".aigs-recovery";
const ASSET_CATALOG_ID: &str = "asset_catalog.project";
const ASSET_CATALOG_RELATIVE_PATH: &str = "assets/catalogs/asset_catalog.project.json";

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub(crate) enum VisualKind {
    CharacterSprite,
    LocationBackground,
}

impl VisualKind {
    const fn subject_prefix(self) -> &'static str {
        match self {
            Self::CharacterSprite => "character.",
            Self::LocationBackground => "location.",
        }
    }

    const fn subject_directory(self) -> &'static str {
        match self {
            Self::CharacterSprite => "characters",
            Self::LocationBackground => "locations",
        }
    }

    const fn import_directory(self) -> &'static str {
        match self {
            Self::CharacterSprite => "characters",
            Self::LocationBackground => "locations",
        }
    }

    const fn asset_type(self) -> &'static str {
        match self {
            Self::CharacterSprite => "character_visual",
            Self::LocationBackground => "location_visual",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub(crate) enum SpriteFraming {
    FullBody,
    TwoThirds,
}

impl SpriteFraming {
    const fn as_str(self) -> &'static str {
        match self {
            Self::FullBody => "full_body",
            Self::TwoThirds => "two_thirds",
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ImportedVisualAsset {
    pub subject_id: String,
    pub visual_kind: VisualKind,
    pub project_path: String,
    pub content_sha256: String,
    pub mime_type: String,
    pub extension: String,
    pub asset_identity: Value,
    pub variant: Value,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub(crate) struct BinaryVisualAsset {
    pub bytes: Vec<u8>,
    pub mime_type: String,
}

pub(crate) fn classify_image_extension(path: &Path) -> Result<(&'static str, &'static str), String> {
    let extension = path
        .extension()
        .and_then(|value| value.to_str())
        .map(str::to_ascii_lowercase)
        .ok_or_else(|| "Imported visual must be a PNG, WebP, or JPEG image.".to_owned())?;
    match extension.as_str() {
        "png" => Ok(("png", "image/png")),
        "webp" => Ok(("webp", "image/webp")),
        "jpg" => Ok(("jpg", "image/jpeg")),
        "jpeg" => Ok(("jpeg", "image/jpeg")),
        _ => Err("Imported visual must be a PNG, WebP, or JPEG image.".to_owned()),
    }
}

fn verify_image_signature(bytes: &[u8], extension: &str) -> Result<(), String> {
    let valid = match extension {
        "png" => bytes.starts_with(&[0x89, b'P', b'N', b'G', 0x0d, 0x0a, 0x1a, 0x0a]),
        "webp" => bytes.len() >= 12 && &bytes[..4] == b"RIFF" && &bytes[8..12] == b"WEBP",
        "jpg" | "jpeg" => bytes.len() >= 3 && bytes[..3] == [0xff, 0xd8, 0xff],
        _ => false,
    };
    if valid {
        Ok(())
    } else {
        Err("Imported visual contents do not match the selected image format.".to_owned())
    }
}

fn is_safe_subject_id(subject_id: &str, expected_prefix: &str) -> bool {
    if !subject_id.starts_with(expected_prefix) {
        return false;
    }
    let segments = subject_id.split('.').collect::<Vec<_>>();
    if segments.len() < 2 {
        return false;
    }
    let first = segments[0];
    let first_valid = !first.is_empty()
        && first.bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || (index > 0 && (byte.is_ascii_digit() || byte == b'_'))
        });
    let rest_valid = segments.iter().skip(1).all(|segment| {
        !segment.is_empty()
            && segment.bytes().enumerate().all(|(index, byte)| {
                byte.is_ascii_lowercase()
                    || byte.is_ascii_digit()
                    || (index > 0 && matches!(byte, b'_' | b'-'))
            })
    });
    first_valid && rest_valid
}

pub(crate) fn project_relative_import_path(
    subject_id: &str,
    visual_kind: VisualKind,
    extension: &str,
    content_sha256: &str,
) -> Result<PathBuf, String> {
    if !is_safe_subject_id(subject_id, visual_kind.subject_prefix()) {
        return Err("Visual subject ID is not a safe identifier for this visual kind.".to_owned());
    }
    if !matches!(extension, "png" | "webp" | "jpg" | "jpeg") {
        return Err("Imported visual must use a PNG, WebP, or JPEG extension.".to_owned());
    }
    if content_sha256.len() != 64
        || !content_sha256
            .bytes()
            .all(|byte| byte.is_ascii_digit() || matches!(byte, b'a'..=b'f'))
    {
        return Err("Imported visual SHA-256 must be 64 lowercase hexadecimal characters.".to_owned());
    }
    let safe_subject = subject_id.replace('.', "_");
    let filename = format!("{safe_subject}-{}.{}", &content_sha256[..12], extension);
    Ok(PathBuf::from("assets")
        .join("imported")
        .join(visual_kind.import_directory())
        .join(filename))
}

fn project_path_string(path: &Path) -> Result<String, String> {
    let mut parts = Vec::new();
    for component in path.components() {
        let Component::Normal(value) = component else {
            return Err("Project-relative asset path contains an unsafe component.".to_owned());
        };
        parts.push(
            value
                .to_str()
                .ok_or_else(|| "Project-relative asset path is not valid UTF-8.".to_owned())?,
        );
    }
    Ok(parts.join("/"))
}

fn safe_project_relative_path(value: &str) -> Result<PathBuf, String> {
    if value.is_empty() || value.contains('\\') || value.starts_with('/') {
        return Err("Asset path must be a safe project-relative path.".to_owned());
    }
    let path = Path::new(value);
    if path.is_absolute() {
        return Err("Asset path must be project-relative.".to_owned());
    }
    for component in path.components() {
        if !matches!(component, Component::Normal(_)) {
            return Err("Asset path must not traverse directories.".to_owned());
        }
    }
    let normalized = project_path_string(path)?;
    if !normalized.starts_with("assets/imported/characters/")
        && !normalized.starts_with("assets/imported/locations/")
    {
        return Err("Asset path is outside the imported visual directories.".to_owned());
    }
    Ok(path.to_path_buf())
}

fn ensure_real_directory(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path)
        .map_err(|error| format!("failed to inspect {}: {error}", path.display()))?;
    if !metadata.is_dir() || metadata.file_type().is_symlink() || is_reparse_point(path)? {
        return Err(format!("refusing link, reparse point, or unsafe directory at {}", path.display()));
    }
    Ok(())
}

fn ensure_regular_file(path: &Path) -> Result<(), String> {
    let metadata = fs::symlink_metadata(path)
        .map_err(|error| format!("failed to inspect {}: {error}", path.display()))?;
    if !metadata.is_file() || metadata.file_type().is_symlink() || is_reparse_point(path)? {
        return Err(format!("refusing link, reparse point, or unsafe file at {}", path.display()));
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
        return Err(std::io::Error::last_os_error().to_string());
    }
    Ok(attributes & FILE_ATTRIBUTE_REPARSE_POINT != 0)
}

#[cfg(not(windows))]
fn is_reparse_point(_: &Path) -> Result<bool, String> {
    Ok(false)
}

fn existing_project_root(project_root: &str) -> Result<PathBuf, String> {
    let root = Path::new(project_root);
    ensure_real_directory(root)?;
    fs::canonicalize(root).map_err(|error| format!("failed to resolve project root: {error}"))
}

fn ensure_project_directory(root: &Path, relative: &Path) -> Result<PathBuf, String> {
    let mut current = root.to_path_buf();
    for component in relative.components() {
        let Component::Normal(segment) = component else {
            return Err("Project directory path contains an unsafe component.".to_owned());
        };
        current.push(segment);
        match fs::symlink_metadata(&current) {
            Ok(_) => ensure_real_directory(&current)?,
            Err(error) if error.kind() == std::io::ErrorKind::NotFound => {
                fs::create_dir(&current)
                    .map_err(|error| format!("failed to create {}: {error}", current.display()))?;
                ensure_real_directory(&current)?;
            }
            Err(error) => return Err(error.to_string()),
        }
    }
    Ok(current)
}

fn ensure_parent_directory(root: &Path, relative_file: &Path) -> Result<PathBuf, String> {
    let parent = relative_file
        .parent()
        .ok_or_else(|| "Project-relative file must have a parent directory.".to_owned())?;
    ensure_project_directory(root, parent)
}

fn read_json(path: &Path) -> Result<Value, String> {
    ensure_regular_file(path)?;
    let bytes = fs::read(path).map_err(|error| format!("failed to read {}: {error}", path.display()))?;
    serde_json::from_slice(&bytes).map_err(|error| format!("invalid JSON in {}: {error}", path.display()))
}

fn read_json_if_exists(path: &Path) -> Result<Option<Value>, String> {
    match fs::symlink_metadata(path) {
        Ok(_) => read_json(path).map(Some),
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(error) => Err(error.to_string()),
    }
}

fn recovery_path(root: &Path, relative: &Path) -> Result<PathBuf, String> {
    let filename = relative
        .file_name()
        .ok_or_else(|| "Recovery source must have a filename.".to_owned())?;
    let mut backup_relative = PathBuf::from(RECOVERY_DIRECTORY).join(relative);
    backup_relative.set_file_name(format!("{}.bak", filename.to_string_lossy()));
    Ok(root.join(backup_relative))
}

fn write_bytes_with_recovery(root: &Path, relative: &Path, bytes: &[u8]) -> Result<(), String> {
    let parent = ensure_parent_directory(root, relative)?;
    let target = root.join(relative);
    let mut temp = NamedTempFile::new_in(&parent).map_err(|error| error.to_string())?;
    temp.write_all(bytes).map_err(|error| error.to_string())?;
    temp.as_file().sync_all().map_err(|error| error.to_string())?;
    let temp_path = temp.into_temp_path();

    let target_exists = match fs::symlink_metadata(&target) {
        Ok(_) => {
            ensure_regular_file(&target)?;
            true
        }
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => false,
        Err(error) => return Err(error.to_string()),
    };
    if !target_exists {
        fs::rename(&temp_path, &target).map_err(|error| error.to_string())?;
        return Ok(());
    }

    let backup = recovery_path(root, relative)?;
    let backup_relative = backup
        .strip_prefix(root)
        .map_err(|_| "Recovery path escaped the project root.".to_owned())?;
    ensure_parent_directory(root, backup_relative)?;
    if fs::symlink_metadata(&backup).is_ok() {
        ensure_regular_file(&backup)?;
        fs::remove_file(&backup).map_err(|error| error.to_string())?;
    }
    fs::rename(&target, &backup).map_err(|error| error.to_string())?;
    if let Err(error) = fs::rename(&temp_path, &target) {
        let _ = fs::rename(&backup, &target);
        return Err(error.to_string());
    }
    Ok(())
}

fn write_json_with_recovery(root: &Path, relative: &Path, value: &Value) -> Result<(), String> {
    let mut bytes = serde_json::to_vec_pretty(value).map_err(|error| error.to_string())?;
    bytes.push(b'\n');
    write_bytes_with_recovery(root, relative, &bytes)
}

fn move_file_to_recovery(root: &Path, relative: &Path) -> Result<(), String> {
    let source = root.join(relative);
    match fs::symlink_metadata(&source) {
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => return Ok(()),
        Err(error) => return Err(error.to_string()),
        Ok(_) => ensure_regular_file(&source)?,
    }
    let backup = recovery_path(root, relative)?;
    let backup_relative = backup
        .strip_prefix(root)
        .map_err(|_| "Recovery path escaped the project root.".to_owned())?;
    ensure_parent_directory(root, backup_relative)?;
    if fs::symlink_metadata(&backup).is_ok() {
        ensure_regular_file(&backup)?;
        fs::remove_file(&backup).map_err(|error| error.to_string())?;
    }
    fs::rename(source, backup).map_err(|error| error.to_string())
}

fn sha256_hex(bytes: &[u8]) -> String {
    const H0: [u32; 8] = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ];
    const K: [u32; 64] = [
        0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
        0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
        0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
        0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
        0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
        0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
        0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
        0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2,
    ];
    let bit_len = (bytes.len() as u64).wrapping_mul(8);
    let mut message = bytes.to_vec();
    message.push(0x80);
    while message.len() % 64 != 56 {
        message.push(0);
    }
    message.extend_from_slice(&bit_len.to_be_bytes());

    let mut hash = H0;
    for chunk in message.chunks_exact(64) {
        let mut w = [0u32; 64];
        for (index, word) in w.iter_mut().take(16).enumerate() {
            let offset = index * 4;
            *word = u32::from_be_bytes(chunk[offset..offset + 4].try_into().expect("four-byte word"));
        }
        for index in 16..64 {
            let s0 = w[index - 15].rotate_right(7) ^ w[index - 15].rotate_right(18) ^ (w[index - 15] >> 3);
            let s1 = w[index - 2].rotate_right(17) ^ w[index - 2].rotate_right(19) ^ (w[index - 2] >> 10);
            w[index] = w[index - 16]
                .wrapping_add(s0)
                .wrapping_add(w[index - 7])
                .wrapping_add(s1);
        }
        let [mut a, mut b, mut c, mut d, mut e, mut f, mut g, mut h] = hash;
        for index in 0..64 {
            let s1 = e.rotate_right(6) ^ e.rotate_right(11) ^ e.rotate_right(25);
            let ch = (e & f) ^ ((!e) & g);
            let temp1 = h
                .wrapping_add(s1)
                .wrapping_add(ch)
                .wrapping_add(K[index])
                .wrapping_add(w[index]);
            let s0 = a.rotate_right(2) ^ a.rotate_right(13) ^ a.rotate_right(22);
            let maj = (a & b) ^ (a & c) ^ (b & c);
            let temp2 = s0.wrapping_add(maj);
            h = g;
            g = f;
            f = e;
            e = d.wrapping_add(temp1);
            d = c;
            c = b;
            b = a;
            a = temp1.wrapping_add(temp2);
        }
        hash[0] = hash[0].wrapping_add(a);
        hash[1] = hash[1].wrapping_add(b);
        hash[2] = hash[2].wrapping_add(c);
        hash[3] = hash[3].wrapping_add(d);
        hash[4] = hash[4].wrapping_add(e);
        hash[5] = hash[5].wrapping_add(f);
        hash[6] = hash[6].wrapping_add(g);
        hash[7] = hash[7].wrapping_add(h);
    }
    hash.iter().map(|word| format!("{word:08x}")).collect()
}

fn identity_id(subject_id: &str) -> String {
    format!("asset_identity.{}", subject_id.replace('.', "_"))
}

fn variant_id(subject_id: &str, content_sha256: &str) -> String {
    format!("asset_variant.{}.{}", subject_id.replace('.', "_"), &content_sha256[..12])
}

fn identity_relative_path(identity_id: &str) -> PathBuf {
    PathBuf::from("assets/identities").join(format!("{identity_id}.json"))
}

fn variant_relative_path(variant_id: &str) -> PathBuf {
    PathBuf::from("assets/variants").join(format!("{variant_id}.json"))
}

fn subject_relative_path(subject_id: &str, visual_kind: VisualKind) -> Result<PathBuf, String> {
    if !is_safe_subject_id(subject_id, visual_kind.subject_prefix()) {
        return Err("Visual subject ID is not a safe identifier for this visual kind.".to_owned());
    }
    Ok(PathBuf::from(visual_kind.subject_directory()).join(format!("{subject_id}.json")))
}

fn ensure_definition_ref(list: &mut Vec<Value>, definition_id: &str) {
    if !list.iter().any(|item| item.get("ref").and_then(Value::as_str) == Some(definition_id)) {
        list.push(json!({"ref": definition_id}));
    }
}

fn ensure_variant_ref(list: &mut Vec<Value>, variant_id: &str) {
    if !list.iter().any(|item| item.get("variant_id").and_then(Value::as_str) == Some(variant_id)) {
        list.push(json!({"variant_id": variant_id}));
    }
}

fn load_or_create_catalog(root: &Path) -> Result<Value, String> {
    let path = root.join(ASSET_CATALOG_RELATIVE_PATH);
    if let Some(value) = read_json_if_exists(&path)? {
        return Ok(value);
    }
    Ok(json!({
        "schema_id": "aigs.asset_catalog.definition",
        "schema_version": 1,
        "id": ASSET_CATALOG_ID,
        "kind": "asset_catalog",
        "display_name": "Project Assets",
        "identity_refs": [],
        "variant_refs": []
    }))
}

fn catalog_refs_mut<'a>(catalog: &'a mut Value, key: &str) -> Result<&'a mut Vec<Value>, String> {
    catalog
        .get_mut(key)
        .and_then(Value::as_array_mut)
        .ok_or_else(|| format!("Asset catalog {key} must be an array."))
}

fn supersede_previous_variants(
    root: &Path,
    catalog: &Value,
    asset_identity_id: &str,
    active_variant_id: &str,
) -> Result<(), String> {
    let refs = catalog
        .get("variant_refs")
        .and_then(Value::as_array)
        .ok_or_else(|| "Asset catalog variant_refs must be an array.".to_owned())?;
    for variant_ref in refs {
        let Some(existing_id) = variant_ref.get("variant_id").and_then(Value::as_str) else {
            return Err("Asset catalog contains an invalid variant reference.".to_owned());
        };
        if existing_id == active_variant_id {
            continue;
        }
        let relative = variant_relative_path(existing_id);
        let Some(mut variant) = read_json_if_exists(&root.join(&relative))? else {
            continue;
        };
        let matches_identity = variant
            .pointer("/asset_identity_ref/ref")
            .and_then(Value::as_str)
            == Some(asset_identity_id);
        if matches_identity && variant.get("status").and_then(Value::as_str) == Some("active") {
            variant["status"] = Value::String("superseded".to_owned());
            write_json_with_recovery(root, &relative, &variant)?;
        }
    }
    Ok(())
}

fn update_subject_and_manifest(
    root: &Path,
    subject_id: &str,
    visual_kind: VisualKind,
    asset_identity_id: &str,
) -> Result<(), String> {
    let subject_relative = subject_relative_path(subject_id, visual_kind)?;
    let mut subject = read_json(&root.join(&subject_relative))?;
    if subject.get("id").and_then(Value::as_str) != Some(subject_id) {
        return Err("Visual subject file does not match the requested subject ID.".to_owned());
    }
    subject["visual_identity_ref"] = json!({"ref": asset_identity_id});

    let mut manifest = read_json(&root.join("project.json"))?;
    manifest["asset_catalog_ref"] = json!({"ref": ASSET_CATALOG_ID});
    let roots = manifest
        .get_mut("definition_roots")
        .and_then(Value::as_array_mut)
        .ok_or_else(|| "Project manifest definition_roots must be an array.".to_owned())?;
    for required_root in ["assets/identities", "assets/catalogs"] {
        if !roots.iter().any(|value| value.as_str() == Some(required_root)) {
            roots.push(Value::String(required_root.to_owned()));
        }
    }

    write_json_with_recovery(root, &subject_relative, &subject)?;
    write_json_with_recovery(root, Path::new("project.json"), &manifest)
}

fn imported_visual_from_values(
    subject_id: &str,
    visual_kind: VisualKind,
    asset_identity: Value,
    variant: Value,
) -> Result<ImportedVisualAsset, String> {
    let project_path = variant
        .pointer("/storage/project_path")
        .and_then(Value::as_str)
        .ok_or_else(|| "Asset variant is missing storage.project_path.".to_owned())?;
    let content_sha256 = variant
        .pointer("/storage/content_sha256")
        .and_then(Value::as_str)
        .ok_or_else(|| "Asset variant is missing storage.content_sha256.".to_owned())?;
    let (extension, mime_type) = classify_image_extension(Path::new(project_path))?;
    Ok(ImportedVisualAsset {
        subject_id: subject_id.to_owned(),
        visual_kind,
        project_path: project_path.to_owned(),
        content_sha256: content_sha256.to_owned(),
        mime_type: mime_type.to_owned(),
        extension: extension.to_owned(),
        asset_identity,
        variant,
    })
}

#[tauri::command]
pub(crate) fn import_visual_asset(
    project_root: String,
    source_path: String,
    subject_id: String,
    visual_kind: VisualKind,
    sprite_framing: Option<SpriteFraming>,
) -> Result<ImportedVisualAsset, String> {
    if matches!(visual_kind, VisualKind::CharacterSprite) && sprite_framing.is_none() {
        return Err("Character sprite import requires sprite framing.".to_owned());
    }
    if matches!(visual_kind, VisualKind::LocationBackground) && sprite_framing.is_some() {
        return Err("Location background import must not include sprite framing.".to_owned());
    }
    subject_relative_path(&subject_id, visual_kind)?;
    let root = existing_project_root(&project_root)?;
    let source = Path::new(&source_path);
    ensure_regular_file(source)?;
    let (extension, _) = classify_image_extension(source)?;
    let bytes = fs::read(source).map_err(|error| format!("failed to read imported visual: {error}"))?;
    verify_image_signature(&bytes, extension)?;
    let content_sha256 = sha256_hex(&bytes);
    let relative = project_relative_import_path(&subject_id, visual_kind, extension, &content_sha256)?;
    write_bytes_with_recovery(&root, &relative, &bytes)?;

    let asset_identity_id = identity_id(&subject_id);
    let active_variant_id = variant_id(&subject_id, &content_sha256);
    let subject = read_json(&root.join(subject_relative_path(&subject_id, visual_kind)?))?;
    let display_name = subject
        .get("display_name")
        .and_then(Value::as_str)
        .unwrap_or(&subject_id);
    let asset_identity = json!({
        "schema_id": "aigs.asset_identity.definition",
        "schema_version": 1,
        "id": asset_identity_id,
        "kind": "asset_identity",
        "display_name": format!("{display_name} Visual"),
        "subject_ref": {"ref": subject_id},
        "asset_type": visual_kind.asset_type(),
        "canonical_profile": {},
        "variant_specs": [{"id": "imported.default", "tags": ["imported"]}]
    });
    let mut variant = json!({
        "schema_id": "aigs.asset_variant.record",
        "schema_version": 1,
        "variant_id": active_variant_id,
        "asset_identity_ref": {"ref": asset_identity_id},
        "variant_spec_id": "imported.default",
        "storage": {
            "project_path": project_path_string(&relative)?,
            "content_sha256": content_sha256
        },
        "generation_record_ref": null,
        "status": "active"
    });
    if let Some(framing) = sprite_framing {
        variant["presentation"] = json!({"sprite_framing": framing.as_str()});
    }

    let mut catalog = load_or_create_catalog(&root)?;
    ensure_definition_ref(catalog_refs_mut(&mut catalog, "identity_refs")?, &asset_identity_id);
    supersede_previous_variants(&root, &catalog, &asset_identity_id, &active_variant_id)?;
    ensure_variant_ref(catalog_refs_mut(&mut catalog, "variant_refs")?, &active_variant_id);

    write_json_with_recovery(&root, &identity_relative_path(&asset_identity_id), &asset_identity)?;
    write_json_with_recovery(&root, &variant_relative_path(&active_variant_id), &variant)?;
    write_json_with_recovery(&root, Path::new(ASSET_CATALOG_RELATIVE_PATH), &catalog)?;
    update_subject_and_manifest(&root, &subject_id, visual_kind, &asset_identity_id)?;

    imported_visual_from_values(&subject_id, visual_kind, asset_identity, variant)
}

#[tauri::command]
pub(crate) fn resolve_visual_asset(
    project_root: String,
    subject_id: String,
    visual_kind: VisualKind,
) -> Result<Option<ImportedVisualAsset>, String> {
    if !is_safe_subject_id(&subject_id, visual_kind.subject_prefix()) {
        return Err("Visual subject ID is not valid for this visual kind.".to_owned());
    }
    let root = existing_project_root(&project_root)?;
    let asset_identity_id = identity_id(&subject_id);
    let identity_relative = identity_relative_path(&asset_identity_id);
    let Some(asset_identity) = read_json_if_exists(&root.join(identity_relative))? else {
        return Ok(None);
    };
    if asset_identity.pointer("/subject_ref/ref").and_then(Value::as_str) != Some(&subject_id) {
        return Err("Asset identity subject reference does not match the requested subject.".to_owned());
    }
    let variants_dir = root.join("assets/variants");
    match fs::symlink_metadata(&variants_dir) {
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => return Ok(None),
        Err(error) => return Err(error.to_string()),
        Ok(_) => ensure_real_directory(&variants_dir)?,
    }
    let mut active: Option<Value> = None;
    for entry in fs::read_dir(&variants_dir).map_err(|error| error.to_string())? {
        let entry = entry.map_err(|error| error.to_string())?;
        let path = entry.path();
        if path.extension().and_then(|value| value.to_str()) != Some("json") {
            continue;
        }
        let variant = read_json(&path)?;
        if variant.pointer("/asset_identity_ref/ref").and_then(Value::as_str) == Some(&asset_identity_id)
            && variant.get("status").and_then(Value::as_str) == Some("active")
        {
            if active.is_some() {
                return Err("Asset identity has more than one active variant.".to_owned());
            }
            active = Some(variant);
        }
    }
    active
        .map(|variant| imported_visual_from_values(&subject_id, visual_kind, asset_identity, variant))
        .transpose()
}

#[tauri::command]
pub(crate) fn read_visual_asset(
    project_root: String,
    project_path: String,
) -> Result<BinaryVisualAsset, String> {
    let root = existing_project_root(&project_root)?;
    let relative = safe_project_relative_path(&project_path)?;
    let target = root.join(&relative);
    ensure_regular_file(&target)?;
    let (_, mime_type) = classify_image_extension(&target)?;
    Ok(BinaryVisualAsset {
        bytes: fs::read(target).map_err(|error| error.to_string())?,
        mime_type: mime_type.to_owned(),
    })
}

#[tauri::command]
pub(crate) fn remove_visual_asset(
    project_root: String,
    subject_id: String,
    visual_kind: VisualKind,
) -> Result<(), String> {
    let root = existing_project_root(&project_root)?;
    let subject_relative = subject_relative_path(&subject_id, visual_kind)?;
    let mut subject = read_json(&root.join(&subject_relative))?;
    let asset_identity_id = identity_id(&subject_id);
    if subject.pointer("/visual_identity_ref/ref").and_then(Value::as_str) == Some(&asset_identity_id) {
        subject
            .as_object_mut()
            .ok_or_else(|| "Visual subject must be an object.".to_owned())?
            .remove("visual_identity_ref");
        write_json_with_recovery(&root, &subject_relative, &subject)?;
    }

    let variants_dir = root.join("assets/variants");
    if fs::symlink_metadata(&variants_dir).is_ok() {
        ensure_real_directory(&variants_dir)?;
        for entry in fs::read_dir(&variants_dir).map_err(|error| error.to_string())? {
            let entry = entry.map_err(|error| error.to_string())?;
            let path = entry.path();
            if path.extension().and_then(|value| value.to_str()) != Some("json") {
                continue;
            }
            let mut variant = read_json(&path)?;
            if variant.pointer("/asset_identity_ref/ref").and_then(Value::as_str) != Some(&asset_identity_id)
                || variant.get("status").and_then(Value::as_str) != Some("active")
            {
                continue;
            }
            if let Some(project_path) = variant.pointer("/storage/project_path").and_then(Value::as_str) {
                let relative = safe_project_relative_path(project_path)?;
                move_file_to_recovery(&root, &relative)?;
            }
            variant["status"] = Value::String("rejected".to_owned());
            let relative = path
                .strip_prefix(&root)
                .map_err(|_| "Variant metadata escaped project root.".to_owned())?;
            write_json_with_recovery(&root, relative, &variant)?;
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    const PNG_BYTES: &[u8] = &[0x89, b'P', b'N', b'G', 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4];
    const JPEG_BYTES: &[u8] = &[0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4];
    const WEBP_BYTES: &[u8] = b"RIFF\x04\x00\x00\x00WEBPdata";

    fn make_project(root: &Path) {
        fs::create_dir(root.join("characters")).unwrap();
        fs::create_dir(root.join("locations")).unwrap();
        fs::write(
            root.join("project.json"),
            serde_json::to_vec_pretty(&json!({
                "schema_id": "aigs.project.manifest",
                "schema_version": 1,
                "project_id": "project.asset_test",
                "display_name": "Asset Test",
                "project_format_version": 1,
                "definition_roots": ["characters", "locations"]
            }))
            .unwrap(),
        )
        .unwrap();
        fs::write(
            root.join("characters/character.maria.json"),
            serde_json::to_vec_pretty(&json!({
                "schema_id": "aigs.character.definition",
                "schema_version": 1,
                "id": "character.maria",
                "kind": "character",
                "display_name": "Maria",
                "persona": {}
            }))
            .unwrap(),
        )
        .unwrap();
        fs::write(
            root.join("locations/location.kitchen.json"),
            serde_json::to_vec_pretty(&json!({
                "schema_id": "aigs.location.definition",
                "schema_version": 1,
                "id": "location.kitchen",
                "kind": "location",
                "display_name": "Kitchen"
            }))
            .unwrap(),
        )
        .unwrap();
    }

    #[test]
    fn accepts_png_webp_and_jpeg_extensions_case_insensitively() {
        assert_eq!(classify_image_extension(Path::new("sprite.PNG")).unwrap(), ("png", "image/png"));
        assert_eq!(classify_image_extension(Path::new("sprite.webp")).unwrap(), ("webp", "image/webp"));
        assert_eq!(classify_image_extension(Path::new("sprite.JPG")).unwrap(), ("jpg", "image/jpeg"));
        assert_eq!(classify_image_extension(Path::new("sprite.jpeg")).unwrap(), ("jpeg", "image/jpeg"));
    }

    #[test]
    fn rejects_unsupported_extensions() {
        let error = classify_image_extension(Path::new("sprite.gif")).unwrap_err();
        assert!(error.contains("PNG, WebP, or JPEG"));
    }

    #[test]
    fn derives_character_destination_under_project_assets() {
        let path = project_relative_import_path(
            "character.maria",
            VisualKind::CharacterSprite,
            "png",
            "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        )
        .unwrap();
        assert_eq!(path, PathBuf::from("assets/imported/characters/character_maria-0123456789ab.png"));
    }

    #[test]
    fn derives_location_destination_under_project_assets() {
        let path = project_relative_import_path(
            "location.kitchen",
            VisualKind::LocationBackground,
            "jpeg",
            "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
        )
        .unwrap();
        assert_eq!(path, PathBuf::from("assets/imported/locations/location_kitchen-fedcba987654.jpeg"));
    }

    #[test]
    fn rejects_subject_ids_that_do_not_match_the_visual_kind() {
        assert!(project_relative_import_path(
            "location.kitchen",
            VisualKind::CharacterSprite,
            "png",
            "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        )
        .is_err());
        assert!(project_relative_import_path(
            "../character.maria",
            VisualKind::CharacterSprite,
            "png",
            "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        )
        .is_err());
    }

    #[test]
    fn sha256_matches_known_vector() {
        assert_eq!(
            sha256_hex(b"abc"),
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        );
    }

    #[test]
    fn import_copies_external_source_hashes_and_persists_only_project_relative_path() {
        let project = tempfile::tempdir().unwrap();
        let source_dir = tempfile::tempdir().unwrap();
        make_project(project.path());
        let source = source_dir.path().join("maria.PNG");
        fs::write(&source, PNG_BYTES).unwrap();

        let imported = import_visual_asset(
            project.path().display().to_string(),
            source.display().to_string(),
            "character.maria".to_owned(),
            VisualKind::CharacterSprite,
            Some(SpriteFraming::TwoThirds),
        )
        .unwrap();

        assert_eq!(imported.content_sha256, sha256_hex(PNG_BYTES));
        assert!(imported.project_path.starts_with("assets/imported/characters/"));
        assert!(!imported.project_path.contains(&source_dir.path().display().to_string()));
        assert_eq!(fs::read(project.path().join(&imported.project_path)).unwrap(), PNG_BYTES);
        assert_eq!(imported.variant.pointer("/presentation/sprite_framing").and_then(Value::as_str), Some("two_thirds"));
        let subject = read_json(&project.path().join("characters/character.maria.json")).unwrap();
        assert_eq!(subject.pointer("/visual_identity_ref/ref").and_then(Value::as_str), Some("asset_identity.character_maria"));
        let persisted = fs::read_to_string(project.path().join("assets/variants").join(format!("{}.json", imported.variant["variant_id"].as_str().unwrap()))).unwrap();
        assert!(!persisted.contains(&source.display().to_string()));
    }

    #[test]
    fn import_accepts_webp_and_jpeg_and_rejects_mismatched_contents() {
        let project = tempfile::tempdir().unwrap();
        let source_dir = tempfile::tempdir().unwrap();
        make_project(project.path());
        let webp = source_dir.path().join("kitchen.webp");
        fs::write(&webp, WEBP_BYTES).unwrap();
        let imported = import_visual_asset(
            project.path().display().to_string(), webp.display().to_string(),
            "location.kitchen".to_owned(), VisualKind::LocationBackground, None,
        ).unwrap();
        assert_eq!(imported.mime_type, "image/webp");

        let jpeg = source_dir.path().join("kitchen.jpg");
        fs::write(&jpeg, JPEG_BYTES).unwrap();
        let imported = import_visual_asset(
            project.path().display().to_string(), jpeg.display().to_string(),
            "location.kitchen".to_owned(), VisualKind::LocationBackground, None,
        ).unwrap();
        assert_eq!(imported.mime_type, "image/jpeg");

        let fake = source_dir.path().join("fake.png");
        fs::write(&fake, b"not a png").unwrap();
        assert!(import_visual_asset(
            project.path().display().to_string(), fake.display().to_string(),
            "character.maria".to_owned(), VisualKind::CharacterSprite, Some(SpriteFraming::FullBody),
        ).unwrap_err().contains("contents"));
    }

    #[test]
    fn replacement_supersedes_only_same_identity_and_preserves_unrelated_active_variant() {
        let project = tempfile::tempdir().unwrap();
        let source_dir = tempfile::tempdir().unwrap();
        make_project(project.path());
        let first = source_dir.path().join("first.png");
        let second = source_dir.path().join("second.png");
        let location = source_dir.path().join("location.webp");
        fs::write(&first, PNG_BYTES).unwrap();
        let mut second_bytes = PNG_BYTES.to_vec(); second_bytes.push(9);
        fs::write(&second, &second_bytes).unwrap();
        fs::write(&location, WEBP_BYTES).unwrap();

        let first_import = import_visual_asset(
            project.path().display().to_string(), first.display().to_string(),
            "character.maria".to_owned(), VisualKind::CharacterSprite, Some(SpriteFraming::FullBody),
        ).unwrap();
        let location_import = import_visual_asset(
            project.path().display().to_string(), location.display().to_string(),
            "location.kitchen".to_owned(), VisualKind::LocationBackground, None,
        ).unwrap();
        let second_import = import_visual_asset(
            project.path().display().to_string(), second.display().to_string(),
            "character.maria".to_owned(), VisualKind::CharacterSprite, Some(SpriteFraming::TwoThirds),
        ).unwrap();

        let old = read_json(&project.path().join(variant_relative_path(first_import.variant["variant_id"].as_str().unwrap()))).unwrap();
        let unrelated = read_json(&project.path().join(variant_relative_path(location_import.variant["variant_id"].as_str().unwrap()))).unwrap();
        assert_eq!(old["status"], "superseded");
        assert_eq!(unrelated["status"], "active");
        assert_eq!(second_import.variant["status"], "active");
    }

    #[test]
    fn remove_clears_subject_reference_rejects_active_variant_and_recovers_binary() {
        let project = tempfile::tempdir().unwrap();
        let source_dir = tempfile::tempdir().unwrap();
        make_project(project.path());
        let source = source_dir.path().join("maria.png");
        fs::write(&source, PNG_BYTES).unwrap();
        let imported = import_visual_asset(
            project.path().display().to_string(), source.display().to_string(),
            "character.maria".to_owned(), VisualKind::CharacterSprite, Some(SpriteFraming::FullBody),
        ).unwrap();

        remove_visual_asset(
            project.path().display().to_string(), "character.maria".to_owned(), VisualKind::CharacterSprite,
        ).unwrap();

        let subject = read_json(&project.path().join("characters/character.maria.json")).unwrap();
        assert!(subject.get("visual_identity_ref").is_none());
        let variant_id = imported.variant["variant_id"].as_str().unwrap();
        let variant = read_json(&project.path().join(variant_relative_path(variant_id))).unwrap();
        assert_eq!(variant["status"], "rejected");
        assert!(!project.path().join(&imported.project_path).exists());
        assert!(recovery_path(project.path(), Path::new(&imported.project_path)).unwrap().exists());
    }

    #[test]
    fn read_visual_asset_rejects_paths_outside_import_roots() {
        let project = tempfile::tempdir().unwrap();
        make_project(project.path());
        assert!(read_visual_asset(
            project.path().display().to_string(), "../project.json".to_owned()
        ).is_err());
        assert!(read_visual_asset(
            project.path().display().to_string(), project.path().join("project.json").display().to_string()
        ).is_err());
    }
}
