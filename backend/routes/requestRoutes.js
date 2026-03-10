

const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  sendRequest,
  getIncomingRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

const router = express.Router();

router.post("/send", auth, sendRequest);
router.get("/incoming", auth, getIncomingRequests);
router.put("/:id/status", auth, updateRequestStatus);

module.exports = router;





