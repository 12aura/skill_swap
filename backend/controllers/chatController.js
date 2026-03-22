const { StreamChat } = require("stream-chat");
const https = require("https");
const User = require("../models/User"); 
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const agent = new https.Agent({ rejectUnauthorized: false });
const serverClient = StreamChat.getInstance(apiKey, apiSecret);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const getStreamToken = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const name = req.user.name;
    const profilePic = req.user.profilePic;

    // Upsert the logged-in user to Stream
    await serverClient.upsertUser({
      id: userId,
      name: name,
      image: profilePic,
    });

    const token = serverClient.createToken(userId);

    res.json({
      token,
      userId,
      name,
      apiKey,
    });

  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const upsertStreamUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    await serverClient.upsertUser({
      id: targetUser._id.toString(),
      name: targetUser.name,
      image: targetUser.profilePic,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error upserting stream user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getStreamToken, upsertStreamUser };