import { dynamicIcons } from "./hooks/dynamicIcons.mjs";
import { anchorInjection } from "./hooks/anchorInjection.mjs";
import { registerAPI } from "./hooks/api.mjs";
import { createDirectories, registerSettings } from "./hooks/settings.mjs";
import { removeIconBorders } from "./hooks/iconBorder.mjs";
import CONSTANTS from "./constants.mjs";
import { noteWrapper } from "./hooks/noteWrapper.mjs";

Hooks.once("init", () => {
  registerSettings();
  if (game.modules.get('lib-wrapper')?.active) {
    noteWrapper();
  }
});

Hooks.once("ready", () => {
  if (game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    removeIconBorders();
    dynamicIcons();
  } else {
    ui.notifications.error(`Module ${CONSTANTS.MODULE_NAME} requires the 'libWrapper' module. Please install and activate it.`, { persistent: true });
  }

  createDirectories();
  registerAPI();
  anchorInjection();
});
