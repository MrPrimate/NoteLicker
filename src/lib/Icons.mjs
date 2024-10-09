import CONSTANTS from "../constants.mjs";
import utils from "./utils.mjs";
import FileHelper from "./FileHelper.mjs";
import { DirectoryPicker } from "./DirectoryPicker.mjs";
import { loadIconCache } from "../hooks/settings.mjs";

export default class Icons {

  static keepBorder(document) {
    return document.getFlag(CONSTANTS.FLAG_NAME, "keepBorder")
      ?? foundry.utils.getProperty(document, ".flags.backgroundless-pins.hasBackground")
      ?? false;
  }

  static disableAutoIcon(document) {
    return document.getFlag(CONSTANTS.FLAG_NAME, "disableAutoIcon") ?? false;
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
    if (!CONFIG.NOTELICKER.cache) await loadIconCache(targetDirectory);
    if (CONFIG.NOTELICKER.KNOWN.FILES.has(pathKey)) {
      return CONFIG.NOTELICKER.KNOWN.LOOKUPS.get(pathKey);
    } else if (game.user && game.user.can("FILES_BROWSE") && game.user.can("FILES_UPLOAD")) {
      const uploadPath = await FileHelper.importRawFile(targetDirectory, `${stub}.svg`, content, "text/plain");
      return uploadPath;
    } else {
      // fallback, we don't have permissions to browse the file system, so we guess
      // this won't work if the default upload dir has been changed to an s3 or forge system
      const parsedUploadPath = DirectoryPicker.parse(targetDirectory);
      const filePath = `${parsedUploadPath.current}/${stub}.svg`;
      return filePath;
    }

  }

  static async generateIconData(title, forceCreate = false) {
    const stub = (title.trim().split(".")[0].split(" ")[0].split(":")[0] ?? "")
      .replaceAll(/[()[\].:'<>{}]/g, "")
      .replace(/(\d+)/, utils.unPad);
    if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
      const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);

      const url = foundry.utils.isNewerVersion(game.version, 11) || forceCreate
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
