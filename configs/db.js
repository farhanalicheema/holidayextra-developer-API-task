// Connecting to DataBase
const mongoose = require("mongoose");
const config = require("./config");
const db = mongoose.connect(
  config.dbURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log("unable to connect to DB");
    } else {
      console.log("Connected To DB");
    }
  }
);

module.exports = db;
