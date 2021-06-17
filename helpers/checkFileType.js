const path = require('path')

const checkFileType = (file, cb) => {
    // allowed file extension
    const filetypes = /jpeg|jpg|png|gif|pdf|zip/

    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) //ngecek apakah file extension jpeg, jpg, png, gif

    //check mime
    const mimetype = filetypes.test(file.mimetype) // contoh mimetype: image/jpg, application/json, applcation/exe

    if (mimetype && extname) { //kalo extension dan mimetype ok, lanjut
        return cb(null, true)
    } else {
        return cb('Error, file extension tidak diizinkan')
    }
}

module.exports = checkFileType
