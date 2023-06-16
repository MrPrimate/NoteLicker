/* eslint-disable no-continue */
import CONSTANTS from "../constants.mjs";
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

export async function dynamicIcons() {
  if (!utils.setting("ENABLE_DYNAMIC_ICONS")) return;

  Hooks.on("renderNoteConfig", (noteConfig, html, data) => {
    const sourceTexture = noteConfig.object?._source?.texture?.src;
    if (Icons.textureExists(noteConfig.object.texture.src) && sourceTexture) {
      noteConfig.object.texture.src = `${noteConfig.object._source.texture.src}`;
      const customIcon = !Object.values(CONFIG.JournalEntry.noteIcons).includes(sourceTexture);
      const icon = {
        selected: customIcon ? "" : sourceTexture,
        custom: customIcon ? sourceTexture : ""
      };
      data.icon = icon;
      if (customIcon) {
        html.find("input[name='icon.custom']")[0].value = sourceTexture;
      } else {
        html.find("input[name='icon.custom']")[0].value = "";
        html.find("select[name='icon.selected']")[0].value = sourceTexture;
      }
    }
    // add disable selector
    const disableAutoIcon = Icons.disableAutoIcon(noteConfig.document);
    const globalGroup = html.find("input[name='icon.custom']").closest(".form-group");
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
