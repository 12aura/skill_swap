// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect, useCallback } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";

// // Level config (matches xpUtils.js)
// const LEVELS = [
//   { min: 0,   max: 49,   level: 1, title: "Beginner",  color: "bg-slate-400"   },
//   { min: 50,  max: 149,  level: 2, title: "Explorer",  color: "bg-teal-500"    },
//   { min: 150, max: 299,  level: 3, title: "Learner",   color: "bg-blue-500"    },
//   { min: 300, max: 499,  level: 4, title: "Mentor",    color: "bg-purple-500"  },
//   { min: 500, max: 9999, level: 5, title: "Expert",    color: "bg-yellow-500"  },
// ];

// function getLevelFromXP(xp = 0) {
//   return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
// }

// function getNextLevel(xp = 0) {
//   const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
//   return LEVELS[idx + 1] || null;
// }

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [stats, setStats] = useState({ skillRequests: 0, activeSessions: 0, skillsShared: 0 });
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [xpData, setXpData] = useState({ xp: 0, badges: [] });
//   const navigate = useNavigate();

//   const fetchStats = useCallback(async () => {
//     if (!user) return;
//     try {
//       const token = localStorage.getItem("token");
//       const [statsRes, profileRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/dashboard/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get("http://localhost:5000/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);
//       setStats(statsRes.data);
//       setXpData({
//         xp:     profileRes.data.user?.xp || 0,
//         badges: profileRes.data.user?.badges || [],
//       });
//     } catch (err) {
//       console.error("Failed to fetch dashboard stats", err);
//       setXpData({ xp: user?.xp || 0, badges: user?.badges || [] });
//     } finally {
//       setStatsLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 60000);
//     return () => clearInterval(interval);
//   }, [fetchStats]);

//   if (!user) {
//     return (
//       <p className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
//         Loading dashboard...
//       </p>
//     );
//   }

//   const xp           = xpData.xp;
//   const currentLevel = getLevelFromXP(xp);
//   const nextLevel    = getNextLevel(xp);
//   const progressPct  = nextLevel
//     ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
//     : 100;
//   const xpToNext     = nextLevel ? nextLevel.min - xp : 0;
//   const earnedBadges = xpData.badges.slice(0, 3); // show max 3 recent badges

