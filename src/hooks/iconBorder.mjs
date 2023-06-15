import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";
import Icons from "../lib/Icons.mjs";
import logger from "../logger.mjs";

export function removeIconBorders() {
  if (!utils.setting("ENABLE_ICON_BORDER_REMOVAL")) return;
  if (game.modules.get("backgroundless-pins")?.active) {
    logger.warn("Icon border removal already loaded from backgroundless-pins. Skipping.");
    return;
  }

  Hooks.on("renderNoteConfig", (noteConfig, html) => {
    const keepBorder = Icons.keepBorder(noteConfig.document);
    const iconTintGroup = html.find("[name='texture.tint']").closest(".form-group");
    const label = game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Labels.ShowIconBorder`);
    iconTintGroup.after(`
        <div class="form-group">
            <label for="flags.${CONSTANTS.FLAG_NAME}.keepBorder">${label}</label>
            <input type="checkbox" name="flags.${CONSTANTS.FLAG_NAME}.keepBorder" data-dtype="Boolean" ${keepBorder ? "checked" : ""}>
        </div>
    `);
    noteConfig.setPosition({ height: "auto" });
  });

}
