const express = require("express");
const { createSession, getMySessions, updateSession } = require("../controllers/sessionController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", auth, createSession);
router.get("/my", auth, getMySessions);
router.put("/update", auth, updateSession);

module.exports = router;
