// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import { FaGraduationCap, FaBook, FaRegCommentDots, FaYoutube } from "react-icons/fa";
// import ReviewsSection from "../components/ReviewsSection";
// import { motion, AnimatePresence } from "framer-motion";

// const PublicProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { darkMode } = useContext(DarkModeContext);
//   const { user: loggedInUser } = useContext(AuthContext);

//   const [profileUser, setProfileUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("about");
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [availability, setAvailability] = useState([]);

//   /* ---------------- FETCH PROFILE ---------------- */
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5000/api/user/public/profile/${id}`)
//       .then((res) => {
//         const user = res.data.user || res.data;
//         setProfileUser(user);

//         // Handle availability in both formats
//         if (Array.isArray(user.availability)) {
//           setAvailability(user.availability);
//         } else {
//           setAvailability([]);
//         }
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   /* ---------------- SEND REQUEST ---------------- */
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

//   /* ---------------- YOUTUBE EMBED ---------------- */
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

//   const avatarSrc = profileUser.avatar
//     ? profileUser.avatar
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         profileUser.name || "U"
//       )}&background=0d9488&color=fff&size=128`;

//   const tabs = [
//     { key: "about", label: "About" },
//     {
//       key: "reviews",
//       label: `Reviews${
//         profileUser.totalReviews > 0
//           ? ` (${profileUser.totalReviews})`
//           : ""
//       }`,
//     },
//   ];
//   const weekdayOrder = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday"
// ];

//   return (
//     <div
//       className={`min-h-screen p-10 ${
//         darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto text-center mb-8">
//         <div className="flex justify-center items-center gap-4">
//           <img
//             src={avatarSrc}
//             alt={profileUser.name}
//             onClick={() => setLightboxOpen(true)}
//             className="w-16 h-16 rounded-full object-cover border-4 border-teal-400 shadow-md cursor-pointer"
//           />

//           <div className="text-left">
//             <h1 className="text-4xl font-bold">{profileUser.name}</h1>

//             {profileUser.tagline && (
//               <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
//                 {profileUser.tagline}
//               </p>
//             )}
//           </div>

//           {loggedInUser?._id !== profileUser._id && (
//             <button
//               onClick={() => navigate(`/chat/${profileUser._id}`)}
//               className="p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
//             >
//               <FaRegCommentDots size={20} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MAIN CARD */}
//       <div
//         className={`max-w-6xl mx-auto rounded-xl shadow-lg ${
//           darkMode ? "bg-slate-800" : "bg-white"
//         }`}
//       >
//         {/* Tabs */}
//         <div className="flex border-b">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`px-8 py-4 text-sm font-medium border-b-2 ${
//                 activeTab === tab.key
//                   ? "border-teal-500 text-teal-600"
//                   : "border-transparent text-gray-500"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="p-8">
//           {activeTab === "about" ? (
//             <div className="flex flex-col md:flex-row gap-10">

//               {/* LEFT SIDE */}
//               <div className="flex-1 space-y-6">

//                 {/* TEACHES */}
//                 <div>
//                   <h2 className="font-semibold mb-2 flex items-center gap-2">
//                     <FaGraduationCap /> TEACHES
//                   </h2>
//                   <div className="flex flex-wrap gap-2">
//                     {profileUser.skillsTeach?.map((skill, i) => (
//                       <div key={i} className="bg-teal-50 px-3 py-1 rounded-full flex gap-2">
//                         <span>{skill.name || skill}</span>
//                         {loggedInUser && (
//                           <button
//                             onClick={() => sendRequest(skill.name || skill)}
//                             className="text-xs bg-teal-500 text-white px-2 rounded-full"
//                           >
//                             Request
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ABOUT ME */}
//                 <div>
//                   <h2 className="font-semibold mb-2">ABOUT ME</h2>
//                   <p>{profileUser.bio || "No bio set"}</p>

//                   {profileUser.education && (
//                     <p className="mt-2">
//                       <strong>Education:</strong> {profileUser.education}
//                     </p>
//                   )}

//                   {profileUser.skillLevel && (
//                     <p>
//                       <strong>Skill Level:</strong> {profileUser.skillLevel}
//                     </p>
//                   )}

//                   {profileUser.yearsOfExperience > 0 && (
//                     <p>
//                       <strong>Experience:</strong> {profileUser.yearsOfExperience} years
//                     </p>
//                   )}

