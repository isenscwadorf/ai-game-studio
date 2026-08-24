use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

    const fn import_directory(self) -> &'static str {
        match self {
            Self::CharacterSprite => "characters",
            Self::LocationBackground => "locations",
        }
    }
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

fn is_safe_subject_id(subject_id: &str, expected_prefix: &str) -> bool {
    if !subject_id.starts_with(expected_prefix) {
        return false;
    }
    let mut segments = subject_id.split('.');
    let Some(first) = segments.next() else {
        return false;
    };
    if first.is_empty()
        || !first.bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || (index > 0 && (byte.is_ascii_digit() || byte == b'_'))
        })
    {
        return false;
    }
    let rest = segments.collect::<Vec<_>>();
    !rest.is_empty()
        && rest.iter().all(|segment| {
            !segment.is_empty()
                && segment.bytes().enumerate().all(|(index, byte)| {
                    byte.is_ascii_lowercase()
                        || byte.is_ascii_digit()
                        || (index > 0 && matches!(byte, b'_' | b'-'))
                })
        })
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_png_webp_and_jpeg_extensions_case_insensitively() {
        assert_eq!(
            classify_image_extension(Path::new("sprite.PNG")).unwrap(),
            ("png", "image/png")
        );
        assert_eq!(
            classify_image_extension(Path::new("sprite.webp")).unwrap(),
            ("webp", "image/webp")
        );
        assert_eq!(
            classify_image_extension(Path::new("sprite.JPG")).unwrap(),
            ("jpg", "image/jpeg")
        );
        assert_eq!(
            classify_image_extension(Path::new("sprite.jpeg")).unwrap(),
            ("jpeg", "image/jpeg")
        );
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
        assert_eq!(
            path,
            PathBuf::from("assets/imported/characters/character_maria-0123456789ab.png")
        );
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
        assert_eq!(
            path,
            PathBuf::from("assets/imported/locations/location_kitchen-fedcba987654.jpeg")
        );
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
}
