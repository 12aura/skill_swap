// // import { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { AuthContext } from "../context/AuthContext";
// // import { DarkModeContext } from "../context/DarkModeContext";

// // const PublicProfile = () => {
// //   const { user, setUser } = useContext(AuthContext);
// //   const { darkMode } = useContext(DarkModeContext);

// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   const [tagline, setTagline] = useState("");
// //   const [bio, setBio] = useState("");
// //   const [demoVideo, setDemoVideo] = useState("");

// //   /* NEW FIELDS FROM CODE 2 */
// //   const [username, setUsername] = useState("");
// //   const [skillLevel, setSkillLevel] = useState("");
// //   const [experience, setExperience] = useState("");
// //   const [linkedin, setLinkedin] = useState("");
// //   const [portfolio, setPortfolio] = useState("");
// //   const [education, setEducation] = useState("");
// //   const [skillsOffered, setSkillsOffered] = useState("");
// //   const [skillTags, setSkillTags] = useState("");

// //   useEffect(() => {
// //     if (user) {
// //       setTagline(user.tagline || "");
// //       setBio(user.bio || "");
// //       setDemoVideo(user.demoVideo || "");

// //       /* NEW DATA LOADING */
// //       setUsername(user.username || "");
// //       setSkillLevel(user.skillLevel || "");
// //       setExperience(user.yearsOfExperience || "");
// //       setLinkedin(user.linkedin || "");
// //       setPortfolio(user.portfolio || "");
// //       setEducation(user.education || "");

// //       setSkillsOffered(user.skillsOffered?.join(", ") || "");
// //       setSkillTags(user.skillTags?.join(", ") || "");

// //       setLoading(false);
// //     }
// //   }, [user]);

// //   const handleSave = async () => {
// //     setSaving(true);

// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.put(
// //         "http://localhost:5000/api/user/public-profile",
// //         {
// //           tagline,
// //           bio,
// //           demoVideo,

// //           /* NEW FIELDS */
// //           username,
// //           skillLevel,
// //           yearsOfExperience: experience,
// //           linkedin,
// //           portfolio,
// //           education,
// //           skillsOffered: skillsOffered.split(",").map((s) => s.trim()),
// //           skillTags: skillTags.split(",").map((s) => s.trim()),
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setUser(res.data.user);
// //       alert("Public profile updated successfully");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to update public profile");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading) {
// //     return <p className="p-10">Loading...</p>;
// //   }

// //   return (
// //     <div
// //       className={`min-h-screen flex justify-center items-start py-14 px-4 ${
// //         darkMode
// //           ? "bg-slate-900 text-white"
// //           : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
// //       }`}
// //     >
// //       <div
// //         className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
// //           darkMode ? "bg-slate-800" : "bg-white"
// //         }`}
// //       >
// //         {/* HEADER */}
// //         <div className="mb-10">
// //           <h1 className="text-3xl font-bold mb-2">Edit Public Profile</h1>
// //           <p className="text-slate-500">
// //             Update your information to stand out to the community.
// //           </p>
// //         </div>

// //         {/* MENTOR DETAILS */}
// //         <div className="mb-10">
// //           <h2 className="text-lg font-semibold mb-4">Mentor Details</h2>

// //           <div className="grid md:grid-cols-2 gap-6">

// //             {/* USERNAME */}
// //             <div>
// //               <label className="block font-medium mb-2">Username</label>
// //               <input
// //                 type="text"
// //                 placeholder="palak.dev"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>
// // {/* SKILL LEVEL */}
// // <div>
// //   <label className="block font-medium mb-2">Skill Level</label>

// //   <select
// //     value={skillLevel}
// //     onChange={(e) => setSkillLevel(e.target.value)}
// //     className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
// //       darkMode
// //         ? "bg-slate-700 border-slate-600 text-white"
// //         : "bg-slate-50 border-slate-200"
// //     }`}
// //   >
// //     <option value="">Select your level</option>
// //     <option value="Beginner">Beginner</option>
// //     <option value="Intermediate">Intermediate</option>
// //     <option value="Advanced">Advanced</option>
// //     <option value="Expert">Expert</option>
// //   </select>
// // </div>

// //             {/* EXPERIENCE */}
// //             <div>
// //               <label className="block font-medium mb-2">
// //                 Years of Experience
// //               </label>
// //               <input
// //                 type="number"
// //                 placeholder="3"
// //                 value={experience}
// //                 onChange={(e) => setExperience(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>

// //             {/* EDUCATION */}
// //             <div>
// //               <label className="block font-medium mb-2">Education</label>
// //               <input
// //                 type="text"
// //                 placeholder="B.Tech Computer Science"
// //                 value={education}
// //                 onChange={(e) => setEducation(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>

