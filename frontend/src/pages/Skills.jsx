import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Skills = () => {
  const { user, setUser } = useContext(AuthContext);
  const [skillsTeach, setSkillsTeach] = useState([]);
  const [skillsLearn, setSkillsLearn] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load skills from user context
  useEffect(() => {
    if (user) {
      setSkillsTeach(user.skillsTeach || []);
      setSkillsLearn(user.skillsLearn || []);
    }
  }, [user]);

  if (!user) return <p className="p-6">Loading skills...</p>;

  // Remove skill function
  const removeSkill = async (type, skillId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Remove skill from backend
      const res = await axios.put(
        "http://localhost:5000/api/user/remove-skill",
        { type, skillId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update frontend state
      if (type === "teach") setSkillsTeach(res.data.user.skillsTeach);
      else setSkillsLearn(res.data.user.skillsLearn);

      // Update context
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to remove skill", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Skills</h1>
          <Link to="/profile" className="text-sm text-teal-600 hover:underline">
            Back to Profile
          </Link>
        </div>

        {/* Skills to Teach */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills to Teach</h2>
          {skillsTeach.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsTeach.map((skill) => (
                <span
                  key={skill._id}
                  className="flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium"
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
            <p className="text-gray-500 text-sm">You haven’t added any skills to teach yet.</p>
          )}
        </div>

        {/* Skills to Learn */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills to Learn</h2>
          {skillsLearn.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsLearn.map((skill) => (
                <span
                  key={skill._id}
                  className="flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium"
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
            <p className="text-gray-500 text-sm">You haven’t added any skills to learn yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Skills;