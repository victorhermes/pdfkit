const express = require("express");
const fs = require("fs");
const router = express.Router();
const PDFDocument = require("pdfkit");

const students = [
  { filename: "John" },
  { filename: "Jane" },
  { filename: "Victor" },
  { filename: "Joao" },
  { filename: "Flavio" },
  { filename: "Marcos" }
];

router.post("/", (req, res) => {
  try {
    students.forEach(s => {
      const doc = new PDFDocument({
        layout: "landscape"
      });

      const pdfStream = fs.createWriteStream(
        `public/pdf/${s.filename}_${Math.random()}.pdf`
      );

      // Stripping special characters
      //filename = encodeURIComponent(filename) + '.pdf'
      // Setting response to 'attachment' (download).
      // If you use 'inline' here it will automatically open the PDF
      //res.setHeader('Content-disposition', 'inline; filename="' + filename + '"')
      //res.setHeader('Content-type', 'application/pdf')
      doc.fontSize(40).text(s.filename, { align: "center" }, 315);
      doc.image("public/images/cert.png", 10, 35, { width: 770 });
      doc.pipe(pdfStream);
      doc.end();
    });
  } catch (err) {
    console.error("MakePDF ERROR: " + err.message);
  } finally {
    res.redirect("/");
  }
});

module.exports = router;
