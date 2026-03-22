// import { useEffect, useState, useContext, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { DarkModeContext } from "../context/DarkModeContext";

// const CompletedSessions = () => {
//   const { user } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   const fetchSessions = useCallback(async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/sessions/completed", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSessions(res.data.sessions || res.data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to load completed sessions", err);
//       setError("Failed to load completed sessions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchSessions();
//     const interval = setInterval(fetchSessions, 60000); // auto-refresh every 60s
//     return () => clearInterval(interval);
//   }, [fetchSessions]);

//   const filtered = sessions.filter((s) => {
//     if (filter === "taught") return s.isTaught === true || s.role === "teacher";
//     if (filter === "learned") return s.isTaught === false || s.role === "learner";
//     return true;
//   });

//   const taughtCount  = sessions.filter((s) => s.isTaught === true  || s.role === "teacher").length;
//   const learnedCount = sessions.filter((s) => s.isTaught === false || s.role === "learner").length;

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "numeric", month: "short", year: "numeric",
//     });
//   };

//   const formatDuration = (mins) => {
//     if (!mins) return null;
//     if (mins < 60) return `${mins}m`;
//     return `${Math.floor(mins / 60)}h${mins % 60 > 0 ? ` ${mins % 60}m` : ""}`;
//   };

//   const dm = darkMode;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className={`min-h-screen ${dm ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
//     >
//       <main className="max-w-6xl mx-auto px-6 py-12">

//         {/* Back button */}
//         <motion.button
//           initial={{ x: -10, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           onClick={() => navigate("/dashboard")}
//           className={`flex items-center gap-2 mb-8 text-sm font-medium px-4 py-2 rounded-xl transition ${
//             dm
//               ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//               : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
//           }`}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M19 12H5M12 5l-7 7 7 7" />
//           </svg>
//           Back to Dashboard
//         </motion.button>

//         {/* Page header */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//           className="mb-10"
//         >
//           <h1 className={`text-3xl font-bold mb-2 ${dm ? "text-white" : "text-slate-900"}`}>
//             Completed Sessions
//           </h1>
//           <div className="w-12 h-1 bg-teal-500 rounded-full mb-4" />
//           <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>
//             All skills you have shared and learned through SkillSwap
//           </p>
//         </motion.div>

//         {/* Stats row */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
//         >
//           {[
//             { label: "Total Sessions", value: sessions.length, icon: "🎓" },
//             { label: "Skills Taught",  value: taughtCount,     icon: "✦"  },
//             { label: "Skills Learned", value: learnedCount,    icon: "◈"  },
//           ].map((s, i) => (
//             <div key={i} className={`rounded-2xl px-5 py-4 shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
//               <div className="flex items-center justify-between mb-1">
//                 <p className={`text-xs uppercase tracking-wide font-medium ${dm ? "text-slate-400" : "text-slate-500"}`}>
//                   {s.label}
//                 </p>
//                 <span className="text-base">{s.icon}</span>
//               </div>
//               {loading ? (
//                 <div className="h-8 w-10 bg-slate-200 rounded-lg animate-pulse mt-1" />
//               ) : (
//                 <p className="text-2xl font-bold text-teal-500">{s.value}</p>
//               )}
//             </div>
//           ))}
//         </motion.div>

//         {/* Filter + Refresh row */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.25 }}
//           className="flex flex-wrap items-center gap-2 mb-6"
//         >
//           {[
//             { key: "all",     label: `All (${sessions.length})`  },
//             { key: "taught",  label: `Taught (${taughtCount})`   },
//             { key: "learned", label: `Learned (${learnedCount})` },
//           ].map((f) => (
//             <button
//               key={f.key}
//               onClick={() => setFilter(f.key)}
//               className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
//                 filter === f.key
//                   ? "bg-teal-500 text-white shadow-sm"
//                   : dm
//                   ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                   : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
//               }`}
//             >
//               {f.label}
//             </button>
//           ))}

//           <button
//             onClick={fetchSessions}
//             className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
//               dm
//                 ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                 : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
//             }`}
//           >
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
//               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
//               <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
//             </svg>
//             Refresh
//           </button>
//         </motion.div>

//         {/* Main content */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-24 gap-4">
//             <div
//               className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin"
//             />
//             <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>Loading your sessions...</p>
//           </div>

