/* eslint-disable no-continue */
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

function determineAnchorName(note) {
  const text = note.text;

  if (!text || text.trim() === "") return undefined;

  const pageName = note.page?.name;
  if (!pageName) return text;

  if (text.startsWith(`${pageName}:`)) {
    const reg = new RegExp(`^${pageName}:`);
    return text.replace(reg, "").trim();
  }
  return text;
}

function textureExists(src) {
  if (!src
    || src.includes(CONFIG.NOTELICKER.tempPath)
    || src.startsWith("blob")
  ) {
     return true;
  } else {
    return false;
  }
}


export async function dynamicIcons() {
  if (!utils.setting("ENABLE_DYNAMIC_ICONS")) return;

  Hooks.on("refreshNote", async (note) => {
    if (textureExists(note.document?.texture?.src)) return;

    const data = (note.text?.length > 0)
    ? await Icons.generateIconData(determineAnchorName(note))
    : undefined;

    if (data) {
      note.iconSrc = data.url;
      note.document.texture.src = data.url;
      note.controlIcon.iconSrc = data.url;
      note.draw();
    }
  });

  // Hooks.on("canvasReady", async (canvas) => {
  //   for (const note of (canvas.notes.placeables ?? [])) {
  //     if (textureExists(note.document?.texture?.src)) return;

  //     const data = (note.text?.length > 0)
  //       ? await Icons.generateIconData(determineAnchorName(note))
  //       : undefined;

  //     if (data) {
  //       note.iconSrc = data.url;
  //       note.document.texture.src = data.url;
  //       note.controlIcon.iconSrc = data.url;
  //       note.draw();
  //     }
  //   }
  // });

  Hooks.on("renderNoteConfig", (noteConfig, html, data) => {
    const sourceTexture = noteConfig.object?._source?.texture?.src;
    if (textureExists(noteConfig.object.texture.src) && sourceTexture) {
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
