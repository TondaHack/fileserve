import multer from 'multer';

export default (filepath) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, filepath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    return multer({
        storage,
    });
};
