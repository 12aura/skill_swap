import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const getMedal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

const getRankColor = (rank) => {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-slate-400";
  if (rank === 3) return "text-amber-600";
  return "text-slate-500";
};

const LeaderboardPage = () => {
  const { user: authUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaderboard(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
            Loading leaderboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <p className="text-red-400">Failed to load leaderboard. Try again later.</p>
      </div>
    );
  }

  // Separate top 3 and rest
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold mb-2">🏆 Leaderboard</h1>
          <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Top learners ranked by XP earned
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-end justify-center gap-4 mb-10"
        >
          {/* 2nd place */}
          {top3[1] && (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-xl overflow-hidden mb-2 ring-4 ring-slate-300">
                {top3[1].profilePic ? (
                  <img src={top3[1].profilePic} alt={top3[1].name} className="w-full h-full object-cover" />
                ) : (
                  top3[1].name?.[0]?.toUpperCase()
                )}
              </div>
              <p className="text-sm font-semibold truncate max-w-[80px] text-center">{top3[1].name}</p>
              <p className="text-xs text-teal-500 font-bold">{top3[1].xp} XP</p>
              <div className={`mt-2 w-20 h-16 flex items-center justify-center rounded-t-lg text-2xl font-bold ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                🥈
              </div>
            </div>
          )}

          {/* 1st place */}
          {top3[0] && (
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-1">👑</div>
              <div className="w-18 h-18 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-2xl overflow-hidden mb-2 ring-4 ring-yellow-300" style={{ width: 72, height: 72 }}>
                {top3[0].profilePic ? (
                  <img src={top3[0].profilePic} alt={top3[0].name} className="w-full h-full object-cover" />
                ) : (
                  top3[0].name?.[0]?.toUpperCase()
                )}
              </div>
              <p className="text-sm font-bold truncate max-w-[90px] text-center">{top3[0].name}</p>
              <p className="text-xs text-teal-500 font-bold">{top3[0].xp} XP</p>
              <div className={`mt-2 w-20 h-24 flex items-center justify-center rounded-t-lg text-2xl font-bold ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                🥇
              </div>
            </div>
          )}

          {/* 3rd place */}
          {top3[2] && (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden mb-2 ring-4 ring-amber-400">
                {top3[2].profilePic ? (
                  <img src={top3[2].profilePic} alt={top3[2].name} className="w-full h-full object-cover" />
                ) : (
                  top3[2].name?.[0]?.toUpperCase()
                )}
              </div>
              <p className="text-sm font-semibold truncate max-w-[80px] text-center">{top3[2].name}</p>
              <p className="text-xs text-teal-500 font-bold">{top3[2].xp} XP</p>
              <div className={`mt-2 w-20 h-12 flex items-center justify-center rounded-t-lg text-2xl font-bold ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                🥉
              </div>
            </div>
          )}
        </motion.div>

        {/* Rest of the list (4th onward) */}
        <div className="flex flex-col gap-3">
          {rest.map((entry, index) => {
            const isMe = entry._id === authUser?._id;
            return (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition ${
                  isMe
                    ? "ring-2 ring-teal-500 " + (darkMode ? "bg-slate-700" : "bg-teal-50")
                    : darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* Rank */}
                <div className={`w-10 text-center font-bold ${getRankColor(entry.rank)}`}>
                  {getMedal(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
                  {entry.profilePic ? (
                    <img src={entry.profilePic} alt={entry.name} className="w-full h-full object-cover" />
                  ) : (
                    entry.name?.[0]?.toUpperCase()
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {entry.name}{" "}
                    {isMe && (
                      <span className="text-teal-500 text-xs ml-1">(you)</span>
                    )}
                  </p>
                  <p className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                    Level {entry.level} · {entry.badgeCount} badge{entry.badgeCount !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="font-bold text-teal-500">{entry.xp} XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {leaderboard.length === 0 && (
          <div className="text-center py-20">
            <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
              No data yet. Start earning XP to appear here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;