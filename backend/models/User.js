// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   resetOTP: String,
// resetOTPExpire: Date,

//   skillsTeach: [String],
//   skillsLearn: [String],
//   xp: { type: Number, default: 0 },
//   badges: [String],
//   avatar: {
//   type: String,
//   default: "",
// },
// });


// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: false,   // ✅ allow Google users
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  resetOTP: String,
  resetOTPExpire: Date,

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
