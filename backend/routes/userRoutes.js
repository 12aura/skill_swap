const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  updateProfile,
  searchUsers,
  getMyProfile,
  getStats,
  uploadAvatar,
} = require("../controllers/userController");

const User = require("../models/User"); // Import User model for remove skill route

// ==============================
// ROUTES
// ==============================

// ✅ UPDATE PROFILE
router.put("/update", auth, updateProfile);

// ✅ UPLOAD AVATAR
router.post("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

// ✅ SEARCH USERS
router.get("/search", auth, searchUsers);

// ✅ GET MY PROFILE
router.get("/me", auth, getMyProfile);

// ✅ STATS
router.get("/stats", auth, getStats);

// manshi
router.get("/by-skill", async (req, res) => {
  try {
    const { skill } = req.query;

    const users = await User.find({
      skills: { $regex: skill, $options: "i" },
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ REMOVE SKILL
router.put("/remove-skill", auth, async (req, res) => {
  const { type, skillId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "teach") {
      user.skillsTeach = user.skillsTeach.filter(id => id.toString() !== skillId);
    } else if (type === "learn") {
      user.skillsLearn = user.skillsLearn.filter(id => id.toString() !== skillId);
    } else {
      return res.status(400).json({ message: "Invalid skill type" });
    }

    await user.save();

    // Populate skill names for frontend
    await user.populate("skillsTeach", "name");
    await user.populate("skillsLearn", "name");

    res.json({ message: "Skill removed", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;