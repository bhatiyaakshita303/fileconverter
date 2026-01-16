const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Absolute uploads folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

async function compressImage(inputPath, quality = 100) {
  quality = Number(quality);
  if (isNaN(quality) || quality < 1 || quality > 100) {
    quality = 100;
  }

  const outputPath = path.join(uploadDir, `compressed-${Date.now()}.jpeg`);

  await sharp(inputPath)
    .jpeg({ quality })
    .toFile(outputPath);

  return outputPath;
}

module.exports = compressImage;
