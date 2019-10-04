const express = require("express");
const fs = require("fs");
const router = express.Router();
const PDFDocument = require("pdfkit");

const students = [
  { filename: "John" },
  { filename: "Jane" },
  { filename: "Victor" },
  { filename: "Joao" },
  { filename: "Jorge" },
  { filename: "Paulo" },
  { filename: "Gustavo" },
  { filename: "Heitor" },
  { filename: "Marcos" },
  { filename: "Kris" },
  { filename: "Cris" },
  { filename: "Caio" },
  { filename: "Luan" },
  { filename: "Jairo" },
  { filename: "Michel" },
  { filename: "Nick" },
  { filename: "Monique" },
  { filename: "Marlon" },
  { filename: "Joel" },
  { filename: "Santana" },
  { filename: "Wagner" },
  { filename: "Loverson" },
  { filename: "Flaviun" },
  { filename: "Janilo" },
  { filename: "Danilo" },
  { filename: "Daniel" },
  { filename: "Daniele" },
  { filename: "Dani" },
  { filename: "Donis" },
  { filename: "Tino" },
  { filename: "Tenor" },
  { filename: "Janes" },
  { filename: "Victors" },
  { filename: "Joaos" }
];

router.post("/", (req, res) => {
  try {
    students.map(s => {
      const doc = new PDFDocument({
        layout: "landscape"
      });

      const pdfStream = fs.createWriteStream(`public/pdf/${s.filename}.pdf`);

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
