const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createSessionFromRequest,
  getMySessions,
  deleteSession,
  scheduleSession,
  completeSession,
  completeByRoom,
} = require("../controllers/sessionController");

router.post("/create-from-request", auth, createSessionFromRequest);
router.get("/my", auth, getMySessions);
router.put("/:id/schedule", auth, scheduleSession);
router.put("/:id/complete", auth, completeSession);
router.put("/complete-by-room/:roomId", auth, completeByRoom); // ✅ new
router.delete("/:id", auth, deleteSession);

module.exports = router;