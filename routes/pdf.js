const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')

router.post('/', (req, res) => {
  const doc = new PDFDocument({
    layout : 'landscape'
    });
    
  let filename = req.body.filename
  let content = req.body.content
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'inline; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  doc.fontSize(40).text(content, { align: 'center', valign: 'center' });
  doc.image('public/images/cert.png', 10, 35, {width: 770});
  doc.pipe(res)
  doc.end()
})

module.exports = router