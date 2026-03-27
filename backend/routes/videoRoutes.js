
const express = require("express");
const router = express.Router();
const { StreamClient } = require("@stream-io/node-sdk");
const OpenAI = require("openai");
const apiKey    = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing from .env");
}

const client = new StreamClient(apiKey, apiSecret);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
router.post("/token", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId is required" });

  const token = client.generateUserToken({ user_id: userId });
  res.json({ token });
});

// Returns list of transcriptions for a given call (called after call ends)
router.get("/transcriptions/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const call = client.video.call("default", roomId);
    const response = await call.listTranscriptions();
    res.json({ transcriptions: response.transcriptions || [] });
  } catch (err) {
    console.error("Failed to fetch transcriptions:", err);
    res.status(500).json({ error: "Failed to fetch transcriptions" });
  }
});

module.exports = router;