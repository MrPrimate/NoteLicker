import CONSTANTS from "../constants.js";
import utils from "../utils.js";

export function registerAPI() {
  game.modules.get(CONSTANTS.SHORT_NAME).api = {
    utils,
    CONSTANTS,
  };
}
