import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Level config (matches xpUtils.js)
const LEVELS = [
  { min: 0,   max: 49,   level: 1, title: "Beginner",  color: "bg-slate-400"   },
  { min: 50,  max: 149,  level: 2, title: "Explorer",  color: "bg-teal-500"    },
  { min: 150, max: 299,  level: 3, title: "Learner",   color: "bg-blue-500"    },
  { min: 300, max: 499,  level: 4, title: "Mentor",    color: "bg-purple-500"  },
  { min: 500, max: 9999, level: 5, title: "Expert",    color: "bg-yellow-500"  },
];

function getLevelFromXP(xp = 0) {
  return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
}

function getNextLevel(xp = 0) {
  const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  return LEVELS[idx + 1] || null;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [stats, setStats] = useState({ skillRequests: 0, activeSessions: 0, skillsShared: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [xpData, setXpData] = useState({ xp: 0, badges: [] });
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const [statsRes, profileRes] = await Promise.all([
        axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setStats(statsRes.data);
      setXpData({
        xp:     profileRes.data.user?.xp || 0,
        badges: profileRes.data.user?.badges || [],
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
      setXpData({ xp: user?.xp || 0, badges: user?.badges || [] });
    } finally {
      setStatsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  if (!user) {
    return (
      <p className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        Loading dashboard...
      </p>
    );
  }

  const xp           = xpData.xp;
  const currentLevel = getLevelFromXP(xp);
  const nextLevel    = getNextLevel(xp);
  const progressPct  = nextLevel
    ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
    : 100;
  const xpToNext     = nextLevel ? nextLevel.min - xp : 0;
  const earnedBadges = xpData.badges.slice(0, 3); // show max 3 recent badges

  const avatarSrc = user.avatar
    ? user.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff&size=128`;

  const statCards = [
    // { title: "Skill Requests",  value: stats.skillRequests,  desc: "Pending requests",    icon: "📩", link: "/requests"           },
    { title: "Skill Requests",  value: stats.skillRequests,  desc: "Pending requests", icon: "📩", link: "/requests#pending" },
  { title: "Active Sessions", value: stats.activeSessions, desc: "Ongoing learning", icon: "⏱️", link: "/sessions#active" },
    { title: "Skills Shared",   value: stats.skillsShared,   desc: "Completed sessions",   icon: "✨", link: "/completed-sessions" },
  ];

  const dm = darkMode;

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.2 }}
              src={avatarSrc} alt="Profile preview"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className={`min-h-screen ${dm ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
      >
        <main className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className={`rounded-3xl shadow-lg grid md:grid-cols-3 overflow-hidden ${dm ? "bg-slate-800" : "bg-white"}`}
          >
            {/* LEFT PROFILE PANEL */}
            <motion.div
              initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-teal-400 to-cyan-500 p-10 text-white flex flex-col items-center text-center"
            >
              <div
                className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4 cursor-pointer hover:ring-4 hover:ring-white/50 transition-all"
                onClick={() => setLightboxOpen(true)}
              >
                <img src={avatarSrc} alt="profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold uppercase">{user.name}</h2>
              <p className="text-sm opacity-90">{user.email}</p>

              {/* ⚡ XP + Level badge */}
              <div className="mt-4 w-full bg-white/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">
                    Lv.{currentLevel.level} {currentLevel.title}
                  </span>
                  <span className="text-yellow-300 font-bold text-sm">⚡ {xp} XP</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-2 bg-yellow-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                {nextLevel && (
                  <p className="text-xs text-white/70 mt-1 text-right">
                    {xpToNext} XP to {nextLevel.title}
                  </p>
                )}
              </div>

              {/* Recent badges */}
              {earnedBadges.length > 0 && (
                <div className="mt-3 flex gap-2 flex-wrap justify-center">
                  {earnedBadges.map((b) => (
                    <span
                      key={b.id}
                      title={b.title}
                      className="text-xl bg-white/20 rounded-full w-9 h-9 flex items-center justify-center"
                    >
                      {b.icon}
                    </span>
                  ))}
                  <Link
                    to="/badges"
                    className="text-xs text-white/70 underline self-center"
                  >
                    View all
                  </Link>
                </div>
              )}

              <p className="text-sm opacity-90 mt-8 max-w-xs leading-relaxed">
                Welcome back to SkillSwap! <br />
                Track your learning and skill exchanges.
              </p>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="md:col-span-2 p-12"
            >
              <h1 className={`text-3xl font-bold mb-2 ${dm ? "text-white" : "text-slate-900"}`}>
                My Dashboard
              </h1>
              <div className="w-12 h-1 bg-teal-500 rounded-full mb-10" />

              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {statCards.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(stat.link)}
                    className={`rounded-2xl px-6 py-5 shadow cursor-pointer transition-shadow hover:shadow-md ${
                      dm ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-500">{stat.title}</p>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                    {statsLoading ? (
                      <div className="h-9 w-12 bg-slate-200 rounded-lg animate-pulse mt-1" />
                    ) : (
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    )}
                    <p className="text-sm text-slate-500 mt-1">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* QUICK ACTIONS */}
              <div className="space-y-4">
                <DashboardItem title="Badges"   icon="🏆" link="/badges"   darkMode={dm} />
                <DashboardItem title="Requests" icon="📩" link="/requests" darkMode={dm} />
                {/* <DashboardItem title="Requests" icon="📩" link="/requests#pending" darkMode={dm} /> */}
                <DashboardItem title="Sessions" icon="⏱️" link="/sessions" darkMode={dm} />
                <DashboardItem title="Profile"  icon="👤" link="/profile"  darkMode={dm} />
              </div>
            </motion.div>
          </motion.div>
        </main>
      </motion.div>
    </>
  );
};

const DashboardItem = ({ title, icon, link, darkMode }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
    <Link
      to={link}
      className={`flex items-center justify-between rounded-2xl px-6 py-5 hover:shadow transition ${
        darkMode ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow ${
          darkMode ? "bg-slate-600" : "bg-white"
        }`}>
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-slate-400 text-xl">›</span>
    </Link>
  </motion.div>
);

export default Dashboard;