// //             {/* LINKEDIN */}
// //             <div>
// //               <label className="block font-medium mb-2">LinkedIn</label>
// //               <input
// //                 type="url"
// //                 placeholder="https://linkedin.com/in/yourprofile"
// //                 value={linkedin}
// //                 onChange={(e) => setLinkedin(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>

// //             {/* PORTFOLIO */}
// //             <div>
// //               <label className="block font-medium mb-2">Portfolio</label>
// //               <input
// //                 type="url"
// //                 placeholder="https://yourportfolio.com"
// //                 value={portfolio}
// //                 onChange={(e) => setPortfolio(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>

// //             {/* SKILLS OFFERED */}
// //             <div>
// //               <label className="block font-medium mb-2">
// //                 Skills Offered (comma separated)
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="React, Python, UI Design"
// //                 value={skillsOffered}
// //                 onChange={(e) => setSkillsOffered(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>

// //             {/* SKILL TAGS */}
// //             <div>
// //               <label className="block font-medium mb-2">
// //                 Skill Categories
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="Programming, Design"
// //                 value={skillTags}
// //                 onChange={(e) => setSkillTags(e.target.value)}
// //                 className={`w-full rounded-xl px-4 py-3 border ${
// //                   darkMode
// //                     ? "bg-slate-700 border-slate-600"
// //                     : "bg-slate-50 border-slate-200"
// //                 }`}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* TAGLINE */}
// //         <div className="mb-8">
// //           <label className="block font-semibold mb-2">Tagline</label>
// //           <input
// //             type="text"
// //             value={tagline}
// //             onChange={(e) => setTagline(e.target.value)}
// //             className={`w-full rounded-xl px-4 py-3 border ${
// //               darkMode
// //                 ? "bg-slate-700 border-slate-600"
// //                 : "bg-slate-50 border-slate-200"
// //             }`}
// //           />
// //         </div>

// //         {/* BIO */}
// //         <div className="mb-8">
// //           <label className="block font-semibold mb-2">Bio</label>
// //           <textarea
// //             value={bio}
// //             onChange={(e) => setBio(e.target.value)}
// //             className={`w-full rounded-xl px-4 py-3 h-36 border ${
// //               darkMode
// //                 ? "bg-slate-700 border-slate-600"
// //                 : "bg-slate-50 border-slate-200"
// //             }`}
// //           />
// //         </div>

// //         {/* DEMO VIDEO */}
// //         <div className="mb-10">
// //           <label className="block font-semibold mb-2">Demo Video Link</label>
// //           <input
// //             type="url"
// //             value={demoVideo}
// //             onChange={(e) => setDemoVideo(e.target.value)}
// //             className={`w-full rounded-xl px-4 py-3 border ${
// //               darkMode
// //                 ? "bg-slate-700 border-slate-600"
// //                 : "bg-slate-50 border-slate-200"
// //             }`}
// //           />
// //         </div>

// //         {/* SAVE BUTTON */}
// //         <button
// //           onClick={handleSave}
// //           disabled={saving}
// //           className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
// //         >
// //           {saving ? "Saving..." : "Save Public Profile"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };





// // export default PublicProfile;
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { DarkModeContext } from "../context/DarkModeContext";

// const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const PublicProfile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [username, setUsername] = useState("");
//   const [skillLevel, setSkillLevel] = useState("");
//   const [experience, setExperience] = useState("");
//   const [education, setEducation] = useState("");
//   const [linkedin, setLinkedin] = useState("");
//   const [portfolio, setPortfolio] = useState("");
//   const [skillsOffered, setSkillsOffered] = useState("");
//   const [skillTags, setSkillTags] = useState("");
//   const [tagline, setTagline] = useState("");
//   const [bio, setBio] = useState("");
//   const [demoVideo, setDemoVideo] = useState("");
//   const [availability, setAvailability] = useState([]); // Array of weekdays

//   // Load user data into state
//   useEffect(() => {
//   if (user) {
//     setUsername(user.username || "");
//     setSkillLevel(user.skillLevel || "");
//     setExperience(user.yearsOfExperience || "");
//     setEducation(user.education || "");
//     setLinkedin(user.linkedin || "");
//     setPortfolio(user.portfolio || "");
//     setSkillsOffered(user.skillsOffered?.join(", ") || "");
//     setSkillTags(user.skillTags?.join(", ") || "");
//     setTagline(user.tagline || "");
//     setBio(user.bio || "");
//     setDemoVideo(user.demoVideo || "");
//     setAvailability(
//       user.availability?.map(d => {
//         const date = new Date(d);
//         return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1] || d;
//       }) || []
//     );
//     setLoading(false);
//   }
// }, [user]);

