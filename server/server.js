const express = require('express');
const parser = require('body-parser');
const {read, write} = require('./util.js');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

const components = read('data/components.yaml');
const glyphs = read('assets/glyphs.yaml');
const progress = read('progress.yaml');

app.get('/api/', (req, res) => {
    res.json({
        components: components,
        glyphs: glyphs,
        progress: progress
    });
});

app.post('/api/', (req, res) => {
    const {componentDiff, progressDiff} = req.body;
    Object.assign(components, componentDiff);
    Object.assign(progress, progressDiff);
    write('data/components.yaml', components, {flowLevel: 2});
    write('progress.yaml', progress);
    res.json({
        status: 'complete'
    })
});

app.listen(4000, () => {
    console.log('listening 4000');
});
