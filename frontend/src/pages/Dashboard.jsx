import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import SkillCube from '../components/FeaturedSkillSwap/SkillCube';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  if (!user) {
    return (
      <p className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        Loading dashboard...
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* ================= DASHBOARD CARD ================= */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl shadow-lg grid md:grid-cols-3 overflow-hidden ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          {/* LEFT PROFILE PANEL — EXACT SAME AS PROFILE */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-teal-400 to-cyan-500 p-10 text-white flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center text-3xl font-semibold mb-4 bg-white text-slate-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-xl font-semibold uppercase">{user.name}</h2>
            <p className="text-sm opacity-90">{user.email}</p>

            <p className="text-sm opacity-90 mt-12 max-w-xs">
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
            {/* HEADER — MATCH PROFILE */}
            <h1
              className={`text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              My Dashboard
            </h1>

            <div className="w-12 h-1 bg-teal-500 rounded-full mb-10"></div>

            {/* STATS — SAME CARD STYLE AS PROFILE ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Skill Requests", value: 5, desc: "Pending requests" },
                { title: "Active Sessions", value: 2, desc: "Ongoing learning" },
                { title: "Skills Shared", value: 8, desc: "Total exchanges" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`rounded-2xl px-6 py-5 shadow transition ${
                    darkMode
                      ? "bg-slate-700 text-white"
                      : "bg-slate-50 text-slate-800"
                  }`}
                >
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS — EXACT PROFILE ITEM STYLE */}
            <div className="space-y-6">
              <DashboardItem title="Badges" icon="🏆" link="/badges" darkMode={darkMode} />
              <DashboardItem title="Requests" icon="📩" link="/requests" darkMode={darkMode} />
              <DashboardItem title="Sessions" icon="⏱️" link="/sessions" darkMode={darkMode} />
              <DashboardItem title="Profile" icon="👤" link="/profile" darkMode={darkMode} />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
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
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow ${
            darkMode ? "bg-slate-600" : "bg-white"
          }`}
        >
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-slate-400 text-xl">›</span>
    </Link>
  </motion.div>
);

export default Dashboard;
