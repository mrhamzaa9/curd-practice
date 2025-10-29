const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DATABASE;
mongoose.connect(url)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.error(" connection failed:", err);
  });
module.exports = mongoose;