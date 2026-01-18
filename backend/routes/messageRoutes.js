const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ------------------------
   SEND MESSAGE
------------------------- */
router.post("/send", auth, sendMessage);

/* ------------------------
   GET CHAT WITH USER
------------------------- */
router.get("/:userId", auth, getMessages);

module.exports = router;
