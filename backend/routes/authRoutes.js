const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/authController");

// forgot password
router.post("/forgot-password", forgotPassword);

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

const passport = require("passport");
const jwt = require("jsonwebtoken");

// Start Google login
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`http://localhost:5173/login-success?token=${token}`);
  }
);


module.exports = router;