//         ) : error ? (
//           <div className={`rounded-2xl p-10 text-center shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
//             <p className="text-4xl mb-3">⚠️</p>
//             <p className="text-red-500 font-medium mb-4">{error}</p>
//             <button
//               onClick={fetchSessions}
//               className="px-5 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 transition"
//             >
//               Try Again
//             </button>
//           </div>

//         ) : filtered.length === 0 ? (
//           <div className={`rounded-2xl p-16 text-center shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
//             <p className="text-5xl mb-4">🎓</p>
//             <h3 className={`text-lg font-semibold mb-2 ${dm ? "text-white" : "text-slate-800"}`}>
//               No sessions found
//             </h3>
//             <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>
//               {filter === "all"
//                 ? "Complete skill exchange sessions to see them here."
//                 : `No ${filter} sessions yet.`}
//             </p>
//           </div>

//         ) : (
//           <AnimatePresence mode="popLayout">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {filtered.map((session, idx) => (
//                 <motion.div
//                   key={session._id || idx}
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ delay: idx * 0.04, duration: 0.3 }}
//                 >
//                   <SessionCard
//                     session={session}
//                     darkMode={dm}
//                     formatDate={formatDate}
//                     formatDuration={formatDuration}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </AnimatePresence>
//         )}
//       </main>
//     </motion.div>
//   );
// };

// /* ─── Session Card ─────────────────────────────────────────────────────────── */
// const SessionCard = ({ session, darkMode: dm, formatDate, formatDuration }) => {
//   const isTaught   = session.isTaught === true || session.role === "teacher";
//   const partnerName = session.partnerName || "Unknown";
//   const skillName  = session.skillName || "Skill Exchange";
//   const rating     = session.rating;
//   const duration   = formatDuration(session.duration || session.durationMinutes);

