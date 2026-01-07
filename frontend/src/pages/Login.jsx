import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/profile"); // temporary redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Login to continue your SkillSwap journey
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="input input-bordered bg-white text-gray-800 w-full mt-1"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="input input-bordered bg-white text-gray-800 w-full mt-1"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-neutral w-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <Link to="/register" className="text-teal-600 font-medium ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
