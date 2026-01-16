const { exec } = require("child_process");
const path = require("path");

function compressPDF(inputPath) {
  return new Promise((resolve, reject) => {
    const parsed = path.parse(inputPath);
    const outputPath = path.join(parsed.dir, `${parsed.name}.pdf`);

    const cmd = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
-dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH \
-sOutputFile="${outputPath}" "${inputPath}"`;

    exec(cmd, (error) => {
      if (error) return reject("PDF compression failed");
      resolve(outputPath);
    });
  });
}

module.exports = compressPDF;
