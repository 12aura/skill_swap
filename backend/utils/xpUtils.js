// backend/utils/xpUtils.js
// Central XP system — all XP awards and badge checks go through here

const User = require("../models/User");
const Notification = require("../models/Notification");

// ─── XP VALUES ───────────────────────────────────────────
const XP = {
  COMPLETE_SESSION:   20,  // both users
  LEAVE_REVIEW:       10,  // already in reviewController ✅
  RECEIVE_5STAR:      15,  // bonus for excellence
  COMPLETE_PROFILE:   15,  // one time only
  FIRST_SESSION:      25,  // one time milestone
  ADD_SKILL_TO_TEACH: 10,  // per new skill added
};

// ─── LEVEL THRESHOLDS ────────────────────────────────────
const LEVELS = [
  { min: 0,   max: 49,   level: 1, title: "Beginner"  },
  { min: 50,  max: 149,  level: 2, title: "Explorer"  },
  { min: 150, max: 299,  level: 3, title: "Learner"   },
  { min: 300, max: 499,  level: 4, title: "Mentor"    },
  { min: 500, max: 9999, level: 5, title: "Expert"    },
];

// ─── BADGE DEFINITIONS ───────────────────────────────────
const BADGE_DEFINITIONS = [
  {
    id:          "first_session",
    title:       "First Steps",
    description: "Completed your very first skill exchange session",
    icon:        "🎯",
    xpBonus:     25,
    check:       async (userId) => {
      const count = await require("../models/Session").countDocuments({
        $or: [{ userA: userId }, { userB: userId }],
        status: "completed",
      });
      return count >= 1;
    },
  },
  {
    id:          "explorer",
    title:       "Explorer",
    description: "Reached 50 XP on SkillSwap",
    icon:        "🧭",
    xpBonus:     0,
    check:       async (userId) => {
      const user = await User.findById(userId).select("xp");
      return (user?.xp || 0) >= 50;
    },
  },
  {
    id:          "five_sessions",
    title:       "Active Learner",
    description: "Completed 5 skill exchange sessions",
    icon:        "📚",
    xpBonus:     50,
    check:       async (userId) => {
      const count = await require("../models/Session").countDocuments({
        $or: [{ userA: userId }, { userB: userId }],
        status: "completed",
      });
      return count >= 5;
    },
  },
  {
    id:          "star_teacher",
    title:       "Star Teacher",
    description: "Received a 5-star review from a learner",
    icon:        "⭐",
    xpBonus:     15,
    check:       async (userId) => {
      const Review = require("../models/Review");
      const count = await Review.countDocuments({ reviewee: userId, rating: 5 });
      return count >= 1;
    },
  },
  {
    id:          "mentor",
    title:       "Mentor",
    description: "Reached 300 XP — a true skill mentor",
    icon:        "🏅",
    xpBonus:     0,
    check:       async (userId) => {
      const user = await User.findById(userId).select("xp");
      return (user?.xp || 0) >= 300;
    },
  },
  {
    id:          "expert",
    title:       "Expert",
    description: "Reached 500 XP — SkillSwap Expert!",
    icon:        "💎",
    xpBonus:     0,
    check:       async (userId) => {
      const user = await User.findById(userId).select("xp");
      return (user?.xp || 0) >= 500;
    },
  },
  {
    id:          "community_helper",
    title:       "Community Helper",
    description: "Received 10 or more reviews from the community",
    icon:        "🤝",
    xpBonus:     30,
    check:       async (userId) => {
      const Review = require("../models/Review");
      const count = await Review.countDocuments({ reviewee: userId });
      return count >= 10;
    },
  },
];

// ─── GET LEVEL FROM XP ───────────────────────────────────
function getLevelFromXP(xp = 0) {
  return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
}

// ─── AWARD XP ────────────────────────────────────────────
// Awards XP to a user, checks for newly unlocked badges, sends notifications
async function awardXP(userId, amount, reason) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { xp: amount } },
      { new: true }
    );

    if (!user) return null;

    console.log(`⚡ +${amount} XP awarded to ${user.name} — ${reason}`);

    // Check for newly unlocked badges after XP update
    await checkAndAwardBadges(userId);

    return user;
  } catch (err) {
    console.error("awardXP error:", err);
    return null;
  }
}

// ─── CHECK & AWARD BADGES ────────────────────────────────
async function checkAndAwardBadges(userId) {
  try {
    const user = await User.findById(userId).select("badges xp name");
    if (!user) return;

    const earnedIds = (user.badges || []).map((b) => b.id);
    const newBadges = [];

    for (const def of BADGE_DEFINITIONS) {
      // Skip already earned
      if (earnedIds.includes(def.id)) continue;

      const qualifies = await def.check(userId);
      if (!qualifies) continue;

      // ✅ New badge earned!
      newBadges.push({
        id:          def.id,
        title:       def.title,
        description: def.description,
        icon:        def.icon,
        earnedAt:    new Date(),
      });

      // Award bonus XP for this badge if any
      if (def.xpBonus > 0) {
        await User.findByIdAndUpdate(userId, { $inc: { xp: def.xpBonus } });
        console.log(`🏅 Badge "${def.title}" unlocked for ${user.name} (+${def.xpBonus} bonus XP)`);
      } else {
        console.log(`🏅 Badge "${def.title}" unlocked for ${user.name}`);
      }

      // Send notification for badge
      try {
        const notification = await Notification.create({
          user:    userId,
          message: `🏅 You earned the "${def.title}" badge! ${def.icon}`,
          type:    "session",
          read:    false,
        });
        if (global.io) {
          global.io.to(userId.toString()).emit("notification", notification);
        }
      } catch (notifErr) {
        console.error("Badge notification error:", notifErr);
      }
    }

    // Save new badges to user
    if (newBadges.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $push: { badges: { $each: newBadges } },
      });
    }

    return newBadges;
  } catch (err) {
    console.error("checkAndAwardBadges error:", err);
    return [];
  }
}

// ─── ONE-TIME XP GUARD ───────────────────────────────────
// Checks if a one-time XP event has already been awarded
async function hasEarnedOneTimeXP(userId, eventKey) {
  const user = await User.findById(userId).select("xpEvents");
  return (user?.xpEvents || []).includes(eventKey);
}

async function markOneTimeXP(userId, eventKey) {
  await User.findByIdAndUpdate(userId, {
    $addToSet: { xpEvents: eventKey },
  });
}

// ─── EXPORTS ─────────────────────────────────────────────
module.exports = {
  XP,
  LEVELS,
  BADGE_DEFINITIONS,
  getLevelFromXP,
  awardXP,
  checkAndAwardBadges,
  hasEarnedOneTimeXP,
  markOneTimeXP,
};