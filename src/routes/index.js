import path from "path";
import fs from "fs";



module.exports = app => {
    fs.readdirSync(path.join(__dirname)).map(file => {
        if (file !== 'index.js') {
            require('./' + file)(app);
        }
    });
}