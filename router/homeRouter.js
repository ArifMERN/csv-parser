const router = require("express").Router();
const { upload, uploadedFiles, fileLineCount } = require("../utils/csvFile");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

// home page
router.get("/", (req, res) => {
  res.render("Home", { file: uploadedFiles });
});
// get the file
router.get("/:file", async (req, res) => {
  const file = req.params.file;
  const s = req.query.s || 1;
  const e = req.query.e || 20;
  // console.log(s, e);

  var data = [];
  var keys = [];
  var search = "";

  if (uploadedFiles.includes(file)) {
    const location = path.resolve(__dirname, "..", "uploads", file);

    await fs
      .createReadStream(location)
      .pipe(parse({ delimiter: ",", from_line: 1, to_line: 1 }))
      .on("data", function (row) {
        keys.push(row);
      })
      .on("end", function () {
        // console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
    await fs
      .createReadStream(location)
      .pipe(parse({ delimiter: ",", from_line: s, to_line: e }))
      .on("data", function (row) {
        data.push(row);
      })
      .on("end", function () {
        res.render("csvRead", { data: data, search: search, keys });
      })
      .on("error", function (error) {
        console.log(error.message);
      });
  } else {
    res.send("file not found");
  }

  // console.log(data);
});
// upload the file
router.post("/upload", upload.single("avatar"), (req, res, next) => {
  if (!req.file) {
    return res.send("file is required");
  }
  uploadedFiles.push(req.file.filename);
  // res.send("uploaded");
  return res.redirect("/");
});

module.exports = router;
