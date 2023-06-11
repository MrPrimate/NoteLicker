import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";
import { DirectoryPicker } from "../lib/DirectoryPicker.mjs";
import { generateIcon } from "../app/iconizer.mjs";

export function registerAPI() {
  game.modules.get(CONSTANTS.FLAG_NAME).api = {
    utils,
    CONSTANTS,
    DirectoryPicker,
    generateIcon,
  };
}
