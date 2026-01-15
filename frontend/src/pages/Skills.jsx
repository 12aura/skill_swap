import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const Skills = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext); // <-- use darkMode boolean
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

  const removeSkill = async (type, skillId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/remove-skill",
        { type, skillId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (type === "teach") setSkillsTeach(res.data.user.skillsTeach);
      else setSkillsLearn(res.data.user.skillsLearn);

      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to remove skill", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{user.name}'s Skills</h1>
          <Link
            to="/profile"
            className={`text-sm font-medium ${
              darkMode ? "text-teal-300 hover:text-teal-400" : "text-teal-600 hover:text-teal-700"
            }`}
          >
            Back to Profile
          </Link>
        </div>

        {/* Skills to Teach */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Skills to Teach</h2>
          {skillsTeach.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsTeach.map((skill) => (
                <span
                  key={skill._id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode ? "bg-teal-700 text-teal-100" : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {skill.name}
                  <button
                    disabled={loading}
                    onClick={() => removeSkill("teach", skill._id)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
              You haven’t added any skills to teach yet.
            </p>
          )}
        </div>

        {/* Skills to Learn */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Skills to Learn</h2>
          {skillsLearn.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsLearn.map((skill) => (
                <span
                  key={skill._id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode ? "bg-sky-700 text-sky-100" : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {skill.name}
                  <button
                    disabled={loading}
                    onClick={() => removeSkill("learn", skill._id)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
              You haven’t added any skills to learn yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
