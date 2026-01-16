const express = require("express");
const router = express.Router();
const { getPublicProfile } = require("../controllers/userController");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const userController = require("../controllers/userController");

// ==============================
// USER ROUTES
// ==============================

// UPDATE PROFILE
router.put("/update", auth, userController.updateProfile);

// UPLOAD AVATAR
router.post(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  userController.uploadAvatar
);

// GET MY PROFILE
router.get("/me", auth, userController.getMyProfile);

// DASHBOARD STATS
router.get("/stats", auth, userController.getStats);

// GET ALL SKILLS (PUBLIC)
router.get("/skills/all", userController.getAllSkills);


router.get("/public/profile/:id", getPublicProfile);

// PUBLIC mentor profile
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
