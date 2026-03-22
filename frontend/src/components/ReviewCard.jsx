// src/components/ReviewCard.jsx
// Displays a single review on a user's profile

import StarRating from "./StarRating";

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

const ReviewCard = ({ review }) => {
  const {
    reviewerName,
    reviewerAvatar,
    skillName,
    reviewType,
    rating,
    comment,
    createdAt,
  } = review;

  return (
    <div className="bg-[#0f1a17] border border-[#1e3a2f] rounded-2xl p-4 flex flex-col gap-3">
      {/* Top row: avatar + name + date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {reviewerAvatar ? (
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {reviewerName?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <p className="text-white text-sm font-medium">{reviewerName}</p>
            <p className="text-gray-500 text-xs capitalize">
              Reviewed you as a{" "}
              <span className="text-emerald-400">{reviewType}</span>
            </p>
          </div>
        </div>
        <span className="text-gray-600 text-xs">{timeAgo(createdAt)}</span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-2">
        <StarRating value={rating} readOnly size="sm" />
        <span className="text-yellow-400 text-sm font-semibold">{rating}.0</span>
      </div>

      {/* Skill pill */}
      {skillName && (
        <span className="self-start text-xs bg-emerald-900/40 border border-emerald-700/30 text-emerald-300 px-2 py-0.5 rounded-full">
          {skillName}
        </span>
      )}

      {/* Comment */}
      {comment && (
        <p className="text-gray-300 text-sm leading-relaxed border-t border-[#1e3a2f] pt-3">
          "{comment}"
        </p>
      )}
    </div>
  );
};

export default ReviewCard;