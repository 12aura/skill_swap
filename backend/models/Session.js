// const mongoose = require("mongoose");

// const sessionSchema = new mongoose.Schema({
//   host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   learner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   scheduleTime: Date,
//   status: { type: String, default: "scheduled" }
// });

// module.exports = mongoose.model("Session", sessionSchema);
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },

 date: { type: String, default: null },
    time: { type: String, default: null },
    
    notes: { type: String, default: null },

videoCallLink: {
  type: String,
},


    status: {
      type: String,
      enum: ["pending", "scheduled", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
