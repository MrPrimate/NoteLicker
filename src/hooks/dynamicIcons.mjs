/* eslint-disable no-continue */
import Icons from "../lib/Icons.mjs";

export async function dynamicIcons() {
  Hooks.on("refreshNote", (note) => {
    if (note.document.texture.src.startsWith("blob")) return;

    const data = (note.text?.length > 0) ? Icons.generateIconData(note.text) : undefined;

    if (data) {
      note.iconSrc = data.url;
      note.document.texture.src = data.url;
      note.controlIcon.iconSrc = data.url;
      note.draw();
    }
  });

  Hooks.on("canvasReady", (canvas) => {
    for (const note of (canvas.notes.placeables ?? [])) {
      if (note.document.texture.src.startsWith("blob")) continue;
      const data = (note.text?.length > 0) ? Icons.generateIconData(note.text) : undefined;

      if (data) {
        note.iconSrc = data.url;
        note.document.texture.src = data.url;
        note.controlIcon.iconSrc = data.url;
        note.draw();
      }
    }
  });

  Hooks.on("renderNoteConfig", (noteConfig, html, data) => {
    // const isExistingNote = noteConfig.document.id !== null;

    const sourceTexture = noteConfig.object?._source?.texture?.src;
    if (noteConfig.object.texture.src.startsWith("blob") && sourceTexture) {
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
