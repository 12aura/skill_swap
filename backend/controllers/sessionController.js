const Session = require("../models/Session");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { user1, user2, skill, scheduledAt } = req.body;

    if (!user1 || !user2 || !skill) {
      return res.status(400).json({ message: "user1, user2, and skill are required" });
    }

    const session = await Session.create({
      user1,
      user2,
      skill,
      scheduledAt: scheduledAt || null,
    });

    res.status(201).json(session);
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions for a user
exports.getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch sessions where user is either user1 or user2
    const sessions = await Session.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "name email") // show only name and email
      .populate("user2", "name email")
      .sort({ scheduledAt: -1 });

    res.json(sessions);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update session status
exports.updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const session = await Session.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (err) {
    console.error("Error updating session:", err);
    res.status(500).json({ message: "Server error" });
  }
};