//   // Toggle weekday selection
//   const handleWeekdayClick = (day) => {
//     if (availability.includes(day)) {
//       setAvailability(availability.filter(d => d !== day));
//     } else {
//       setAvailability([...availability, day]);
//     }
//   };

//   // Save profile
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         "http://localhost:5000/api/user/public-profile",
//         {
//           username,
//           skillLevel,
//           yearsOfExperience: experience,
//           education,
//           linkedin,
//           portfolio,
//           skillsOffered: skillsOffered.split(",").map((s) => s.trim()),
//           skillTags: skillTags.split(",").map((s) => s.trim()),
//           tagline,
//           bio,
//           demoVideo,
//           availability, // now an array of weekdays
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setUser(res.data.user);
//       alert("Public profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update public profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="p-10">Loading...</p>;

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-start py-14 px-4 ${
//         darkMode
//           ? "bg-slate-900 text-white"
//           : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
//       }`}
//     >
//       <div
//         className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
//           darkMode ? "bg-slate-800" : "bg-white"
//         }`}
//       >
//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold mb-2">Edit Public Profile</h1>
//           <p className="text-slate-500">
//             Update your information to stand out to the community.
//           </p>
//         </div>

//         {/* FORM FIELDS */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
         

//           {/* Skill Level */}
//           <div>
//             <label className="block font-medium mb-2">Skill Level</label>
//             <select
//               value={skillLevel}
//               onChange={(e) => setSkillLevel(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-slate-50 border-slate-200"
//               }`}
//             >
//               <option value="">Select your level</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//               <option value="Expert">Expert</option>
//             </select>
//           </div>

//           {/* Experience */}
//           <div>
//             <label className="block font-medium mb-2">Years of Experience</label>
//             <input
//               type="number"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Education */}
//           <div>
//             <label className="block font-medium mb-2">Education</label>
//             <input
//               type="text"
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* LinkedIn */}
//           <div>
//             <label className="block font-medium mb-2">LinkedIn</label>
//             <input
//               type="url"
//               value={linkedin}
//               onChange={(e) => setLinkedin(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Portfolio */}
//           <div>
//             <label className="block font-medium mb-2">Portfolio</label>
//             <input
//               type="url"
//               value={portfolio}
//               onChange={(e) => setPortfolio(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Skills Offered */}
//           <div>
//             <label className="block font-medium mb-2">Skills Offered (comma separated)</label>
//             <input
//               type="text"
//               value={skillsOffered}
//               onChange={(e) => setSkillsOffered(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Skill Tags */}
//           <div>
//             <label className="block font-medium mb-2">Skill Categories</label>
//             <input
//               type="text"
//               value={skillTags}
//               onChange={(e) => setSkillTags(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Tagline */}
//           <div className="md:col-span-2">
//             <label className="block font-semibold mb-2">Tagline</label>
//             <input
//               type="text"
//               value={tagline}
//               onChange={(e) => setTagline(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Bio */}
//           <div className="md:col-span-2">
//             <label className="block font-semibold mb-2">Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 h-36 resize-none border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>

//           {/* Demo Video */}
//           <div className="md:col-span-2">
//             <label className="block font-semibold mb-2">Demo Video Link</label>
//             <input
//               type="url"
//               value={demoVideo}
//               onChange={(e) => setDemoVideo(e.target.value)}
//               className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
//                 darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
//               }`}
//             />
//           </div>
//         </div>