//   const avatarSrc = session.partnerAvatar
//     ? session.partnerAvatar
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=${
//         isTaught ? "10b981" : "3b82f6"
//       }&color=fff&size=64`;

//   return (
//     <motion.div
//       whileHover={{ y: -3, scale: 1.01 }}
//       transition={{ duration: 0.18 }}
//       className={`rounded-2xl overflow-hidden shadow-sm border transition-shadow hover:shadow-md ${
//         dm ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
//       }`}
//     >
//       {/* Accent bar */}
//       <div className={`h-1 w-full ${
//         isTaught
//           ? "bg-gradient-to-r from-emerald-400 to-teal-500"
//           : "bg-gradient-to-r from-blue-400 to-cyan-500"
//       }`} />

//       <div className="p-5">
//         {/* Role badge */}
//         <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
//           isTaught
//             ? "bg-emerald-100 text-emerald-700"
//             : "bg-blue-100 text-blue-700"
//         }`}>
//           {isTaught ? "✦ Taught" : "◈ Learned"}
//         </span>

//         {/* Skill name */}
//         <h3 className={`text-base font-bold mb-4 leading-snug ${dm ? "text-white" : "text-slate-900"}`}>
//           {skillName}
//         </h3>

//         {/* Partner */}
//         <div className={`flex items-center gap-3 rounded-xl p-3 mb-4 ${dm ? "bg-slate-700" : "bg-slate-50"}`}>
//           <img
//             src={avatarSrc}
//             alt={partnerName}
//             className="w-9 h-9 rounded-full object-cover flex-shrink-0"
//           />
//           <div>
//             <p className={`text-xs uppercase tracking-wide ${dm ? "text-slate-400" : "text-slate-400"}`}>
//               {isTaught ? "Student" : "Teacher"}
//             </p>
//             <p className={`text-sm font-semibold ${dm ? "text-white" : "text-slate-800"}`}>
//               {partnerName}
//             </p>
//           </div>
//         </div>

//         {/* Date + Duration */}
//         <div className="flex flex-wrap gap-4 mb-3">
//           <div className="flex items-center gap-1.5">
//             <span className="text-sm">📅</span>
//             <span className={`text-xs ${dm ? "text-slate-400" : "text-slate-500"}`}>
//               {formatDate(session.scheduledAt || session.date || session.createdAt)}
//             </span>
//           </div>
//           {duration && (
//             <div className="flex items-center gap-1.5">
//               <span className="text-sm">⏱</span>
//               <span className={`text-xs ${dm ? "text-slate-400" : "text-slate-500"}`}>{duration}</span>
//             </div>
//           )}
//         </div>

//         {/* Star rating */}
//         {rating && (
//           <div className="flex gap-0.5 mb-3">
//             {[1,2,3,4,5].map((star) => (
//               <span key={star} className={`text-sm ${
//                 star <= rating ? "text-amber-400" : dm ? "text-slate-600" : "text-slate-200"
//               }`}>★</span>
//             ))}
//           </div>
//         )}

//         {/* Notes */}
//         {session.notes && (
//           <p className={`text-xs italic leading-relaxed border-l-2 pl-2 ${
//             dm ? "text-slate-400 border-slate-600" : "text-slate-400 border-slate-200"
//           }`}>
//             "{session.notes}"
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default CompletedSessions;



import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import ReviewModal from "../components/ReviewModal";

const CompletedSessions = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [reviewing, setReviewing] = useState(null); // session being reviewed
  const [reviewedIds, setReviewedIds] = useState(new Set()); // sessions already reviewed
  const navigate = useNavigate();

  const fetchSessions = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/sessions/completed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data.sessions || res.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load completed sessions", err);
      setError("Failed to load completed sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Check which sessions the user has already reviewed
  const fetchReviewStatuses = useCallback(async (sessionList) => {
    if (!sessionList || sessionList.length === 0) return;
    const token = localStorage.getItem("token");
    const reviewed = new Set();
    await Promise.all(
      sessionList.map(async (s) => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/reviews/session/${s._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.hasReviewed) reviewed.add(s._id);
        } catch (_) {}
      })
    );
    setReviewedIds(reviewed);
  }, []);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 60000);
    return () => clearInterval(interval);
  }, [fetchSessions]);

  // Once sessions load, check review statuses
  useEffect(() => {
    if (sessions.length > 0) fetchReviewStatuses(sessions);
  }, [sessions, fetchReviewStatuses]);

  const handleReviewSubmitted = (data) => {
    // Mark this session as reviewed locally (no refetch needed)
    setReviewedIds((prev) => new Set([...prev, reviewing._id]));
    setReviewing(null);
  };

  const filtered = sessions.filter((s) => {
    if (filter === "taught")   return s.isTaught === true  || s.role === "teacher";
    if (filter === "learned")  return s.isTaught === false || s.role === "learner";
    return true;
  });

  const taughtCount  = sessions.filter((s) => s.isTaught === true  || s.role === "teacher").length;
  const learnedCount = sessions.filter((s) => s.isTaught === false || s.role === "learner").length;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatDuration = (mins) => {
    if (!mins) return null;
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h${mins % 60 > 0 ? ` ${mins % 60}m` : ""}`;
  };

  const dm = darkMode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen ${dm ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Back button */}
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/dashboard")}
          className={`flex items-center gap-2 mb-8 text-sm font-medium px-4 py-2 rounded-xl transition ${
            dm
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Dashboard
        </motion.button>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <h1 className={`text-3xl font-bold mb-2 ${dm ? "text-white" : "text-slate-900"}`}>
            Completed Sessions
          </h1>
          <div className="w-12 h-1 bg-teal-500 rounded-full mb-4" />
          <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>
            All skills you have shared and learned through SkillSwap
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Total Sessions", value: sessions.length, icon: "🎓" },
            { label: "Skills Taught",  value: taughtCount,     icon: "✦"  },
            { label: "Skills Learned", value: learnedCount,    icon: "◈"  },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl px-5 py-4 shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-xs uppercase tracking-wide font-medium ${dm ? "text-slate-400" : "text-slate-500"}`}>
                  {s.label}
                </p>
                <span className="text-base">{s.icon}</span>
              </div>
              {loading ? (
                <div className="h-8 w-10 bg-slate-200 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-bold text-teal-500">{s.value}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Filter + Refresh row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          {[
            { key: "all",     label: `All (${sessions.length})`  },
            { key: "taught",  label: `Taught (${taughtCount})`   },
            { key: "learned", label: `Learned (${learnedCount})` },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === f.key
                  ? "bg-teal-500 text-white shadow-sm"
                  : dm
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={fetchSessions}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              dm
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
          </button>
        </motion.div>

        {/* Main content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin" />
            <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>Loading your sessions...</p>
          </div>

        ) : error ? (
          <div className={`rounded-2xl p-10 text-center shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={fetchSessions}
              className="px-5 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 transition"
            >
              Try Again
            </button>
          </div>

        ) : filtered.length === 0 ? (
          <div className={`rounded-2xl p-16 text-center shadow-sm ${dm ? "bg-slate-800" : "bg-white"}`}>
            <p className="text-5xl mb-4">🎓</p>
            <h3 className={`text-lg font-semibold mb-2 ${dm ? "text-white" : "text-slate-800"}`}>
              No sessions found
            </h3>
            <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>
              {filter === "all"
                ? "Complete skill exchange sessions to see them here."
                : `No ${filter} sessions yet.`}
            </p>
          </div>

        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((session, idx) => (
                <motion.div
                  key={session._id || idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                >
                  <SessionCard
                    session={session}
                    darkMode={dm}
                    formatDate={formatDate}
                    formatDuration={formatDuration}
                    hasReviewed={reviewedIds.has(session._id)}
                    onReview={() => setReviewing(session)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>

      {/* Review Modal */}
      {reviewing && (
        <ReviewModal
          session={reviewing}
          onClose={() => setReviewing(null)}
          onSubmitted={handleReviewSubmitted}
        />
      )}
    </motion.div>
  );
};

/* ─── Session Card ─────────────────────────────────────────────────────────── */
const SessionCard = ({ session, darkMode: dm, formatDate, formatDuration, hasReviewed, onReview }) => {
  const isTaught    = session.isTaught === true || session.role === "teacher";
  const partnerName = session.partnerName || "Unknown";
  const skillName   = session.skillName   || "Skill Exchange";
  const rating      = session.rating;
  const duration    = formatDuration(session.duration || session.durationMinutes);

  const avatarSrc = session.partnerAvatar
    ? session.partnerAvatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=${
        isTaught ? "10b981" : "3b82f6"
      }&color=fff&size=64`;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className={`rounded-2xl overflow-hidden shadow-sm border transition-shadow hover:shadow-md ${
        dm ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
      }`}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full ${
        isTaught
          ? "bg-gradient-to-r from-emerald-400 to-teal-500"
          : "bg-gradient-to-r from-blue-400 to-cyan-500"
      }`} />

      <div className="p-5">
        {/* Role badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
          isTaught
            ? "bg-emerald-100 text-emerald-700"
            : "bg-blue-100 text-blue-700"
        }`}>
          {isTaught ? "✦ Taught" : "◈ Learned"}
        </span>

        {/* Skill name */}
        <h3 className={`text-base font-bold mb-4 leading-snug ${dm ? "text-white" : "text-slate-900"}`}>
          {skillName}
        </h3>

        {/* Partner */}
        <div className={`flex items-center gap-3 rounded-xl p-3 mb-4 ${dm ? "bg-slate-700" : "bg-slate-50"}`}>
          <img
            src={avatarSrc}
            alt={partnerName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className={`text-xs uppercase tracking-wide ${dm ? "text-slate-400" : "text-slate-400"}`}>
              {isTaught ? "Student" : "Teacher"}
            </p>
            <p className={`text-sm font-semibold ${dm ? "text-white" : "text-slate-800"}`}>
              {partnerName}
            </p>
          </div>
        </div>

        {/* Date + Duration */}
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📅</span>
            <span className={`text-xs ${dm ? "text-slate-400" : "text-slate-500"}`}>
              {formatDate(session.scheduledAt || session.date || session.createdAt)}
            </span>
          </div>
          {duration && (
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⏱</span>
              <span className={`text-xs ${dm ? "text-slate-400" : "text-slate-500"}`}>{duration}</span>
            </div>
          )}
        </div>

        {/* Star rating */}
        {rating && (
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-sm ${
                star <= rating ? "text-amber-400" : dm ? "text-slate-600" : "text-slate-200"
              }`}>★</span>
            ))}
          </div>
        )}

        {/* Notes */}
        {session.notes && (
          <p className={`text-xs italic leading-relaxed border-l-2 pl-2 mb-4 ${
            dm ? "text-slate-400 border-slate-600" : "text-slate-400 border-slate-200"
          }`}>
            "{session.notes}"
          </p>
        )}

        {/* ── Review button ── */}
        {hasReviewed ? (
          <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400 text-sm">✓</span>
            <span className="text-emerald-400 text-xs font-medium">Review submitted</span>
          </div>
        ) : (
          <button
            onClick={onReview}
            className={`w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              dm
                ? "bg-slate-700 hover:bg-teal-600 text-slate-300 hover:text-white"
                : "bg-slate-100 hover:bg-teal-500 text-slate-600 hover:text-white"
            }`}
          >
            <span>⭐</span>
            Leave a Review
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CompletedSessions;