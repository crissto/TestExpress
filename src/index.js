const app = require("./app");

var port = 3000;
app.listen(port, function () {
  console.log("Server", process.pid, "listening on port", port);
});
