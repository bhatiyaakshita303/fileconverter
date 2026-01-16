const convertToPDF = require("./pdf.convert");
const compressPDF = require("./pdf.compress");
const fs = require("fs");

exports.handlePDFConvert = async (req, res) => {
  try {
    const output = await convertToPDF(req.file.path);
    fs.unlinkSync(req.file.path);

    res.json({ message: "PDF converted", file: output });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.handlePDFCompress = async (req, res) => {
  try {
    const output = await compressPDF(req.file.path);

    fs.unlinkSync(req.file.path);

    res.json({ message: "PDF compressed", file: output });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
