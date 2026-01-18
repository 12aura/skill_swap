import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

/* Badge Icon */
const BadgeIcon = ({ earned }) => (
  <div
    className={`w-20 h-20 rounded-full flex items-center justify-center
      ${earned ? "bg-teal-50" : "bg-slate-100"}
    `}
  >
    <div
      className={`w-8 h-8 rounded-full ${
        earned ? "bg-teal-500" : "bg-slate-300"
      }`}
    />
  </div>
);

const Badges = () => {
  const { darkMode } = useContext(DarkModeContext);

  // ✅ ONLY FIRST TWO BADGES EARNED
  const badges = [
    {
      id: 1,
      title: "First Swap",
      desc: "Completed your first successful skill exchange on the platform.",
      earned: true,
    },
    {
      id: 2,
      title: "Active Learner",
      desc: "Attended at least 5 different skill sessions in a single month.",
      earned: true,
    },
    {
      id: 3,
      title: "Community Helper",
      desc: "Received 10+ positive reviews for your helpful feedback.",
      earned: false,
    },
    {
      id: 4,
      title: "Skill Mentor",
      desc: "Guide 5 new members through their first skill session.",
      earned: false,
    },
    {
      id: 5,
      title: "Consistent User",
      desc: "Login and interact with the community for 30 consecutive days.",
      earned: false,
    },
    {
      id: 6,
      title: "Master Teacher",
      desc: "Host 50+ total hours of skill-sharing sessions.",
      earned: false,
    },
  ];

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className={`${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-10 py-16">
        <div className="max-w-7xl mx-auto text-white">
          <h1 className="text-4xl font-bold">My Badges</h1>
          <p className="mt-2 max-w-xl text-teal-50">
            Track your achievements and milestones as you master new skills and
            help the community grow.
          </p>
        </div>
      </div>

      {/* BADGES GRID */}
      <div className="max-w-7xl mx-auto px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((badge) =>
          badge.earned ? (
            /* ✅ EARNED CARD */
            <div
              key={badge.id}
              className={`rounded-3xl p-8 shadow-md ${
                darkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="flex justify-center mb-6">
                <BadgeIcon earned />
              </div>

              <span className="block mx-auto mb-4 w-fit px-4 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                EARNED
              </span>

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
            </div>
          ) : (
            /* 🔒 LOCKED CARD */
            <div
              key={badge.id}
              className={`rounded-3xl p-8 border-2 border-dashed ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex justify-center mb-6">
                <BadgeIcon earned={false} />
              </div>

              <span className="block mx-auto mb-4 w-fit px-4 py-1 rounded-full text-xs bg-slate-100 text-slate-500">
                LOCKED
              </span>

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
            </div>
          )
        )}
      </div>

      {/* FOOTER STATS */}
      <div className="max-w-7xl mx-auto px-10 pb-14">
        <div className="flex gap-12">
          <div>
            <p className="text-xs text-slate-400 font-semibold">
              BADGES EARNED
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {earnedCount} / {badges.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">
              TOTAL POINTS
            </p>
            <p className="text-2xl font-bold text-slate-800">1,250</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
