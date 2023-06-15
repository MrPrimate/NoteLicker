/* eslint-disable no-continue */
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
  });
}
