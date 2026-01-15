import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Badges = () => {
  const { darkMode } = useContext(DarkModeContext); // <-- dark mode context

  const badges = [
    {
      id: 1,
      title: "First Swap",
      description: "Completed your first skill exchange",
      earned: true,
    },
    {
      id: 2,
      title: "Active Learner",
      description: "Attended 5 learning sessions",
      earned: true,
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Accepted 5 skill requests",
      earned: true,
    },
    {
      id: 4,
      title: "Skill Mentor",
      description: "Taught 5 sessions successfully",
      earned: false,
    },
    {
      id: 5,
      title: "Consistent User",
      description: "Active for 7 consecutive days",
      earned: false,
    },
  ];

  return (
    <div
      className={`min-h-screen px-10 py-12 transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          My Badges
        </h1>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mt-2`}>
          Achievements earned through your SkillSwap journey
        </p>

        <Link
          to="/profile"
          className="inline-block mt-4 text-sm text-teal-600 hover:underline"
        >
          ← Back to Profile
        </Link>
      </div>

      {/* BADGES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-3xl p-6 shadow transition ${
              badge.earned
                ? darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-gray-800"
                : darkMode
                  ? "bg-slate-700 text-gray-300 opacity-70"
                  : "bg-white text-gray-500 opacity-50"
            }`}
          >
            <div className="text-4xl mb-4">{badge.icon}</div>

            <h3 className="text-lg font-semibold">{badge.title}</h3>

            <p className="text-sm mt-2">
              {badge.description}
            </p>

            <div className="mt-4">
              {badge.earned ? (
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  darkMode
                    ? "bg-teal-800 text-teal-300"
                    : "bg-teal-100 text-teal-700"
                }`}>
                  Earned
                </span>
              ) : (
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  darkMode
                    ? "bg-slate-700 text-gray-400"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  Locked
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;

