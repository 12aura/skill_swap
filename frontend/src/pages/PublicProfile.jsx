import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook, FaRegCommentDots } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => setProfileUser(res.data.user || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const sendRequest = async (skill) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      await axios.post(
        "http://localhost:5000/api/requests/send",
        { toUser: profileUser._id, skill },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const avatarSrc = profileUser?.avatar
    ? profileUser.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profileUser?.name || "U"
      )}&background=0d9488&color=fff&size=128`;

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  return (
    <>
      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={avatarSrc}
              alt="Profile preview"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`min-h-screen p-10 ${
          darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* HEADER */}
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="flex justify-center items-center gap-4">
            <img
              src={avatarSrc}
              alt={profileUser.name}
              onClick={() => setLightboxOpen(true)}
              className="w-16 h-16 rounded-full object-cover border-4 border-teal-400 shadow-md cursor-zoom-in hover:scale-105 transition-transform"
            />

            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{profileUser.name}</h1>

              {loggedInUser?._id !== profileUser._id && (
                <button
                  onClick={() => navigate(`/chat/${profileUser._id}`)}
                  className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition"
                  title="Message"
                >
                  <FaRegCommentDots size={20} />
                </button>
              )}
            </div>
          </div>

          {profileUser.tagline && (
            <p className="text-gray-500 mt-2">{profileUser.tagline}</p>
          )}
        </div>

        {/* MAIN CARD */}
        <div
          className={`max-w-6xl mx-auto rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          {/* LEFT */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 font-semibold mb-2">
                <FaGraduationCap /> TEACHES
              </h2>
              <div className="flex flex-wrap gap-3">
                {profileUser.skillsTeach?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full"
                  >
                    <span className="text-teal-700 font-medium">
                      {skill.name || skill}
                    </span>

                    {loggedInUser && (
                      <button
                        onClick={() =>
                          sendRequest(skill.name || skill)
                        }
                        className="text-xs px-2 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                      >
                        Request
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-semibold mb-2">
                <FaBook /> LEARNS
              </h2>
              <div className="flex flex-wrap gap-2">
                {profileUser.skillsLearn?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">ABOUT ME</h2>
              <p>{profileUser.bio || "No bio set"}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 space-y-4">
            {profileUser.demoVideo && (
              <div>
                <h2 className="font-semibold mb-2 flex items-center gap-2">
                  <FaYoutube className="text-red-600 w-5 h-5" />
                  DEMO VIDEO
                </h2>

                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src={getEmbedUrl(profileUser.demoVideo)}
                    title="demoVideo"
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>

                <a
                  href={profileUser.demoVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-teal-700 font-semibold border border-teal-700 px-4 py-2 rounded hover:bg-teal-50 transition"
                >
                  Watch Full Video
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;