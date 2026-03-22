// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import { FaGraduationCap, FaBook, FaRegCommentDots, FaYoutube, FaBriefcase, FaUserTie, FaLink } from "react-icons/fa";

// const PublicProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { darkMode } = useContext(DarkModeContext);
//   const { user: loggedInUser } = useContext(AuthContext);

//   const [profileUser, setProfileUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/api/user/public/profile/${id}`)
//       .then((res) => setProfileUser(res.data.user || res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const sendRequest = async (skill) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login first");

//       await axios.post(
//         "http://localhost:5000/api/requests/send",
//         { toUser: profileUser._id, skill },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Request sent successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send request");
//     }
//   };

//   const getEmbedUrl = (url) => {
//     if (!url) return "";
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2]
//       ? `https://www.youtube.com/embed/${match[2]}`
//       : url;
//   };

//   if (loading) return <p className="p-10">Loading...</p>;
//   if (!profileUser) return <p className="p-10">User not found</p>;

//   return (
//     <div className={`min-h-screen px-6 py-12 transition-colors ${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}>

//       {/* HERO */}
//       <div className="max-w-6xl mx-auto text-center mb-12 relative">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-400/20 blur-3xl rounded-full pointer-events-none"></div>
//         <div className="relative z-10">
//           <div className="w-28 h-28 rounded-full bg-teal-500 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4 shadow-lg">
//             {profileUser.name[0]}
//           </div>
//           <h1 className="text-4xl font-extrabold mb-2">{profileUser.name}</h1>
//           {profileUser.tagline && <p className={`text-lg ${darkMode ? "text-slate-300" : "text-gray-600"}`}>{profileUser.tagline}</p>}
//           {loggedInUser?._id !== profileUser._id && (
//             <button
//               onClick={() => navigate("/messages")}
//               className="mt-4 px-6 py-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition inline-flex items-center gap-2"
//             >
//               <FaRegCommentDots /> Message
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

//         {/* LEFT COLUMN - Skills */}
//         <div className="md:col-span-2 space-y-6">
          
//           {/* TEACHES */}
//           <div className={`p-6 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
//             <h2 className="flex items-center gap-2 text-teal-500 font-semibold mb-4"><FaGraduationCap /> TEACHES</h2>
//             <div className="flex flex-wrap gap-3">
//               {profileUser.skillsTeach?.map((skill, idx) => (
//                 <div key={idx} className="flex items-center gap-2 bg-gradient-to-tr from-teal-400 to-emerald-400 px-3 py-1 rounded-full text-white font-medium">
//                   <span>{skill.name || skill}</span>
//                   {loggedInUser && (
//                     <button
//                       onClick={() => sendRequest(skill.name || skill)}
//                       className="text-xs px-2 py-1 bg-white text-teal-600 rounded-full hover:bg-gray-100 transition"
//                     >
//                       Request
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* LEARNS */}
//           <div className={`p-6 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
//             <h2 className="flex items-center gap-2 text-blue-500 font-semibold mb-4"><FaBook /> LEARNS</h2>
//             <div className="flex flex-wrap gap-2">
//               {profileUser.skillsLearn?.map((skill, idx) => (
//                 <span key={idx} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">{skill.name || skill}</span>
//               ))}
//             </div>
//           </div>

//           {/* ABOUT ME */}
//           <div className={`p-6 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
//             <h2 className="text-teal-500 font-semibold mb-4 text-lg">ABOUT ME</h2>
//             <p className={`${darkMode ? "text-slate-300" : "text-gray-700"}`}>{profileUser.bio || "No bio set"}</p>
//           </div>

//           {/* MENTOR DETAILS */}
//           <div className={`p-6 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
//             <h2 className="text-teal-500 font-semibold mb-4 text-lg">MENTOR DETAILS</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2"><FaBriefcase className="text-teal-500" /> <span><b>Experience:</b> {profileUser.yearsOfExperience ? `${profileUser.yearsOfExperience} yrs` : "Not specified"}</span></div>
//               <div className="flex items-center gap-2"><FaUserTie className="text-teal-500" /> <span><b>Skill Level:</b> {profileUser.skillLevel || "Not specified"}</span></div>
//               <div className="flex items-center gap-2"><FaGraduationCap className="text-teal-500" /> <span><b>Education:</b> {profileUser.education || "Not specified"}</span></div>
//               <div className="flex items-center gap-2"><FaLink className="text-teal-500" /> <span><b>Portfolio:</b> {profileUser.portfolio ? <a href={profileUser.portfolio} target="_blank" className="underline text-teal-500">Visit</a> : "Not provided"}</span></div>
//               <div className="flex items-center gap-2"><FaLink className="text-teal-500" /> <span><b>LinkedIn:</b> {profileUser.linkedin ? <a href={profileUser.linkedin} target="_blank" className="underline text-teal-500">View</a> : "Not provided"}</span></div>
//             </div>
//           </div>

//         </div>

