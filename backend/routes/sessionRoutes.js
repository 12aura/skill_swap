const express = require("express");
const router = express.Router();
const {
  createSession,
  getUserSessions,
  updateSessionStatus,
} = require("../controllers/sessionController");

// Create a new session
router.post("/", createSession);

// Get all sessions for a user
router.get("/user/:userId", getUserSessions);

// Update session status
router.put("/:id", updateSessionStatus);

module.exports = router;
