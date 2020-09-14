const fs = require('fs');
const ttf2svg = require('ttf2svg');
const xml = require('xml2js');
const {read, write} = require('./util.js');

const ttf = fs.readFileSync('assets/glyphs.ttf');
const svg = ttf2svg(ttf);
const components = read('data/components.yaml');
const aliases = read('data/aliases.yaml');

xml.parseString(svg, (err, result) => {
    const path = {};
    for (let glyph of result.svg.defs[0].font[0].glyph) {
        let char = glyph.$.unicode;
        let d = glyph.$.d.trim();
        path[char] = d;
    }
    let glyphs = {};
    for (let component in components) {
        if (component.length === 1) {
            glyphs[component] = path[component];
        } else {
            glyphs[component] = path[aliases[component].src];
        }
    }

    for (let component in glyphs) {
        if (glyphs[component] === undefined) {
            console.log(component);
        }
    }
    write('assets/glyphs.yaml', glyphs, {lineWidth: 10000});
});
