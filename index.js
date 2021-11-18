// set up Express server on port 3000
const express = require("express");
const dotenv = require("dotenv");
var app = express();
dotenv.config();
const axios = require("axios");
const PORT = process.env.PORT || 3000;
const { unsplash_api } = require("./config.js");

// load js file to html
app.use(express.static("public"));
app.get("/", function (req, res) {
  // load the index.html file
  res.sendFile(__dirname + "/index.html");
});

app.get("/unsplash", async (req, response) => {
  console.log(req.headers.pageNumber);
  axios
    .get(
      `https://api.unsplash.com/search/photos?client_id=${unsplash_api}&page=${req.headers.page}&per_page=30&query=${req.headers.query}>`
    )
    .then((res) => {
      console.log("Status Code:", res.status);

      response.send(res.data);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
