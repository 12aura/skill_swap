const express = require("express");
const router = express.Router();

router.post("/send-otp", (req, res) => {
  res.json({ success: true, message: "OTP route working" });
});

module.exports = router;
