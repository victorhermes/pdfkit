const express = require("express");
const fs = require("fs");
var archiver = require("archiver");
const router = express.Router();

const students = [
  { filename: "Flavio_047298037519049063" },
  { filename: "Jane_07778770537539839" },
  { filename: "Joao_06017049756481219" },
  { filename: "John_03773756643909971" },
  { filename: "Marcos_00030717703315690237" },
  { filename: "Victor_008337815985709884" }
];

router.post("/", (req, res) => {
  var output = fs.createWriteStream(
    `public/zipFiles/certificateID_${Math.random()}.zip`
  );
  var archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });

  // good practice to catch this error explicitly
  archive.on("error", function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  students.forEach(s => {
    archive.file(`public/pdf/${s.filename}.pdf`, {
      name: `${s.filename}.pdf`
    });
  });

  archive.finalize();
});

module.exports = router;
