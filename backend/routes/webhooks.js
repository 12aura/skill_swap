const express = require("express");
const Session = require("../models/Session");

const router = express.Router();

router.post("/stream", async (req, res) => {
  const event = req.body;

  if (event.type === "call.recording_ready") {
    const roomId = event.call.id;
    const recordingUrl = event.call_recording.url;
    const duration = event.call_recording.duration;

    try {
      await Session.findOneAndUpdate(
        { videoCallLink: { $regex: roomId } },
        {
          recordingUrl,
          recordingDuration: duration,
          recordingCreatedAt: new Date(),
        }
      );
      console.log("Recording saved for room:", roomId);
    } catch (err) {
      console.error("Failed to save recording:", err);
    }
  }

  // ✅ Always 200 — Stream will keep retrying if it doesn't get 200
  res.status(200).json({ received: true });
});

module.exports = router;