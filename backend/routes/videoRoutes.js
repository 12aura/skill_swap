const express = require("express");
const router = express.Router();
const { StreamClient } = require("@stream-io/node-sdk");

const apiKey    = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing from .env");
}

const client = new StreamClient(apiKey, apiSecret);

router.post("/token", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const token = client.generateUserToken({ user_id: userId });
  res.json({ token });
});

module.exports = router;