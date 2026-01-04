const express = require("express");
const { updateProfile, searchUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const { getMyProfile, getStats } = require("../controllers/userController");

const router = express.Router();

router.put("/update", auth, updateProfile);

module.exports = router;

router.get("/search", auth, searchUsers);

router.get("/me", auth, getMyProfile);

router.get("/stats", auth, getStats);
