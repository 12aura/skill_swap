import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook, FaRegCommentDots } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => setProfileUser(res.data.user || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------------- SEND REQUEST ---------------- */
  const sendRequest = async (skill) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      await axios.post(
        "http://localhost:5000/api/requests/send",
        {
          toUser: profileUser._id,
          skill,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  /* ---------------- YOUTUBE EMBED ---------------- */
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="flex justify-center items-center gap-3">
          <h1 className="text-4xl font-bold">{profileUser.name}</h1>

          {/* MESSAGE BUTTON */}
          {loggedInUser?._id !== profileUser._id && (
            <button
              onClick={() => navigate("/messages")}
              className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition"
              title="Message"
            >
              <FaRegCommentDots size={20} />
            </button>
          )}
        </div>

        {profileUser.tagline && (
          <p className="text-gray-600 mt-2">{profileUser.tagline}</p>
        )}
      </div>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        {/* LEFT */}
        <div className="flex-1 space-y-6">
          {/* TEACHES */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
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
                      onClick={() => sendRequest(skill.name || skill)}
                      className="text-xs px-2 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                    >
                      Request
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* LEARNS */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
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

          {/* BIO */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">ABOUT ME</h2>
            <p className="text-gray-700">
              {profileUser.bio || "No bio set"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 space-y-4">
          {profileUser.demoVideo && (
            <div>
              <h2 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaYoutube className="text-red-600 w-5 h-5" />
                DEMO VIDEO
              </h2>

              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={getEmbedUrl(profileUser.demoVideo)}
                  title="demoVideo"
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
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
  );
};

export default PublicProfile;
