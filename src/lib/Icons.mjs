import CONSTANTS from "../constants.mjs";
import utils from "./utils.mjs";
import FileHelper from "./FileHelper.mjs";

export default class Icons {

  static convertSvgToDataURL(svgText) {
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    return url;
  }

  static generateIconData(title) {
    const stub = (title.trim().split(".")[0].split(" ")[0].split(":")[0] ?? "").replace(/(\d+)/, utils.unPad);
    if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
      const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);
      const url = Icons.convertSvgToDataURL(content);
      return {
        stub,
        content,
        url,
      };
    }
    return undefined;
  }

  static async generateIcon(title) {
    const data = Icons.generateIconData(title);
    if (data) {
      const targetDirectory = utils.setting("ICON_UPLOAD_DIR");
      const uploadPath = await FileHelper.importRawFile(targetDirectory, `${data.stub}.svg`, data.content, "text/plain");
      return uploadPath;
    } else {
      return undefined;
    }
  }
}
