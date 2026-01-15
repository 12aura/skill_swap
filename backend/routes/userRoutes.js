const express = require("express");
const router = express.Router();
const { getMentorProfile } = require("../controllers/userController");

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



module.exports = router;
