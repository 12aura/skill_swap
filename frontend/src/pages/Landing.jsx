import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext"; // use correct context

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { darkMode } = useContext(DarkModeContext); // ✅ use darkMode boolean

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-24 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extrabold leading-tight">
              Unlock Your <span className="text-teal-500">Potential</span><br />
              Share Your <span className="text-teal-500">Skills</span><br />
              Learn Something <span className="text-teal-500">New</span>
            </h1>
          </div>

          <p className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"} max-w-md mb-8`}>
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
              className={`px-6 py-3 rounded-full font-medium transition ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-900"}`}
            >
              How it Works
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="relative">
          <div className={`rounded-3xl shadow-xl p-6 overflow-hidden transition-colors ${darkMode ? "bg-slate-800" : "bg-white"}`}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="SkillSwap collaboration"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURED SKILLS ================= */}
      <section className={`py-20 transition-colors ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold">Featured Skills</h2>
              <p className={`${darkMode ? "text-slate-300" : "text-slate-600"} text-sm`}>
                Master the most in-demand skills from our community experts.
              </p>
            </div>

            <Link to="/Search" className="text-teal-500 text-sm hover:underline">
              Browse all skills →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Coding & Development", desc: "Learn to code, build modern projects, and master cutting-edge technologies.", icon: "💻" },
              { title: "Creative Arts", desc: "Express your creativity through art, design, and new media.", icon: "🎨" },
              { title: "Language Exchange", desc: "Practice languages with native speakers worldwide.", icon: "🌍" },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 shadow-sm hover:shadow-md transition-colors ${darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mb-4 text-lg">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-2">How It Works</h2>
        <p className={`${darkMode ? "text-slate-300" : "text-slate-600"} mb-16`}>
          Our simple process to start your learning journey.
        </p>

        <div className="space-y-12 text-left">
          {[
            { title: "List Your Skills", desc: "Add skills you can teach or want to learn. Create your professional profile in minutes." },
            { title: "Find a Match", desc: "Get matched with users based on mutual interests and learning goals." },
            { title: "Start Swapping", desc: "Schedule sessions, exchange feedback, and grow your network globally." },
          ].map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className={`${darkMode ? "text-slate-300" : "text-slate-600"} text-sm`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className={`rounded-3xl text-center py-20 px-6 transition-colors ${darkMode ? "bg-teal-700 text-white" : "bg-teal-500 text-white"}`}>
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
      <footer className={`border-t py-6 text-sm transition-colors ${darkMode ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span>© 2026 SkillSwap · Learn by Sharing · Built for the Future</span>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
