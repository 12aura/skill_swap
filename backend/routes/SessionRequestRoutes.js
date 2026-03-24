const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  sendSessionRequest,
  getIncomingSessionRequests,
  updateSessionRequestStatus,
} = require("../controllers/sessionRequestController");

// POST: send a session request to another user
router.post("/", auth, sendSessionRequest);

// GET: get all incoming session requests for logged-in user
router.get("/incoming", auth, getIncomingSessionRequests);

// PUT: accept or decline a session request
router.put("/:id/status", auth, updateSessionRequestStatus);

module.exports = router;