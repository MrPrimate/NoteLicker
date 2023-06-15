import CONSTANTS from "../constants.mjs";
import utils from "./utils.mjs";
import FileHelper from "./FileHelper.mjs";

export default class Icons {

  static keepBorder(document) {
    return document.getFlag(CONSTANTS.FLAG_NAME, "keepBorder")
      ?? getProperty(document, ".flags.backgroundless-pins.hasBackground")
      ?? false;
  }

  static textureExists(src) {
    if (!src
      || src.includes(CONFIG.NOTELICKER.tempPath)
      || src.startsWith("blob")
    ) {
      return true;
    } else {
      return false;
    }
  }

  static determineAnchorName(note) {
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

  static convertSvgToDataURL(svgText) {
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    return url;
  }

  static async createPersistentIcon(stub, content) {
    const targetDirectory = utils.setting("ICON_UPLOAD_DIR");
    const pathKey = `${targetDirectory}/${stub}.svg`;
    if (CONFIG.NOTELICKER.KNOWN.FILES.has(pathKey)) {
      return CONFIG.NOTELICKER.KNOWN.LOOKUPS.get(pathKey);
    } else {
      const uploadPath = await FileHelper.importRawFile(targetDirectory, `${stub}.svg`, content, "text/plain");
      return uploadPath;
    }

  }

  static async generateIconData(title, forceCreate = false) {
    const stub = (title.trim().split(".")[0].split(" ")[0].split(":")[0] ?? "").replace(/(\d+)/, utils.unPad);
    if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
      const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);

      const url = isNewerVersion(game.version, 11) || forceCreate
        ? await Icons.createPersistentIcon(stub, content)
        : Icons.convertSvgToDataURL(content);
      return {
        stub,
        content,
        url,
      };
    }
    return undefined;
  }

  static async generateIcon(title) {
    return (await Icons.generateIconData(title, true))?.url;
  }
}
