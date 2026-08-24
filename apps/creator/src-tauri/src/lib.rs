mod asset_import;
mod project_fs;
mod runtime_bridge;
mod runtime_process;

use asset_import::{
    import_visual_asset, read_visual_asset, remove_visual_asset, resolve_visual_asset,
};
use project_fs::{create_project, open_project, save_project};
use runtime_process::{start_playtest, stop_playtest, RuntimeManager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .manage(RuntimeManager::default())
        .invoke_handler(tauri::generate_handler![
            create_project,
            open_project,
            save_project,
            import_visual_asset,
            resolve_visual_asset,
            read_visual_asset,
            remove_visual_asset,
            start_playtest,
            stop_playtest
        ])
        .run(tauri::generate_context!())
        .expect("error while running AI Game Studio Creator");
}
