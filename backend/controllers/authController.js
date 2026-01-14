
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, skillsTeach, skillsLearn } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Email already registered" });

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      skillsTeach,
      skillsLearn
    });

    res.json({ msg: "User Registered Successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Registration Failed" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "7d" });

    res.json({
      msg: "Login Successful",
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ msg: "Login Failed" });
  }
};

// password otp
const crypto = require("crypto");
const nodemailer = require("nodemailer");


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "SkillSwap Password Reset OTP",
      html: `<h2>Your OTP is:</h2><h1>${otp}</h1><p>Valid for 10 minutes</p>`,
    });

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
  console.error("EMAIL ERROR:", err);
  res.status(500).json({ msg: "Failed to send OTP" });
}

};

