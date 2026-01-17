
const Request = require("../models/Request");
const User = require("../models/User");
exports.sendRequest = async (req, res) => {
  try {
    const { toUser, skill } = req.body;

    const newReq = await Request.create({
      fromUser: req.user.id,
      toUser,
      skill,
      status: "pending"
    });

    res.json({
      msg: "Request Sent",
      newReq
    });

  } catch (err) {
    res.status(500).json({ msg: "Request Failed" });
  }
};
exports.updateRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const updated = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.json({
      msg: "Request Updated",
      updated
    });

  } catch (err) {
    res.status(500).json({ msg: "Update Failed" });
  }
};
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ toUser: req.user.id })
      .populate("fromUser", "name email skillsTeach skillsLearn")
      .populate("toUser", "name email");

    res.json({
      msg: "Received Requests Fetched",
      requests
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to fetch received requests" });
  }
};

/* ------------------------------
   GET INCOMING REQUESTS
-------------------------------- */
exports.getIncomingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ toUser: req.user.id })
      .populate("fromUser", "name email avatar")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch requests" });
  }
};

/* ------------------------------
   UPDATE REQUEST STATUS
-------------------------------- */
exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update request" });
  }
};