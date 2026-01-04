import { Link } from "react-router-dom";

const Badges = () => {
  const badges = [
    {
      id: 1,
      title: "First Swap",
      description: "Completed your first skill exchange",
      icon: "🎉",
      earned: true,
    },
    {
      id: 2,
      title: "Active Learner",
      description: "Attended 5 learning sessions",
      icon: "📘",
      earned: true,
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Accepted 5 skill requests",
      icon: "🤝",
      earned: true,
    },
    {
      id: 4,
      title: "Skill Mentor",
      description: "Taught 5 sessions successfully",
      icon: "🧠",
      earned: false,
    },
    {
      id: 5,
      title: "Consistent User",
      description: "Active for 7 consecutive days",
      icon: "🏆",
      earned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-12">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          My Badges
        </h1>
        <p className="text-gray-600 mt-2">
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
                ? "bg-white"
                : "bg-white opacity-50"
            }`}
          >
            <div className="text-4xl mb-4">
              {badge.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {badge.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {badge.description}
            </p>

            <div className="mt-4">
              {badge.earned ? (
                <span className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                  Earned
                </span>
              ) : (
                <span className="inline-block px-4 py-1 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
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
