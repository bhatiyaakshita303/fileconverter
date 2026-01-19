const convertImage = require("./image.convert");
const compressImage = require("./image.compress");
const fs = require("fs");

async function handleConvert(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("FILE NOT RECEIVED");
    }

    if (!req.body.format) {
      return res.status(400).send("FORMAT NOT RECEIVED");
    }

    const outputPath = await convertImage(
      req.file.path,
      req.body.format
    );

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Image converted successfully",
      downloadUrl: `${req.protocol}://${req.get("host")}/uploads/${path.basename(outputPath)}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Conversion failed", err);
  }
}

async function handleCompress(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("FILE NOT RECEIVED");
    }

    // user input (optional)
    const quality = req.body.quality || 100;

    const outputPath = await compressImage(req.file.path, quality);

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Image compressed successfully",
      outputPath,
      qualityUsed: quality
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Compression failed");
  }
}


module.exports = {
  handleConvert,
  handleCompress
};