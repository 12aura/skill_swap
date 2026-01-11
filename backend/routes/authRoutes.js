const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ✅ REGISTER
router.post("/register", registerUser);

// ✅ LOGIN
router.post("/login", loginUser);

// ✅ TEST PROTECTED ROUTE (optional, but useful)
router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    msg: "Protected Route Working",
    userId: req.user,
  });
});

module.exports = router;
