// // // src/components/ReviewModal.jsx
// // // Modal to submit a review after a completed session

// // import { useState } from "react";
// // import StarRating from "./StarRating";

// // const REVIEW_XP = 10;

// // const ReviewModal = ({ session, onClose, onSubmitted }) => {
// //   const [rating, setRating] = useState(0);
// //   const [comment, setComment] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   // Determine reviewType based on role from sessionController shape
// //   // role: "teacher" means current user taught → they review the "learner"
// //   // role: "learner" means current user learned → they review the "teacher"
// //   const reviewType = session.role === "teacher" ? "learner" : "teacher";
// //   const reviewingLabel = session.role === "teacher" ? "learner" : "teacher";

// //   const handleSubmit = async () => {
// //     if (rating === 0) {
// //       setError("Please select a star rating.");
// //       return;
// //     }
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://localhost:5000/api/reviews", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           sessionId: session._id,
// //           rating,
// //           comment,
// //           reviewType,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.msg || "Failed to submit review.");
// //         setLoading(false);
// //         return;
// //       }

// //       setSuccess(true);
// //       setTimeout(() => {
// //         onSubmitted && onSubmitted(data);
// //         onClose();
// //       }, 2000);
// //     } catch (err) {
// //       setError("Something went wrong. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
// //       <div className="bg-[#0f1a17] border border-[#1e3a2f] rounded-2xl w-full max-w-md p-6 shadow-2xl">

// //         {/* Header */}
// //         <div className="flex items-center justify-between mb-5">
// //           <h2 className="text-white font-semibold text-lg">Leave a Review</h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-white text-xl transition-colors"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {success ? (
// //           /* ── Success state ── */
// //           <div className="flex flex-col items-center gap-3 py-6 text-center">
// //             <div className="text-5xl">🎉</div>
// //             <p className="text-green-400 font-semibold text-lg">Review submitted!</p>
// //             <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-2">
// //               <span className="text-yellow-400 text-xl">⚡</span>
// //               <span className="text-yellow-300 font-medium">+{REVIEW_XP} XP earned</span>
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Session info pill */}
// //             <div className="flex items-center gap-3 bg-[#1a2e24] rounded-xl p-3 mb-5">
// //               <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
// //                 {session.partnerName?.[0]?.toUpperCase() || "?"}
// //               </div>
// //               <div>
// //                 <p className="text-white text-sm font-medium">{session.partnerName}</p>
// //                 <p className="text-gray-400 text-xs">
// //                   {session.skillName} · Reviewing as {reviewingLabel}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* XP nudge */}
// //             <div className="flex items-center gap-2 text-yellow-400 text-xs mb-5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
// //               <span>⚡</span>
// //               <span>You'll earn <strong>+{REVIEW_XP} XP</strong> for leaving a review</span>
// //             </div>

// //             {/* Star rating */}
// //             <div className="mb-5">
// //               <label className="block text-gray-400 text-sm mb-2">
// //                 Rating <span className="text-red-400">*</span>
// //               </label>
// //               <StarRating value={rating} onChange={setRating} size="lg" />
// //               {rating > 0 && (
// //                 <p className="text-gray-400 text-xs mt-1">
// //                   {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Comment */}
// //             <div className="mb-5">
// //               <label className="block text-gray-400 text-sm mb-2">
// //                 Review <span className="text-gray-500">(optional)</span>
// //               </label>
// //               <textarea
// //                 value={comment}
// //                 onChange={(e) => setComment(e.target.value)}
// //                 maxLength={1000}
// //                 rows={3}
// //                 placeholder={`Share your experience with ${session.partnerName}...`}
// //                 className="w-full bg-[#1a2e24] border border-[#2a4535] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-emerald-500 transition-colors"
// //               />
// //               <p className="text-gray-600 text-xs mt-1 text-right">{comment.length}/1000</p>
// //             </div>

// //             {/* Error */}
// //             {error && (
// //               <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
// //                 {error}
// //               </p>
// //             )}

// //             {/* Actions */}
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={onClose}
// //                 className="flex-1 bg-[#1a2e24] hover:bg-[#243d30] text-gray-300 rounded-xl py-3 text-sm font-medium transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSubmit}
// //                 disabled={loading}
// //                 className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-semibold transition-colors"
// //               >
// //                 {loading ? "Submitting..." : "Submit Review"}
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReviewModal;




// // src/components/ReviewModal.jsx

// import { useState } from "react";
// import StarRating from "./StarRating";

// const REVIEW_XP = 10;

// const ReviewModal = ({ session, onClose, onSubmitted }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const reviewType = session.role === "teacher" ? "learner" : "teacher";
//   const reviewingLabel = session.role === "teacher" ? "learner" : "teacher";

