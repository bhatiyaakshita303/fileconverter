const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const sofficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function convertToPDF(inputPath) {
  return new Promise((resolve, reject) => {
    const cmd = `${sofficePath} --headless --convert-to pdf "${inputPath}" --outdir "${uploadDir}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("LibreOffice error:", stderr);
        return reject("PDF conversion failed");
      }

      const parsed = path.parse(inputPath);
      const outputPath = path.join(uploadDir, `${parsed.name}.pdf`);
      resolve(outputPath);
    });
  });
}

module.exports = convertToPDF;
