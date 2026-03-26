// // // import { useEffect, useState, useContext } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { DarkModeContext } from "../context/DarkModeContext";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { FaGraduationCap, FaBook, FaRegCommentDots } from "react-icons/fa";
// // // import { FaYoutube } from "react-icons/fa";

// // // const PublicProfile = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const { darkMode } = useContext(DarkModeContext);
// // //   const { user: loggedInUser } = useContext(AuthContext);

// // //   const [profileUser, setProfileUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   /* ---------------- FETCH PROFILE ---------------- */
// // //   useEffect(() => {
// // //     setLoading(true);
// // //     axios
// // //       .get(`http://localhost:5000/api/user/public/profile/${id}`)
// // //       .then((res) => setProfileUser(res.data.user || res.data))
// // //       .catch((err) => console.error(err))
// // //       .finally(() => setLoading(false));
// // //   }, [id]);

// // //   /* ---------------- SEND REQUEST ---------------- */
// // //   const sendRequest = async (skill) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       if (!token) return alert("Please login first");

// // //       await axios.post(
// // //         "http://localhost:5000/api/requests/send",
// // //         {
// // //           toUser: profileUser._id,
// // //           skill,
// // //         },
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       alert("Request sent successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to send request");
// // //     }
// // //   };

// // //   /* ---------------- YOUTUBE EMBED ---------------- */
// // //   const getEmbedUrl = (url) => {
// // //     if (!url) return "";
// // //     const regExp =
// // //       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// // //     const match = url.match(regExp);
// // //     return match && match[2]
// // //       ? `https://www.youtube.com/embed/${match[2]}`
// // //       : url;
// // //   };

// // //   if (loading) return <p className="p-10">Loading...</p>;
// // //   if (!profileUser) return <p className="p-10">User not found</p>;

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 p-10">
// // //       {/* HEADER */}
// // //       <div className="max-w-6xl mx-auto text-center mb-8">
// // //         <div className="flex justify-center items-center gap-3">
// // //           <h1 className="text-4xl font-bold">{profileUser.name}</h1>

// // //   {/* MESSAGE BUTTON */}
// // // {loggedInUser?._id !== profileUser._id && (
// // //   <button
// // //     onClick={() => navigate(`/chat/${profileUser._id}`)}
// // //     className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition"
// // //     title="Message"
// // //   >
// // //     <FaRegCommentDots size={20} />
// // //   </button>
// // // )}
// // //         </div>

// // //         {profileUser.tagline && (
// // //           <p className="text-gray-600 mt-2">{profileUser.tagline}</p>
// // //         )}
// // //       </div>

// // //       {/* MAIN CARD */}
// // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
// // //         {/* LEFT */}
// // //         <div className="flex-1 space-y-6">
// // //           {/* TEACHES */}
// // //           <div>
// // //             <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
// // //               <FaGraduationCap /> TEACHES
// // //             </h2>
// // //             <div className="flex flex-wrap gap-3">
// // //               {profileUser.skillsTeach?.map((skill, idx) => (
// // //                 <div
// // //                   key={idx}
// // //                   className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full"
// // //                 >
// // //                   <span className="text-teal-700 font-medium">
// // //                     {skill.name || skill}
// // //                   </span>

// // //                   {loggedInUser && (
// // //                     <button
// // //                       onClick={() => sendRequest(skill.name || skill)}
// // //                       className="text-xs px-2 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-600"
// // //                     >
// // //                       Request
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* LEARNS */}
// // //           <div>
// // //             <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
// // //               <FaBook /> LEARNS
// // //             </h2>
// // //             <div className="flex flex-wrap gap-2">
// // //               {profileUser.skillsLearn?.map((skill, idx) => (
// // //                 <span
// // //                   key={idx}
// // //                   className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
// // //                 >
// // //                   {skill.name || skill}
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* BIO */}
// // //           <div>
// // //             <h2 className="font-semibold text-gray-700 mb-2">ABOUT ME</h2>
// // //             <p className="text-gray-700">
// // //               {profileUser.bio || "No bio set"}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* RIGHT */}
// // //         <div className="flex-1 space-y-4">
// // //           {profileUser.demoVideo && (
// // //             <div>
// // //               <h2 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
// // //                 <FaYoutube className="text-red-600 w-5 h-5" />
// // //                 DEMO VIDEO
// // //               </h2>

