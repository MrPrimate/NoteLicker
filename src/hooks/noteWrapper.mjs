import CONSTANTS from "../constants.mjs";
import Icons from "../lib/Icons.mjs";
import utils from "../lib/utils.mjs";

class BorderlessControlIcon extends ControlIcon {
  async draw() {
    if (this.destroyed) return this;

    this.texture = this.texture ?? await loadTexture(this.iconSrc);

    // Draw icon
    this.icon.texture = this.texture;
    // eslint-disable-next-line no-multi-assign
    this.icon.width = this.icon.height = this.size;
    this.icon.tint = Number.isNumeric(this.tintColor) ? this.tintColor : 0xffffff;

    if (isNewerVersion(11, game.version)) {
      this.border
        .clear()
        .lineStyle(2, this.borderColor, 1.0)
        .drawRoundedRect(...this.rect, 5)
        .endFill();
      this.border.visible = false;
      return this;
    } else {
      this.bg.clear();
      return this.refresh({ borderVisible: false });
    }
  }
}


export function noteWrapper() {

  if (utils.setting("ENABLE_DYNAMIC_ICONS")) {
    /* eslint-disable no-invalid-this */
    libWrapper.register(CONSTANTS.FLAG_NAME, 'Note.prototype._draw', async function(wrapped, ...args) {
      if (utils.setting("ENABLE_DYNAMIC_ICONS")
        && !Icons.textureExists(this.document?.texture?.src)
        && !Icons.disableAutoIcon(this.document)
      ) {
        const data = (this.text?.length > 0)
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

  /* eslint-disable no-invalid-this */
  // eslint-disable-next-line no-unused-vars
  libWrapper.register(CONSTANTS.FLAG_NAME, 'Note.prototype._drawControlIcon', function(...args) {
    const IconClass = Icons.keepBorder(this.document)
      || !utils.setting("ENABLE_ICON_BORDER_REMOVAL")
      || game.modules.get("backgroundless-pins")?.active
      ? ControlIcon
      : BorderlessControlIcon;

    let tint = Color.from(this.document.texture.tint || null);
    let icon = new IconClass({ texture: this.document.texture.src, size: this.size, tint });
    icon.x -= (this.size / 2);
    icon.y -= (this.size / 2);
    return icon;
  }, 'OVERRIDE');
  /* eslint-enable no-invalid-this */

}
