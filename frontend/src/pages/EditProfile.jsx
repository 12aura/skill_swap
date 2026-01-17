import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext); // <-- dark mode
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [skillsTeach, setSkillsTeach] = useState("");
  const [skillsLearn, setSkillsLearn] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false); // Show "Saved!" modal

  useEffect(() => {
    console.log("Saved state:", saved);
  }, [saved]);

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await axios.put(
  //       "http://localhost:5000/api/user/update",
  //       {
  //         name,
  //         skillsTeach: skillsTeach.split(",").map((s) => s.trim()).filter(Boolean),
  //         skillsLearn: skillsLearn.split(",").map((s) => s.trim()).filter(Boolean),
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setLoading(false);
  //     setSaved(true); // ✅ SHOW UI FIRST

  //     // ✅ update context AFTER UI feedback
  //     setTimeout(() => {
  //       setUser(res.data.user);
  //       navigate("/home"); // or /dashboard
  //     }, 1500);
  //   } catch (err) {
  //     console.error("Profile update failed", err);
  //     setLoading(false);
  //   }
  // };
  const handleSave = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const newTeach = skillsTeach
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const newLearn = skillsLearn
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const mergedTeach = [
      ...new Set([
        ...(user.skillsTeach || []).map(s => s.name),
        ...newTeach
      ])
    ];

    const mergedLearn = [
      ...new Set([
        ...(user.skillsLearn || []).map(s => s.name),
        ...newLearn
      ])
    ];

    const res = await axios.put(
      "http://localhost:5000/api/user/update",
      {
        name,
        skillsTeach: mergedTeach,
        skillsLearn: mergedLearn,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSaved(true);

    setTimeout(() => {
      setUser(res.data.user);
      navigate("/home");
    }, 1500);
  } catch (err) {
    console.error("Profile update failed", err);
  } finally {
    setLoading(false);
  }
};


  // Handle OK click in modal
  const handleOk = () => {
    setSaved(false);
    navigate("/home"); // Change to your home route
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-xl rounded-3xl shadow-xl p-10 transition-colors ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Edit Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Name */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>

          {/* Skills to Teach */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Skills to Teach (comma separated)
            </label>
            <input
              type="text"
              value={skillsTeach}
              onChange={(e) => setSkillsTeach(e.target.value)}
              placeholder="React, Node, Java"
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>

          {/* Skills to Learn */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Skills to Learn (comma separated)
            </label>
            <input
              type="text"
              value={skillsLearn}
              onChange={(e) => setSkillsLearn(e.target.value)}
              placeholder="AI, DevOps"
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors ${
                darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800 border-gray-300"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || saved}
              className={`px-6 py-2 rounded-lg text-white transition ${
                loading || saved
                  ? "bg-gray-400"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`px-6 py-2 rounded-lg border transition ${
                darkMode ? "border-gray-600 text-gray-300 hover:bg-slate-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Saved Modal */}
        {saved && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className={`p-6 rounded-xl shadow-lg text-center transition-colors ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
            }`}>
              <p className={`text-lg font-semibold mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`}>
                Profile Saved!
              </p>
              <button
                onClick={handleOk}
                className={`px-6 py-2 rounded-lg transition ${
                  darkMode ? "bg-teal-600 hover:bg-teal-500 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;