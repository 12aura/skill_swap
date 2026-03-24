const mongoose = require("mongoose");

const sessionRequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
    slot: {
      type: {
        type: String,
        enum: ["weekly", "specific"],
        required: true,
      },
      day: { type: String, default: "" },       // for weekly
      date: { type: String, default: "" },      // for specific "YYYY-MM-DD"
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    note: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SessionRequest", sessionRequestSchema);