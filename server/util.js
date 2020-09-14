const fs = require('fs');
const yaml = require('js-yaml');

const read = (path) => {
    const file = fs.readFileSync(path);
    return yaml.safeLoad(file);
};

const write = (path, object, kwargs) => {
    const file = yaml.safeDump(object, kwargs);
    fs.writeFileSync(path, file);
}

module.exports = {
    read: read,
    write: write
}