import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");

  const badges = [
    { id: 1, title: "First Swap", icon: "🎉" },
    { id: 2, title: "Active Learner", icon: "📘" },
    { id: 3, title: "Community Helper", icon: "🤝" },
  ];

  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/user/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser({ ...user, avatar: res.data.avatar });
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* LEFT PROFILE PANEL */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10 flex flex-col items-center text-center">

          <div className="relative mb-4">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-white ring-offset-4 overflow-hidden">
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="profile"
                />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {user.name || "New User"}
          </h2>

          <p className="text-sm text-gray-700 mt-1">
            {user.email}
          </p>

          <p className="text-sm text-gray-700 mt-6 leading-relaxed max-w-xs">
            Welcome to SkillSwap! Complete your profile to start swapping skills.
          </p>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="w-full md:w-2/3 p-10">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Profile
          </h1>

          {/* TABS (VERTICAL — ONLY CHANGE) */}
          <div className="flex flex-col gap-4 mb-8 w-60 text-sm font-medium">

            <Link
              to="/dashboard"
              className="w-full py-3 rounded-xl border bg-white text-gray-700 text-center hover:bg-teal-50 hover:text-teal-600 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full py-3 rounded-xl border transition ${
                activeTab === "skills"
                  ? "bg-teal-50 text-teal-600 border-teal-300"
                  : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              Skills
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full py-3 rounded-xl border transition ${
                activeTab === "messages"
                  ? "bg-teal-50 text-teal-600 border-teal-300"
                  : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              Messages
            </button>

          </div>

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Skills & Offerings
                </h3>

                {user.skillsTeach?.length || user.skillsLearn?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {user.skillsTeach?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm"
                      >
                        {skill} · Mentor
                      </span>
                    ))}
                    {user.skillsLearn?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-sm"
                      >
                        {skill} · Learner
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No skills added yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <p className="text-gray-600">Messages coming soon</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
