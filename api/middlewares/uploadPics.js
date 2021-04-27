const multer = require('multer');
const path = require('path');

//Set Storage Engine for Multer to upload Image
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads/'),
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Init Upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('productImg');
//Check File Type
function checkFileType(file, cb) {
    //Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //Check Ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Only Allow Image to Upload!');
    }
};

module.exports = upload;