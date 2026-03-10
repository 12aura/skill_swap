// controllers/dashboardController.js
const Session = require("../models/Session");
const Request = require("../models/Request");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Pending requests sent TO me
    const skillRequests = await Request.countDocuments({
      toUser: userId,
      status: "pending",
    });

    // My active sessions not yet expired
    const now = new Date();
    const allSessions = await Session.find({
      $or: [{ userA: userId }, { userB: userId }],
      status: { $in: ["upcoming", "scheduled", "pending"] },
    });

    const activeSessions = allSessions.filter((s) => {
      if (!s.date || !s.time) return true;
      return new Date(`${s.date}T${s.time}`) > now;
    });

    // Completed sessions = skills shared
    const skillsShared = await Session.countDocuments({
      $or: [{ userA: userId }, { userB: userId }],
      status: "completed",
    });

    res.json({
      skillRequests,
      activeSessions: activeSessions.length,
      skillsShared,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};