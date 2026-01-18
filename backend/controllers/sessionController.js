const Session = require("../models/Session");
const Request = require("../models/Request");

// ✅ Create session FROM request
exports.createSessionFromRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId);

    if (!request || request.status !== "accepted") {
      return res.status(400).json({ msg: "Invalid request" });
    }

    // prevent duplicate sessions
    const existing = await Session.findOne({
      userA: request.fromUser,
      userB: request.toUser,
      skill: request.skill,
    });

    if (existing) {
      return res.json({ msg: "Session already exists", session: existing });
    }

    const session = await Session.create({
      userA: request.fromUser,
      userB: request.toUser,
      skill: request.skill,
    });

    res.json({ msg: "Session created", session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Session creation failed" });
  }
};

// ✅ Get my sessions
exports.getMySessions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch sessions where user is either user1 or user2
    const sessions = await Session.find({
      $or: [{ userA: req.user.id }, { userB: req.user.id }],
    })
      .populate("userA", "name email")
      .populate("userB", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ❌ Delete session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    // Allow only participants
    if (
      session.userA.toString() !== req.user.id &&
      session.userB.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await session.deleteOne();
    res.json({ msg: "Session deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete session" });
  }
};
