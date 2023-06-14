import { generateIconData } from "../app/iconizer.mjs";
import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";

function convertSvgToDataURL(svgText) {
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  return url;
}

export async function dynamicIcons() {
  Hooks.on("refreshNote", (note) => {
    if (note.document.texture.src.startsWith("blob")) return;

    const stub = (note.text?.trim().split(".")[0].split(" ")[0].split(":")[0] ?? "").replace(/(\d+)/, utils.unPad);
    if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
      const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);
      const svgDataURL = convertSvgToDataURL(content);
      note.iconSrc = svgDataURL;
      note.document.texture.src = svgDataURL;
      note.controlIcon.iconSrc = svgDataURL;
      note.draw();
    }
  });

  Hooks.on("canvasReady", (canvas) => {
    for (const note of (canvas.notes.placeables ?? [])) {
      const data = (note.text?.length > 0) ? generateIconData(note.text) : undefined;

      if (data) {
        const svgDataURL = convertSvgToDataURL(data.content);
        note.iconSrc = svgDataURL;
        note.document.texture.src = svgDataURL;
        note.controlIcon.iconSrc = svgDataURL;
        note.draw();
      }

      const stub = (note.text?.trim().split(".")[0].split(" ")[0].split(":")[0] ?? "").replace(/(\d+)/, utils.unPad);
      if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
        const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);
        const svgDataURL = convertSvgToDataURL(content);
        note.iconSrc = svgDataURL;
        note.document.texture.src = svgDataURL;
        note.controlIcon.iconSrc = svgDataURL;
        note.draw();
      }
    }
  });

  Hooks.on("renderNoteConfig", (noteConfig, html, data) => {
    const isExistingNote = noteConfig.document.id !== null;

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
