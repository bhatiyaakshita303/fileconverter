const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

function convertAudio(inputPath, format) {
  return new Promise((resolve, reject) => {
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const outputPath = path.join(uploadsDir, `audio-${Date.now()}.${format}`);

    console.log("Converting:", inputPath, "=>", outputPath);

    ffmpeg(inputPath)
      .toFormat(format)
      .on("start", cmd => console.log("FFmpeg command:", cmd))
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", err => {
        console.error("FFmpeg error:", err);
        reject(err);
      })
      .save(outputPath);
  });
}

module.exports = convertAudio;