const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 100);

const CONSTANTS = {
  MODULE_NAME: "Note Licker",
  SHORT_NAME: "NoteLicker",
  FLAG_NAME: "notelicker",
  SETTINGS: {
    // Enable options
    LOG_LEVEL: "log-level",
    ENABLE_ANCHOR_LINKS: "enable-anchor-links",
    AUTO_ICONIZE: "auto-iconize",
  },


  GET_DEFAULT_SETTINGS() {
    return foundry.utils.deepClone(CONSTANTS.DEFAULT_SETTINGS);
  },
};

CONSTANTS.DEFAULT_SETTINGS = {
  [CONSTANTS.SETTINGS.USE_CUSTOM_COMPENDIUM_MAPPINGS]: {
    name: `${CONSTANTS.FLAG_NAME}.Settings.UseCustomCompendiumMappings.Name`,
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  },

  // debug
  [CONSTANTS.SETTINGS.LOG_LEVEL]: {
    name: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.Name`,
    hint: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.Hint`,
    scope: "world",
    config: true,
    type: String,
    choices: {
      DEBUG: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.debug`,
      INFO: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.info`,
      WARN: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.warn`,
      ERR: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.error`,
      OFF: `${CONSTANTS.FLAG_NAME}.Settings.LogLevel.off`,
    },
    default: "WARN",
  },

  [CONSTANTS.SETTINGS.ENABLE_ANCHOR_LINKS]: {
    name: `${CONSTANTS.FLAG_NAME}.Settings.EnableAnchorLinks.Name`,
    hint: `${CONSTANTS.FLAG_NAME}.Settings.EnableAnchorLinks.Hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: debouncedReload,
  },

};

CONSTANTS.PATH = `modules/${CONSTANTS.MODULE_NAME}`;

export default CONSTANTS;
