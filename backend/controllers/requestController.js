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