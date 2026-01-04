const User = require("../models/User");
const Request = require("../models/Request");
const Session = require("../models/Session");
// Update profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("USER FROM TOKEN =", req.user);

    const { name, skillsTeach, skillsLearn } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, skillsTeach, skillsLearn },
      { new: true }
    );

    res.json({
      msg: "Profile Updated",
      user
    });

  } catch (err) {
    res.status(500).json({ msg: "Profile Update Failed" });
  }
};
//  SEARCH USERS BY SKILL
exports.searchUsers = async (req, res) => {
  try {
    const { skill } = req.query;

    const users = await User.find({
      skillsTeach: { $regex: skill, $options: "i" }
    }).select("name skillsTeach skillsLearn");

    res.json({ users });

  } catch (err) {
    res.status(500).json({ msg: "Search failed" });
  }
};
//  GET LOGGED IN USER PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to load profile" });
  }
};

//  USER DASHBOARD STATISTICS
exports.getStats = async (req, res) => {
  try {
    const sent = await Request.countDocuments({ fromUser: req.user.id });
    const received = await Request.countDocuments({ toUser: req.user.id });
    const accepted = await Request.countDocuments({ toUser: req.user.id, status: "accepted" });
    const completedSessions = await Session.countDocuments({ learner: req.user.id, status: "completed" });

    res.json({
      sent,
      received,
      accepted,
      completedSessions
    });

  } catch (err) {
    res.status(500).json({ msg: "Stats failed" });
  }
};