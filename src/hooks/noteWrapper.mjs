import CONSTANTS from "../constants.mjs";
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

class BorderlessControlIcon extends foundry.canvas.containers.ControlIcon {
  /** @override */
  _refresh() {
    super._refresh();
    this.bg.clear();
    this.border.visible = false;
  }
}


export function noteWrapper() {

  if (utils.setting("ENABLE_DYNAMIC_ICONS")) {
    /* eslint-disable no-invalid-this */
    libWrapper.register(CONSTANTS.FLAG_NAME, 'foundry.canvas.placeables.Note.prototype._draw', async function(wrapped, ...args) {

      if (utils.setting("ENABLE_DYNAMIC_ICONS")
        && !Icons.textureExists(this.document?.texture?.src)
        && !Icons.disableAutoIcon(this.document)
      ) {
        const data = (this.document?.label?.length > 0)
          ? await Icons.generateIconData(Icons.determineAnchorName(this))
          : undefined;

        if (data) {
          this.iconSrc = data.url;
          this.document.texture.src = data.url;
        }
      }

      return wrapped(...args);
    }, 'WRAPPER');
    /* eslint-enable no-invalid-this */
  }

  if (utils.setting("ENABLE_ICON_BORDER_REMOVAL")
    && !game.modules.get("backgroundless-pins")?.active
    && !game.modules.get("pin-cushion")?.active
  ) {
    /* eslint-disable no-invalid-this */
    // eslint-disable-next-line no-unused-vars
    libWrapper.register(CONSTANTS.FLAG_NAME, 'foundry.canvas.placeables.Note.prototype._drawControlIcon', function(...args) {
      const IconClass = Icons.keepBorder(this.document)
        ? foundry.canvas.containers.ControlIcon
        : BorderlessControlIcon;

      const tint = foundry.utils.Color.from(this.document.texture.tint || null);
      const size = foundry.utils.isNewerVersion(game.version, 12)
        ? this.document.iconSize
        : this.size;
      const icon = new IconClass({ texture: this.document.texture.src, size, tint });
      if (!foundry.utils.isNewerVersion(game.version, 13)) {
        icon.x -= (size / 2);
        icon.y -= (size / 2);
      }
      return icon;
    }, 'OVERRIDE');
    /* eslint-enable no-invalid-this */
  }

}
