import { DirectoryPicker } from "./lib/DirectoryPicker.mjs";

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
    ICON_UPLOAD_DIR: "icon-upload-dir",
    ENABLE_DYNAMIC_ICONS: "enable-dynamic-icons",
  },

  BAD_WORDS: ["The", "At", "Who", "the"],

  ICON_STUBS: {
    1: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  viewBox="0 0 512 512" width="512" height="512">
    <g>
      <circle style="fill:#ffffff;stroke:#010101;stroke-width:30;stroke-miterlimit:10;" cx="250" cy="250" r="220">
      </circle>
      <text font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' font-size="300" font-weight="400" fill="black" x="50%" y="52%" text-anchor="middle" stroke="#000000" dy=".3em">REPLACEME</text>
    </g>
  </svg>`,
    2: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  viewBox="0 0 512 512" width="512" height="512">
    <g>
      <circle style="fill:#ffffff;stroke:#010101;stroke-width:30;stroke-miterlimit:10;" cx="250" cy="250" r="220">
      </circle>
      <text font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' font-size="230" font-weight="400" fill="black" x="50%" y="52%" text-anchor="middle" stroke="#000000" dy=".3em">REPLACEME</text>
    </g>
  </svg>`,
    3: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  viewBox="0 0 512 512" width="512" height="512">
    <g>
      <circle style="fill:#ffffff;stroke:#010101;stroke-width:30;stroke-miterlimit:10;" cx="250" cy="250" r="220">
      </circle>
      <text font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' font-size="170" font-weight="400" fill="black" x="50%" y="52%" text-anchor="middle" stroke="#000000" dy=".3em">REPLACEME</text>
    </g>
  </svg>`,
    4: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
  viewBox="0 0 512 512" width="512" height="512">
    <g>
      <circle style="fill:#ffffff;stroke:#010101;stroke-width:30;stroke-miterlimit:10;" cx="250" cy="250" r="220">
      </circle>
      <text font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' font-size="140" font-weight="400" fill="black" x="50%" y="52%" text-anchor="middle" stroke="#000000" dy=".3em">REPLACEME</text>
    </g>
  </svg>`,
  },


  GET_DEFAULT_SETTINGS() {
    return foundry.utils.deepClone(CONSTANTS.DEFAULT_SETTINGS);
  },
};

CONSTANTS.DEFAULT_SETTINGS = {
  [CONSTANTS.SETTINGS.USE_CUSTOM_COMPENDIUM_MAPPINGS]: {
    name: `${CONSTANTS.SHORT_NAME}.Settings.UseCustomCompendiumMappings.Name`,
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  },

  // debug
  [CONSTANTS.SETTINGS.LOG_LEVEL]: {
    name: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.Name`,
    hint: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.Hint`,
    scope: "world",
    config: true,
    type: String,
    choices: {
      DEBUG: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.debug`,
      INFO: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.info`,
      WARN: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.warn`,
      ERR: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.error`,
      OFF: `${CONSTANTS.SHORT_NAME}.Settings.LogLevel.off`,
    },
    default: "WARN",
  },

  [CONSTANTS.SETTINGS.ENABLE_DYNAMIC_ICONS]: {
    name: `${CONSTANTS.SHORT_NAME}.Settings.EnableDynamicIcons.Name`,
    hint: `${CONSTANTS.SHORT_NAME}.Settings.EnableDynamicIcons.Hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: debouncedReload,
  },

  [CONSTANTS.SETTINGS.ENABLE_ANCHOR_LINKS]: {
    name: `${CONSTANTS.SHORT_NAME}.Settings.EnableAnchorLinks.Name`,
    hint: `${CONSTANTS.SHORT_NAME}.Settings.EnableAnchorLinks.Hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: debouncedReload,
  },

  [CONSTANTS.SETTINGS.ICON_UPLOAD_DIR]: {
    name: `${CONSTANTS.SHORT_NAME}.Settings.IconUploadDir.Name`,
    hint: `${CONSTANTS.SHORT_NAME}.Settings.IconUploadDir.Hint`,
    scope: "world",
    config: false,
    type: DirectoryPicker.Directory,
    default: "[data] notelicker/icons",
  },

};

CONSTANTS.PATH = `modules/${CONSTANTS.MODULE_NAME}`;

export default CONSTANTS;
