/**
 * Multer middleware to be used when need to deal with form data in any api
 * specifically to be used when need to handle file request
 */

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        let username = req.user.username;
        cb(null, username + '_' + Date.now() + path.extname(file.originalname));
    }
});

export default storage;