const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const ffmpegPath = require("ffmpeg-static");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

async function compressVideo(inputPath, crf = 28) {
  return new Promise((resolve, reject) => {
    crf = Number(crf);
    if (isNaN(crf) || crf < 0 || crf > 51) crf = 28;

    if (!fs.existsSync(inputPath)) {
      return reject(new Error("Input file does not exist"));
    }

    const parsed = path.parse(inputPath);
    const outputPath = path.join(uploadDir, `${parsed.name}-compressed.mp4`);

    const cmd = `"${ffmpegPath}" -i "${inputPath}" -vcodec libx264 -crf ${crf} -preset fast -acodec aac -y "${outputPath}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg FULL ERROR", stderr);
        return reject(new Error(stderr || "Video compression failed"));
      }
      resolve(outputPath);
    });
  });
}

module.exports = compressVideo;
