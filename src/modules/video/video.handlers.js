const fs = require("fs");
const convertVideo = require("./video.convert");
const compressVideo = require("./video.compress");

async function handleVideoConvert(req, res) {
  try {
    if (!req.file) return res.status(400).send("VIDEO NOT RECEIVED");
    if (!req.body.format) return res.status(400).send("FORMAT NOT RECEIVED");

    const outputPath = await convertVideo(req.file.path, req.body.format);

    fs.unlinkSync(req.file.path); 
    res.json({
      message: "Video converted successfully",
      output: outputPath
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Video conversion failed", error: err.message });
  }
}

async function handleVideoCompress(req, res) {
  try {
    if (!req.file) return res.status(400).send("VIDEO NOT RECEIVED");

    const crf = req.body.crf || 28; 
    const outputPath = await compressVideo(req.file.path, crf);

    fs.unlinkSync(req.file.path); 

    res.json({
      message: "Video compressed successfully",
      output: outputPath,
      crfUsed: crf
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Video compression failed", error: err.message });
  }
}

module.exports = {
  handleVideoConvert,
  handleVideoCompress
};
