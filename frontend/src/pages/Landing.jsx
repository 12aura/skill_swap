import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedSkillSwaps from "../components/FeaturedSkillSwaps";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-24 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Unlock Your <span className="text-teal-500">Potential</span>
            <br />
            Share Your <span className="text-teal-500">Skills</span>
            <br />
            Learn Something <span className="text-teal-500">New</span>
          </h1>

          <p
            className={`text-sm ${
              darkMode ? "text-slate-300" : "text-slate-600"
            } max-w-md mb-8`}
          >
            Connect with mentors and peers to exchange skills, grow together,
            and build real experience — without money.
          </p>

          <div className="flex gap-4 flex-wrap">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="bg-teal-500 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-600 transition"
              >
                Go to Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-teal-500 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-600 transition"
              >
                Get Started
              </Link>
            )}

            <a
              href="#how-it-works"
              className={`px-6 py-3 rounded-full font-medium transition ${
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div
            className={`rounded-3xl shadow-xl p-6 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="SkillSwap collaboration"
              className="rounded-2xl w-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURED SKILLS ================= */}
      {/* ================= SKILLSWAP FEATURES ================= */}
<section
  className={`py-20 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}
>
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
          icon: "🔁",
        },
        {
          title: "Smart Matching",
          desc: "Find users who want your skills and offer what you need.",
          icon: "🤝",
        },
        {
          title: "Verified Profiles",
          desc: "Real users with ratings and trusted profiles.",
          icon: "⭐",
        },
        {
          title: "Flexible Learning",
          desc: "Learn anytime based on your schedule.",
          icon: "⏱",
        },
         {
          title: "Peer to Peer Learning",
          desc: "“Learn, share, and grow with students across the university in a collaborative peer-to-peer learning platform.”",
          icon: "👥",
        },
        {
          title: "Completely Free",
          desc: "No payments, only knowledge exchange.",
          icon: "🆓",
        },
      ].map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ y: -6 }}
          className={`rounded-xl p-6 shadow-sm transition ${
            darkMode
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-white hover:bg-slate-100"
          }`}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4 text-lg">
            {item.icon}
          </div>

          <h3 className="font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-slate-500">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ================= HOW IT WORKS ================= */}
<section
  id="how-it-works"
  className="max-w-5xl mx-auto px-6 py-24 text-center"
>
  <a
  href="#how-it-works"
></a>
  <h2 className="text-3xl font-bold mb-2">
    How It Works
  </h2>

  <p
    className={`mb-16 ${
      darkMode ? "text-slate-300" : "text-slate-600"
    }`}
  >
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
        <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
          {i + 1}
        </div>

        <div>
          <h3 className="font-semibold mb-1">
            {step.title}
          </h3>

          <p
            className={`text-sm ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {step.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* ================= CTA (ONLY WHEN LOGGED OUT) ================= */}
      {!isLoggedIn && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 mb-24"
        >
          <div className="rounded-3xl text-center py-20 px-6 bg-teal-500 text-white">
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
        </motion.section>
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