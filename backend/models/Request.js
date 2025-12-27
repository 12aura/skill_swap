const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skill: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Request", requestSchema);
