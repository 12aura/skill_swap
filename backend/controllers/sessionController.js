const Session = require("../models/Session");

// Create session after request acceptance
exports.createSession = async (req, res) => {
  try {
    const { learner, skill, scheduleTime } = req.body;

    const session = await Session.create({
      host: req.user.id,
      learner,
      skill,
      scheduleTime
    });

    res.json({ msg: "Session Created", session });

  } catch (err) {
    res.status(500).json({ msg: "Session create failed" });
  }
};

// Get my sessions
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ host: req.user.id }, { learner: req.user.id }]
    })
    .populate("host", "name")
    .populate("learner", "name");

    res.json({ sessions });

  } catch (err) {
    res.status(500).json({ msg: "Failed to load sessions" });
  }
};

// Update session status
exports.updateSession = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    const updated = await Session.findByIdAndUpdate(
      sessionId,
      { status },
      { new: true }
    );

    res.json({ msg: "Session Updated", updated });

  } catch (err) {
    res.status(500).json({ msg: "Session update failed" });
  }
};
