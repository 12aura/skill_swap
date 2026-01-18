import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

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
          },
        }
      );

      setUser({ ...user, avatar: res.data.avatar });
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  if (!user) {
    return (
      <p className={`p-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        Loading profile...
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl shadow-lg grid md:grid-cols-3 overflow-hidden ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          {/* LEFT PANEL */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-teal-400 to-cyan-500 p-10 text-white flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden mb-4">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-semibold uppercase">{user.name}</h2>
            <p className="text-sm opacity-90">{user.email}</p>

            <div className="mt-6 flex flex-col gap-3 w-full items-center">
              <Link
                to="/edit-profile"
                className="px-6 py-2 w-48 rounded-full border border-white hover:bg-white hover:text-teal-600 transition text-sm"
              >
                Edit Profile
              </Link>

              <Link
                to="/edit-public-profile"
                className="px-6 py-2 w-48 rounded-full bg-white text-teal-600 hover:bg-teal-50 transition text-sm font-medium"
              >
                Edit Public Profile
              </Link>
            </div>

            <p className="text-sm opacity-90 mt-12">
              Welcome to SkillSwap!
              <br />
              Complete your profile to start swapping skills.
            </p>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 p-12"
          >
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <div className="w-12 h-1 bg-teal-500 rounded-full mb-8"></div>

            <div className="space-y-6">
              <ProfileItem title="Dashboard" icon="📊" link="/dashboard" darkMode={darkMode} />
              <ProfileItem title="Skills" icon="✨" link="/skills" darkMode={darkMode} />
              <ProfileItem title="Messages" icon="💬" link="/messages" darkMode={darkMode} />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};

const ProfileItem = ({ title, icon, link, darkMode }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
    <Link
      to={link}
      className={`flex items-center justify-between rounded-2xl px-6 py-5 transition hover:shadow ${
        darkMode ? "bg-slate-700 text-white" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow ${
            darkMode ? "bg-slate-600" : "bg-white"
          }`}
        >
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-slate-400 text-xl">›</span>
    </Link>
  </motion.div>
);

export default Profile;
