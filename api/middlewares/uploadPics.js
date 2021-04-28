const multer = require('multer');

//Init Upload
module.exports = multer({
    storage: multer.diskStorage({}),
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/jpeg|jpg|png|gif/)){
            cb(new Error('File is not supported'), false)
        }
        cb(null, true)
    }
})