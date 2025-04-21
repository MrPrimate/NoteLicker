/* eslint-disable no-continue */
import CONSTANTS from "../constants.mjs";
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

export async function dynamicIcons() {
  if (!utils.setting("ENABLE_DYNAMIC_ICONS")) return;

  Hooks.on("renderNoteConfig", (noteConfig, form, data) => {

    const sourceTexture = noteConfig.document?.texture?.src;

    const formGroupCustomElement = form.querySelector("[data-icon-custom]");
    const customItemElement = form.querySelector("input[name='icon.custom']");
    if (Icons.textureExists(noteConfig.document.texture.src) && sourceTexture) {
      noteConfig.object.texture.src = `${noteConfig.document._source.texture.src}`;
      const customIcon = !Object.values(CONFIG.JournalEntry.noteIcons).includes(sourceTexture);
      data.icon = {
        selected: customIcon ? "" : sourceTexture,
        custom: customIcon ? sourceTexture : "",
      };
      customItemElement.value = sourceTexture;
      if (!customIcon) {
        form.querySelector("input[name='icon.custom']").value = "";
      }
    }
    // formGroupCustomElement.hidden = "";
    // add disable selector
    const disableAutoIcon = Icons.disableAutoIcon(noteConfig.document);
    // const globalGroup = form.querySelector("input[name='icon.custom']").closest(".form-group");
    const label = game.i18n.localize(`${CONSTANTS.SHORT_NAME}.Labels.DisableAutoIcon`);
    formGroupCustomElement.insertAdjacentHTML('afterend', `
      <div class="form-group">
          <label for="flags.${CONSTANTS.FLAG_NAME}.disableAutoIcon">${label}</label>
          <input type="checkbox" name="flags.${CONSTANTS.FLAG_NAME}.disableAutoIcon" id="flags.${CONSTANTS.FLAG_NAME}.disableAutoIcon" data-dtype="Boolean" ${disableAutoIcon ? "checked" : ""}>
      </div>
  `);
    noteConfig.setPosition({ height: "auto" });
  });
}
