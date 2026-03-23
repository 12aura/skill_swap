import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import MoonIcon from "../assets/imageofmoon.png";
import SunIcon from "../assets/imageofsun.png";
import AIChat from "../pages/AIChat";
import socket from "../socket";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem("token");

  /* ------------------------------
     LOAD NOTIFICATIONS + SOCKET
  ------------------------------ */
  useEffect(() => {
    if (!user || !token) return;

    socket.emit("join", user._id);

    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    fetchNotifications();

    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, [user, token]);

  /* -------- MARK AS READ -------- */
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  /* -------- DELETE -------- */
  const deleteNotification = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <nav
        className={`w-full px-10 py-4 flex items-center justify-between shadow-md transition-colors ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-teal-500">S</span>
          <span className="text-2xl font-extrabold tracking-wide">SkillSwap</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 text-sm font-semibold relative">

          {/* DARK MODE TOGGLE */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img
              src={darkMode ? SunIcon : MoonIcon}
              alt="Toggle Dark Mode"
              className="w-full h-full object-contain"
            />
          </button>

          {/* BROWSE SKILLS */}
          <Link
            to={user ? "/search" : "/login"}
            className={`hover:text-teal-600 transition ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Browse Skills
          </Link>

          {/* SKILL MATCHES */}
          {user && (
            <Link
              to="/matches"
              className={`hover:text-teal-600 transition ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Skill Matches
            </Link>
          )}

          {/* LEADERBOARD */}
          {user && (
            <Link
              to="/leaderboard"
              className={`hover:text-teal-600 transition ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              🏆 Leaderboard
            </Link>
          )}

          {user ? (
            <>
              {/* PROFILE */}
              <Link
                to="/profile"
                className={`hover:text-teal-600 transition ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Profile
              </Link>

              {/* SETTINGS — icon only */}
              <Link
                to="/settings"
                title="Settings"
                className={`text-xl hover:text-teal-600 transition ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                ⚙️
              </Link>

              {/* 🔔 NOTIFICATION BELL */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-lg"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl border p-3 z-50 text-gray-800">
                  <p className="font-semibold mb-2">Notifications</p>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <div
                        key={n._id}
                        onClick={() => markAsRead(n._id)}
                        className={`p-3 border-b cursor-pointer rounded flex justify-between items-center hover:bg-gray-100 ${
                          !n.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{n.message}</p>
                          {!n.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <button
                          onClick={(e) => deleteNotification(n._id, e)}
                          className="text-red-500 text-xs hover:text-red-700 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}

                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="block text-center text-teal-600 text-sm mt-2 hover:underline"
                  >
                    View All
                  </Link>
                </div>
              )}

              {/* SKILL BUDDY */}
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-teal-500 text-white px-3 py-2 rounded-full hover:bg-teal-600"
              >
                Skill Buddy
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`px-5 py-2 rounded-xl border font-bold transition ${
                  darkMode
                    ? "border-orange-400 text-orange-300 hover:bg-orange-500/20"
                    : "border-orange-400 text-orange-500 hover:bg-orange-50"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 border rounded-lg transition ${
                darkMode
                  ? "border-white text-white hover:bg-white/20"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* AI CHAT WINDOW */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[500px] rounded-2xl shadow-2xl overflow-hidden">
          <AIChat />
        </div>
      )}
    </>
  );
};

export default Navbar;