var express = require("express");
const bodyparser = require("body-parser");

const api = require("./routes/api");

var app = express();

app.use(bodyparser.json());
app.use(express.static(__dirname));
app.use("/api", api);

app.get("/", function (req, res) {
  res.render("index.html");
});

module.exports = app;
