// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { motion } from "framer-motion";
// import { User, Sparkles, BookOpen, Save, X, Camera } from "lucide-react";

// // This is a pure JSX component (NOT TypeScript)
// // You can save this file as: EditProfile.jsx

// const EditProfile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState(user?.name || "");
//   const [skillsTeach, setSkillsTeach] = useState("");
//   const [skillsLearn, setSkillsLearn] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     setName(user?.name || "");
//   }, [user]);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const newTeach = skillsTeach
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       const newLearn = skillsLearn
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       const mergedTeach = [
//         ...new Set([...(user.skillsTeach || []).map((s) => s.name), ...newTeach]),
//       ];

//       const mergedLearn = [
//         ...new Set([...(user.skillsLearn || []).map((s) => s.name), ...newLearn]),
//       ];

//       const res = await axios.put(
//         "http://localhost:5000/api/user/update",
//         {
//           name,
//           skillsTeach: mergedTeach,
//           skillsLearn: mergedLearn,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSaved(true);

//       setTimeout(() => {
//         setUser(res.data.user);
//         navigate("/Profile");
//       }, 1500);
//     } catch (err) {
//       console.error("Profile update failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOk = () => {
//     setSaved(false);
//     navigate("/home");
//   };

//   return (
//     <div
//       className={`min-h-screen px-6 py-10 transition-all ${
//         darkMode
//           ? "bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT PROFILE CARD */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className={`rounded-3xl shadow-xl p-8 backdrop-blur-md border ${
//             darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
//           }`}
//         >
//           <div className="flex flex-col items-center text-center">

//             {/* PROFILE IMAGE */}
//             <div className="relative w-32 h-32 mb-4">
//               <img
//                 src={user?.profilePic || user?.avatar || "https://i.pravatar.cc/200"}
//                 alt="profile"
//                 className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
//               />

//               <div className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full shadow-md">
//                 <Camera size={16} className="text-white" />
//               </div>
//             </div>

//             <h2 className="text-xl font-semibold">{name || "Your Name"}</h2>
//             <p className="text-sm opacity-70 mt-1">Update your skills & profile</p>

//             <div className="w-full mt-6 space-y-4 text-left">
//               <div className="flex items-center gap-3 text-sm opacity-80">
//                 <Sparkles size={16} /> Improve your profile visibility
//               </div>
//               <div className="flex items-center gap-3 text-sm opacity-80">
//                 <BookOpen size={16} /> Add skills you want to learn
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT FORM SECTION */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className={`lg:col-span-2 rounded-3xl shadow-xl p-8 border ${
//             darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
//           }`}
//         >
//           <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>

//           <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">

//             {/* NAME BOX */}
//             <div className="md:col-span-2">
//               <label className="text-sm font-medium mb-2 block">Full Name</label>

//               <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
//                 darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
//               }`}>
//                 <User size={18} className="text-teal-400" />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-transparent outline-none text-[15px]"
//                 />
//               </div>
//             </div>

//             {/* SKILLS TO TEACH */}
//             <div>
//               <label className="text-sm font-medium mb-2 block">Skills You Can Teach</label>

//               <div className={`p-5 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
//                 darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
//               }`}>
//                 <input
//                   type="text"
//                   value={skillsTeach}
//                   onChange={(e) => setSkillsTeach(e.target.value)}
//                   placeholder="React, Java, UI Design"
//                   className="w-full bg-transparent outline-none text-[15px]"
//                 />
//                 <p className="text-xs opacity-60 mt-2">Separate skills using commas</p>
//               </div>
//             </div>

//             {/* SKILLS TO LEARN */}
//             <div>
//               <label className="text-sm font-medium mb-2 block">Skills You Want to Learn</label>

//               <div className={`p-5 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
//                 darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
//               }`}>
//                 <input
//                   type="text"
//                   value={skillsLearn}
//                   onChange={(e) => setSkillsLearn(e.target.value)}
//                   placeholder="AI, DevOps, Python"
//                   className="w-full bg-transparent outline-none text-[15px]"
//                 />
//                 <p className="text-xs opacity-60 mt-2">Separate skills using commas</p>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="md:col-span-2 flex justify-end gap-4 pt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate("/profile")}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition ${
//                   darkMode
//                     ? "border-gray-600 text-gray-300 hover:bg-slate-700"
//                     : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <X size={18} /> Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading || saved}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-md transition-all ${
//                   loading || saved
//                     ? "bg-gray-400"
//                     : "bg-teal-500 hover:bg-teal-600"
//                 }`}
//               >
//                 <Save size={18} />
//                 {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </div>

//       {/* Saved Modal */}
//       {saved && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div
//             className={`p-6 rounded-2xl shadow-xl text-center transition-colors ${
//               darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
//             }`}
//           >
//             <p className="text-lg font-semibold mb-4 text-green-500">Profile Saved Successfully!</p>
//             <button
//               onClick={handleOk}
//               className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProfile;



import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import { User, Sparkles, BookOpen, Save, X, Camera } from "lucide-react";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [skillsTeach, setSkillsTeach] = useState("");
  const [skillsLearn, setSkillsLearn] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const newTeach = skillsTeach
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const newLearn = skillsLearn
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const mergedTeach = [
        ...new Set([...(user.skillsTeach || []).map((s) => s.name), ...newTeach]),
      ];

      const mergedLearn = [
        ...new Set([...(user.skillsLearn || []).map((s) => s.name), ...newLearn]),
      ];

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        {
          name,
          skillsTeach: mergedTeach,
          skillsLearn: mergedLearn,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSaved(true);

      setTimeout(() => {
        setUser(res.data.user);
        navigate("/Profile");
      }, 1500);
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setSaved(false);
    navigate("/home");
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-all ${
        darkMode
          ? "bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-3xl shadow-xl p-8 backdrop-blur-md border ${
            darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col items-center text-center">

            {/* PROFILE IMAGE */}
            <div className="relative w-32 h-32 mb-4">
              {user?.profilePic || user?.avatar ? (
                <img
                  src={user?.profilePic || user?.avatar}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-full border-4 border-teal-500 shadow-lg bg-teal-500 text-white text-3xl font-bold">
                  {name
                    ? name
                        .trim()
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "U"}
                </div>
              )}

              <div className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full shadow-md">
                <Camera size={16} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-semibold">{name || "Your Name"}</h2>
            <p className="text-sm opacity-70 mt-1">Update your skills & profile</p>

            <div className="w-full mt-6 space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm opacity-80">
                <Sparkles size={16} /> Improve your profile visibility
              </div>
              <div className="flex items-center gap-3 text-sm opacity-80">
                <BookOpen size={16} /> Add skills you want to learn
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className={`lg:col-span-2 rounded-3xl shadow-xl p-8 border ${
            darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>

          <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">

            {/* NAME */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Full Name</label>

              <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
                darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
              }`}>
                <User size={18} className="text-teal-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent outline-none text-[15px]"
                />
              </div>
            </div>

            {/* SKILLS TO TEACH */}
            <div>
              <label className="text-sm font-medium mb-2 block">Skills You Can Teach</label>

              <div className={`p-5 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
                darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
              }`}>
                <input
                  type="text"
                  value={skillsTeach}
                  onChange={(e) => setSkillsTeach(e.target.value)}
                  placeholder="React, Java, UI Design"
                  className="w-full bg-transparent outline-none text-[15px]"
                />
                <p className="text-xs opacity-60 mt-2">Separate skills using commas</p>
              </div>
            </div>

            {/* SKILLS TO LEARN */}
            <div>
              <label className="text-sm font-medium mb-2 block">Skills You Want to Learn</label>

              <div className={`p-5 rounded-2xl border transition-all shadow-sm focus-within:shadow-md focus-within:border-teal-500 ${
                darkMode ? "bg-slate-800/60 border-slate-600" : "bg-white border-gray-300"
              }`}>
                <input
                  type="text"
                  value={skillsLearn}
                  onChange={(e) => setSkillsLearn(e.target.value)}
                  placeholder="AI, DevOps, Python"
                  className="w-full bg-transparent outline-none text-[15px]"
                />
                <p className="text-xs opacity-60 mt-2">Separate skills using commas</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-slate-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <X size={18} /> Cancel
              </button>

              <button
                type="submit"
                disabled={loading || saved}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-md transition-all ${
                  loading || saved
                    ? "bg-gray-400"
                    : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                <Save size={18} />
                {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* SUCCESS MODAL */}
      {saved && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className={`p-6 rounded-2xl shadow-xl text-center ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <p className="text-lg font-semibold mb-4 text-green-500">
              Profile Saved Successfully!
            </p>

            <button
              onClick={handleOk}
              className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;