//                   {profileUser.linkedin && (
//                     <p>
//                       <strong>LinkedIn:</strong>{" "}
//                       <a href={profileUser.linkedin} target="_blank" rel="noreferrer" className="text-teal-600">
//                         View Profile
//                       </a>
//                     </p>
//                   )}

//                   {profileUser.portfolio && (
//                     <p>
//                       <strong>Portfolio:</strong>{" "}
//                       <a href={profileUser.portfolio} target="_blank" rel="noreferrer" className="text-teal-600">
//                         View Portfolio
//                       </a>
//                     </p>
//                   )}
//                 </div>

//                 {/* AVAILABILITY */}
//                 <div>
//                   <h2 className="font-semibold mb-2">WEEKLY AVAILABILITY</h2>

//                   <div className="flex flex-wrap gap-2">
//                     {availability.length > 0 ? (
//                    [...availability]
//   .sort((a, b) => {
//     const dayA = typeof a === "string" ? a : a.day;
//     const dayB = typeof b === "string" ? b : b.day;

//     return weekdayOrder.indexOf(dayA) - weekdayOrder.indexOf(dayB);
//   })
//   .map((item, idx) => (
//     <span
//       key={idx}
//       className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-medium"
//     >
//       {typeof item === "string" ? item : item.day}
//     </span>
//   ))
//                     ) : (
//                       <p className="text-gray-500">No availability set</p>
//                     )}
//                   </div>
//                 </div>

//               </div>

//               {/* RIGHT SIDE (VIDEO) */}
//               <div className="flex-1">
//                 {profileUser.demoVideo && (
//                   <div>
//                     <h2 className="font-semibold mb-2 flex items-center gap-2">
//                       <FaYoutube className="text-red-600" /> DEMO VIDEO
//                     </h2>

//                     <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//                       <iframe
//                         src={getEmbedUrl(profileUser.demoVideo)}
//                         className="absolute top-0 left-0 w-full h-full rounded-lg"
//                         allowFullScreen
//                         title="Demo Video"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//             </div>
//           ) : (
//             <ReviewsSection userId={profileUser._id} />
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
import { FaRegCommentDots, FaYoutube, FaLinkedin, FaBriefcase } from "react-icons/fa";
import ReviewsSection from "../components/ReviewsSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Star, Clock, ExternalLink,
  Send, Calendar, Award, User, MapPin
} from "lucide-react";

/* ═══════════════════════════════════════════
   THEME — fully teal-green anchored
═══════════════════════════════════════════ */
const T = (dark) => ({
  /* backgrounds */
  pageBg:     dark ? "#050d0c"                      : "#e8f5f4",
  heroBg:     dark ? "#061412"                      : "#0d2b27",
  cardBg:     dark ? "#0a1f1c"                      : "#ffffff",
  sectionBg:  dark ? "#0d2420"                      : "#f0faf9",
  /* borders */
  border:     dark ? "rgba(20,184,166,0.12)"        : "rgba(20,184,166,0.18)",
  borderMid:  dark ? "rgba(20,184,166,0.22)"        : "rgba(20,184,166,0.28)",
  /* text */
  textPrimary:   dark ? "#e8faf8"  : "#0a1f1c",
  textSecondary: dark ? "#7fb8b2"  : "#2d6b64",
  textMuted:     dark ? "#3d7a73"  : "#5a9e97",
  /* teal palette */
  teal50:  "#f0fdfa",
  teal100: "#ccfbf1",
  teal300: "#5eead4",
  teal400: "#2dd4bf",
  teal500: "#14b8a6",
  teal600: "#0d9488",
  teal700: "#0f766e",
  /* green accent */
  green:   "#10b981",
  /* gradient */
  grad:    "linear-gradient(135deg, #14b8a6 0%, #0d9488 60%, #065f56 100%)",
  gradSoft:"linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.08) 100%)",
});

const WEEKDAY_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

/* ─── Stat chip in hero ─── */
const HeroStat = ({ icon: Icon, label, value }) => (
  <div style={{
    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
    background:"rgba(20,184,166,0.12)",
    border:"1px solid rgba(20,184,166,0.25)",
    borderRadius:16, padding:"14px 24px", minWidth:110,
    backdropFilter:"blur(10px)",
  }}>
    <Icon size={15} color="#5eead4" strokeWidth={2} />
    <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:26, fontWeight:700, color:"#2dd4bf", lineHeight:1 }}>
      {value}
    </span>
    <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.09em", color:"rgba(94,234,212,0.6)" }}>
      {label}
    </span>
  </div>
);

