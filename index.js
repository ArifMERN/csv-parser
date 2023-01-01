const express = require("express");
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const router = require("./router/homeRouter");

const csv = require("fast-csv");
const app = express();
app.use(expressLayout);
app.use(express.static("./assets"));

// view engine setup...
app.set("views", "view");
app.set("view engine", "ejs");
app.use("/", router);

// listener to check the server status...
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Example app listening on port ${port}`);
});
