const User = require("../models/User");
const Request = require("../models/Request");
const Session = require("../models/Session");
const Skill = require("../models/Skill");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

/* ------------------------------------
   Helper: Convert skill names to IDs
------------------------------------ */
async function convertToSkillIds(skillNames = []) {
  const ids = [];

  for (let raw of skillNames) {
    const name = raw.trim().toLowerCase();
    if (!name) continue;

    let skill = await Skill.findOne({ name });

    if (!skill) {
      try {
        skill = await Skill.create({ name });
      } catch (err) {
        if (err.code === 11000) {
          skill = await Skill.findOne({ name });
        } else {
          throw err;
        }
      }
    }

    ids.push(skill._id);
  }

  return ids;
}

/* ------------------------------------
   UPDATE PROFILE (REPLACE SKILLS ✅)
------------------------------------ */
exports.updateProfile = async (req, res) => {
  try {
    let { name, skillsTeach = [], skillsLearn = [] } = req.body;

    const normalize = (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string")
        return val.split(",").map((s) => s.trim());
      return [];
    };

    skillsTeach = normalize(skillsTeach);
    skillsLearn = normalize(skillsLearn);

    const teachIds = await convertToSkillIds(skillsTeach);
    const learnIds = await convertToSkillIds(skillsLearn);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        skillsTeach: teachIds,   // ✅ REPLACE
        skillsLearn: learnIds,   // ✅ REPLACE
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

/* ------------------------------------
   GET ALL SKILLS (Browse Skills)
------------------------------------ */
exports.getAllSkills = async (req, res) => {
  try {
    const users = await User.find()
      .select("name skillsTeach")
      .lean();

    const skillMap = {};

    users.forEach((user) => {
      if (!Array.isArray(user.skillsTeach)) return;

      user.skillsTeach.forEach((skillId) => {
        if (!mongoose.Types.ObjectId.isValid(skillId)) return;

        const id = skillId.toString();

        if (!skillMap[id]) {
          skillMap[id] = { mentors: [] };
        }

        skillMap[id].mentors.push({
  id: user._id,
  name: user.name
});

      });
    });

    const skillDocs = await Skill.find({
      _id: { $in: Object.keys(skillMap) },
    });

    const result = skillDocs.map((skill) => ({
      _id: skill._id,
      name: skill.name,
      mentors: skillMap[skill._id.toString()]?.mentors || [],
    }));

    res.json({ skills: result });
  } catch (err) {
    console.error("GET ALL SKILLS ERROR:", err);
    res.status(500).json({ msg: "Failed to load skills" });
  }
};

/* ------------------------------------
   GET MY PROFILE
------------------------------------ */
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("skillsTeach")
      .populate("skillsLearn");

    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to load profile" });
  }
};

/* ------------------------------------
   DASHBOARD STATS
------------------------------------ */
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
// GET PUBLIC PROFILE BY ID
exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("+skillsTeach +skillsLearn")
  .populate("skillsTeach", "name")
  .populate("skillsLearn", "name");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user); // important: send user directly
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ msg: "Failed to load public profile" });
  }
};



/* ------------------------------------
   UPLOAD AVATAR
------------------------------------ */
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