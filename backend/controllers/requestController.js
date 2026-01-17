const Request = require("../models/Request");

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
exports.sendRequest = async (req, res) => {
  try {
    const { toUser, skill, message } = req.body;

    const request = await Request.create({
      fromUser: req.user.id,
      toUser,
      skill,
      message,
      status: "pending",
    });

    res.json({ msg: "Request sent", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send request" });
  }
};
