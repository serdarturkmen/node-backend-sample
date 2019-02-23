const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const CSVFilesController = require('../controllers/csvfiles.js');
const fs = require('fs');
var rimraf = require("rimraf");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './csvfiles/';
        if (!fs.existsSync(dir)){
            fs.mkdir(dir, err => cb(err, dir));
        } else {
            rimraf.sync(dir);
            fs.mkdir(dir, err => cb(err, dir));
        }
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post("/", upload.single("paramsCsv"), CSVFilesController.createCSVFileReadAndDelete);

module.exports = router;
