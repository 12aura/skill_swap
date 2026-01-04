import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const badges = [
    { id: 1, title: "First Swap", icon: "🎉" },
    { id: 2, title: "Active Learner", icon: "📘" },
    { id: 3, title: "Community Helper", icon: "🤝" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* LEFT PROFILE PANEL */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10 flex flex-col items-center text-center">

          <div className="avatar mb-6">
            <div className="w-36 rounded-full ring ring-white ring-offset-4">
              <img src="https://th.bing.com/th/id/OIP.h9sXoKf-AloF5_uRncS2XgHaEz?w=247&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="profile" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Sofia Chen
          </h2>

          <p className="text-sm text-gray-700 mt-1">
            SkillSwap Member
          </p>

          <p className="text-sm text-gray-700 mt-6 leading-relaxed max-w-xs">
            Full-stack developer passionate about helping others
            learn and grow through skill exchange.
          </p>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="w-full md:w-2/3 p-10">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Dashboard
          </h1>

          {/* TABS */}
          <div className="flex gap-6 border-b mb-8 text-sm font-medium">
            {["profile", "skills", "mentorships", "messages", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition ${
                    activeTab === tab
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-10">

              {/* SKILLS */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Skills & Offerings
                </h3>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm">
                    JavaScript · Mentor
                  </span>
                  <span className="px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
                    React · Learner
                  </span>
                  <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                    UI/UX Design
                  </span>
                </div>
              </div>

              {/* 🏅 BADGES SECTION */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Badges Earned
                  </h3>
                  <Link
                    to="/badges"
                    className="text-sm text-teal-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {badge.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AVAILABILITY */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Availability
                </h3>

                <div className="grid grid-cols-7 gap-3 text-center text-sm">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
                    <div
                      key={day}
                      className="py-3 rounded-lg bg-gray-100 text-gray-700"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* REVIEWS */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Reviews
                </h3>
                <p className="text-sm text-gray-600 italic">
                  “Clear explanations, very supportive mentor.”
                </p>
              </div>

            </div>
          )}

          {activeTab !== "profile" && (
            <p className="text-gray-600">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
