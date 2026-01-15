const User = require("../models/User");

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name avatar bio skillsTeach skillsLearn createdAt")
      .populate("skillsTeach", "name")
      .populate("skillsLearn", "name");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ msg: "Failed to load public profile" });
  }
};
