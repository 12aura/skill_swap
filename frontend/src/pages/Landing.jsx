import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
import axios from "axios";

import {
  FaHandshake,
  FaUsers,
  FaStar,
  FaClock,
  FaUserGraduate,
  FaGift,
} from "react-icons/fa";

/* ================= MEDAL FUNCTION ================= */
// const getMedal = (rank) => {
//   if (rank === 1) return "🥇";
//   if (rank === 2) return "🥈";
//   if (rank === 3) return "🥉";
//   return `#${rank}`;
// };
const getRankStyle = (rank) => {
  if (rank === 1)
    return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105";
  if (rank === 2)
    return "bg-gradient-to-r from-slate-300 to-slate-400 text-white";
  if (rank === 3)
    return "bg-gradient-to-r from-amber-600 to-amber-500 text-white";
  return "bg-slate-200 text-slate-700";
};

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const [top5, setTop5] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  /* ================= CHECK LOGIN ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  /* ================= FETCH TOP 5 ================= */
  useEffect(() => {
    const fetchTop5 = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "http://localhost:5000/api/leaderboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTop5(data.slice(0, 5));
      } catch (err) {
        console.error("Leaderboard preview error:", err);
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchTop5();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-28 items-center">
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-400/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Learn Faster
            <br />
            <span className="text-teal-500">By Teaching Others</span>
          </h1>

          <p
            className={`text-base ${
              darkMode ? "text-slate-300" : "text-slate-600"
            } max-w-md mb-8`}
          >
            SkillSwap connects curious learners with passionate mentors.
            Exchange knowledge, grow your network, and build real-world skills.
          </p>

          <div className="flex gap-4 flex-wrap">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="bg-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-600 transition"
              >
                Go to Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-600 transition"
              >
                Get Started
              </Link>
            )}

            <a
              href="#how-it-works"
              className={`px-6 py-3 rounded-xl font-medium transition ${
                darkMode
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-900"
              }`}
            >
              How it Works
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="SkillSwap collaboration"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className={`py-20 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Why Choose SkillSwap?</h2>
            <p
              className={`text-sm ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Powerful features that make learning simple and collaborative.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "1-to-1 Skill Exchange",
                desc: "Teach what you know and learn what you need.",
                icon: <FaHandshake size={28} />,
              },
              {
                title: "Smart Matching",
                desc: "Find users who want your skills and offer what you need.",
                icon: <FaUsers size={28} />,
              },
              {
                title: "Verified Profiles",
                desc: "Real users with ratings and trusted profiles.",
                icon: <FaStar size={28} />,
              },
              {
                title: "Flexible Learning",
                desc: "Learn anytime based on your schedule.",
                icon: <FaClock size={28} />,
              },
              {
                title: "Peer to Peer Learning",
                desc: "Collaborate and grow with learners across the community.",
                icon: <FaUserGraduate size={28} />,
              },
              {
                title: "Completely Free",
                desc: "No payments, only knowledge exchange.",
                icon: <FaGift size={28} />,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 text-white mb-4">
                  {item.icon}
                </div>

                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEADERBOARD PREVIEW ================= */}
{isLoggedIn && !leaderboardLoading && top5.length > 0 && (
  <section className={`py-24 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
    <div className="max-w-6xl mx-auto px-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex flex-col gap-2">
  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight flex items-center gap-4">

    <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-transparent bg-clip-text">
      Top Learners
    </span>

    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-xl shadow-md">
      <GiTrophyCup />
    </span>

  </h2>

  <p className={`${darkMode ? "text-slate-400" : "text-slate-600"} text-base`}>
    The most active learners on SkillSwap right now
  </p>
</div>
          <p className={`${darkMode ? "text-slate-400" : "text-slate-600"} text-sm`}>
            The most active learners this week
          </p>
        </div>

        <Link
          to="/leaderboard"
          className="text-teal-500 font-medium hover:underline"
        >
          View Full Leaderboard →
        </Link>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4 max-w-3xl">

        {top5.map((entry, index) => (
          <motion.div
            key={entry._id}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-5 p-5 rounded-3xl transition shadow-md ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white hover:shadow-lg"
            }`}
          >

            {/* RANK BADGE */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankStyle(entry.rank)}`}
            >
              {entry.rank === 1 ? <FaCrown /> : entry.rank}
            </div>

            {/* AVATAR */}
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold overflow-hidden text-lg">
              {entry.profilePic ? (
                <img
                  src={entry.profilePic}
                  alt={entry.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                entry.name?.[0]?.toUpperCase()
              )}
            </div>

            {/* USER INFO */}
            <div className="flex-1">
              <p className="font-semibold text-lg">{entry.name}</p>

              <p className="text-sm text-slate-400 flex items-center gap-2">
                <MdWorkspacePremium className="text-yellow-500" />
                Level {entry.level} · {entry.badgeCount} badge
                {entry.badgeCount !== 1 ? "s" : ""}
              </p>
            </div>

            {/* XP BOX */}
            <div className="text-right">
              <p className="text-xs text-slate-400">XP</p>
              <p className="text-xl font-bold text-teal-500">
                {entry.xp}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  </section>
)}
      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="max-w-5xl mx-auto px-6 py-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-2">How It Works</h2>
        <p className={`mb-16 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
          Our simple process to start your learning journey.
        </p>

        <div className="space-y-12 text-left">
          {[
            {
              title: "List Your Skills",
              desc: "Add skills you can teach or want to learn. Create your professional profile in minutes.",
            },
            {
              title: "Find a Match",
              desc: "Get matched with users based on mutual interests and learning goals.",
            },
            {
              title: "Start Swapping",
              desc: "Schedule sessions, exchange feedback, and grow your network globally.",
            },
          ].map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="rounded-[32px] text-center py-20 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to grow your skill set?
            </h2>

            <p className="text-teal-100 mb-8">
              Join an active community of learners and mentors today.
            </p>

            <Link
              to="/register"
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer
        className={`border-t py-6 text-sm ${
          darkMode
            ? "text-slate-400 border-slate-700"
            : "text-slate-500 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          © 2026 SkillSwap · Learn by Sharing
        </div>
      </footer>
    </div>
  );
};

export default Landing;