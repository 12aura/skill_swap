import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md px-10 py-4 flex items-center justify-between">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-3xl font-extrabold text-teal-500">S</span>
        <span className="text-2xl font-extrabold tracking-wide text-gray-800">
          SkillSwap
        </span>
      </Link>

      {/* RIGHT MENU */}
      {user && (
        <div className="flex items-center gap-8 text-sm font-semibold">

          <Link
            to="/search"
            className="text-gray-700 hover:text-teal-600 transition"
          >
            Browse Skills
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 hover:text-teal-600 transition"
          >
            Profile
          </Link>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-5 py-2 rounded-xl border border-orange-400 text-orange-500 font-bold hover:bg-orange-50 transition"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
