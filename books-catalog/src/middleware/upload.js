import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const date = new Date().toLocaleDateString().replaceAll('.','');
        const time = new Date().toLocaleTimeString().replaceAll(':','');
        const fileName = `${file.fieldname}_${date}_${time}${path.extname(file.originalname)}`;
        cb(null, fileName.replaceAll('-',''));
    }
});

const limits = {
    fileSize: 1024 * 1024 * 10
}

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: function(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
})

export default upload;