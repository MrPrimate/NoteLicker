import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";
import { DirectoryPicker } from "../lib/DirectoryPicker.mjs";
import FileHelper from "../lib/FileHelper.mjs";
import logger from "../lib/logger.mjs";

foundry.utils.setProperty(CONFIG, "NOTELICKER", {
  module: "Note Licker",
  cache: false,
  KNOWN: {
    CHECKED_DIRS: new Set(),
    FILES: new Set(),
    DIRS: new Set(),
    LOOKUPS: new Map(),
    FORGE: {
      TARGET_URL_PREFIX: {},
      TARGETS: {},
    },
  }
});

async function resetSettings() {
  for (const [name, data] of Object.entries(CONSTANTS.GET_DEFAULT_SETTINGS())) {
    // eslint-disable-next-line no-await-in-loop
    await game.settings.set(CONSTANTS.FLAG_NAME, name, data.default);
  }
  window.location.reload();
}

class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    super(...args);
    // eslint-disable-next-line no-constructor-return
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Dialogs.ResetSettings.Title`),
      content: `<p class="${CONSTANTS.FLAG_NAME}-dialog-important">${game.i18n.localize(
        `${CONSTANTS.SHORT_NAME}.Dialogs.ResetSettings.Content`
      )}</p>`,
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Dialogs.ResetSettings.Confirm`),
          callback: () => {
            resetSettings();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Dialogs.ResetSettings.Cancel`),
        },
      },
      default: "cancel",
    });
  }
}

export function registerSettings() {
  game.settings.registerMenu(CONSTANTS.FLAG_NAME, "resetToDefaults", {
    name: `${CONSTANTS.SHORT_NAME}.Settings.Reset.Title`,
    label: `${CONSTANTS.SHORT_NAME}.Settings.Reset.Label`,
    hint: `${CONSTANTS.SHORT_NAME}.Settings.Reset.Hint`,
    icon: "fas fa-refresh",
    type: ResetSettingsDialog,
    restricted: true,
  });

  for (const [name, data] of Object.entries(CONSTANTS.GET_DEFAULT_SETTINGS())) {
    game.settings.register(CONSTANTS.FLAG_NAME, name, data);
  }

}

export async function loadIconCache(dir) {
  if (game.user && game.user.can("FILES_BROWSE")) {
    logger.debug("Generating cache", prompt);
    const iconUploadDir = dir ?? utils.setting("ICON_UPLOAD_DIR");
    await FileHelper.generateCurrentFiles(iconUploadDir);
    CONFIG.NOTELICKER.cache = true;
  }
}

export async function createDirectories() {
  const iconUploadDir = utils.setting("ICON_UPLOAD_DIR");
  const parsedDir = DirectoryPicker.parse(iconUploadDir);
  CONFIG.NOTELICKER.tempPath = parsedDir.current;
  if (game.user.isGM) {
    await DirectoryPicker.verifyPath(parsedDir);
  }
  await loadIconCache(iconUploadDir);
}
