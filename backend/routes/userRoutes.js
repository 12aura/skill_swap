const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../config/passport");
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ─── Get my profile ───────────────────────────────────────
router.get("/me", auth, userController.getMyProfile);

// ─── Update profile (settings + skills) ──────────────────
router.put("/update", auth, userController.updateProfile);

// ─── Update public profile ────────────────────────────────
router.put("/public-profile", auth, userController.updatePublicProfile);

// ─── Upload avatar ────────────────────────────────────────
router.post("/upload-avatar", auth, upload.single("avatar"), userController.uploadAvatar);

// ─── Dashboard stats ──────────────────────────────────────
router.get("/stats", auth, userController.getStats);

// ─── Get all skills (public) ──────────────────────────────
router.get("/skills/all", userController.getAllSkills);

// ─── Get public profile by ID ─────────────────────────────
router.get("/public/profile/:id", userController.getPublicProfile);

// ─── Get all users ────────────────────────────────────────
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const users = await User.find().select("_id name email");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Get public profile by userId ────────────────────────
router.get("/public-profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Remove skill ─────────────────────────────────────────
router.put("/remove-skill", auth, async (req, res) => {
  const { type, skillId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "teach") {
      user.skillsTeach = user.skillsTeach.filter(
        (skill) => skill._id.toString() !== skillId
      );
    } else if (type === "learn") {
      user.skillsLearn = user.skillsLearn.filter(
        (skill) => skill._id.toString() !== skillId
      );
    } else {
      return res.status(400).json({ message: "Invalid skill type" });
    }

    await user.save();
    await user.populate("skillsTeach", "name");
    await user.populate("skillsLearn", "name");

    res.json({ message: "Skill removed", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Get users by skill ───────────────────────────────────
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

// ─── Get mentor by name ───────────────────────────────────
router.get("/mentor/:name", auth, async (req, res) => {
  try {
    const mentor = await User.findOne({ name: req.params.name })
      .select("name avatar bio skillsTeach rating reviewsCount");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;