
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: String,

//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },

//     password: String,

//     // Authentication
//     authProvider: {
//       type: String,
//       enum: ["local", "google"],
//       default: "local",
//     },

//     googleId: String,

//     // Skills
//     skillsTeach: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Skill",
//       },
//     ],

//     skillsLearn: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Skill",
//       },
//     ],

//     // OTP
//     otp: String,
//     otpExpiry: Date,

//     // -------- PUBLIC PROFILE --------
//     tagline: {
//       type: String,
//       maxLength: 100,
//       default: "",
//     },

//     bio: {
//       type: String,
//       maxLength: 500,
//       default: "",
//     },

//     demoVideo: {
//       type: String,
//       default: "",
//     },

//     avatar: {
//       type: String,
//       default: "",
//     },

//     // -------- SETTINGS --------
//     gender: {
//       type: String,
//       default: "",
//     },

//     location: {
//       type: String,
//       default: "",
//     },

//     birthday: {
//       type: String,
//       default: "",
//     },

//     work: {
//       type: String,
//       default: "",
//     },

//     education: {
//       type: String,
//       default: "",
//     },

//     username: {
//       type: String,
//       default: "",
//     },

//     language: {
//       type: String,
//       default: "English",
//     },

//    // -------- GAMIFICATION --------
//     xp: {
//       type: Number,
//       default: 0,
//     },

//     // ✅ ADD THESE TWO BLOCKS HERE ↓

//     xpEvents: {
//       type: [String],
//       default: [],
//     },

//     badges: [
//       {
//         id:          { type: String, required: true },
//         title:       { type: String, required: true },
//         description: { type: String, default: "" },
//         icon:        { type: String, default: "🏅" },
//         earnedAt:    { type: Date,   default: Date.now },
//       },
//     ],

//     // -------- REVIEWS --------
//     averageRating: {
//       type: Number,
//       default: null,
//     },

//     totalReviews: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

// 🔹 Availability Schema
const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String, // "18:00"
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

// 🔹 Skill Teach Schema (UPDATED)
const skillTeachSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
  },
  availability: {
    type: [availabilitySchema],
    default: [],
  },
});

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: String,

    // Authentication
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: String,

    // 🔥 UPDATED HERE
    skillsTeach: [skillTeachSchema],

    // Keep this same
    skillsLearn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    // OTP
    otp: String,
    otpExpiry: Date,

    // -------- PUBLIC PROFILE --------
    tagline: {
      type: String,
      maxLength: 100,
      default: "",
    },

    bio: {
      type: String,
      maxLength: 500,
      default: "",
    },

    demoVideo: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    // -------- SETTINGS --------
    gender: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    birthday: {
      type: String,
      default: "",
    },

    work: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "English",
    },

    // -------- GAMIFICATION --------
    xp: {
      type: Number,
      default: 0,
    },

    xpEvents: {
      type: [String],
      default: [],
    },

    badges: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        icon: { type: String, default: "🏅" },
        earnedAt: { type: Date, default: Date.now },
      },
    ],

    // -------- REVIEWS --------
    averageRating: {
      type: Number,
      default: null,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);