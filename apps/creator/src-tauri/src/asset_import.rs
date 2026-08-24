use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum VisualKind {
    CharacterSprite,
    LocationBackground,
}

pub(crate) fn classify_image_extension(_path: &Path) -> Result<(&'static str, &'static str), String> {
    Err("not implemented".to_owned())
}

pub(crate) fn project_relative_import_path(
    _subject_id: &str,
    _visual_kind: VisualKind,
    _extension: &str,
    _content_sha256: &str,
) -> Result<PathBuf, String> {
    Err("not implemented".to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;

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
