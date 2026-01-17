import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const PublicProfile = () => {
  const { id } = useParams();
  const { darkMode } = useContext(DarkModeContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the latest profile data from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => setProfileUser(res.data.user || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2] ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  return (
    <div
      className={`${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen p-6`}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <h1 className="text-4xl font-bold">{profileUser.name}</h1>
        {profileUser.tagline && (
          <p className="text-lg mt-1">{profileUser.tagline}</p>
        )}
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Teaches */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300 mb-2">
              <FaGraduationCap /> TEACHES
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileUser.skillsTeach?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>

          {/* Learns */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300 mb-2">
              <FaBook /> LEARNS
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileUser.skillsLearn?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div>
            <h2 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
              ABOUT ME
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              {profileUser.bio || "No bio set"}
            </p>
          </div>
        </div>

    {/* Right Column */}
<div className="flex-1 space-y-4">
  {profileUser.demoVideo && (
    <div>
      <h2 className="font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
        <FaYoutube className="text-red-600 dark:text-red-500 w-5 h-5" />
        DEMO VIDEO
      </h2>
      {/* Responsive YouTube embed */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {/* <- THIS IS WHERE YOUR CURRENT HARDCODED IFRAME IS */}
        <iframe
  src={getEmbedUrl(profileUser.demoVideo)} // ✅ now dynamic
  title="demoVideoLink"
  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

      </div>
      <a
        href={profileUser.demoVideo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-teal-700 dark:text-teal-300 font-semibold border border-teal-700 dark:border-teal-300 px-4 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-900 transition"
      >
        Watch Full Video
      </a>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default PublicProfile;

