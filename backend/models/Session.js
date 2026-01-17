// const mongoose = require("mongoose");

// const sessionSchema = new mongoose.Schema({
//   host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   learner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   scheduleTime: Date,
//   status: { type: String, default: "scheduled" }
// });

// module.exports = mongoose.model("Session", sessionSchema);
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  },
  scheduledAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
