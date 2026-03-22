




const Session = require("../models/Session");
const Request = require("../models/Request");
const Notification = require("../models/Notification");
const generateVideoLink = require("../utils/generateVideoLink");
const { v4: uuidv4 } = require("uuid");

// ✅ Create session FROM request
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

    // 🔔 Notify both users that session was created
    const notificationA = await Notification.create({
      user: request.fromUser,
      message: `Your learning session for ${request.skill} has been created`,
      type: "session",
      read: false,
    });

    const notificationB = await Notification.create({
      user: request.toUser,
      message: `Your learning session for ${request.skill} has been created`,
      type: "session",
      read: false,
    });

    // realtime socket notifications
    global.io.to(request.fromUser.toString()).emit("notification", notificationA);
    global.io.to(request.toUser.toString()).emit("notification", notificationB);

    res.json({ msg: "Session created", session });
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ msg: "Session creation failed" });
  }
};

// ✅ Get my sessions
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ userA: req.user.id }, { userB: req.user.id }],
    })
      .populate("userA", "name email")
      .populate("userB", "name email")
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

// ✅ Schedule a session
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

// ✅ Delete session
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
    console.error("Delete session error:", err);
    res.status(500).json({ msg: "Failed to delete session" });
  }
};

// ✅ GET /api/sessions/completed — all completed sessions for the logged-in user
exports.getCompletedSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await Session.find({
      $or: [{ userA: userId }, { userB: userId }],
      status: "completed",
    })
      .populate("userA", "name avatar")
      .populate("userB", "name avatar")
      .populate("skill", "name category")
      .sort({ updatedAt: -1 })
      .lean();

    const shaped = sessions.map((s) => {
      const isTaught = s.userB?._id?.toString() === userId.toString();
      const partner  = isTaught ? s.userA : s.userB;

      return {
        _id:           s._id,
        skillName:     s.skill?.name     || "Skill Exchange",
        skillCategory: s.skill?.category || null,
        role:          isTaught ? "teacher" : "learner",
        isTaught,
        partnerName:   partner?.name     || "Unknown",
        partnerAvatar: partner?.avatar   || null,
        scheduledAt:   s.date ? `${s.date}T${s.time || "00:00"}` : null,
        duration:      s.duration        || null,
        rating:        s.rating          || null,
        notes:         s.notes           || null,
        createdAt:     s.createdAt,
      };
    });

    return res.status(200).json({ sessions: shaped, total: shaped.length });
  } catch (err) {
    console.error("getCompletedSessions error:", err);
    return res.status(500).json({ message: "Failed to fetch completed sessions" });
  }
};