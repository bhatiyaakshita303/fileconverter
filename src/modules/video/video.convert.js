const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const ffmpegPath = require("ffmpeg-static");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

async function convertVideo(inputPath, format) {
  return new Promise((resolve, reject) => {
    if (!format) return reject(new Error("Target format not provided"));

    if (!fs.existsSync(inputPath)) {
      return reject(new Error("Input file does not exist"));
    }

    const parsed = path.parse(inputPath);
    const outputPath = path.join(uploadDir,`${parsed.name}-converted.${format}`
    );

    const cmd = `"${ffmpegPath}" -y -i "${inputPath}" "${outputPath}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg ERROR", stderr);
        return reject(new Error(stderr));
      }
      resolve(outputPath);
    });
  });
}

module.exports = convertVideo;