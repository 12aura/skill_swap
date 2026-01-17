const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  sendRequest,
  getIncomingRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

// Send request
router.post("/send", auth, sendRequest);

// Get incoming requests
router.get("/incoming", auth, getIncomingRequests);

// Update request status
router.put("/:id/status", auth, updateRequestStatus);

module.exports = router;
