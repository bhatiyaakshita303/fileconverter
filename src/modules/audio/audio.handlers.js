const fs = require("fs");
const convertAudio = require("./audio.convert");

async function handleConvert(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const format = req.body.format;
    if (!format) {
      return res.status(400).json({ error: "Format required" });
    }

    const outputPath = await convertAudio(req.file.path, format);

    res.download(outputPath, () => {
      fs.unlinkSync(req.file.path);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Audio convert failed" });
  }
}

module.exports = { handleConvert };