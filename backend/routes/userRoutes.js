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

module.exports = router;