/* ─── Skill pill ─── */
const SkillPill = ({ skill, onRequest, dark }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      whileHover={{ scale:1.04, y:-1 }} whileTap={{ scale:0.97 }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:8,
        background: hover
          ? "linear-gradient(135deg,rgba(20,184,166,0.22),rgba(13,148,136,0.16))"
          : (dark ? "rgba(20,184,166,0.10)" : "rgba(20,184,166,0.08)"),
        border:`1.5px solid ${hover ? "rgba(20,184,166,0.50)" : "rgba(20,184,166,0.22)"}`,
        borderRadius:999, padding:"8px 16px 8px 14px",
        transition:"all 0.2s ease",
      }}
    >
      <span style={{ fontSize:14, fontWeight:700, color: dark ? "#2dd4bf" : "#0d9488" }}>
        {skill}
      </span>
      {onRequest && (
        <motion.button
          whileHover={{ scale:1.08, boxShadow:"0 4px 14px rgba(20,184,166,0.45)" }}
          whileTap={{ scale:0.93 }}
          onClick={() => onRequest(skill)}
          style={{
            display:"flex", alignItems:"center", gap:4,
            background:"linear-gradient(135deg,#14b8a6,#0d9488)",
            border:"none", borderRadius:999,
            padding:"4px 12px", cursor:"pointer",
            color:"#fff", fontSize:12, fontWeight:800, letterSpacing:"0.04em",
          }}
        >
          <Send size={10} strokeWidth={3}/> Request
        </motion.button>
      )}
    </motion.div>
  );
};

/* ─── Availability pill ─── */
const DayPill = ({ day, dark }) => (
  <div style={{
    display:"inline-flex", alignItems:"center", gap:6,
    background: dark ? "rgba(20,184,166,0.10)" : "rgba(20,184,166,0.10)",
    border:"1.5px solid rgba(20,184,166,0.25)",
    borderRadius:999, padding:"7px 16px",
    fontSize:13, fontWeight:700,
    color: dark ? "#5eead4" : "#0f766e",
  }}>
    <Calendar size={12} strokeWidth={2.5}/>{day}
  </div>
);

