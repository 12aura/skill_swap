const Message = require("../models/Message");

/* ---------------------------
   SEND MESSAGE
---------------------------- */
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      text,
    });

    const populated = await message.populate(
      "sender receiver",
      "name email"
    );

    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send message" });
  }
};

/* ---------------------------
   GET CHAT BETWEEN USERS
---------------------------- */
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "name email");

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load messages" });
  }
};
exports.sendSystemMessage = async (receiverId, content) => {
  await Message.create({
    sender: null,
    receiver: receiverId,
    content,
    isSystem: true,
  });
};