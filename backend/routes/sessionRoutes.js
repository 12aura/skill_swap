

// const express = require("express");
// const auth = require("../middleware/authMiddleware");
// const router = express.Router();

// const {
//   createSessionFromRequest,
//   getMySessions,
//   deleteSession,
//   scheduleSession,
//   completeSession,
//   completeByRoom,
//   getCompletedSessions, // ✅ new
// } = require("../controllers/sessionController");

// router.post("/create-from-request", auth, createSessionFromRequest);
// router.get("/", auth, getMySessions);  
// router.get("/my", auth, getMySessions);
// router.get("/completed", auth, getCompletedSessions); // ✅ new — must be BEFORE /:id routes

// router.put("/:id/schedule", auth, scheduleSession);
// router.put("/:id/complete", auth, completeSession);
// router.put("/complete-by-room/:roomId", auth, completeByRoom);
// router.delete("/:id", auth, deleteSession);

// module.exports = router;

const express = require("express");
const auth = require("../middleware/authMiddleware");
const Session = require("../models/Session"); // ✅ needed for the recording route
const router = express.Router();

const {
  createSessionFromRequest,
  getMySessions,
  deleteSession,
  scheduleSession,
  completeSession,
  completeByRoom,
  getCompletedSessions,
} = require("../controllers/sessionController");

router.post("/create-from-request", auth, createSessionFromRequest);
router.get("/", auth, getMySessions);
router.get("/my", auth, getMySessions);
router.get("/completed", auth, getCompletedSessions); // ✅ must stay BEFORE /:id routes

// ✅ Recording route — also before /:id to avoid conflict
router.get("/:sessionId/recording", auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // ✅ Only participants can access the recording
    const userId = req.user._id.toString();
    const isParticipant =
      session.teacherId?.toString() === userId ||
      session.learnerId?.toString() === userId;

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      recordingUrl: session.recordingUrl || null,
      duration: session.recordingDuration || null,
      createdAt: session.recordingCreatedAt || null,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/schedule", auth, scheduleSession);
router.put("/:id/complete", auth, completeSession);
router.put("/complete-by-room/:roomId", auth, completeByRoom);
router.delete("/:id", auth, deleteSession);

module.exports = router;