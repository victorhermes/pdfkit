const express = require("express");
const fs = require("fs");
var archiver = require("archiver");
const router = express.Router();

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
];

router.post("/", (req, res) => {
  /*var output = fs.createWriteStream(
    `public/zipFiles/certificateID_${Math.random()}.zip`
  );*/

  var archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });

  // good practice to catch this error explicitly
  archive.on("error", function(err) {
    throw err;
  });

  // pipe archive data to the file
  // archive.pipe(res) baixa os arquivos
  // archive.pipe(res.attachment("certificateID.zip")); baixa o download com nome
  // archive.pipe(output) baixa para uma pasta dentro do app

  archive.pipe(res.attachment("certificateID.zip"));

  students.map(s => {
    archive.file(`public/pdf/${s.filename}.pdf`, {
      name: `${s.filename}.pdf`
    });
  });

  archive.finalize();
});

module.exports = router;
