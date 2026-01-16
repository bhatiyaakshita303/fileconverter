const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handlePDFConvert, handlePDFCompress } = require("../modules/pdf/pdf.handlers");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../modules/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/convert", upload.single("file"), handlePDFConvert);
router.post("/compress", upload.single("file"), handlePDFCompress);

module.exports = router;