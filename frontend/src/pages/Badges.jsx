import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

/* THEMED BADGE ICON (matches image) */
const BadgeIcon = ({ earned }) => {
  return (
    <div
      className={`w-28 h-28 rounded-full flex items-center justify-center border-4 shadow
        ${
          earned
            ? "bg-teal-50 border-white"
            : "bg-slate-100 border-slate-200"
        }
      `}
    >
      <div
        className={`w-8 h-8 rounded-full ${
          earned ? "bg-teal-500" : "bg-slate-400"
        }`}
      ></div>
    </div>
  );
};

const Badges = () => {
  const { darkMode } = useContext(DarkModeContext);

  const badges = [
    {
      id: 1,
      title: "First Swap",
      desc: "Successfully completed your first skill exchange with the community.",
      earned: true,
    },
    {
      id: 2,
      title: "Active Learner",
      desc: "Attended 5 learning sessions to sharpen your skills.",
      earned: true,
    },
    {
      id: 3,
      title: "Community Helper",
      desc: "Accepted 5 skill requests and helped others grow.",
      earned: true,
    },
    {
      id: 4,
      title: "Skill Mentor",
      desc: "Taught 5 sessions successfully to unlock this badge.",
      earned: false,
      progress: "2 / 5",
    },
    {
      id: 5,
      title: "Consistent User",
      desc: "Stay active for 7 consecutive days to join the elite.",
      earned: false,
      progress: "4 / 7",
    },
  ];

  return (
    <div
      className={`min-h-screen px-10 py-12 ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 flex items-start justify-between">
        <div>
          <Link
            to="/profile"
            className="text-teal-600 text-sm font-medium mb-3 inline-block"
          >
            ← Back to Profile
          </Link>

          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            My Badges
          </h1>
          <p
            className={`mt-2 max-w-xl ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Achievements earned through your SkillSwap journey. Keep learning and
            sharing to unlock your potential.
          </p>
        </div>

        {/* TOTAL EARNED */}
        <div
          className={`flex items-center gap-4 rounded-2xl px-6 py-4 shadow-sm ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div>
            <p className="text-xs text-slate-400 font-semibold">
              TOTAL EARNED
            </p>
            <p className="text-2xl font-bold text-teal-600">
              3 / 5
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
          </div>
        </div>
      </div>

      {/* BADGES GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {badges.map((badge) =>
          badge.earned ? (
            /* EARNED CARD */
            <div
              key={badge.id}
              className={`rounded-3xl p-8 shadow-md ${
                darkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="relative flex justify-center mb-6">
                <BadgeIcon earned />
                <span className="absolute bottom-3 right-[38%] bg-teal-500 text-white text-xs rounded-full px-2 py-0.5">
                  ✓
                </span>
              </div>

              <h3
                className={`text-xl font-bold text-center ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {badge.title}
              </h3>
              <p
                className={`text-sm text-center mt-2 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {badge.desc}
              </p>

              <div className="mt-6 flex justify-center">
                <span className="px-6 py-2 rounded-full text-sm font-semibold bg-teal-100 text-teal-700">
                  EARNED
                </span>
              </div>
            </div>
          ) : (
            /* LOCKED CARD */
            <div
              key={badge.id}
              className={`border-2 border-dashed rounded-3xl p-8 ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex justify-center mb-6">
                <BadgeIcon earned={false} />
              </div>

              <h3
                className={`text-lg font-semibold text-center ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {badge.title}
              </h3>
              <p
                className={`text-sm text-center mt-2 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {badge.desc}
              </p>

              <div className="mt-6">
                <p className="text-xs text-slate-400 text-center mb-2">
                  PROGRESS
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-teal-400 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">
                  {badge.progress}
                </p>
              </div>

              <div className="mt-5 flex justify-center">
                <span className="px-6 py-2 rounded-full text-sm bg-slate-100 text-slate-500">
                  LOCKED
                </span>
              </div>
            </div>
          )
        )}

        {/* MORE BADGES */}
        <div className="border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center bg-white">
          <p className="text-slate-400 text-sm font-semibold">
            + MORE BADGES COMING SOON
          </p>
        </div>
      </div>
    </div>
  );
};

export default Badges;
