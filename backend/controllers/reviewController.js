const Review = require("../models/Review");
const Session = require("../models/Session");
const User = require("../models/User");
const Notification = require("../models/Notification");

// XP reward for submitting a review
const REVIEW_XP = 10;

// ─────────────────────────────────────────────
// POST /api/reviews
// Submit a review for a completed session
// ─────────────────────────────────────────────
exports.submitReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { sessionId, rating, comment, reviewType } = req.body;

    // Validate input
    if (!sessionId || !rating || !reviewType) {
      return res.status(400).json({ msg: "sessionId, rating, and reviewType are required" });
    }
    if (!["teacher", "learner"].includes(reviewType)) {
      return res.status(400).json({ msg: "reviewType must be 'teacher' or 'learner'" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    // Find the session
    const session = await Session.findById(sessionId).populate("skill", "name");
    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    // Only allow completed sessions to be reviewed
    if (session.status !== "completed") {
      return res.status(400).json({ msg: "You can only review completed sessions" });
    }

    // Only session participants can review
    const isParticipant =
      session.userA.toString() === reviewerId ||
      session.userB.toString() === reviewerId;
    if (!isParticipant) {
      return res.status(403).json({ msg: "You are not a participant of this session" });
    }

    // Prevent duplicate review
    const existing = await Review.findOne({ reviewer: reviewerId, session: sessionId });
    if (existing) {
      return res.status(409).json({ msg: "You have already reviewed this session" });
    }

    // Determine who is being reviewed
    // userA = learner, userB = teacher (based on sessionController shape)
    let revieweeId;
    if (reviewType === "teacher") {
      // Reviewer is the learner (userA), reviewing the teacher (userB)
      revieweeId = session.userB.toString();
    } else {
      // Reviewer is the teacher (userB), reviewing the learner (userA)
      revieweeId = session.userA.toString();
    }

    // Create the review
    const review = await Review.create({
      reviewer: reviewerId,
      reviewee: revieweeId,
      session: sessionId,
      skill: session.skill?._id || null,
      reviewType,
      rating,
      comment: comment || "",
      xpAwarded: REVIEW_XP,
    });

    // ── Award XP to the reviewer ──────────────────────────────────────
    await User.findByIdAndUpdate(reviewerId, {
      $inc: { xp: REVIEW_XP },
    });

    // ── Notify the reviewee ───────────────────────────────────────────
    const reviewer = await User.findById(reviewerId).select("name");
    const skillName = session.skill?.name || session.skill || "a skill";

    const notification = await Notification.create({
      user: revieweeId,
      message: `${reviewer.name} left you a ${rating}⭐ review for ${skillName}`,
      type: "session",
      read: false,
    });

    // Real-time socket notification
    if (global.io) {
      global.io.to(revieweeId.toString()).emit("notification", notification);
    }

    // ── Update reviewee's average rating on User model ────────────────
    const allReviews = await Review.find({ reviewee: revieweeId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await User.findByIdAndUpdate(revieweeId, {
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalReviews: allReviews.length,
    });

    return res.status(201).json({
      msg: "Review submitted successfully",
      review,
      xpAwarded: REVIEW_XP,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: "You have already reviewed this session" });
    }
    console.error("submitReview error:", err);
    return res.status(500).json({ msg: "Failed to submit review" });
  }
};

// ─────────────────────────────────────────────
// GET /api/reviews/user/:userId
// Get all reviews for a user (for their profile)
// ─────────────────────────────────────────────
exports.getReviewsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ reviewee: userId })
      .populate("reviewer", "name avatar")
      .populate("skill", "name category")
      .sort({ createdAt: -1 })
      .lean();

    const shaped = reviews.map((r) => ({
      _id: r._id,
      reviewerName: r.reviewer?.name || "Anonymous",
      reviewerAvatar: r.reviewer?.avatar || null,
      skillName: r.skill?.name || "Skill Exchange",
      skillCategory: r.skill?.category || null,
      reviewType: r.reviewType,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
    }));

    // Summary stats
    const avgRating =
      shaped.length > 0
        ? parseFloat(
            (shaped.reduce((s, r) => s + r.rating, 0) / shaped.length).toFixed(1)
          )
        : null;

    return res.status(200).json({
      reviews: shaped,
      total: shaped.length,
      averageRating: avgRating,
    });
  } catch (err) {
    console.error("getReviewsForUser error:", err);
    return res.status(500).json({ msg: "Failed to fetch reviews" });
  }
};

// ─────────────────────────────────────────────
// GET /api/reviews/session/:sessionId
// Check if current user already reviewed a session
// ─────────────────────────────────────────────
exports.getSessionReviewStatus = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { sessionId } = req.params;

    const existing = await Review.findOne({
      reviewer: reviewerId,
      session: sessionId,
    }).lean();

    return res.status(200).json({
      hasReviewed: !!existing,
      review: existing || null,
    });
  } catch (err) {
    console.error("getSessionReviewStatus error:", err);
    return res.status(500).json({ msg: "Failed to check review status" });
  }
};

// ─────────────────────────────────────────────
// GET /api/reviews/my
// Get all reviews the current user has written
// ─────────────────────────────────────────────
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user.id })
      .populate("reviewee", "name avatar")
      .populate("skill", "name")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ reviews, total: reviews.length });
  } catch (err) {
    console.error("getMyReviews error:", err);
    return res.status(500).json({ msg: "Failed to fetch your reviews" });
  }
};