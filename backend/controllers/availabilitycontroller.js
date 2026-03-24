// const User = require("../models/User");

// // ✅ Update availability
// exports.updateAvailability = async (req, res) => {
//   try {
//     const { skillId, availability } = req.body;
//     const userId = req.user.id; // assuming auth middleware

//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const skill = user.skillsOffered.find(
//       (s) => s.skill.toString() === skillId
//     );

//     if (!skill) {
//       return res.status(404).json({ msg: "Skill not found" });
//     }

//     skill.availability = availability;

//     await user.save();

//     res.json({
//       msg: "Availability updated",
//       skillsOffered: user.skillsOffered
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ✅ Get availability for a user
// exports.getAvailability = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId)
//       .populate("skillsOffered.skill", "name");

//     if (!user) return res.status(404).json({ msg: "User not found" });

//     res.json(user.skillsOffered);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };
const User = require("../models/User");

// ✅ Update availability for a specific skill
// Body: { skillId, availability: [{ type, day?, date?, startTime, endTime }] }
exports.updateAvailability = async (req, res) => {
  try {
    const { skillId, availability } = req.body;
    const userId = req.user.id;

    if (!skillId || !Array.isArray(availability)) {
      return res.status(400).json({ msg: "skillId and availability array are required" });
    }

    // Validate each slot
    for (const slot of availability) {
      if (!["weekly", "specific"].includes(slot.type)) {
        return res.status(400).json({ msg: `Invalid slot type: ${slot.type}` });
      }
      if (slot.type === "weekly" && !slot.day) {
        return res.status(400).json({ msg: "Weekly slots require a day field" });
      }
      if (slot.type === "specific" && !slot.date) {
        return res.status(400).json({ msg: "Specific slots require a date field" });
      }
      if (!slot.startTime || !slot.endTime) {
        return res.status(400).json({ msg: "Each slot requires startTime and endTime" });
      }
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const skill = user.skillsTeach.find(
      (s) => s.skill.toString() === skillId
    );
    if (!skill) return res.status(404).json({ msg: "Skill not found in your skillsTeach" });

    skill.availability = availability;
    await user.save();

    res.json({
      msg: "Availability updated",
      skillsTeach: user.skillsTeach,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all skillsTeach with availability for a user (public)
exports.getAvailability = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("skillsTeach.skill", "name")
      .select("skillsTeach name avatar");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.skillsTeach);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};