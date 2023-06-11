import CONSTANTS from "../constants.mjs";
import utils from "../lib/utils.mjs";
import logger from "../logger.mjs";
import { DirectoryPicker } from "../lib/DirectoryPicker.mjs";
import FileHelper from "../lib/FileHelper.mjs";

function unPad(match, p1) {
  if (isNaN(parseInt(p1))) {
    return p1;
  } else {
    return parseInt(p1);
  }
}



/**
 * Uploads a file to Forge Asset Library without the UI Notification
 * @param  {string} source
 * @param  {string} path
 * @param  {blog} file
 * @param  {object} options
 */
async function forgeUploadFile(path, file) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("path", `${path}/${file.name}`);

  const response = await ForgeAPI.call("assets/upload", fd);
  if (!response || response.error) {
    ui.notifications.error(response ? response.error : "An unknown error occured accessing The Forge API");
    return false;
  } else {
    return { path: response.url };
  }
}

/**
   * Uploads a file to Foundry without the UI Notification
   * @param  {string} source
   * @param  {string} path
   * @param  {blog} file
   * @param  {object} options
   */
async function uploadFile(source, path, file, options) {
  if (typeof ForgeVTT !== "undefined" && ForgeVTT?.usingTheForge) {
    return forgeUploadFile(path, file);
  }

  const fd = new FormData();
  fd.set("source", source);
  fd.set("target", path);
  fd.set("upload", file);
  Object.entries(options).forEach((o) => fd.set(...o));

  const request = await fetch(FilePicker.uploadURL, { method: "POST", body: fd });
  if (request.status === 413) {
    return ui.notifications.error(game.i18n.localize("FILES.ErrorTooLarge"));
  } else if (request.status !== 200) {
    return ui.notifications.error(game.i18n.localize("FILES.ErrorSomethingWrong"));
  }
  return undefined;
}

async function importRawFile(targetDirectory, fileName, content, mimeType) {
  try {
    const parsedUploadPath = DirectoryPicker.parse(targetDirectory);
    const returnPath = await FileHelper.getFileUrl(targetDirectory, fileName);

    if (!CONFIG.NOTELICKER.KNOWN.CHECKED_DIRS.has(parsedUploadPath.current)) {
      logger.debug(`Checking dir path ${parsedUploadPath.current}`);
      await DirectoryPicker.verifyPath(parsedUploadPath, `${parsedUploadPath.current}`);
      await FileHelper.generateCurrentFiles(parsedUploadPath.current);
      CONFIG.NOTELICKER.KNOWN.CHECKED_DIRS.add(parsedUploadPath.current);
    }

    console.warn("verified")

    if (!CONFIG.NOTELICKER.KNOWN.FILES.has(returnPath)) {
      logger.debug(`Importing raw file to ${targetDirectory} as ${fileName}`);
      const fileData = new File([content], fileName, { type: mimeType });
      await uploadFile(parsedUploadPath.activeSource, `${parsedUploadPath.current}`, fileData, {
        bucket: parsedUploadPath.bucket,
      });
      CONFIG.NOTELICKER.KNOWN.FILES.add(returnPath);
    } else {
      logger.debug(`File already imported ${returnPath}`);
    }

    return `${returnPath}`;
  } catch (err) {
    logger.error(`Error importing image file to ${targetDirectory} as ${fileName} : ${err.message}`);
  }

  return undefined;
}

export async function generateIcon(title) {
  const stub = (title.trim().split(".")[0].split(" ")[0].split(":")[0]).replace(/(\d+)/, unPad);
  if (stub.length <= 4 && !CONSTANTS.BAD_WORDS.includes(stub)) {
    const targetDirectory = utils.setting("ICON_UPLOAD_DIR");
    const iconName = `${stub}.svg`;
    const content = `${CONSTANTS.ICON_STUBS[stub.length]}`.replace("REPLACEME", stub);
    const uploadPath = await importRawFile(targetDirectory, iconName, content, "text/plain");
    return uploadPath;
  } else {
    return undefined;
  }
}
