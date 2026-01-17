import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const PublicProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [demoVideo, setDemoVideo] = useState("");

  /* -----------------------------------------
     INIT FORM WITH USER DATA
  ----------------------------------------- */
  useEffect(() => {
    if (user) {
      setTagline(user.tagline || "");
      setBio(user.bio || "");
      setDemoVideo(user.demoVideo || "");
      setLoading(false);
    }
  }, [user]);

  /* -----------------------------------------
     SAVE PUBLIC PROFILE
  ----------------------------------------- */
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/public-profile",
        { tagline, bio, demoVideo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      alert("Public profile updated successfully");
    } catch (err) {
      console.error("Public profile update failed", err);
      alert("Failed to update public profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-slate-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto rounded-3xl shadow p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">
          Edit Public Profile
        </h1>

        {/* TAGLINE */}
        <div className="mb-5">
          <label className="block font-medium mb-1">
            Tagline
          </label>
          <input
            type="text"
            placeholder="Helping learners master web development"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
          />
          <p className="text-sm text-gray-500 mt-1">
            Short one-line description shown on your public profile
          </p>
        </div>

        {/* BIO */}
        <div className="mb-5">
          <label className="block font-medium mb-1">
            Bio
          </label>
          <textarea
            placeholder="Tell learners about your experience, teaching style, and skills..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
          />
        </div>

        {/* DEMO VIDEO */}
        <div className="mb-6">
          <label className="block font-medium mb-1">
            Demo Video Link
          </label>
          <input
            type="url"
            placeholder="https://youtube.com/..."
            value={demoVideo}
            onChange={(e) => setDemoVideo(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
          />
          <p className="text-sm text-gray-500 mt-1">
            Optional – link to a demo teaching video
          </p>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Public Profile"}
        </button>
      </div>
    </div>
  );
};

export default PublicProfile;