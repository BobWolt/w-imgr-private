// config.js
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  unsplash_api: process.env.UNSPLASH_API_KEY,
  port: process.env.PORT,
};
