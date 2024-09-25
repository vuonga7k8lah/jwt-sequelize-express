const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "image/community/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    const filetypes = /doc|pdf|hwp|jpeg|png|jpg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only .doc .pdf .hwp .jpeg .png files are allowed!"));
    }
};

// Set up multer with the storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 5,
    },
});

module.exports = { multer, upload };
