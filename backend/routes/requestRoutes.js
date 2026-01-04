const express = require("express");
const { getReceivedRequests, sendRequest, updateRequest } = require("../controllers/requestController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/received", auth, getReceivedRequests);
router.post("/send", auth, sendRequest);
router.put("/update", auth, updateRequest);

module.exports = router;