//   const handleSubmit = async () => {
//     if (rating === 0) {
//       setError("Please select a star rating.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/reviews", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           sessionId: session._id,
//           rating,
//           comment,
//           reviewType,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.msg || "Failed to submit review.");
//         return;
//       }

//       setSuccess(true);

//       setTimeout(() => {
//         onSubmitted && onSubmitted(data);
//         onClose();
//       }, 2000);
//     } catch (err) {
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };
// return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    
//     <div className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-base-100 border border-base-300">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="font-semibold text-lg text-base-content">
//           Leave a Review
//         </h2>

//         <button
//           onClick={onClose}
//           className="text-gray-400 hover:text-[#1F8F7A] text-xl"
//         >
//           ✕
//         </button>
//       </div>

//       {success ? (
//         <div className="flex flex-col items-center gap-3 py-6 text-center">
//           <div className="text-5xl">🎉</div>
//           <p className="font-semibold text-lg text-[#1F8F7A]">
//             Review submitted!
//           </p>

//           <div className="px-4 py-2 rounded-xl border border-base-300 bg-base-200">
//             <span className="font-medium text-[#1F8F7A]">
//               +{REVIEW_XP} XP earned
//             </span>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Session Info */}
//           <div className="flex items-center gap-3 rounded-xl p-3 mb-5 border border-base-300 bg-base-200">
//             <div className="w-10 h-10 rounded-full bg-[#1F8F7A] flex items-center justify-center text-white font-bold text-sm">
//               {session.partnerName?.[0]?.toUpperCase() || "?"}
//             </div>

//             <div>
//               <p className="text-sm font-medium text-base-content">
//                 {session.partnerName}
//               </p>
//               <p className="text-xs opacity-70">
//                 {session.skillName} · Reviewing as {reviewingLabel}
//               </p>
//             </div>
//           </div>

//           {/* XP Info */}
//           <div className="text-xs mb-5 px-3 py-2 rounded-lg border border-base-300 bg-base-200">
//             You'll earn <strong className="text-[#1F8F7A]">+{REVIEW_XP} XP</strong> for leaving a review
//           </div>

//           {/* Rating */}
//           <div className="mb-5">
//             <label className="block text-sm mb-2 opacity-70">
//               Rating *
//             </label>

//             <StarRating value={rating} onChange={setRating} size="lg" />
//           </div>

//           {/* Comment */}
//           <div className="mb-5">
//             <label className="block text-sm mb-2 opacity-70">
//               Review (optional)
//             </label>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={3}
//               className="textarea textarea-bordered w-full focus:outline-none focus:border-[#1F8F7A]"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               onClick={onClose}
//               className="btn flex-1 border-[#1F8F7A] text-[#1F8F7A] hover:bg-[#1F8F7A] hover:text-white"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="btn flex-1 bg-[#1F8F7A] border-[#1F8F7A] text-white hover:bg-[#187a68]"
//             >
//               {loading ? "Submitting..." : "Submit Review"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   </div>
// );
// };

// export default ReviewModal;


import { useState } from "react";
import StarRating from "./StarRating";

const REVIEW_XP = 10;

const ReviewModal = ({ session, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reviewType = session.role === "teacher" ? "learner" : "teacher";
  const reviewingLabel = session.role === "teacher" ? "learner" : "teacher";

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: session._id,
          rating,
          comment,
          reviewType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to submit review.");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        onSubmitted && onSubmitted(data);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave a Review
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#1F8F7A] text-xl"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="text-5xl">🎉</div>
            <p className="font-semibold text-lg text-[#1F8F7A]">
              Review submitted!
            </p>

            <div className="px-4 py-2 rounded-lg bg-[#E8F5F2]">
              <span className="font-medium text-[#1F8F7A]">
                +{REVIEW_XP} XP earned
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Session Info */}
            <div className="flex items-center gap-3 bg-[#E8F5F2] rounded-xl p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1F8F7A] flex items-center justify-center text-white font-bold">
                {session.partnerName?.[0]?.toUpperCase() || "?"}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {session.partnerName}
                </p>
                <p className="text-xs text-gray-500">
                  {session.skillName} · Reviewing as {reviewingLabel}
                </p>
              </div>
            </div>

            {/* XP Info */}
            <div className="text-sm bg-[#E8F5F2] rounded-lg px-3 py-2 mb-4">
              You'll earn{" "}
              <span className="text-[#1F8F7A] font-semibold">
                +{REVIEW_XP} XP
              </span>{" "}
              for leaving a review
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Rating *
              </label>

              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* Comment */}
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2">
                Review (optional)
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Write your review..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1F8F7A]"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 border border-[#1F8F7A] text-[#1F8F7A] py-2 rounded-lg hover:bg-[#1F8F7A] hover:text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-[#1F8F7A] text-white py-2 rounded-lg hover:bg-[#187a68] transition"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;