//   const avatarSrc = user.avatar
//     ? user.avatar
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff&size=128`;

//   const statCards = [
//     // { title: "Skill Requests",  value: stats.skillRequests,  desc: "Pending requests",    icon: "📩", link: "/requests"           },
//     { title: "Skill Requests",  value: stats.skillRequests,  desc: "Pending requests", icon: "📩", link: "/requests#pending" },
//     { title: "Active Sessions", value: stats.activeSessions, desc: "Ongoing learning",     icon: "⏱️", link: "/sessions"           },
//     { title: "Skills Shared",   value: stats.skillsShared,   desc: "Completed sessions",   icon: "✨", link: "/completed-sessions" },
//   ];

//   const dm = darkMode;

//   return (
//     <>
//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxOpen && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={() => setLightboxOpen(false)}
//             className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center cursor-zoom-out"
//           >
//             <motion.img
//               initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.2 }}
//               src={avatarSrc} alt="Profile preview"
//               className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button onClick={() => setLightboxOpen(false)}
//               className="absolute top-6 right-8 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition">
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
//         className={`min-h-screen ${dm ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
//       >
//         <main className="max-w-6xl mx-auto px-6 py-16">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
//             className={`rounded-3xl shadow-lg grid md:grid-cols-3 overflow-hidden ${dm ? "bg-slate-800" : "bg-white"}`}
//           >
//             {/* LEFT PROFILE PANEL */}
//             <motion.div
//               initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
//               className="bg-gradient-to-br from-teal-400 to-cyan-500 p-10 text-white flex flex-col items-center text-center"
//             >
//               <div
//                 className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4 cursor-pointer hover:ring-4 hover:ring-white/50 transition-all"
//                 onClick={() => setLightboxOpen(true)}
//               >
//                 <img src={avatarSrc} alt="profile" className="w-full h-full object-cover" />
//               </div>
//               <h2 className="text-xl font-semibold uppercase">{user.name}</h2>
//               <p className="text-sm opacity-90">{user.email}</p>

//               {/* ⚡ XP + Level badge */}
//               <div className="mt-4 w-full bg-white/20 rounded-2xl p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-semibold">
//                     Lv.{currentLevel.level} {currentLevel.title}
//                   </span>
//                   <span className="text-yellow-300 font-bold text-sm">⚡ {xp} XP</span>
//                 </div>
//                 {/* Progress bar */}
//                 <div className="h-2 bg-white/30 rounded-full overflow-hidden">
//                   <motion.div
//                     className="h-2 bg-yellow-300 rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: `${progressPct}%` }}
//                     transition={{ duration: 1, delay: 0.5 }}
//                   />
//                 </div>
//                 {nextLevel && (
//                   <p className="text-xs text-white/70 mt-1 text-right">
//                     {xpToNext} XP to {nextLevel.title}
//                   </p>
//                 )}
//               </div>

//               {/* Recent badges */}
//               {earnedBadges.length > 0 && (
//                 <div className="mt-3 flex gap-2 flex-wrap justify-center">
//                   {earnedBadges.map((b) => (
//                     <span
//                       key={b.id}
//                       title={b.title}
//                       className="text-xl bg-white/20 rounded-full w-9 h-9 flex items-center justify-center"
//                     >
//                       {b.icon}
//                     </span>
//                   ))}
//                   <Link
//                     to="/badges"
//                     className="text-xs text-white/70 underline self-center"
//                   >
//                     View all
//                   </Link>
//                 </div>
//               )}

//               <p className="text-sm opacity-90 mt-8 max-w-xs leading-relaxed">
//                 Welcome back to SkillSwap! <br />
//                 Track your learning and skill exchanges.
//               </p>
//             </motion.div>

//             {/* RIGHT CONTENT */}
//             <motion.div
//               initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
//               className="md:col-span-2 p-12"
//             >
//               <h1 className={`text-3xl font-bold mb-2 ${dm ? "text-white" : "text-slate-900"}`}>
//                 My Dashboard
//               </h1>
//               <div className="w-12 h-1 bg-teal-500 rounded-full mb-10" />

//               {/* STATS */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                 {statCards.map((stat, i) => (
//                   <motion.div
//                     key={i}
//                     whileHover={{ scale: 1.03, y: -2 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => navigate(stat.link)}
//                     className={`rounded-2xl px-6 py-5 shadow cursor-pointer transition-shadow hover:shadow-md ${
//                       dm ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="text-sm text-slate-500">{stat.title}</p>
//                       <span className="text-lg">{stat.icon}</span>
//                     </div>
//                     {statsLoading ? (
//                       <div className="h-9 w-12 bg-slate-200 rounded-lg animate-pulse mt-1" />
//                     ) : (
//                       <p className="text-3xl font-bold mt-1">{stat.value}</p>
//                     )}
//                     <p className="text-sm text-slate-500 mt-1">{stat.desc}</p>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* QUICK ACTIONS */}
//               <div className="space-y-4">
//                 <DashboardItem title="Badges"   icon="🏆" link="/badges"   darkMode={dm} />
//                 {/* <DashboardItem title="Requests" icon="📩" link="/requests" darkMode={dm} /> */}
//                 <DashboardItem title="Requests" icon="📩" link="/requests#pending" darkMode={dm} />
//                 <DashboardItem title="Sessions" icon="⏱️" link="/sessions" darkMode={dm} />
//                 <DashboardItem title="Profile"  icon="👤" link="/profile"  darkMode={dm} />
//               </div>
//             </motion.div>
//           </motion.div>
//         </main>
//       </motion.div>
//     </>
//   );
// };

// const DashboardItem = ({ title, icon, link, darkMode }) => (
//   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//     <Link
//       to={link}
//       className={`flex items-center justify-between rounded-2xl px-6 py-5 hover:shadow transition ${
//         darkMode ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"
//       }`}
//     >
//       <div className="flex items-center gap-4">
//         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow ${
//           darkMode ? "bg-slate-600" : "bg-white"
//         }`}>
//           {icon}
//         </div>
//         <span className="font-medium">{title}</span>
//       </div>
//       <span className="text-slate-400 text-xl">›</span>
//     </Link>
//   </motion.div>
// );

// export default Dashboard;



import { Mail, Clock, Sparkles, Trophy, User, ChevronRight, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const LEVELS = [
  { min: 0,   max: 49,   level: 1, title: "Beginner" },
  { min: 50,  max: 149,  level: 2, title: "Explorer" },
  { min: 150, max: 299,  level: 3, title: "Learner"  },
  { min: 300, max: 499,  level: 4, title: "Mentor"   },
  { min: 500, max: 9999, level: 5, title: "Expert"   },
];

function getLevelFromXP(xp = 0) {
  return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
}
function getNextLevel(xp = 0) {
  const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  return LEVELS[idx + 1] || null;
}

const Dashboard = () => {
  const { user }     = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [stats, setStats]               = useState({ skillRequests: 0, activeSessions: 0, skillsShared: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [xpData, setXpData]             = useState({ xp: 0, badges: [] });
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const [statsRes, profileRes] = await Promise.all([
        axios.get("http://localhost:5000/api/dashboard/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/user/me",          { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setStats(statsRes.data);
      setXpData({ xp: profileRes.data.user?.xp || 0, badges: profileRes.data.user?.badges || [] });
    } catch {
      setXpData({ xp: user?.xp || 0, badges: user?.badges || [] });
    } finally {
      setStatsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
    const iv = setInterval(fetchStats, 60000);
    return () => clearInterval(iv);
  }, [fetchStats]);

  if (!user) return <p style={{ padding: 32, color: "#94a3b8", fontFamily: "system-ui" }}>Loading…</p>;

  const xp           = xpData.xp;
  const currentLevel = getLevelFromXP(xp);
  const nextLevel    = getNextLevel(xp);
  const progressPct  = nextLevel
    ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
    : 100;
  const xpToNext = nextLevel ? nextLevel.min - xp : 0;

  const avatarSrc = user.avatar
    ? user.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff&size=128`;

  const dm = darkMode;

  const bg     = dm ? "#0e1118" : "#f5f7fa";
  const card   = dm ? "#161c28" : "#ffffff";
  const border = dm ? "#222a3a" : "#e5e9f2";
  const text1  = dm ? "#e6ecf5" : "#111827";
  const text2  = dm ? "#7a8aa0" : "#6b7280";
  const accent = "#0d9488";
  const accentL = dm ? "rgba(13,148,136,0.15)" : "rgba(13,148,136,0.08)";

  const stats3 = [
    { label: "Skill Requests",  value: stats.skillRequests,  icon: <Mail size={18} />,     link: "/requests#pending"   },
    { label: "Active Sessions", value: stats.activeSessions, icon: <Clock size={18} />,    link: "/sessions#active"    },
    { label: "Skills Shared",   value: stats.skillsShared,   icon: <Sparkles size={18} />, link: "/completed-sessions" },
  ];

const navItems = [
  { label: "My Badges",  icon: <Trophy size={18} />, link: "/badges",   badge: null },
  { label: "Requests",   icon: <Mail size={18} />,   link: "/requests", badge: stats.skillRequests  > 0 ? stats.skillRequests  : null },
  { label: "Sessions",   icon: <Clock size={18} />,  link: "/sessions", badge: stats.activeSessions > 0 ? stats.activeSessions : null },
  { label: "My Profile", icon: <User size={18} />,   link: "/profile",  badge: null },
];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay },
  });

  return (
    <>
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={avatarSrc} alt="avatar"
              style={{ maxWidth: "70vw", maxHeight: "70vh", borderRadius: 16, objectFit: "contain" }}
              onClick={e => e.stopPropagation()} />
            <button onClick={() => setLightboxOpen(false)}
              style={{ position: "absolute", top: 20, right: 24, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ minHeight: "100vh", background: bg, fontFamily: "'DM Sans', system-ui, sans-serif", color: text1 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes shimmer { 0%,100%{opacity:.55}50%{opacity:.3} }
        `}</style>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 80px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* HEADER — teal profile box */}
          <motion.div {...fadeUp(0)} style={{
            background: dm
              ? "linear-gradient(135deg, #0d2e2b 0%, #0f3330 60%, #0a2420 100%)"
              : "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 60%, #d1faf0 100%)",
            border: `1.5px solid ${dm ? "#1a4a45" : "#5eead4"}`,
            borderRadius: 16,
            padding: "24px 24px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 4,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* decorative circle */}
            <div style={{ position: "absolute", right: -30, top: -30, width: 130, height: 130, borderRadius: "50%", background: dm ? "rgba(13,148,136,0.12)" : "rgba(20,184,166,0.18)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 20, bottom: -40, width: 100, height: 100, borderRadius: "50%", background: dm ? "rgba(13,148,136,0.07)" : "rgba(20,184,166,0.12)", pointerEvents: "none" }} />

            <div onClick={() => setLightboxOpen(true)}
              style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: `3px solid ${dm ? "#0d9488" : "#0f766e"}`, cursor: "pointer", flexShrink: 0, boxShadow: `0 0 0 4px ${dm ? "rgba(13,148,136,0.25)" : "rgba(13,148,136,0.2)"}` }}>
              <img src={avatarSrc} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

           <div style={{ flex: 1, minWidth: 0 }}>
  <p style={{
    fontSize: 14,
    fontWeight: 600,
    color: dm ? "#5eead4" : "#0f766e",
    marginBottom: 6,
    letterSpacing: "0.4px"
  }}>
    Welcome back
  </p>

  <h1 style={{
    fontSize: 30,
    fontWeight: 900,
    color: dm ? "#ecfeff" : "#022c22",
    letterSpacing: "-0.6px",
    lineHeight: 1.1
  }}>
    {user.name}
  </h1>
</div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, background: dm ? "rgba(13,148,136,0.25)" : "rgba(13,148,136,0.15)", border: `1px solid ${dm ? "#0d9488" : "#0d9488"}60`, borderRadius: 8, padding: "7px 13px", flexShrink: 0 }}>
              <Zap size={13} color={accent} />
              <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{xp} XP</span>
              <span style={{ fontSize: 12, color: dm ? "#5eead4" : "#0f766e" }}>· Lv {currentLevel.level}</span>
            </div>
          </motion.div>

          {/* XP PROGRESS */}
          <motion.div {...fadeUp(0.05)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: text1 }}>
                {currentLevel.title} <span style={{ color: text2, fontWeight: 400 }}>· Level {currentLevel.level}</span>
              </span>
              {nextLevel
                ? <span style={{ fontSize: 12, color: text2 }}>{xpToNext} XP to {nextLevel.title}</span>
                : <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}>Max level 🎉</span>
              }
            </div>
            <div style={{ height: 6, background: dm ? "#1e2636" : "#edf0f7", borderRadius: 99, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
                style={{ height: "100%", background: accent, borderRadius: 99 }} />
            </div>
          </motion.div>

          {/* STAT CARDS */}
          <motion.div {...fadeUp(0.1)} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {stats3.map((s, i) => (
              <div key={i} onClick={() => navigate(s.link)}
                style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px 18px", cursor: "pointer", transition: "border-color 0.18s, background 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = dm ? "#172428" : "#f0fdfa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = card; }}>
                <div style={{ color: accent, marginBottom: 10 }}>{s.icon}</div>
                {statsLoading
                  ? <div style={{ height: 26, width: 38, background: border, borderRadius: 6, animation: "shimmer 1.5s infinite" }} />
                  : <p style={{ fontSize: 26, fontWeight: 800, color: text1, letterSpacing: "-1px", lineHeight: 1 }}>{s.value}</p>
                }
                <p style={{ fontSize: 12, color: text2, marginTop: 6, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* NAVIGATION LIST */}
          <motion.div {...fadeUp(0.15)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: text2, textTransform: "uppercase", letterSpacing: "0.09em", padding: "14px 20px 10px", borderBottom: `1px solid ${border}` }}>
              Quick Access
            </p>
            {navItems.map((item, i) => (
              <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: i < navItems.length - 1 ? `1px solid ${border}` : "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = dm ? "#1a2332" : "#f8fffe"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: accentL, display: "flex", alignItems: "center", justifyContent: "center", color: accent }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: text1 }}>{item.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {item.badge != null && (
                      <span style={{ fontSize: 11, fontWeight: 700, background: accent, color: "#fff", borderRadius: 99, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={15} color={text2} />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* ACCOUNT FOOTER */}
          <motion.div {...fadeUp(0.2)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: text2, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 3 }}>Account</p>
              <p style={{ fontSize: 13, color: text1, fontWeight: 500 }}>{user.email}</p>
            </div>
            <button onClick={() => navigate("/profile")}
              style={{ fontSize: 13, fontWeight: 600, color: accent, background: accentL, border: `1px solid ${accent}50`, borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>
              Edit Profile
            </button>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;