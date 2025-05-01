/* eslint-disable no-continue */
import CONSTANTS from "../constants.mjs";
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

export async function dynamicIcons() {
  if (!utils.setting("ENABLE_DYNAMIC_ICONS")) return;

  Hooks.on("renderNoteConfig", (noteConfig, html, data) => {
    const sourceTexture = noteConfig.object?._source?.texture?.src;
    const customItemElement = html.find("file-picker[name='icon.custom'] > input")
       ?? html.find("input[name='icon.custom']");
    if (Icons.textureExists(noteConfig.object.texture.src) && sourceTexture) {
      // noteConfig.object.texture.src = `${noteConfig.object._source.texture.src}`;
      const customIcon = !Object.values(CONFIG.JournalEntry.noteIcons).includes(sourceTexture);
      const icon = {
        selected: customIcon ? "" : sourceTexture,
        custom: customIcon ? sourceTexture : "",
      };
      data.icon = icon;
      if (!customIcon) {
        customItemElement[0].value = "";
      }
    }
    // add disable selector
    const disableAutoIcon = Icons.disableAutoIcon(noteConfig.document);
    const globalGroup = customItemElement.closest(".form-group");
    const label = game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Labels.DisableAutoIcon`);
    globalGroup.after(`
        <div class="form-group">
            <label for="flags.${CONSTANTS.FLAG_NAME}.disableAutoIcon">${label}</label>
            <input type="checkbox" name="flags.${CONSTANTS.FLAG_NAME}.disableAutoIcon" data-dtype="Boolean" ${disableAutoIcon ? "checked" : ""}>
        </div>
    `);
    noteConfig.setPosition({ height: "auto" });
  });
}
