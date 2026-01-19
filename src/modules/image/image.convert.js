const sharp = require("sharp");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

async function convertImage(inputPath, format) {
  if (!format) throw new Error("Target format not provided");
  format = format.toLowerCase().trim();

  const parsed = path.parse(inputPath);
  const sharpOutputPath = path.join(uploadDir, `${parsed.name}.${format}`);

  try {
    await sharp(inputPath)
      .toFormat(format)
      .toFile(sharpOutputPath);

    return sharpOutputPath;
  } catch (sharpError) {
    console.warn("Sharp failed, falling back to ImageMagick:", sharpError.message);

    return new Promise((resolve, reject) => {
      const imOutputPath = path.join(uploadDir, `${parsed.name}.${format}`);
      const cmd = `magick "${inputPath}" "${imOutputPath}"`;

      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error("ImageMagick error:", stderr);
          return reject(new Error("Conversion failed: " + stderr));
        }
        resolve(imOutputPath);
      });
    });
  }
}

module.exports = convertImage;