// // //               <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
// // //                 <iframe
// // //                   src={getEmbedUrl(profileUser.demoVideo)}
// // //                   title="demoVideo"
// // //                   className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
// // //                   frameBorder="0"
// // //                   allowFullScreen
// // //                 ></iframe>
// // //               </div>

// // //               <a
// // //                 href={profileUser.demoVideo}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="mt-3 inline-block text-teal-700 font-semibold border border-teal-700 px-4 py-2 rounded hover:bg-teal-50 transition"
// // //               >
// // //                 Watch Full Video
// // //               </a>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PublicProfile;

// // import { useEffect, useState, useContext } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { DarkModeContext } from "../context/DarkModeContext";
// // import { AuthContext } from "../context/AuthContext";
// // import { FaGraduationCap, FaBook, FaRegCommentDots } from "react-icons/fa";
// // import { FaYoutube } from "react-icons/fa";
// // import ReviewsSection from "../components/ReviewsSection";
// // import { motion, AnimatePresence } from "framer-motion";

// // const PublicProfile = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { darkMode } = useContext(DarkModeContext);
// //   const { user: loggedInUser } = useContext(AuthContext);

// //   const [profileUser, setProfileUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState("about");
// //   const [lightboxOpen, setLightboxOpen] = useState(false);

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get(`http://localhost:5000/api/user/public/profile/${id}`)
// //       .then((res) => setProfileUser(res.data.user || res.data))
// //       .catch((err) => console.error(err))
// //       .finally(() => setLoading(false));
// //   }, [id]);

// //   const sendRequest = async (skill) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) return alert("Please login first");
// //       await axios.post(
// //         "http://localhost:5000/api/requests/send",
// //         { toUser: profileUser._id, skill },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Request sent successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to send request");
// //     }
// //   };

// //   const getEmbedUrl = (url) => {
// //     if (!url) return "";
// //     const regExp =
// //       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// //     const match = url.match(regExp);
// //     return match && match[2]
// //       ? `https://www.youtube.com/embed/${match[2]}`
// //       : url;
// //   };

// //   if (loading) return <p className="p-10">Loading...</p>;
// //   if (!profileUser) return <p className="p-10">User not found</p>;

// //   const avatarSrc = profileUser?.avatar
// //     ? profileUser.avatar
// //     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
// //         profileUser?.name || "U"
// //       )}&background=0d9488&color=fff&size=128`;

// //   const tabs = [
// //     { key: "about", label: "About" },
// //     {
// //       key: "reviews",
// //       label: `Reviews${profileUser.totalReviews > 0 ? ` (${profileUser.totalReviews})` : ""}`,
// //     },
// //   ];

// //   return (
// //     <div
// //       className={`min-h-screen p-10 ${
// //         darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
// //       }`}
// //     >
// //       {/* LIGHTBOX */}
// //       <AnimatePresence>
// //         {lightboxOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setLightboxOpen(false)}
// //             className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center cursor-zoom-out"
// //           >
// //             <motion.img
// //               initial={{ scale: 0.85, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.85, opacity: 0 }}
// //               transition={{ duration: 0.2 }}
// //               src={avatarSrc}
// //               alt="Profile preview"
// //               className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
// //               onClick={(e) => e.stopPropagation()}
// //             />
// //             <button
// //               onClick={() => setLightboxOpen(false)}
// //               className="absolute top-6 right-8 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full w-11 h-11 flex items-center justify-center transition"
// //             >
// //               ✕
// //             </button>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* HEADER */}
// //       <div className="max-w-6xl mx-auto text-center mb-8">
// //         <div className="flex justify-center items-center gap-4">
// //           {/* Avatar */}
// //           <img
// //             src={avatarSrc}
// //             alt={profileUser.name}
// //             onClick={() => setLightboxOpen(true)}
// //             className="w-16 h-16 rounded-full object-cover border-4 border-teal-400 shadow-md cursor-zoom-in hover:scale-105 transition-transform"
// //           />

