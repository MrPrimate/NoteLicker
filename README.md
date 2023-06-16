# Note Licker

![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads%20(Latest)&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FMrPrimate%NoteLicker%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%notelicker&colorB=4aa94a)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FMrPrimate%NoteLicker%2Fmain%2Fmodule-template.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

Simple enhanced Scene Notes/Pins for Foundry to add autonumbering.

## About

This module currently offers three improvements to journal notes/pins.

- Create icons for scenes on the fly based on the journal name, e.g. 1a. Kobold Nursery would generate a nice icon with 1a in a circle. These are similar to the icons that are created by DDB Importer when importing an adventure.
- Add the ability to remove the icon border. This is similar to the functionality in backgroundless-pins. If Backgroundless Pins is active, Note Licker will not enable this functionality, and works in v11.
- Add the ability to jump to an anchor link. This is similar to the functionality in JAL and DDB Importer. This supports the flags used by DDB Importer/Adventure Muncher as well as JAL. If JAL is active, Note Licker will not enable the anchor linking functionality. This has a different approach and some slight functional differences to JAL, to meet the more detailed requirements of DDB Importer, but may be useful for other systems.

# Demo GIFS

Auto icon effects:

![gif-preview-auto-icon](./docs/auto-icon.gif)

Jump to Anchor:

![gif-preview-jump-to-anchor](./docs/jump-to-anchor.gif)

Remove icon borders:

![gif-preview](./docs/show-icon-border.gif)

## Known Issues

- Journal header anchor linking won't work with Monks Enhanced Journals.
- If JAL or DDB Importer are active the anchor injection will not be enabled.
- If Backgroundless Pins is active, the border removal will not be enabled.

## Bugs and Issues

Please open bugs and issues on [github](https://github.com/MrPrimate/NoteLicker/issues/new/choose), or via the Discord channel [#bugs](https://discord.gg/aUQBCa9bv8).


## Scripting

You can create icons using the API as follows:

```javascript
let path = await game.modules.get("notelicker")?.api.generateIcon("1a. Terror of fun");
```

This will return the path to the new icon, which you can use to update a note or other.
