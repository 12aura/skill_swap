import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook, FaRegCommentDots, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReviewsSection from "../components/ReviewsSection";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

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
      /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const avatarSrc = profileUser?.avatar
    ? profileUser.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profileUser?.name || "U"
      )}`;

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  const tabs = [
    { key: "about", label: "About" },
    {
      key: "reviews",
      label: `Reviews${
        profileUser.totalReviews > 0
          ? ` (${profileUser.totalReviews})`
          : ""
      }`,
    },
  ];

  return (
    <>
      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={avatarSrc}
              alt="preview"
              className="max-w-[80vw] max-h-[80vh] rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className={`min-h-screen p-10 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-black"}`}>
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <img
            src={avatarSrc}
            alt={profileUser.name}
            onClick={() => setLightboxOpen(true)}
            className="w-20 h-20 mx-auto rounded-full cursor-pointer"
          />

          <h1 className="text-3xl font-bold mt-3">{profileUser.name}</h1>

          {loggedInUser?._id !== profileUser._id && (
            <button
              onClick={() => navigate(`/chat/${profileUser._id}`)}
              className="mt-2 bg-teal-500 text-white px-4 py-1 rounded"
            >
              <FaRegCommentDots />
            </button>
          )}

          <p className="text-gray-500 mt-2">
            {profileUser.tagline || "No tagline"}
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? "text-teal-500 font-bold" : ""}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {activeTab === "about" ? (
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* LEFT */}
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <FaGraduationCap /> TEACHES
              </h2>
              {profileUser.skillsTeach?.map((skill, i) => (
                <div key={i} className="mb-2">
                  {skill.name || skill}
                  {loggedInUser && (
                    <button
                      onClick={() => sendRequest(skill.name || skill)}
                      className="ml-2 text-xs bg-teal-500 text-white px-2 rounded"
                    >
                      Request
                    </button>
                  )}
                </div>
              ))}

              <h2 className="font-semibold mt-4 mb-2 flex items-center gap-2">
                <FaBook /> LEARNS
              </h2>
              {profileUser.skillsLearn?.map((skill, i) => (
                <div key={i}>{skill.name || skill}</div>
              ))}

              <h2 className="font-semibold mt-4">ABOUT</h2>
              <p>{profileUser.bio || "No bio"}</p>
            </div>

            {/* RIGHT */}
            <div>
              {profileUser.demoVideo && (
                <>
                  <h2 className="flex items-center gap-2 font-semibold mb-2">
                    <FaYoutube /> Demo Video
                  </h2>
                  <iframe
                    src={getEmbedUrl(profileUser.demoVideo)}
                    className="w-full h-60"
                    allowFullScreen
                    title="demo"
                  />
                </>
              )}
            </div>
          </div>
        ) : (
          <ReviewsSection userId={profileUser._id} />
        )}
      </div>
    </>
  );
};

export default PublicProfile;