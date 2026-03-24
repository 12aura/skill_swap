const SessionRequest = require("../models/SessionRequest");

// ✅ Send a session request
exports.sendSessionRequest = async (req, res) => {
  try {
    const { toUserId, skillId, slot, note } = req.body;
    const fromUserId = req.user.id;

    if (!toUserId || !slot) {
      return res.status(400).json({ msg: "toUserId and slot are required" });
    }

    // Prevent duplicate pending requests for same slot
    const existing = await SessionRequest.findOne({
      from: fromUserId,
      to: toUserId,
      "slot.type": slot.type,
      "slot.day": slot.day,
      "slot.date": slot.date,
      "slot.startTime": slot.startTime,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ msg: "You already have a pending request for this slot" });
    }

    const request = await SessionRequest.create({
      from: fromUserId,
      to: toUserId,
      skillId,
      slot,
      note,
    });

    // Notify the recipient via socket if available
    if (global.io) {
      global.io.to(toUserId).emit("session-request", {
        msg: "You have a new session request",
        request,
      });
    }

    res.status(201).json({ msg: "Session request sent", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get incoming session requests for logged-in user
exports.getIncomingSessionRequests = async (req, res) => {
  try {
    const requests = await SessionRequest.find({ to: req.user.id })
      .populate("from", "name avatar username")
      .populate("skillId", "name")
      .sort("-createdAt");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Accept or decline a session request
exports.updateSessionRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ msg: "Status must be accepted or declined" });
    }

    const request = await SessionRequest.findOneAndUpdate(
      { _id: req.params.id, to: req.user.id },
      { status },
      { new: true }
    ).populate("from", "name avatar");

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    // Notify the sender
    if (global.io) {
      global.io.to(request.from._id.toString()).emit("session-request-update", {
        msg: `Your session request was ${status}`,
        request,
      });
    }

    res.json({ msg: `Request ${status}`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};