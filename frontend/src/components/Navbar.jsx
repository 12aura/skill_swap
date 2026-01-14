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

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-8 text-sm font-semibold">

        {/* ✅ ALWAYS SHOW */}
        <Link
          to={user ? "/search" : "/login"}
          className="text-gray-700 hover:text-teal-600 transition"
        >
          Browse Skills
        </Link>

        {/* 🔐 LOGGED IN */}
        {user ? (
          <>
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
          </>
        ) : (
          <>
            {/* 🔓 LOGGED OUT */}
            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Login
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
