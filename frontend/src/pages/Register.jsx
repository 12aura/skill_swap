import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext"; // <-- import context

const Register = () => {
  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext); // <-- get darkMode

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skillsTeach: "",
    skillsLearn: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/profile"); // go to profile after signup
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl shadow-xl p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h2 className={`text-3xl font-bold text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
          Create Account
        </h2>

        <p className={`text-center mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Join SkillSwap and start sharing skills
        </p>
        

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Full Name</label>
            <input
              type="text"
              className={`input input-bordered w-full mt-1 ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"
              }`}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Email</label>
            <input
              type="email"
              className={`input input-bordered w-full mt-1 ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"
              }`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Password</label>
            <input
              type="password"
              className={`input input-bordered w-full mt-1 ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"
              }`}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Password must be at least 6 characters long
            </p>
          </div>

          {/* Skills Teach */}
          <div>
            <label className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Skills you can teach
            </label>
            <input
              type="text"
              className={`input input-bordered w-full mt-1 ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"
              }`}
              placeholder="e.g. React, Python, UI Design"
              value={form.skillsTeach}
              onChange={(e) => setForm({ ...form, skillsTeach: e.target.value })}
            />
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Enter skills separated by commas
            </p>
          </div>

          {/* Skills Learn */}
          <div>
            <label className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Skills you want to learn
            </label>
            <input
              type="text"
              className={`input input-bordered w-full mt-1 ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"
              }`}
              placeholder="e.g. Node.js, MongoDB"
              value={form.skillsLearn}
              onChange={(e) => setForm({ ...form, skillsLearn: e.target.value })}
            />
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Enter skills separated by commas
            </p>
          </div>

          {/* Terms */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" required />
              <span className={`text-xs leading-tight ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                I agree to the{" "}
                <span className="text-primary hover:underline">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline">
                  privacy policy
                </span>
              </span>
            </label>
          </div>

          <button
            className={`btn w-full mt-4 ${
              darkMode ? "btn-neutral" : "btn-neutral"
            }`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          {/* Divider */}
<div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-500"></div>
  <span className="px-3 text-sm text-gray-400">OR</span>
  <div className="flex-grow border-t border-gray-500"></div>
</div>

{/* Google Signup Button */}
<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3 border border-gray-500 rounded-lg py-2 bg-white text-black hover:bg-gray-100 transition"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>

        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Already have an account?
          <Link to="/login" className="text-teal-600 font-medium ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
