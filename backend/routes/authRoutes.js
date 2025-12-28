const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

router.get("/me", authMiddleware, async (req, res) => {
  res.json({ msg: "Protected Route Working", userId: req.user });
});
