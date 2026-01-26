const express = require("express");
const auth = require("../middleware/authMiddleware");
// const { scheduleSession } = require("../controllers/sessionController");
const router = express.Router();

const {
  createSessionFromRequest,
  getMySessions,
  deleteSession,
  scheduleSession,
} = require("../controllers/sessionController");

// Create session
router.post("/create-from-request", auth, createSessionFromRequest);

// Get my sessions
router.get("/my", auth, getMySessions);

// Schedule / Reschedule
router.put("/:id/schedule", auth, scheduleSession);



// Delete (cancel)
router.delete("/:id", auth, deleteSession);
// router.put("/schedule/:sessionId", auth, scheduleSession);

module.exports = router;
