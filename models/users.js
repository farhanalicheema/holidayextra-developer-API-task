const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  email: String,
  givenName: String,
  familyName: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("users", userSchema);
