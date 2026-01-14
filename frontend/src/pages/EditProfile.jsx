import { useState, useContext ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [skillsTeach, setSkillsTeach] = useState("");
  const [skillsLearn, setSkillsLearn] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false); // Show "Saved!" modal
   useEffect(() => {
    console.log("Saved state:", saved);
  }, [saved]);
  const handleSave = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/user/update",
      {
        name,
        skillsTeach: skillsTeach.split(",").map(s => s.trim()).filter(Boolean),
        skillsLearn: skillsLearn.split(",").map(s => s.trim()).filter(Boolean),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setLoading(false);
    setSaved(true); // ✅ SHOW UI FIRST

    // ✅ update context AFTER UI feedback
    setTimeout(() => {
      setUser(res.data.user);
      navigate("/home"); // or /dashboard
    }, 1500);

  } catch (err) {
    console.error("Profile update failed", err);
    setLoading(false);
  }
};


  // Handle OK click in modal
  const handleOk = () => {
    setSaved(false);
    navigate("/home"); // Change to your home route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
  disabled={loading || saved}
  className={`px-6 py-2 rounded-lg text-white transition ${
    loading || saved ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
  }`}
>
  {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
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

        {/* Saved Modal */}
        {saved && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <p className="text-green-600 text-lg font-semibold mb-4">Profile Saved!</p>
              <button
                onClick={handleOk}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
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
