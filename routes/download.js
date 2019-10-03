const express = require("express");
const fs = require("fs");
var archiver = require("archiver");
const router = express.Router();

const students = [
  { filename: "John" },
  { filename: "Jane" },
  { filename: "Victor" },
  { filename: "Joao" },
  { filename: "Flavio" },
  { filename: "Marcos" }
];

router.post("/", (req, res) => {
  var output = fs.createWriteStream(`public/zipFiles/certificateID.zip`);
  var archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });

  // good practice to catch this error explicitly
  archive.on("error", function(err) {
    throw err;
  });

  // pipe archive data to the file

  students.forEach(s => {
    archive.pipe(output);
    archive.file(`public/pdf/${s.filename}.pdf`, {
      name: `${s.filename}`
    });
  });

  archive.finalize();
});

module.exports = router;