// //           <div className="flex items-center gap-3">
// //             <div className="text-left">
// //               <h1 className="text-4xl font-bold">{profileUser.name}</h1>

// //               {/* Star rating summary */}
// //               {profileUser.averageRating && (
// //                 <div className="flex items-center gap-1 mt-0.5">
// //                   {[1, 2, 3, 4, 5].map((star) => (
// //                     <span
// //                       key={star}
// //                       className={`text-sm ${
// //                         star <= Math.round(profileUser.averageRating)
// //                           ? "text-yellow-400"
// //                           : "text-gray-300"
// //                       }`}
// //                     >
// //                       ★
// //                     </span>
// //                   ))}
// //                   <span
// //                     className={`text-sm ml-1 ${
// //                       darkMode ? "text-slate-400" : "text-gray-500"
// //                     }`}
// //                   >
// //                     {profileUser.averageRating} · {profileUser.totalReviews}{" "}
// //                     review{profileUser.totalReviews !== 1 ? "s" : ""}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Message button */}
// //             {loggedInUser?._id !== profileUser._id && (
// //               <button
// //                 onClick={() => navigate(`/chat/${profileUser._id}`)}
// //                 className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition"
// //                 title="Message"
// //               >
// //                 <FaRegCommentDots size={20} />
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {profileUser.tagline && (
// //           <p
// //             className={`mt-2 text-sm ${
// //               darkMode ? "text-slate-400" : "text-gray-600"
// //             }`}
// //           >
// //             {profileUser.tagline}
// //           </p>
// //         )}
// //       </div>

// //       {/* MAIN CARD */}
// //       <div
// //         className={`max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden ${
// //           darkMode ? "bg-slate-800" : "bg-white"
// //         }`}
// //       >
// //         {/* Tabs */}
// //         <div
// //           className={`flex border-b ${
// //             darkMode ? "border-slate-700" : "border-gray-200"
// //           }`}
// //         >
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.key}
// //               onClick={() => setActiveTab(tab.key)}
// //               className={`px-8 py-4 text-sm font-medium transition border-b-2 -mb-px ${
// //                 activeTab === tab.key
// //                   ? "border-teal-500 text-teal-600"
// //                   : darkMode
// //                   ? "border-transparent text-slate-400 hover:text-white"
// //                   : "border-transparent text-gray-500 hover:text-gray-800"
// //               }`}
// //             >
// //               {tab.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Tab Content */}
// //         <div className="p-8">
// //           {activeTab === "about" ? (
// //             <div className="flex flex-col md:flex-row gap-10">
// //               {/* LEFT */}
// //               <div className="flex-1 space-y-6">
// //                 {/* TEACHES */}
// //                 <div>
// //                   <h2
// //                     className={`flex items-center gap-2 font-semibold mb-2 ${
// //                       darkMode ? "text-slate-300" : "text-gray-700"
// //                     }`}
// //                   >
// //                     <FaGraduationCap /> TEACHES
// //                   </h2>
// //                   <div className="flex flex-wrap gap-3">
// //                     {profileUser.skillsTeach?.map((skill, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full"
// //                       >
// //                         {/* <span className="text-teal-700 font-medium">
// //                           {skill.name || skill}
// //                         </span> */}
// //                         <span className="text-teal-700 font-medium">
// //                           {typeof skill === "object"
// //                             ? skill?.name || skill?.skill?.name || "Skill"
// //                             : skill}
// //                         </span>
// //                         {loggedInUser && (
// //                           <button
// //                             //onClick={() => sendRequest(skill.name || skill)}
// //                             onClick={() =>
// //                               sendRequest(
// //                                 typeof skill === "object"
// //                                   ? skill?.name || skill?.skill?.name
// //                                   : skill
// //                               )
// //                             }
// //                             className="text-xs px-2 py-1 bg-teal-500 text-white rounded-full hover:bg-teal-600"
// //                           >
// //                             Request
// //                           </button>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* LEARNS */}
// //                 <div>
// //                   <h2
// //                     className={`flex items-center gap-2 font-semibold mb-2 ${
// //                       darkMode ? "text-slate-300" : "text-gray-700"
// //                     }`}
// //                   >
// //                     <FaBook /> LEARNS
// //                   </h2>
// //                   <div className="flex flex-wrap gap-2">
// //                     {profileUser.skillsLearn?.map((skill, idx) => (
// //                       // <span
// //                       //   key={idx}
// //                       //   className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
// //                       // >
// //                       //   {skill.name || skill}
// //                       // </span>
// //                       <span
// //                         key={idx}
// //                         className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
// //                       >
// //                         {typeof skill === "object"
// //                           ? skill?.name || skill?.skill?.name || "Skill"
// //                           : skill}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* BIO */}
// //                 <div>
// //                   <h2
// //                     className={`font-semibold mb-2 ${
// //                       darkMode ? "text-slate-300" : "text-gray-700"
// //                     }`}
// //                   >
// //                     ABOUT ME
// //                   </h2>
// //                   <p className={darkMode ? "text-slate-400" : "text-gray-700"}>
// //                     {profileUser.bio || "No bio set"}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* RIGHT */}
// //               <div className="flex-1 space-y-4">
// //                 {profileUser.demoVideo && (
// //                   <div>
// //                     <h2
// //                       className={`font-semibold mb-2 flex items-center gap-2 ${
// //                         darkMode ? "text-slate-300" : "text-gray-700"
// //                       }`}
// //                     >
// //                       <FaYoutube className="text-red-600 w-5 h-5" />
// //                       DEMO VIDEO
// //                     </h2>
// //                     <div
// //                       className="relative w-full"
// //                       style={{ paddingBottom: "56.25%" }}
// //                     >
// //                       <iframe
// //                         src={getEmbedUrl(profileUser.demoVideo)}
// //                         title="demoVideo"
// //                         className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
// //                         frameBorder="0"
// //                         allowFullScreen
// //                       />
// //                     </div>
// //                     <a
// //                       href={profileUser.demoVideo}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="mt-3 inline-block text-teal-700 font-semibold border border-teal-700 px-4 py-2 rounded hover:bg-teal-50 transition"
// //                     >
// //                       Watch Full Video
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             /* Reviews Tab */
// //             <ReviewsSection userId={profileUser._id} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PublicProfile;
// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import { FaGraduationCap, FaBook, FaRegCommentDots } from "react-icons/fa";
// import ReviewsSection from "../components/ReviewsSection";

// const PublicProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { darkMode } = useContext(DarkModeContext);
//   const { user: loggedInUser } = useContext(AuthContext);

//   const [profileUser, setProfileUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/api/user/public/profile/${id}`)
//       .then((res) => setProfileUser(res.data.user || res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const sendRequest = async (skillName) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login first");

//       await axios.post(
//         "http://localhost:5000/api/requests/send",
//         {
//           toUser: profileUser._id,
//           skill: skillName,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Request sent successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send request");
//     }
//   };

//   // 🔥 ULTRA SAFE RENDER FUNCTION (this fixes EVERYTHING)
//   const safeText = (value) => {
//     if (!value) return "";

//     if (typeof value === "string" || typeof value === "number") {
//       return value;
//     }

//     if (typeof value === "object") {
//       if (value.name) return value.name;
//       if (value.skill?.name) return value.skill.name;
//       return "Skill"; // fallback instead of crashing
//     }

//     return "";
//   };

//   if (loading) return <p className="p-10">Loading...</p>;
//   if (!profileUser) return <p className="p-10">User not found</p>;

//   const avatarSrc = profileUser?.avatar
//     ? profileUser.avatar
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         profileUser?.name || "U"
//       )}`;

//   return (
//     <div
//       className={`min-h-screen p-10 ${
//         darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       {/* HEADER */}
//       <div className="text-center mb-8">
//         <img
//           src={avatarSrc}
//           alt="profile"
//           className="w-20 h-20 rounded-full mx-auto"
//         />
//         <h1 className="text-3xl font-bold mt-2">
//           {safeText(profileUser?.name)}
//         </h1>
//         <p>{safeText(profileUser?.tagline)}</p>
//       </div>

//       {/* TABS */}
//       <div className="flex justify-center gap-3 mb-6">
//         <button onClick={() => setActiveTab("about")}>About</button>
//         <button onClick={() => setActiveTab("reviews")}>Reviews</button>
//       </div>

//       {/* ABOUT TAB */}
//       {activeTab === "about" && (
//         <div className="max-w-4xl mx-auto space-y-6">

//           {/* TEACHES */}
//           <div>
//             <h2 className="font-bold flex items-center gap-2">
//               <FaGraduationCap /> TEACHES
//             </h2>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {profileUser.skillsTeach?.map((item, idx) => {
//                 const name = safeText(item);

//                 return (
//                   <div key={idx} className="bg-green-100 px-3 py-1 rounded">
//                     <span>{name}</span>

//                     {loggedInUser && (
//                       <button
//                         onClick={() => sendRequest(name)}
//                         className="ml-2 text-xs bg-green-500 text-white px-2 rounded"
//                       >
//                         Request
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* LEARNS */}
//           <div>
//             <h2 className="font-bold flex items-center gap-2">
//               <FaBook /> LEARNS
//             </h2>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {profileUser.skillsLearn?.map((item, idx) => {
//                 const name = safeText(item);

