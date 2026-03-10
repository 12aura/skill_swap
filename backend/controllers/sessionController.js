const Session = require("../models/Session");
const Request = require("../models/Request");
const generateVideoLink = require("../utils/generateVideoLink");
const { v4: uuidv4 } = require("uuid");

exports.createSessionFromRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await Request.findById(requestId);
    if (!request || request.status !== "accepted") {
      return res.status(400).json({ msg: "Invalid or unaccepted request" });
    }
    const session = await Session.create({
      userA: request.fromUser,
      userB: request.toUser,
      skill: request.skill,
      status: "pending",
    });
    res.json({ msg: "Session created", session });
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ msg: "Session creation failed" });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ userA: req.user.id }, { userB: req.user.id }],
    })
      .populate("userA userB")
      .sort({ createdAt: -1 });

    const now = new Date();
    for (const s of sessions) {
      if (s.date && s.time && (s.status === "upcoming" || s.status === "scheduled")) {
        const sessionDateTime = new Date(`${s.date}T${s.time}`);
        const expiryTime = new Date(sessionDateTime.getTime() + 60 * 60 * 1000);
        if (now > expiryTime) {
          s.status = "completed";
          await s.save();
        }
      }
    }
    res.json(sessions);
  } catch (error) {
    console.error("Fetch sessions error:", error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

exports.scheduleSession = async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const roomId = uuidv4();
    const videoCallLink = `http://localhost:5173/video-call/${roomId}`;
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { date, time, notes, status: "upcoming", videoCallLink },
      { new: true }
    );
    if (!session) return res.status(404).json({ success: false, message: "Session not found" });
    res.status(200).json({ success: true, message: "Session scheduled", session });
  } catch (error) {
    console.error("Schedule session error:", error);
    res.status(500).json({ success: false, message: "Failed to schedule session" });
  }
};

// ✅ Complete by session ID
exports.completeSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ success: true, session });
  } catch (error) {
    console.error("Complete session error:", error);
    res.status(500).json({ message: "Failed to complete session" });
  }
};

// ✅ Complete by roomId (used when leaving video call)
exports.completeByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    // videoCallLink contains the roomId in the URL
    const session = await Session.findOneAndUpdate(
      { videoCallLink: { $regex: roomId } },
      { status: "completed" },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ success: true, session });
  } catch (error) {
    console.error("Complete by room error:", error);
    res.status(500).json({ message: "Failed to complete session" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Delete session error:", error);
    res.status(500).json({ message: "Failed to delete session" });
  }
};