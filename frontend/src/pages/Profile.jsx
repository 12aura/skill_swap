import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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

    // 🔥 update user avatar instantly in UI
    user.avatar = res.data.avatar;

  } catch (err) {
    console.error("Avatar upload failed", err);
  }
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");

  const badges = [
    { id: 1, title: "First Swap", icon: "🎉" },
    { id: 2, title: "Active Learner", icon: "📘" },
    { id: 3, title: "Community Helper", icon: "🤝" },
  ];

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* LEFT PROFILE PANEL */}
<div className="w-full md:w-1/3 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10 flex flex-col items-center text-center">

  {/* Profile Image */}
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

  {/* Upload button */}
  <label className="absolute bottom-1 right-1 bg-white rounded-full p-2 cursor-pointer shadow hover:bg-gray-100">
    📷
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => handleImageUpload(e.target.files[0])}
    />
  </label>
</div>


  {/* User Name BELOW image */}
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
            My Dashboard
          </h1>

          {/* TABS */}
          <div className="flex gap-6 border-b mb-8 text-sm font-medium">
            {["profile", "skills", "mentorships", "messages", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition ${
                    activeTab === tab
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-10">

              {/* SKILLS */}
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

              {/* BADGES */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Badges Earned
                  </h3>
                  <Link
                    to="/badges"
                    className="text-sm text-teal-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {badge.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab !== "profile" && (
            <p className="text-gray-600">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
