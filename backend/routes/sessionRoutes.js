const express = require("express");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createSessionFromRequest,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");

router.post("/create-from-request", auth, createSessionFromRequest);
router.get("/my", auth, getMySessions);
router.delete("/:id", auth, deleteSession);

module.exports = router;