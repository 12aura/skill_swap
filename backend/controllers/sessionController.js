const Session = require("../models/Session");
const Request = require("../models/Request");
const generateVideoLink = require("../utils/generateVideoLink");
const { sendSystemMessage } = require("./messageController");
const { v4: uuidv4 } = require("uuid");

// ✅ Create session FROM request
exports.createSessionFromRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId);

    if (!request || request.status !== "accepted") {
      return res.status(400).json({ msg: "Invalid request" });
    }

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
    const sessions = await Session.find({
      $or: [{ userA: req.user.id }, { userB: req.user.id }],
    })
      .populate("userA userB")
      .sort({ createdAt: -1 });

    const now = new Date();

    for (const s of sessions) {
      if (s.date && s.time && s.status === "scheduled") {
        const sessionDate = new Date(`${s.date} ${s.time}`);
        if (sessionDate < now) {
          s.status = "completed";
          await s.save();
        }
      }
    }

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// ❌ Delete session
exports.deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete session" });
  }
};

// 📍 backend/controllers/sessionController.js




// SCHEDULE SESSION
exports.scheduleSession = async (req, res) => {
  try {
    const { date, time, notes } = req.body;

    // ✅ Generate unique room ID
    const roomId = uuidv4();

    // ✅ Generate video call link
    const videoCallLink = `http://localhost:5173/video-call/${roomId}`;

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      {
        date,
        time,
        notes,
        status: "upcoming",
        videoCallLink,   // 👈 VERY IMPORTANT
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Session scheduled successfully",
      session,
    });

  } catch (error) {
    console.error("Schedule session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to schedule session",
    });
  }
};
