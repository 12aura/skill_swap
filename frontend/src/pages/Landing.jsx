import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  const features = [
    { title: "1-to-1 Skill Exchange", link: "/feature/exchange" },
    { title: "Smart Matching", link: "/feature/matching" },
    { title: "Verified Profiles", link: "/feature/verified" },
    { title: "Flexible Learning", link: "/feature/flexible" },
    { title: "Peer Learning", link: "/feature/peer" },
    { title: "Free Forever", link: "/feature/free" },
  ];

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#020024] to-[#020617] overflow-hidden">
      
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/30 rounded-full blur-[140px]" />
      </div>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Unlock Your{" "}
            <span className="text-teal-400 drop-shadow-[0_0_15px_#2dd4bf]">Potential</span>
            <br />
            Share Your{" "}
            <span className="text-teal-400 drop-shadow-[0_0_15px_#2dd4bf]">Skills</span>
            <br />
            Learn Something{" "}
            <span className="text-teal-400 drop-shadow-[0_0_15px_#2dd4bf]">New</span>
          </h1>

          <p className="mt-6 text-slate-300 max-w-md">
            Exchange skills with peers, grow together, and build real-world experience — without money.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            {/* SkillSwap Button */}
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg hover:scale-105 transition"
            >
              SkillSwap
            </button>

            {/* Other buttons */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg hover:scale-105 transition"
              >
                Go to Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg hover:scale-105 transition"
              >
                Get Started
              </Link>
            )}

            <a
              href="#how-it-works"
              className="px-8 py-3 rounded-full font-semibold border border-teal-400 text-teal-300 hover:bg-teal-400 hover:text-black transition"
            >
              How it Works
            </a>
          </div>
        </motion.div>

        {/* RIGHT 3D CARD */}
        <motion.div
          className="relative perspective-[1200px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -18, 0], rotateY: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="rounded-3xl p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_60px_rgba(45,212,191,0.35)] transform-style-preserve-3d"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="3D Preview"
              className="rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURE BUBBLES ================= */}
      {showFeatures && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-6 z-50">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.2 }}
              className="w-40 h-40 rounded-full bg-teal-400/70 flex items-center justify-center text-black font-semibold cursor-pointer shadow-lg text-center p-4"
              onClick={() => navigate(feature.link)}
            >
              {feature.title}
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Choose{" "}
          <span className="text-teal-400 drop-shadow-[0_0_10px_#2dd4bf]">SkillSwap</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl transform-gpu"
            >
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-300">Click the bubble to explore this feature.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>

        <div className="space-y-12">
          {[
            ["1", "List Your Skills", "Create your profile easily."],
            ["2", "Find Matches", "Get matched with the right people."],
            ["3", "Start Swapping", "Learn, teach, and grow together."],
          ].map(([num, title, desc]) => (
            <div key={num} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-teal-400 text-black flex items-center justify-center font-bold">
                {num}
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-slate-300 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="rounded-3xl bg-gradient-to-r from-teal-400 to-cyan-400 text-black text-center py-20 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
            <p className="mb-8">Join SkillSwap today and unlock new skills.</p>
            <Link
              to="/register"
              className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Create Account
            </Link>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-400 text-sm">
        © 2026 SkillSwap · Learn by Sharing
      </footer>
    </div>
  );
};

export default Landing;
