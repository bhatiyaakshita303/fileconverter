const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleConvert, handleCompress } = require("../modules/image/image.handlers");

const upload = multer({ dest: "uploads/" });

router.post("/convert", upload.single("file"), handleConvert);
router.post("/compress", upload.single("file"), handleCompress);

module.exports = router;
