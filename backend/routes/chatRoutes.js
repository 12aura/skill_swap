const express = require("express");
const router = express.Router();
const { getStreamToken, upsertStreamUser } = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware");

router.get("/token", protect, getStreamToken);
router.post("/upsert-user/:id", protect, upsertStreamUser); 
module.exports = router;