import { dynamicIcons } from "./hooks/dynamicIcons.mjs";
import { anchorInjection } from "./hooks/anchorInjection.mjs";
import { registerAPI } from "./hooks/api.mjs";
import { createDirectories, registerSettings } from "./hooks/settings.mjs";

CONFIG.debug.hooks =true;

Hooks.once("init", () => {
  registerSettings();
  dynamicIcons();
});

Hooks.once("ready", () => {
  createDirectories();
  registerAPI();
  anchorInjection();
});
