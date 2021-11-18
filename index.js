// set up Express server on port 3000
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
// load js file to html
app.use(express.static("public"));

app.get("/", function (req, res) {
  // load the index.html file
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