//                 return (
//                   <span key={idx} className="bg-blue-100 px-3 py-1 rounded">
//                     {name}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>

//           {/* BIO */}
//           <div>
//             <h2 className="font-bold">ABOUT</h2>
//             <p>{safeText(profileUser?.bio) || "No bio available"}</p>
//           </div>
//         </div>
//       )}

//       {/* REVIEWS TAB */}
//       {activeTab === "reviews" && (
//         <ReviewsSection userId={profileUser?._id} />
//       )}
//     </div>
//   );
// };

// export default PublicProfile;
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import ReviewsSection from "../components/ReviewsSection";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  // ✅ STOP if id missing
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => setProfileUser(res.data.user || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const sendRequest = async (skillName) => {
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

  // ✅ SAFE skill name extractor
  const getSkillName = (skill) => {
    if (!skill) return "Skill";

    if (typeof skill === "string") return skill;

    if (skill.name) return skill.name;

    if (skill.skill) {
      if (typeof skill.skill === "string") return skill.skill;
      if (skill.skill.name) return skill.skill.name;
    }

    return "Skill";
  };

  // ❌ invalid id
  if (!id) {
    return <p className="p-10">Invalid profile ID</p>;
  }

  if (loading) return <p className="p-10">Loading...</p>;
  if (!profileUser) return <p className="p-10">User not found</p>;

  const avatarSrc = profileUser?.avatar
    ? profileUser.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profileUser?.name || "U"
      )}`;

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="text-center mb-8">
        <img
          src={avatarSrc}
          alt="profile"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h1 className="text-3xl font-bold mt-2">
          {profileUser?.name}
        </h1>
        <p>{profileUser?.tagline}</p>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setActiveTab("about")}>About</button>
        <button onClick={() => setActiveTab("reviews")}>Reviews</button>
      </div>

      {/* ABOUT */}
      {activeTab === "about" && (
        <div className="max-w-4xl mx-auto space-y-6">

          {/* TEACHES */}
          <div>
            <h2 className="font-bold flex items-center gap-2">
              <FaGraduationCap /> TEACHES
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              {profileUser.skillsTeach?.map((item, idx) => {
                const name = getSkillName(item);

                return (
                  <div key={idx} className="bg-green-100 px-3 py-1 rounded">
                    <span>{name}</span>

                    {loggedInUser && (
                      <button
                        onClick={() => sendRequest(name)}
                        className="ml-2 text-xs bg-green-500 text-white px-2 rounded"
                      >
                        Request
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEARNS */}
          <div>
            <h2 className="font-bold flex items-center gap-2">
              <FaBook /> LEARNS
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              {profileUser.skillsLearn?.map((item, idx) => (
                <span key={idx} className="bg-blue-100 px-3 py-1 rounded">
                  {getSkillName(item)}
                </span>
              ))}
            </div>
          </div>

          {/* BIO */}
          <div>
            <h2 className="font-bold">ABOUT</h2>
            <p>{profileUser?.bio || "No bio available"}</p>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {activeTab === "reviews" && (
        <ReviewsSection userId={profileUser?._id} />
      )}
    </div>
  );
};

export default PublicProfile;