import CONSTANTS from "../constants.js";
import utils from "../utils.js";

export function registerAPI() {
  game.modules.get(CONSTANTS.FLAG_NAME).api = {
    utils,
    CONSTANTS,
  };
}
