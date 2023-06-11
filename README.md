# Note Licker

![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads%20(Latest)&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FMrPrimate%NoteLicker%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%notelicker&colorB=4aa94a)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FMrPrimate%NoteLicker%2Fmain%2Fmodule-template.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

Enhanced Scene Notes/Pins for Foundry.

- Add the ability to jump straight to a journal header.
- Create icons for scenes based on the journal name, e.g. `1a. Kobold Nursery` would generate a nice icon with `1a` in a circle.

## About

This is inspired by the previous [pathbuilder2e-import](https://github.com/kobseryqum/foundry-pathbuilder2e-import) package, but is written afresh from the ground up, capturing some of my experience from [DDB Importer](https://github.com/MrPrimate/ddb-importer).

To use this module the users must have the CREATE ACTOR ability, as it creates temporary actors as part of the import process.

## Known Issues

- Journal header anchor linking won't work with Monks Enhanced Journals.
- If using DDB Importer earlier than v3.4.33 the journal anchor linking will clash.

## Bugs and Issues

Please open bugs and issues on [github](https://github.com/MrPrimate/NoteLicker/issues/new/choose), or via the Discord channel [#note-licker](https://discord.gg/M6jvpfreNd).
