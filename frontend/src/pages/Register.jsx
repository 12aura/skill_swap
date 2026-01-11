import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

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

      // ✅ after successful signup → go to login
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
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

          {/* Error */}
          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}

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
              required
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
              required
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
              required
              minLength={6}
            />
            <p className="text-xs opacity-70 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>
              {/* Skills Teach */}
<div>
  <label className="text-sm text-gray-600">
    Skills you can teach
  </label>
  <input
    type="text"
    className="input input-bordered bg-white text-gray-800 w-full mt-1"
    placeholder="e.g. React, Python, UI Design"
    value={form.skillsTeach}
    onChange={(e) =>
      setForm({ ...form, skillsTeach: e.target.value })
    }
  />
  <p className="text-xs opacity-70 mt-1">
    Enter skills separated by commas
  </p>
</div>

{/* Skills Learn */}
<div>
  <label className="text-sm text-gray-600">
    Skills you want to learn
  </label>
  <input
    type="text"
    className="input input-bordered bg-white text-gray-800 w-full mt-1"
    placeholder="e.g. Node.js, MongoDB"
    value={form.skillsLearn}
    onChange={(e) =>
      setForm({ ...form, skillsLearn: e.target.value })
    }
  />
  <p className="text-xs opacity-70 mt-1">
    Enter skills separated by commas
  </p>
</div>

          {/* Terms */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" required />
              <span className="text-xs leading-tight">
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
            className="btn btn-neutral w-full mt-4"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
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