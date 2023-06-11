import CONSTANTS from "../constants.mjs";
import utils from "../utils.mjs";

export function registerAPI() {
  game.modules.get(CONSTANTS.FLAG_NAME).api = {
    utils,
    CONSTANTS,
  };
}
