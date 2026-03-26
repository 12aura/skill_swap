// // const Notification = require("../models/Notification");

// // const sendNotification = async ({ userId, message, type }) => {
// //   try {
// //     // 1. Save in DB
// //     const notification = await Notification.create({
// //       user: userId,
// //       message,
// //       type
// //     });

// //     // 2. Emit via socket
// //     if (global.io) {
// //       global.io
// //         .to(userId.toString())
// //         .emit("newNotification", notification);
// //     }

// //     return notification;

// //   } catch (err) {
// //     console.error("Notification error:", err);
// //   }
// // };

// // module.exports = sendNotification;
// const Notification = require("../models/Notification");

// const sendNotification = async ({ userId, message, type }) => {
//   try {
//     if (!userId) {
//       console.log("🔥 sendNotification called for:", userId);
//       console.warn("⚠️ Notification skipped: userId missing");
//       return;
//     }

//     // 1. Save in DB
//     const notification = await Notification.create({
//       user: userId,
//       message,
//       type,
//       read: false, // explicit (good practice)
//     });

//     // 2. Emit via socket
//     if (global.io) {
//       console.log("📡 Emitting notification to:", userId);

//       global.io
//         .to(userId.toString())
//         .emit("newNotification", notification);
//     }

//     return notification;

//   } catch (err) {
//     console.error("❌ Notification error:", err);
//   }
// };

// module.exports = sendNotification;
const Notification = require("../models/Notification");

const sendNotification = async ({ userId, message, type }) => {
  try {
    // ✅ Log moved outside the if block
    console.log("🔥 sendNotification called for:", userId);

    if (!userId) {
      console.warn("⚠️ Notification skipped: userId missing");
      return;
    }

    // 1. Save in DB
    const notification = await Notification.create({
      user: userId,
      message,
      type,
      read: false,
    });

    // 2. Emit via socket
    if (global.io) {
      console.log("📡 Emitting newNotification to room:", userId.toString());
      global.io.to(userId.toString()).emit("newNotification", notification);
    } else {
      console.warn("⚠️ global.io not available");
    }

    return notification;

  } catch (err) {
    console.error("❌ Notification error:", err);
  }
};

module.exports = sendNotification;