# Note Licker

![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads%20(Latest)&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FMrPrimate%NoteLicker%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%notelicker&colorB=4aa94a)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FMrPrimate%NoteLicker%2Fmain%2Fmodule-template.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

Enhanced Scene Notes/Pins for Foundry.

## About

This module currently offers two improvements to journal pins.

- Add the ability to jump to an anchor link. This is similar to the functionality in [JAL](https://github.com/aMediocreDad/jal) and DDB Importer. This supports the flags used by DDB Importer/Adventure Muncher as well as JAL. If JAL is active, Note Licker will not enable the anchor linking functionality.
- Create icons for scenes based on the journal name, e.g. `1a. Kobold Nursery` would generate a nice icon with `1a` in a circle. These are similar to the icons that are created by DDB Importer when importing an adventure.

## Known Issues

- Journal header anchor linking won't work with Monks Enhanced Journals.
- If using DDB Importer earlier than v3.4.33 the journal anchor linking will clash.

## Bugs and Issues

Please open bugs and issues on [github](https://github.com/MrPrimate/NoteLicker/issues/new/choose), or via the Discord channel [#note-licker](https://discord.gg/M6jvpfreNd).
