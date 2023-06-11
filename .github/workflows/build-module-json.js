var fs = require('fs');

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

var mod = JSON.parse(fs.readFileSync('module-template.json', 'utf8'));

mod.version = version;
mod.download = `https://github.com/MrPrimate/NoteLicker/releases/download/${version}/notelicker.zip`;

console.log(JSON.stringify(mod));
