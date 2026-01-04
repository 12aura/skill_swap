import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="navbar bg-white px-10 shadow-sm">
        <div className="flex-1">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 flex items-center gap-2"
          >
            <span className="text-teal-500 text-3xl">S</span>
            SkillSwap
          </Link>
        </div>

        <div className="flex gap-6 items-center text-sm font-medium text-gray-600">
          <Link to="/search" className="hover:text-teal-600">
            Browse Skills
          </Link>
          <Link to="/profile" className="hover:text-teal-600">
            Profile
          </Link>
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
          <Link to="/register" className="btn btn-neutral btn-sm">
            Sign Up
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="px-10 py-28 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400">
        <div className="text-center max-w-4xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
            Unlock Your Potential.
            <br />
            Share Your Skills. Learn Something New.
          </h1>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            SkillSwap connects learners and mentors to exchange skills,
            grow together, and build real experience — without money.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <Link to="/register" className="btn btn-neutral px-6">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline px-6">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED + HOW IT WORKS */}
      <div className="px-10 py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* FEATURED SKILLS */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Featured Skills
            </h2>

            <div className="space-y-4 max-w-sm">
              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-semibold text-gray-800">
                  💻 Coding & Development
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Learn to code, build projects, and master technologies.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-semibold text-gray-800">
                  🎨 Creative Arts
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Express creativity through art, design, and media.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-semibold text-gray-800">
                  🌍 Language Exchange
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Practice languages with native speakers worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              How It Works
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    List Your Skills
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add skills you can teach or want to learn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Find a Match
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get matched with users based on interests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Start Swapping
                  </h4>
                  <p className="text-sm text-gray-600">
                    Schedule sessions and exchange skills.
                  </p>
                </div>
              </div>
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
