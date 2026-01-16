const express = require("express");
const multer = require("multer");
const { handleConvert } = require("../modules/audio/audio.handlers");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/convert", upload.single("file"), handleConvert);

module.exports = router;
