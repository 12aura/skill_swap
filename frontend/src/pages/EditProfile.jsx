import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [skillsTeach, setSkillsTeach] = useState(
    user?.skillsTeach?.join(", ") || ""
  );
  const [skillsLearn, setSkillsLearn] = useState(
    user?.skillsLearn?.join(", ") || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        {
          name,
          skillsTeach: skillsTeach.split(",").map(s => s.trim()),
          skillsLearn: skillsLearn.split(",").map(s => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Edit Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Skills to Teach */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills to Teach (comma separated)
            </label>
            <input
              type="text"
              value={skillsTeach}
              onChange={(e) => setSkillsTeach(e.target.value)}
              placeholder="React, Node, Java"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Skills to Learn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills to Learn (comma separated)
            </label>
            <input
              type="text"
              value={skillsLearn}
              onChange={(e) => setSkillsLearn(e.target.value)}
              placeholder="AI, DevOps"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