//        {/* AVAILABILITY */}
// {/* AVAILABILITY */}
// <div className="mb-8">
//   <label className="block font-semibold mb-2">Availability</label>
//   <div className="flex flex-wrap gap-2">
//     {weekdays.map((day) => (
//       <button
//         key={day}
//         type="button"
//         onClick={() => handleWeekdayClick(day)}
//         className={`px-4 py-2 rounded-full border font-medium transition ${
//           availability.includes(day)
//             ? "bg-teal-500 text-white border-teal-500"
//             : darkMode
//             ? "bg-slate-700 text-white border-slate-600"
//             : "bg-slate-100 text-slate-900 border-slate-300"
//         }`}
//       >
//         {day}
//       </button>
//     ))}
//   </div>
//   <div className="mt-2">
//     <strong>Selected Days:</strong>{" "}
//     {availability.length ? availability.join(", ") : "None"}
//   </div>
// </div>
//         {/* SAVE BUTTON */}
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save Public Profile"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PublicProfile;

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PublicProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillTags, setSkillTags] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [demoVideo, setDemoVideo] = useState("");
  const [availability, setAvailability] = useState([]);

  // XP Popup state
  const [xpPopup, setXpPopup] = useState({ visible: false, amount: 0 });
  const [successMsg, setSuccessMsg] = useState(false);

  const showXpPopup = (xpAmount) => {
    setXpPopup({ visible: true, amount: xpAmount });
    setTimeout(() => {
      setXpPopup({ visible: false, amount: 0 });
    }, 3000);
  };

  // Load user data into state
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setSkillLevel(user.skillLevel || "");
      setExperience(user.yearsOfExperience || "");
      setEducation(user.education || "");
      setLinkedin(user.linkedin || "");
      setPortfolio(user.portfolio || "");
      setSkillsOffered(user.skillsOffered?.join(", ") || "");
      setSkillTags(user.skillTags?.join(", ") || "");
      setTagline(user.tagline || "");
      setBio(user.bio || "");
      setDemoVideo(user.demoVideo || "");
      setAvailability(
        user.availability?.map(d => {
          const date = new Date(d);
          return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1] || d;
        }) || []
      );
      setLoading(false);
    }
  }, [user]);

  // Toggle weekday selection
  const handleWeekdayClick = (day) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day));
    } else {
      setAvailability([...availability, day]);
    }
  };

  // Save profile
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/user/public-profile",
        {
          username,
          skillLevel,
          yearsOfExperience: experience,
          education,
          linkedin,
          portfolio,
          skillsOffered: skillsOffered.split(",").map((s) => s.trim()),
          skillTags: skillTags.split(",").map((s) => s.trim()),
          tagline,
          bio,
          demoVideo,
          availability,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);

      // ✅ Show 15 XP popup on successful save
      showXpPopup(15);
      window.dispatchEvent(
        new CustomEvent("skillswap:xp-earned", { detail: 15 })
      );

      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to update public profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div
      className={`min-h-screen flex justify-center items-start py-14 px-4 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
      }`}
    >
      {/* ✅ XP POPUP — Fixed top-right */}
      <AnimatePresence>
        {xpPopup.visible && (
          <motion.div
            key="xp-popup"
            initial={{ opacity: 0, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ zIndex: 9999 }}
            className="fixed top-6 right-6 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-teal-500 text-white"
          >
            {/* Pulsing ring around icon */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-8 w-8 rounded-full bg-teal-300 opacity-40 animate-ping" />
              <Zap size={20} className="relative text-yellow-300 fill-yellow-300" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium opacity-80 uppercase tracking-wide">
                XP Earned
              </span>
              <span className="text-2xl font-bold tracking-tight">
                +{xpPopup.amount} XP
              </span>
            </div>

            {/* Progress bar draining over 3s */}
            <div className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-teal-300 w-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-300"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ SUCCESS TOAST */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            key="success-toast"
            initial={{ opacity: 0, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ zIndex: 9998, top: "5rem" }}
            className="fixed right-6 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-green-500 text-white"
          >
            <span className="text-sm font-semibold">✓ Profile saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Edit Public Profile</h1>
          <p className="text-slate-500">
            Update your information to stand out to the community.
          </p>
        </div>

        {/* FORM FIELDS */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Skill Level */}
          <div>
            <label className="block font-medium mb-2">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-slate-50 border-slate-200"
              }`}
            >
              <option value="">Select your level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block font-medium mb-2">Years of Experience</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Education */}
          <div>
            <label className="block font-medium mb-2">Education</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block font-medium mb-2">LinkedIn</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="block font-medium mb-2">Portfolio</label>
            <input
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block font-medium mb-2">Skills Offered (comma separated)</label>
            <input
              type="text"
              value={skillsOffered}
              onChange={(e) => setSkillsOffered(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Tagline */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 h-36 resize-none border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          {/* Demo Video */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Demo Video Link</label>
            <input
              type="url"
              value={demoVideo}
              onChange={(e) => setDemoVideo(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                darkMode ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">Availability</label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleWeekdayClick(day)}
                className={`px-4 py-2 rounded-full border font-medium transition ${
                  availability.includes(day)
                    ? "bg-teal-500 text-white border-teal-500"
                    : darkMode
                    ? "bg-slate-700 text-white border-slate-600"
                    : "bg-slate-100 text-slate-900 border-slate-300"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <strong>Selected Days:</strong>{" "}
            {availability.length ? availability.join(", ") : "None"}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Public Profile"}
        </button>
      </div>
    </div>
  );
};

export default PublicProfile;


