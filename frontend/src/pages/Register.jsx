import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/profile"); // temporary redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Account
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Join SkillSwap and start sharing skills
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              className="input input-bordered bg-white text-gray-800 w-full mt-1"
              placeholder="Your name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="input input-bordered bg-white text-gray-800 w-full mt-1"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="input input-bordered bg-white text-gray-800 w-full mt-1"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button className="btn btn-neutral w-full mt-4">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
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
