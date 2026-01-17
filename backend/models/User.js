const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // manshi
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  googleId: String,

  skillsTeach: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill"
  }],
  skillsLearn: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill"
  }],
  otp: String,
  otpExpiry: Date,

  // manshi

}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);