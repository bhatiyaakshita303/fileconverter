const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { handleVideoConvert, handleVideoCompress } = require("../modules/video/video.handlers");

const tempDir = path.join(__dirname, "../modules/temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/convert", upload.single("file"), handleVideoConvert);
router.post("/compress", upload.single("file"), handleVideoCompress);

module.exports = router;
