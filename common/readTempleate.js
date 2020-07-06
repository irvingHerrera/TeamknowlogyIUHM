const fs = require('fs');
const path = require('path');

function readTempleate() {
    return fs.readFileSync(path.join(path.dirname(require.main.filename) + '/template/3-validacion-cuenta.html'), 
        { 'encoding': 'utf8'});
}

module.exports = {
    readTempleate
};