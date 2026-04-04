import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import MoonIcon from "../assets/imageofmoon.png";
import SunIcon from "../assets/imageofsun.png";
import socket from "../socket";
import logolight from "../assets/logolight.png";
import logodark from "../assets/logodark.png";
import { useNotifications } from "../context/NotificationContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { unreadCount, clearUnread } = useNotifications();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) return;

    socket.emit("join", user._id);

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_URL}/api/notifications`, {
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

    socket.on("new_notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [user, token]);

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      clearUnread();
    }
  };

  return (
    <>
      <nav
        className={`w-full px-6 py-4 flex items-center justify-between flex-nowrap overflow-x-auto shadow-md transition-colors ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 whitespace-nowrap">
          <img
            src={darkMode ? logodark : logolight}
            alt="SkillSwap Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-extrabold tracking-wide whitespace-nowrap">
            <span className="text-teal-500">Skill</span>
            <span className={darkMode ? "text-white" : "text-black"}>
              Swap
            </span>
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 text-sm font-semibold relative flex-nowrap whitespace-nowrap">

          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
          >
            <img
              src={darkMode ? SunIcon : MoonIcon}
              alt="Toggle Dark Mode"
              className="w-full h-full object-contain"
            />
          </button>

          {/* LINKS */}
          <Link to={user ? "/search" : "/login"} className="hover:text-teal-600">
            Browse Skills
          </Link>

          {user && (
            <Link to="/matches" className="hover:text-teal-600">
              Skill Matches
            </Link>
          )}

          {user && (
            <Link to="/leaderboard" className="hover:text-teal-600">
              Leaderboard
            </Link>
          )}

          {user && (
            <>
              <Link to="/profile" className="hover:text-teal-600">
                Profile
              </Link>

              <Link to="/settings" className="text-xl flex-shrink-0">
                <HiOutlineCog6Tooth />
              </Link>

              {/* NOTIFICATIONS */}
              <div className="relative flex-shrink-0">
                <button onClick={handleBellClick} className="text-xl">
                  <IoNotificationsOutline />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1 rounded-full">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl p-4 z-50 ${
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    <p className="font-semibold mb-3">Notifications</p>

                    {notifications.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        No notifications yet
                      </p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n._id}
                          onClick={() => markAsRead(n._id)}
                          className={`p-3 rounded-xl mb-2 cursor-pointer ${
                            !n.read ? "bg-teal-500/10" : ""
                          }`}
                        >
                          <p className="text-sm">{n.message}</p>
                        </div>
                      ))
                    )}

                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="block text-center text-teal-500 mt-3 text-sm"
                    >
                      View All Notifications
                    </Link>
                  </div>
                )}
              </div>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`px-5 py-2 rounded-xl border font-semibold flex-shrink-0 ${
                  darkMode
                    ? "border-teal-400 text-teal-300"
                    : "border-teal-500 text-teal-600"
                }`}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg flex-shrink-0"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;