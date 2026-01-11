const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skillsTeach: [String],
  skillsLearn: [String],
  xp: { type: Number, default: 0 },
  badges: [String],
  avatar: {
  type: String,
  default: "",
},
});


module.exports = mongoose.model("User", userSchema);
