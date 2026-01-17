const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Skill = require("../models/Skill");
// const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  try {
    let { name, email, password, skillsTeach = [], skillsLearn = [] } = req.body;

    // ✅ Convert stringified arrays to real arrays
    const normalizeSkills = (val) => {
      if (Array.isArray(val)) return val;

      if (typeof val === "string") {
        try {
          return JSON.parse(val.replace(/'/g, '"'));
        } catch {
          return [val];
        }
      }

      return [];
    };

    skillsTeach = normalizeSkills(skillsTeach);
    skillsLearn = normalizeSkills(skillsLearn);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Convert skill names → ObjectIds
    const convertToSkillIds = async (skills) => {
      const ids = [];

      for (const skillName of skills) {
        let skill = await Skill.findOne({
          name: new RegExp(`^${skillName}$`, "i"),
        });

        if (!skill) {
          skill = await Skill.create({ name: skillName });
        }

        ids.push(skill._id);
      }

      return ids;
    };

    const teachIds = await convertToSkillIds(skillsTeach);
    const learnIds = await convertToSkillIds(skillsLearn);

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      skillsTeach: teachIds,
      skillsLearn: learnIds,
    });

    const populatedUser = await User.findById(newUser._id)
      .populate("skillsTeach")
      .populate("skillsLearn");

    res.status(201).json({
      msg: "User Registered Successfully",
      user: populatedUser,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
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

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

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
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save hashed OTP
    user.otp = crypto.createHash("sha256").update(otp).digest("hex");
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    
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

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
   console.log("resetPassword called with:", { email, otp, newPassword });
  const user = await User.findOne({ email });
   console.log("Found user:", user);
  if(!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if(otp!=crypto.createHash("sha256").update(otp).digest("hex")|| Date.now() > user.otpExpiry) {
    return  res.status(400).json({ msg: "Invalid or expired OTP" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ msg: "Password reset successful" });
};


