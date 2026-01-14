import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Landing = () => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = Boolean(user);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="px-10 py-28 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400">
        <div className="text-center max-w-4xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
            Unlock Your Potential.
            <br />
            Share Your Skills. Learn Something New.
          </h1>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            SkillSwap connects learners and mentors to exchange skills,
            grow together, and build real experience — without money.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-neutral px-6">
                Go to Profile
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-neutral px-6">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline px-6">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FEATURES + HOW IT WORKS */}
      <div className="px-10 py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* FEATURED SKILLS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Featured Skills
            </h2>

            <div className="space-y-4 max-w-sm">
              {[
                {
                  title: "💻 Coding & Development",
                  desc: "Learn to code, build projects, and master technologies.",
                },
                {
                  title: "🎨 Creative Arts",
                  desc: "Express creativity through art, design, and media.",
                },
                {
                  title: "🌍 Language Exchange",
                  desc: "Practice languages with native speakers worldwide.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-5"
                >
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "List Your Skills",
                  desc: "Add skills you can teach or want to learn.",
                },
                {
                  step: 2,
                  title: "Find a Match",
                  desc: "Get matched with users based on interests.",
                },
                {
                  step: 3,
                  title: "Start Swapping",
                  desc: "Schedule sessions and exchange skills.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white text-center py-4 text-sm text-gray-500">
        © 2026 SkillSwap · Learn by Sharing
      </footer>
    </div>
  );
};

export default Landing;
