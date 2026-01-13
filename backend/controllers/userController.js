const User = require("../models/User");
const Request = require("../models/Request");
const Session = require("../models/Session");
const Skill = require("../models/Skill");
const cloudinary = require("../config/cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    let { skillsTeach = [], skillsLearn = [] } = req.body;

    const normalize = (val) => {
      if (Array.isArray(val)) return val;

      if (typeof val === "string") {
        try {
          return JSON.parse(val.replace(/'/g, '"'));
        } catch {
          return [val];
        }
      }
      return [];
    };

    skillsTeach = normalize(skillsTeach);
    skillsLearn = normalize(skillsLearn);
const escapeRegex = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const convertToSkillIds = async (skills) => {
  const ids = [];

  for (const skillName of skills) {
    const safeName = escapeRegex(skillName);

    let skill = await Skill.findOne({
      name: new RegExp(`^${safeName}$`, "i"),
    });

    if (!skill) {
      skill = await Skill.create({ name: skillName });
    }

    ids.push(skill._id);
  }

  return ids;
};


    const teachIds = await convertToSkillIds(skillsTeach);
    const learnIds = await convertToSkillIds(skillsLearn);

    // ✅ MERGE instead of replace
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: {
          skillsTeach: { $each: teachIds },
          skillsLearn: { $each: learnIds },
        },
      },
      { new: true }
    )
      .populate("skillsTeach")
      .populate("skillsLearn");

    res.json({ user });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ msg: "Profile update failed" });
  }
};


// ✅ SEARCH USERS
exports.searchUsers = async (req, res) => {
  try {
    const { skill } = req.query;

    const users = await User.find({
      skillsTeach: { $regex: skill, $options: "i" },
    }).select("name skillsTeach skillsLearn");

    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: "Search failed" });
  }
};

// ✅ GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("skillsTeach")
  .populate("skillsLearn");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to load profile" });
  }
};

// ✅ DASHBOARD STATS
exports.getStats = async (req, res) => {
  try {
    const sent = await Request.countDocuments({ fromUser: req.user.id });
    const received = await Request.countDocuments({ toUser: req.user.id });
    const accepted = await Request.countDocuments({
      toUser: req.user.id,
      status: "accepted",
    });
    const completedSessions = await Session.countDocuments({
      learner: req.user.id,
      status: "completed",
    });

    res.json({ sent, received, accepted, completedSessions });
  } catch (err) {
    res.status(500).json({ msg: "Stats failed" });
  }
};

// ✅ UPLOAD AVATAR
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "skill_swap_profiles",
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Image upload failed" });
  }
};
