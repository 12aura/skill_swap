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

  useEffect(() => {
    if (user) {
      setTagline(user.tagline || "");
      setBio(user.bio || "");
      setDemoVideo(user.demoVideo || "");
      setLoading(false);
    }
  }, [user]);

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
      console.error(err);
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
      className={`min-h-screen flex justify-center items-start py-14 px-4 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Edit Public Profile
          </h1>
          <p className="text-slate-500">
            Update your information to stand out to the community.
          </p>
        </div>

        {/* TAGLINE */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">
            Tagline
          </label>
          <input
            type="text"
            placeholder="Helping learners master web development"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-slate-50 border-slate-200"
            }`}
          />
          <p className="text-sm text-slate-500 mt-2">
            Short one-line description shown on your public profile
          </p>
        </div>

        {/* BIO */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">
            Bio
          </label>
          <textarea
            placeholder="Tell learners about your experience, teaching style, and skills..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`w-full rounded-xl px-4 py-3 h-36 border resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-slate-50 border-slate-200"
            }`}
          />
        </div>

        {/* DEMO VIDEO */}
        <div className="mb-10">
          <label className="block font-semibold mb-2">
            Demo Video Link
          </label>
          <input
    type="url"
    placeholder="https://youtube.com/..."
    value={demoVideo}
    onChange={(e) => setDemoVideo(e.target.value)}
    className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
      darkMode
        ? "bg-slate-700 border-slate-600 text-white"
        : "bg-slate-50 border-slate-200"
    }`}
  />
          <p className="text-sm text-slate-500 mt-2">
            Optional – link to a demo teaching video
          </p>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Public Profile"}
        </button>
      </div>
    </div>
  );
};

export default PublicProfile;
