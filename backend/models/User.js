const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skillsTeach: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill"
  }],
  skillsLearn: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill"
  }],
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);