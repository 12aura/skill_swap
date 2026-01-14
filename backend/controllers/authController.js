const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Skill = require("../models/Skill");


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
