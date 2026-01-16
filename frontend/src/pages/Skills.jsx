import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const Skills = () => {
  const { user } = useContext(AuthContext); // ✅ removed setUser
  const { darkMode } = useContext(DarkModeContext);

  const [skillsTeach, setSkillsTeach] = useState([]);
  const [skillsLearn, setSkillsLearn] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setSkillsTeach(user.skillsTeach || []);
      setSkillsLearn(user.skillsLearn || []);
    }
  }, [user]);

  if (!user) return <p className="p-6">Loading skills...</p>;

  // ================= REMOVE SKILL =================
  const removeSkill = async (type, skillId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/remove-skill",
        { type, skillId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ update local state only
      setSkillsTeach(res.data.user.skillsTeach);
      setSkillsLearn(res.data.user.skillsLearn);
    } catch (err) {
      console.error("Failed to remove skill", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl shadow-xl p-12 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold uppercase">
            {user.name}'s Skills
          </h1>

          <Link
            to="/profile"
            className="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            ← Back to Profile
          </Link>
        </div>

        {/* SKILLS TO TEACH */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">🎓 Skills to Teach</h2>

          {skillsTeach.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsTeach.map((skill) => (
                <span
                  key={skill._id}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium"
                >
                  {skill.name}
                  <button
                    disabled={loading}
                    onClick={() => removeSkill("teach", skill._id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              You haven’t added any skills to teach yet.
            </p>
          )}
        </div>

        {/* SKILLS TO LEARN */}
        <div>
          <h2 className="text-xl font-semibold mb-4">✨ Skills to Learn</h2>

          {skillsLearn.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsLearn.map((skill) => (
                <span
                  key={skill._id}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium"
                >
                  {skill.name}
                  <button
                    disabled={loading}
                    onClick={() => removeSkill("learn", skill._id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              You haven’t added any skills to learn yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
