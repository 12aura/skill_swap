
// const auth = require("../middleware/authMiddleware");
// const express = require("express");

// const router = express.Router();

// const {
//   createSessionFromRequest,
//   getMySessions,
//   deleteSession,
//   scheduleSession,
//   completeSession,
//   completeByRoom,
//   getCompletedSessions, // ✅ new
// } = require("../controllers/sessionController");

// router.post("/create-from-request", auth, createSessionFromRequest);
// router.get("/my", auth, getMySessions);
// router.get("/completed", auth, getCompletedSessions); // ✅ new — must be BEFORE /:id routes

// router.put("/:id/schedule", auth, scheduleSession);
// router.put("/:id/complete", auth, completeSession);
// router.put("/complete-by-room/:roomId", auth, completeByRoom);
// router.delete("/:id", auth, deleteSession);

// module.exports = router;




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
  getCompletedSessions, // ✅ new
} = require("../controllers/sessionController");

router.post("/create-from-request", auth, createSessionFromRequest);
router.get("/", auth, getMySessions);  
router.get("/my", auth, getMySessions);
router.get("/completed", auth, getCompletedSessions); // ✅ new — must be BEFORE /:id routes

router.put("/:id/schedule", auth, scheduleSession);
router.put("/:id/complete", auth, completeSession);
router.put("/complete-by-room/:roomId", auth, completeByRoom);
router.delete("/:id", auth, deleteSession);

module.exports = router;