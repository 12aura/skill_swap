
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