/* ─── Section heading ─── */
const SectionHead = ({ icon: Icon, label, dark }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
    <div style={{
      width:34, height:34, borderRadius:10,
      background:"linear-gradient(135deg,rgba(20,184,166,0.18),rgba(13,148,136,0.10))",
      border:"1px solid rgba(20,184,166,0.25)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <Icon size={15} color="#14b8a6" strokeWidth={2.5}/>
    </div>
    <span style={{
      fontFamily:"'Clash Display',sans-serif",
      fontSize:13, fontWeight:700,
      textTransform:"uppercase", letterSpacing:"0.12em",
      color: dark ? "#2dd4bf" : "#0d9488",
    }}>
      {label}
    </span>
  </div>
);

/* ─── Info row ─── */
const InfoRow = ({ icon: Icon, label, value, dark }) => {
  const t = T(dark);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{
        width:28, height:28, borderRadius:8, flexShrink:0,
        background:"rgba(20,184,166,0.08)", border:"1px solid rgba(20,184,166,0.15)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <Icon size={13} color="#14b8a6" strokeWidth={2}/>
      </div>
      <span style={{ fontSize:14, color:t.textMuted, fontWeight:600 }}>{label}:</span>
      <span style={{ fontSize:14, color:t.textPrimary, fontWeight:600 }}>{value}</span>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
const PublicProfile = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user: loggedInUser } = useContext(AuthContext);
  const theme = T(darkMode);

  const [profileUser,  setProfileUser]  = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [activeTab,    setActiveTab]    = useState("about");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then(res => {
        const u = res.data.user || res.data;
        setProfileUser(u);
        setAvailability(Array.isArray(u.availability) ? u.availability : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const sendRequest = async (skill) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");
      await axios.post("http://localhost:5000/api/requests/send",
        { toUser: profileUser._id, skill },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request sent!");
    } catch { alert("Failed to send request"); }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return m?.[2] ? `https://www.youtube.com/embed/${m[2]}` : url;
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", background:theme.pageBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
      <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
        style={{ width:38, height:38, border:"3px solid rgba(20,184,166,0.15)", borderTopColor:"#14b8a6", borderRadius:"50%" }}/>
      <p style={{ color:theme.textMuted, fontFamily:"'DM Sans',sans-serif", fontSize:15 }}>Loading profile…</p>
    </div>
  );

  if (!profileUser) return (
    <div style={{ minHeight:"100vh", background:theme.pageBg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ color:theme.textMuted, fontFamily:"'DM Sans',sans-serif" }}>User not found</p>
    </div>
  );

  const avatarSrc = profileUser.avatar
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser.name||"U")}&background=14b8a6&color=fff&size=200`;

  const sortedAvail = [...availability].sort((a,b) => {
    const da = typeof a==="string"?a:a.day, db = typeof b==="string"?b:b.day;
    return WEEKDAY_ORDER.indexOf(da) - WEEKDAY_ORDER.indexOf(db);
  });

  const tabs = [
    { key:"about",   label:"About" },
    { key:"reviews", label:`Reviews${profileUser.totalReviews>0?` (${profileUser.totalReviews})`:""}` },
  ];

  const fadeUp  = { hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{type:"spring",stiffness:230,damping:22}} };
  const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.09 } } };

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700,800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        .glass { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:rgba(20,184,166,0.3); border-radius:99px; }
      `}</style>

      <div style={{ minHeight:"100vh", background:theme.pageBg, fontFamily:"'DM Sans',sans-serif", color:theme.textPrimary }}>

        {/* ═══ HERO — full bleed ═══ */}
        <div style={{
          background: theme.heroBg,
          backgroundImage:`
            radial-gradient(ellipse 70% 80% at 15% 50%, rgba(20,184,166,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 85% 30%, rgba(13,148,136,0.10) 0%, transparent 55%)
          `,
          width:"100%", position:"relative", overflow:"hidden",
          paddingBottom:60,
        }}>
          {/* grid overlay */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:`
              linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)
            `,
            backgroundSize:"50px 50px",
          }}/>

          {/* teal glow line at bottom */}
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1,
            background:"linear-gradient(90deg, transparent, rgba(20,184,166,0.5) 40%, rgba(20,184,166,0.5) 60%, transparent)",
          }}/>

          <div style={{ width:"100%", padding:"52px 48px 0", position:"relative", zIndex:1 }}>

            {/* top bar */}
            <motion.div initial={{ opacity:0,y:-16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
              style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:40 }}
            >
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(20,184,166,0.12)", border:"1px solid rgba(20,184,166,0.25)",
                borderRadius:999, padding:"5px 14px 5px 10px",
              }}>
                <motion.span
                  animate={{ opacity:[1,0.3,1], scale:[1,1.4,1] }}
                  transition={{ duration:2.2, repeat:Infinity }}
                  style={{ width:7, height:7, borderRadius:"50%", background:"#14b8a6", display:"inline-block" }}/>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.10em", textTransform:"uppercase", color:"#5eead4" }}>
                  Public Profile
                </span>
              </div>

              {loggedInUser?._id !== profileUser._id && (
                <motion.button
                  whileHover={{ scale:1.05, boxShadow:"0 8px 28px rgba(20,184,166,0.40)" }}
                  whileTap={{ scale:0.95 }}
                  onClick={() => navigate(`/chat/${profileUser._id}`)}
                  style={{
                    display:"flex", alignItems:"center", gap:9,
                    background:"linear-gradient(135deg,#14b8a6,#0d9488)",
                    border:"none", borderRadius:14, padding:"12px 24px",
                    color:"#fff", fontFamily:"'Cabinet Grotesk',sans-serif",
                    fontWeight:800, fontSize:14, cursor:"pointer",
                    letterSpacing:"0.02em",
                  }}
                >
                  <FaRegCommentDots size={15}/> Message
                </motion.button>
              )}
            </motion.div>

            {/* identity */}
            <motion.div variants={stagger} initial="hidden" animate="show"
              style={{ display:"flex", alignItems:"flex-end", gap:32, flexWrap:"wrap" }}
            >
              {/* avatar */}
              <motion.div variants={fadeUp} style={{ position:"relative", flexShrink:0 }}>
                <div style={{
                  width:120, height:120, borderRadius:"50%", padding:3,
                  background:"linear-gradient(135deg,#14b8a6,#0d9488,#065f56)",
                  boxShadow:"0 0 48px rgba(20,184,166,0.35), 0 0 96px rgba(20,184,166,0.12)",
                }}>
                  <img
                    src={avatarSrc} alt={profileUser.name}
                    onClick={() => setLightboxOpen(true)}
                    style={{
                      width:"100%", height:"100%", borderRadius:"50%",
                      objectFit:"cover", cursor:"pointer",
                      border:`3px solid ${theme.heroBg}`,
                    }}
                  />
                </div>
                <div style={{
                  position:"absolute", bottom:6, right:6,
                  width:16, height:16, borderRadius:"50%",
                  background:"#10b981", border:`2.5px solid ${theme.heroBg}`,
                  boxShadow:"0 0 10px rgba(16,185,129,0.7)",
                }}/>
              </motion.div>

              {/* name + meta */}
              <motion.div variants={fadeUp} style={{ flex:1, minWidth:240 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", marginBottom:8 }}>
                  <h1 style={{
                    fontFamily:"'Clash Display',sans-serif",
                    fontSize:"clamp(34px,5vw,56px)",
                    fontWeight:700, lineHeight:1,
                    color:"#e8faf8", letterSpacing:"-0.025em",
                  }}>
                    {profileUser.name}
                  </h1>
                  {profileUser.skillLevel && (
                    <span style={{
                      background:"rgba(20,184,166,0.18)", border:"1.5px solid rgba(20,184,166,0.40)",
                      borderRadius:999, padding:"4px 12px",
                      fontSize:11, fontWeight:800, color:"#2dd4bf",
                      letterSpacing:"0.10em", textTransform:"uppercase",
                    }}>
                      {profileUser.skillLevel}
                    </span>
                  )}
                </div>

                {profileUser.tagline && (
                  <p style={{ color:"rgba(94,234,212,0.65)", fontSize:16, fontWeight:400, marginBottom:20, lineHeight:1.5 }}>
                    {profileUser.tagline}
                  </p>
                )}

                {/* stat chips */}
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  {profileUser.yearsOfExperience>0 && (
                    <HeroStat icon={Award}         label="Yrs Exp"  value={profileUser.yearsOfExperience}/>
                  )}
                  {profileUser.totalReviews>0 && (
                    <HeroStat icon={Star}          label="Reviews"  value={profileUser.totalReviews}/>
                  )}
                  {profileUser.skillsTeach?.length>0 && (
                    <HeroStat icon={GraduationCap} label="Teaches"  value={profileUser.skillsTeach.length}/>
                  )}
                  {sortedAvail.length>0 && (
                    <HeroStat icon={Clock}         label="Days Avail" value={sortedAvail.length}/>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ═══ MAIN CARD — full width, overlapping hero ═══ */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25, duration:0.55, ease:[0.22,1,0.36,1] }}
          style={{
            width:"100%",
            background: theme.cardBg,
            borderTop:`2px solid rgba(20,184,166,0.20)`,
            marginTop:-2,
            boxShadow: darkMode
              ? "0 -8px 60px rgba(0,0,0,0.6)"
              : "0 -8px 40px rgba(20,184,166,0.08)",
            minHeight:"60vh",
          }}
        >
          {/* tab bar */}
          <div style={{
            display:"flex",
            borderBottom:`1.5px solid ${theme.border}`,
            padding:"0 48px",
            background: darkMode ? "rgba(6,20,18,0.80)" : "rgba(240,250,249,0.80)",
          }}>
            {tabs.map(tab => {
              const active = activeTab === tab.key;
              return (
                <motion.button key={tab.key} whileTap={{ scale:0.97 }}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding:"20px 6px", marginRight:36,
                    background:"none", border:"none", cursor:"pointer",
                    fontFamily:"'Cabinet Grotesk',sans-serif",
                    fontSize:15, fontWeight: active?800:500,
                    color: active ? "#14b8a6" : theme.textMuted,
                    borderBottom: active ? "2.5px solid #14b8a6" : "2.5px solid transparent",
                    marginBottom:-1.5, transition:"all 0.2s ease",
                    letterSpacing:"0.01em",
                  }}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
              style={{ padding:"48px 48px 80px" }}
            >
              {activeTab === "about" ? (
                <motion.div variants={stagger} initial="hidden" animate="show"
                  style={{ display:"flex", gap:56, flexWrap:"wrap" }}
                >
                  {/* ── LEFT COLUMN ── */}
                  <motion.div variants={fadeUp} style={{ flex:"1 1 420px", display:"flex", flexDirection:"column", gap:48 }}>

                    {/* TEACHES */}
                    {profileUser.skillsTeach?.length>0 && (
                      <div>
                        <SectionHead icon={GraduationCap} label="Skills Offered" dark={darkMode}/>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                          {profileUser.skillsTeach.map((skill,i) => (
                            <SkillPill key={i} skill={skill.name||skill} onRequest={loggedInUser?sendRequest:null} dark={darkMode}/>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ABOUT ME */}
                    <div>
                      <SectionHead icon={User} label="About Me" dark={darkMode}/>
                      <p style={{
                        fontSize:16, lineHeight:1.85,
                        color: darkMode ? "#9dd9d3" : "#1e5550",
                        fontWeight:400, maxWidth:640,
                      }}>
                        {profileUser.bio || "No bio set."}
                      </p>

                      <div style={{ marginTop:24, display:"flex", flexDirection:"column", gap:14 }}>
                        {profileUser.education && (
                          <InfoRow icon={GraduationCap} label="Education" value={profileUser.education} dark={darkMode}/>
                        )}
                        {profileUser.yearsOfExperience>0 && (
                          <InfoRow icon={Award} label="Experience" value={`${profileUser.yearsOfExperience} years`} dark={darkMode}/>
                        )}
                        {profileUser.linkedin && (
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:28,height:28,borderRadius:8, background:"rgba(20,184,166,0.08)", border:"1px solid rgba(20,184,166,0.15)", display:"flex",alignItems:"center",justifyContent:"center" }}>
                              <FaLinkedin size={13} color="#14b8a6"/>
                            </div>
                            <span style={{ fontSize:14,color:theme.textMuted,fontWeight:600 }}>LinkedIn:</span>
                            <a href={profileUser.linkedin} target="_blank" rel="noreferrer"
                              style={{ fontSize:14, color:"#14b8a6", fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                              View Profile <ExternalLink size={12} strokeWidth={2.5}/>
                            </a>
                          </div>
                        )}
                        {profileUser.portfolio && (
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:28,height:28,borderRadius:8, background:"rgba(20,184,166,0.08)", border:"1px solid rgba(20,184,166,0.15)", display:"flex",alignItems:"center",justifyContent:"center" }}>
                              <FaBriefcase size={13} color="#14b8a6"/>
                            </div>
                            <span style={{ fontSize:14,color:theme.textMuted,fontWeight:600 }}>Portfolio:</span>
                            <a href={profileUser.portfolio} target="_blank" rel="noreferrer"
                              style={{ fontSize:14, color:"#14b8a6", fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                              View Portfolio <ExternalLink size={12} strokeWidth={2.5}/>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AVAILABILITY */}
                    <div>
                      <SectionHead icon={Calendar} label="Weekly Availability" dark={darkMode}/>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                        {sortedAvail.length>0
                          ? sortedAvail.map((item,i) => (
                              <DayPill key={i} day={typeof item==="string"?item:item.day} dark={darkMode}/>
                            ))
                          : <p style={{ color:theme.textMuted, fontSize:15 }}>No availability set</p>
                        }
                      </div>
                    </div>
                  </motion.div>

                  {/* ── RIGHT COLUMN (video) ── */}
                  {profileUser.demoVideo && (
                    <motion.div variants={fadeUp} style={{ flex:"1 1 360px" }}>
                      <SectionHead icon={FaYoutube} label="Demo Video" dark={darkMode}/>
                      <div style={{
                        borderRadius:20, overflow:"hidden",
                        border:`1.5px solid ${theme.borderMid}`,
                        boxShadow: darkMode ? "0 12px 48px rgba(0,0,0,0.5)" : "0 8px 32px rgba(20,184,166,0.12)",
                        position:"relative", paddingBottom:"56.25%",
                      }}>
                        <iframe
                          src={getEmbedUrl(profileUser.demoVideo)}
                          style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%" }}
                          allowFullScreen title="Demo Video"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <ReviewsSection userId={profileUser._id}/>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLightboxOpen(false)}
            style={{ position:"fixed",inset:0,zIndex:999, background:"rgba(0,0,0,0.88)", display:"flex",alignItems:"center",justifyContent:"center", backdropFilter:"blur(10px)" }}
          >
            <motion.img
              initial={{ scale:0.85 }} animate={{ scale:1 }} exit={{ scale:0.85 }}
              src={avatarSrc} alt={profileUser.name}
              style={{ width:300,height:300, borderRadius:"50%", objectFit:"cover",
                border:"4px solid #14b8a6", boxShadow:"0 0 80px rgba(20,184,166,0.5)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicProfile;