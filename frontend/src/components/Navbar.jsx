import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import MoonIcon from "../assets/imageofmoon.png";
import SunIcon from "../assets/imageofsun.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  return (
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
      <div className="flex items-center gap-6 text-sm font-semibold">
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

        <Link
          to={user ? "/search" : "/login"}
          className={`hover:text-teal-600 transition ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Browse Skills
        </Link>

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


        {user ? (
          <>
            <Link
              to="/profile"
              className={`hover:text-teal-600 transition ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Profile
            </Link>

            {/* ✅ SETTINGS BUTTON */}
            <Link
              to="/settings"
              className={`hover:text-teal-600 transition ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Settings
            </Link>

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
  );
};

export default Navbar;