//         {/* RIGHT COLUMN - Demo Video */}
//         <div className="space-y-6">
//           {profileUser.demoVideo && (
//             <div className={`p-6 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
//               <h2 className="flex items-center gap-2 text-red-500 font-semibold mb-4"><FaYoutube /> DEMO VIDEO</h2>
//               <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//                 <iframe
//                   src={getEmbedUrl(profileUser.demoVideo)}
//                   title="Demo Video"
//                   className="absolute top-0 left-0 w-full h-full rounded-xl shadow-md"
//                   frameBorder="0"
//                   allowFullScreen
//                 />
//               </div>
//               <a
//                 href={profileUser.demoVideo}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 inline-block text-teal-500 font-semibold border border-teal-500 px-4 py-2 rounded hover:bg-teal-50 transition"
//               >
//                 Watch Full Video
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicProfile;
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook, FaRegCommentDots, FaYoutube, FaBriefcase, FaUserTie, FaLink } from "react-icons/fa";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  return (
    <div className={`min-h-screen px-6 py-12 transition-colors ${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}>

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-400/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="w-28 h-28 rounded-full bg-teal-500 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4 shadow-lg">
            {profileUser.name[0]}
          </div>
          <h1 className="text-4xl font-extrabold mb-2">{profileUser.name}</h1>
          {profileUser.tagline && <p className={`text-lg ${darkMode ? "text-slate-300" : "text-gray-600"}`}>{profileUser.tagline}</p>}
          {loggedInUser?._id !== profileUser._id && (
            <button
              onClick={() => navigate("/messages")}
              className="mt-4 px-6 py-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition inline-flex items-center gap-2"
            >
              <FaRegCommentDots /> Message
            </button>
          )}
  {/* MESSAGE BUTTON */}
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

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT COLUMN: TEACHES + LEARNS */}
        <div className="md:col-span-2 space-y-6">

          {/* TEACHES */}
          <div className={`p-8 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <h2 className="text-2xl font-bold text-teal-500 mb-6 flex items-center gap-2"><FaGraduationCap /> TEACHES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileUser.skillsTeach?.map((skill, idx) => (
                <div key={idx} className="flex flex-col justify-between gap-2 p-4 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-white shadow hover:shadow-xl transition">
                  <span className="font-semibold text-lg">{skill.name || skill}</span>
                  {loggedInUser && (
                    <button
                      onClick={() => sendRequest(skill.name || skill)}
                      className="text-sm py-1 px-3 bg-white text-teal-600 rounded-full hover:bg-gray-100 transition self-start"
                    >
                      Request
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* LEARNS */}
          <div className={`p-8 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <h2 className="text-2xl font-bold text-blue-500 mb-6 flex items-center gap-2"><FaBook /> LEARNS</h2>
            <div className="flex flex-wrap gap-3">
              {profileUser.skillsLearn?.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold">{skill.name || skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MENTOR DETAILS + ABOUT + DEMO VIDEO */}
        <div className="space-y-6">

          {/* MENTOR DETAILS */}
          <div className={`p-8 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <h2 className="text-2xl font-bold text-teal-500 mb-6 flex items-center gap-2">MENTOR DETAILS</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2"><FaBriefcase className="text-teal-500" /> <span><b>Experience:</b> {profileUser.yearsOfExperience ? `${profileUser.yearsOfExperience} yrs` : "Not specified"}</span></div>
              <div className="flex items-center gap-2"><FaUserTie className="text-teal-500" /> <span><b>Skill Level:</b> {profileUser.skillLevel || "Not specified"}</span></div>
              <div className="flex items-center gap-2"><FaGraduationCap className="text-teal-500" /> <span><b>Education:</b> {profileUser.education || "Not specified"}</span></div>
              <div className="flex items-center gap-2"><FaLink className="text-teal-500" /> <span><b>Portfolio:</b> {profileUser.portfolio ? <a href={profileUser.portfolio} target="_blank" className="underline text-teal-500">Visit</a> : "Not provided"}</span></div>
              <div className="flex items-center gap-2"><FaLink className="text-teal-500" /> <span><b>LinkedIn:</b> {profileUser.linkedin ? <a href={profileUser.linkedin} target="_blank" className="underline text-teal-500">View</a> : "Not provided"}</span></div>
            </div>
          </div>

          {/* ABOUT ME */}
          <div className={`p-8 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <h2 className="text-teal-500 text-2xl font-bold mb-4">ABOUT ME</h2>
            <p>{profileUser.bio || "No bio set"}</p>
          </div>

          {/* DEMO VIDEO */}
          {profileUser.demoVideo && (
            <div className={`p-8 rounded-2xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <h2 className="flex items-center gap-2 text-red-500 font-bold mb-4"><FaYoutube /> DEMO VIDEO</h2>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={getEmbedUrl(profileUser.demoVideo)}
                  title="Demo Video"
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-md"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <a
                href={profileUser.demoVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-teal-500 font-semibold border border-teal-500 px-4 py-2 rounded hover:bg-teal-50 transition"
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