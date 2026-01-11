const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
console.log("auth =", auth);
console.log("upload =", upload);
console.log("upload.single =", upload?.single);

const {
  updateProfile,
  searchUsers,
  getMyProfile,
  getStats,
  uploadAvatar,
} = require("../controllers/userController");

// 🔹 Upload profile picture
router.post(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  (req, res) => {
    res.json({ msg: "TEST OK" });
  }
);



// 🔹 Search users by skill
router.get("/search", auth, searchUsers);

// 🔹 Get logged-in user's profile
router.get("/me", auth, getMyProfile);

// 🔹 Dashboard stats
router.get("/stats", auth, getStats);

module.exports = router;
