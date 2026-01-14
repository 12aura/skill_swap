import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext); // <-- added dark mode

  if (!user) {
    return (
      <p className={`p-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
        Loading...
      </p>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-7xl rounded-3xl shadow-xl overflow-hidden flex transition-colors ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* LEFT GRADIENT PANEL */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full ring-4 ring-white flex items-center justify-center text-4xl font-bold text-gray-700 mb-4">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-sm mt-1">{user.email}</p>

          <p className="text-sm mt-6 max-w-xs">
            Welcome back to SkillSwap! Track your learning and exchanges here.
          </p>
        </div>

        {/* RIGHT DASHBOARD CONTENT */}
        <div className="w-full md:w-2/3 p-10">
          {/* Header */}
          <h1 className={`text-3xl font-bold mb-10 ${darkMode ? "text-white" : "text-gray-800"}`}>
            My Dashboard
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Skill Requests", value: 5, desc: "Pending requests" },
              { title: "Active Sessions", value: 2, desc: "Ongoing learning" },
              { title: "Skills Shared", value: 8, desc: "Total exchanges" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-6 transition-colors ${
                  darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200 text-gray-800"
                } hover:shadow-md`}
              >
                <p className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Badges", desc: "View your achievements", link: "/badges" },
                { title: "Requests", desc: "Manage requests", link: "/requests" },
                { title: "Sessions", desc: "View sessions", link: "/sessions" },
                { title: "Profile", desc: "View profile", link: "/profile" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className={`border rounded-2xl p-6 transition-colors ${
                    darkMode ? "bg-slate-700 border-slate-600 text-white hover:shadow-lg" : "bg-white border-gray-200 text-gray-800 hover:shadow-lg"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
