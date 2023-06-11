import { anchorInjection } from "./hooks/anchorInjection.js";
import { registerAPI } from "./hooks/api.js";
import { registerSettings } from "./hooks/settings.js";

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  registerAPI();
  anchorInjection();
});
