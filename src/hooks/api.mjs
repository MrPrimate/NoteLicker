import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";
import { DirectoryPicker } from "../lib/DirectoryPicker.mjs";
import Icons from "../lib/Icons.mjs";
import FileHelper from "../lib/FileHelper.mjs";

export function registerAPI() {
  game.modules.get(CONSTANTS.FLAG_NAME).api = {
    utils,
    CONSTANTS,
    DirectoryPicker,
    FileHelper,
    Icons,
  };
}
