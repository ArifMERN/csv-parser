const fs = require("fs");
const multer = require("multer");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const csv = require("fast-csv");
var uploadedFiles = [];
fs.readdir("./uploads", (err, files) => {
  files.forEach((file) => {
    uploadedFiles.push(file);
  });
  if (err) {
    console.log(err);
  }
});
// parse CSV to JSON

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileLineCount = (filename) => {
  let rowCount;
  fs.readFile(filename, (err, data) => {
    if (err) {
      throw err;
    }
    // var content = data;
    // var lines = content.split("\r");
    console.log(data.split("\n"));
    rowCount = data;
    // processFile(); // Or put the next step in a function and invoke it
  });
  return rowCount;
};

// Usage

var upload = multer({
  storage,
});

module.exports = { upload, uploadedFiles, fileLineCount };
