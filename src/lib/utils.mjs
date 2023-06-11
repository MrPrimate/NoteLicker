import CONSTANTS from "../constants.mjs";

const utils = {

  isObject: (obj) => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
  },

  isString: (str) => {
    return typeof str === 'string' || str instanceof String;
  },

  wait: async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },

  capitalize: (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  stripHtml: (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },

  htmlToElement: (html) => {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  htmlToDoc: (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
  },

  setting: (key) => {
    return game.settings.get(CONSTANTS.FLAG_NAME, CONSTANTS.SETTINGS[key]);
  },

  updateSetting: async (key, value) => {
    return game.settings.set(CONSTANTS.FLAG_NAME, CONSTANTS.SETTINGS[key], value);
  },

  getFlags: (actor) => {
    const flags = actor.flags[CONSTANTS.FLAG_NAME]
      ? actor.flags[CONSTANTS.FLAG_NAME]
      : CONSTANTS.ACTOR_FLAGS;
    return flags;
  },

  setFlags: async (actor, flags) => {
    let updateData = {};
    setProperty(updateData, `flags.${CONSTANTS.FLAG_NAME}`, flags);
    await actor.update(updateData);
    return actor;
  },

  resetFlags: async (actor) => {
    return utils.setFlags(actor, null);
  },

};

export default utils;
