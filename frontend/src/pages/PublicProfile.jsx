import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook, FaRegCommentDots, FaYoutube } from "react-icons/fa";
import ReviewsSection from "../components/ReviewsSection";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [availability, setAvailability] = useState([]);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => {
        const user = res.data.user || res.data;
        setProfileUser(user);

        // Handle availability in both formats
        if (Array.isArray(user.availability)) {
          setAvailability(user.availability);
        } else {
          setAvailability([]);
        }
      })
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
          skill: skillName,
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

  // ❌ invalid id
  if (!id) {
    return <p className="p-10">Invalid profile ID</p>;
  }

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  const avatarSrc = profileUser.avatar
    ? profileUser.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profileUser.name || "U"
      )}&background=0d9488&color=fff&size=128`;

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
  const weekdayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

  return (
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
            className="w-16 h-16 rounded-full object-cover border-4 border-teal-400 shadow-md cursor-pointer"
          />

          <div className="text-left">
            <h1 className="text-4xl font-bold">{profileUser.name}</h1>

            {profileUser.tagline && (
              <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
                {profileUser.tagline}
              </p>
            )}
          </div>

          {loggedInUser?._id !== profileUser._id && (
            <button
              onClick={() => navigate(`/chat/${profileUser._id}`)}
              className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
            >
              <FaRegCommentDots size={20} />
            </button>
          )}
        </div>
      </div>

      {/* MAIN CARD */}
      <div
        className={`max-w-6xl mx-auto rounded-xl shadow-lg ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-4 text-sm font-medium border-b-2 ${
                activeTab === tab.key
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "about" ? (
            <div className="flex flex-col md:flex-row gap-10">

              {/* LEFT SIDE */}
              <div className="flex-1 space-y-6">

                {/* TEACHES */}
                <div>
                  <h2 className="font-semibold mb-2 flex items-center gap-2">
                    <FaGraduationCap /> TEACHES
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skillsTeach?.map((skill, i) => (
                      <div key={i} className="bg-teal-50 px-3 py-1 rounded-full flex gap-2">
                        <span>{skill.name || skill}</span>
                        {loggedInUser && (
                          <button
                            onClick={() => sendRequest(skill.name || skill)}
                            className="text-xs bg-teal-500 text-white px-2 rounded-full"
                          >
                            Request
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ABOUT ME */}
                <div>
                  <h2 className="font-semibold mb-2">ABOUT ME</h2>
                  <p>{profileUser.bio || "No bio set"}</p>

                  {profileUser.education && (
                    <p className="mt-2">
                      <strong>Education:</strong> {profileUser.education}
                    </p>
                  )}

                  {profileUser.skillLevel && (
                    <p>
                      <strong>Skill Level:</strong> {profileUser.skillLevel}
                    </p>
                  )}

                  {profileUser.yearsOfExperience > 0 && (
                    <p>
                      <strong>Experience:</strong> {profileUser.yearsOfExperience} years
                    </p>
                  )}

                  {profileUser.linkedin && (
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <a href={profileUser.linkedin} target="_blank" rel="noreferrer" className="text-teal-600">
                        View Profile
                      </a>
                    </p>
                  )}

                  {profileUser.portfolio && (
                    <p>
                      <strong>Portfolio:</strong>{" "}
                      <a href={profileUser.portfolio} target="_blank" rel="noreferrer" className="text-teal-600">
                        View Portfolio
                      </a>
                    </p>
                  )}
                </div>

                {/* AVAILABILITY */}
                <div>
                  <h2 className="font-semibold mb-2">WEEKLY AVAILABILITY</h2>

                  <div className="flex flex-wrap gap-2">
                    {availability.length > 0 ? (
                   [...availability]
  .sort((a, b) => {
    const dayA = typeof a === "string" ? a : a.day;
    const dayB = typeof b === "string" ? b : b.day;

    return weekdayOrder.indexOf(dayA) - weekdayOrder.indexOf(dayB);
  })
  .map((item, idx) => (
    <span
      key={idx}
      className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-medium"
    >
      {typeof item === "string" ? item : item.day}
    </span>
  ))
                    ) : (
                      <p className="text-gray-500">No availability set</p>
                    )}
                  </div>
                </div>

              </div>

              {/* RIGHT SIDE (VIDEO) */}
              <div className="flex-1">
                {profileUser.demoVideo && (
                  <div>
                    <h2 className="font-semibold mb-2 flex items-center gap-2">
                      <FaYoutube className="text-red-600" /> DEMO VIDEO
                    </h2>

                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={getEmbedUrl(profileUser.demoVideo)}
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        allowFullScreen
                        title="Demo Video"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <ReviewsSection userId={profileUser._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;