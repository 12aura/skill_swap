// const Notification = require("../models/Notification");

// /* ------------------------------
//    GET USER NOTIFICATIONS
// -------------------------------- */
// exports.getNotifications = async (req, res) => {
//   try {

//     const notifications = await Notification
//       .find({ user: req.user._id }) // FIXED
//       .sort({ createdAt: -1 });

//     res.json(notifications);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Failed to fetch notifications" });
//   }
// };


// /* ------------------------------
//    MARK AS READ
// -------------------------------- */
// exports.markAsRead = async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(
//       req.params.id,
//       { read: true },      // ← "read" not "isRead"
//       { new: true }
//     );
//     res.json(notification);
//   } catch (err) {
//     res.status(500).json({ msg: "Failed to update notification" });
//   }
// };

// exports.deleteNotification = async (req, res) => {
//   try {

//     await Notification.findByIdAndDelete(req.params.id);

//     res.json({ msg: "Notification deleted" });

//   } catch (err) {
//     res.status(500).json({ msg: "Failed to delete notification" });
//   }
// };


const Notification = require("../models/Notification");

/* ------------------------------
   GET USER NOTIFICATIONS
-------------------------------- */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch notifications" });
  }
};


/* ------------------------------
   MARK AS READ
-------------------------------- */
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);

  } catch (err) {
    res.status(500).json({ msg: "Failed to update notification" });
  }
};


/* ------------------------------
   DELETE NOTIFICATION
-------------------------------- */
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({ msg: "Notification deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Failed to delete notification" });
  }
};