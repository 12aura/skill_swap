const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scheduleTime: Date,
  status: { type: String, default: "scheduled" }
});

module.exports = mongoose.model("Session", sessionSchema);
