


import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [stats, setStats] = useState({ skillRequests: 0, activeSessions: 0, skillsShared: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (!user) {
    return (
      <p className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        Loading dashboard...
      </p>
    );
  }

  const avatarSrc = user.avatar
    ? user.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff&size=128`;

  // link: null = plain card (no navigation)
  const statCards = [
    { title: "Skill Requests",  value: stats.skillRequests,  desc: "Pending requests",   icon: "📩", link: "/requests" },
    { title: "Active Sessions", value: stats.activeSessions, desc: "Ongoing learning",    icon: "⏱️", link: "/sessions" },
    { title: "Skills Shared",   value: stats.skillsShared,   desc: "Completed sessions",  icon: "✨", link: null },
  ];

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={avatarSrc}
              alt="Profile preview"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
      >
        <main className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl shadow-lg grid md:grid-cols-3 overflow-hidden ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            {/* LEFT PROFILE PANEL */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-teal-400 to-cyan-500 p-10 text-white flex flex-col items-center text-center"
            >
              <div
                className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4 cursor-pointer hover:ring-4 hover:ring-white/50 transition-all"
                onClick={() => setLightboxOpen(true)}
                title="Click to view photo"
              >
                <img src={avatarSrc} alt="profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold uppercase">{user.name}</h2>
              <p className="text-sm opacity-90">{user.email}</p>
              <p className="text-sm opacity-90 mt-12 max-w-xs leading-relaxed">
                Welcome back to SkillSwap! <br />
                Track your learning and skill exchanges.
              </p>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="md:col-span-2 p-12"
            >
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                My Dashboard
              </h1>
              <div className="w-12 h-1 bg-teal-500 rounded-full mb-10" />

              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {statCards.map((stat, i) => {
                  const cardClass = `rounded-2xl px-6 py-5 shadow transition block ${
                    stat.link
                      ? "hover:shadow-md hover:scale-[1.02] cursor-pointer"
                      : "cursor-default"
                  } ${darkMode ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"}`;

                  const inner = (
                    <>
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
                    </>
                  );

                  return stat.link ? (
                    <Link to={stat.link} key={i} className={cardClass}>{inner}</Link>
                  ) : (
                    <div key={i} className={cardClass}>{inner}</div>
                  );
                })}
              </div>

              {/* QUICK ACTIONS */}
              <div className="space-y-4">
                <DashboardItem title="Badges"   icon="🏆" link="/badges"   darkMode={darkMode} />
                <DashboardItem title="Requests" icon="📩" link="/requests" darkMode={darkMode} />
                <DashboardItem title="Sessions" icon="⏱️" link="/sessions" darkMode={darkMode} />
                <DashboardItem title="Profile"  icon="👤" link="/profile"  darkMode={darkMode} />
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