
// import { io } from "socket.io-client";
// import { useEffect, useState } from "react";
// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import "@stream-io/video-react-sdk/dist/css/styles.css";

// import Skills from "./pages/Skills";
// import EditProfile from "./pages/EditProfile";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Search from "./pages/Search";
// import Notifications from "./pages/Notifications";
// import Requests from "./pages/Requests";
// import Sessions from "./pages/Sessions";
// import Badges from "./pages/Badges";
// import Navbar from "./components/Navbar";
// import Settings from "./pages/Settings";
// import PublicProfile from "./pages/PublicProfile.jsx";
// import EditPublicProfile from "./pages/EditPublicProfile.jsx";
// import LoginSuccess from "./pages/LoginSuccess";
// import ForgotPassword from "./pages/ForgotPassword";
// import SkillCategory from "./pages/SkillCategory";
// import SkillMatch from "./pages/SkillMatch";
// import VideoCall from "./pages/VideoCall";
// import ChatListPage from "./pages/ChatListPage";
// import ChatPage from "./pages/ChatPage";
// import CompletedSessions from "./pages/Completedsessions";
// import ScheduleSession from "./pages/ScheduleSession";
// import PostCallReview from "./pages/PostCallReview";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import { DarkModeContext } from "./context/DarkModeContext";
// import { AuthContext } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket"],
// });

// const App = () => {
  
//   const { darkMode } = useContext(DarkModeContext);
//   const { loading } = useContext(AuthContext);
//   const [popup, setPopup] = useState(null);
//   useEffect(() => {
//   // 1️⃣ Get logged-in user
//   const user = JSON.parse(localStorage.getItem("user"));

//   console.log("👤 USER:", user);

//   // 2️⃣ Join socket room (VERY IMPORTANT)
//   if (user?._id) {
//     console.log("📡 Joining room:", user._id);
//     socket.emit("join", user._id);
//   } else {
//     console.log("❌ No user found");
//   }

//   // 3️⃣ Confirm socket connection
//   socket.on("connect", () => {
//     console.log("🟢 Connected:", socket.id);
//   });

//   // 4️⃣ Listen for notification from backend
//   socket.on("newNotification", (data) => {
//     console.log("🎯 RECEIVED:", data);

//     // show popup
//     setPopup(data);

//     // auto-hide after 2 seconds
//     setTimeout(() => {
//       setPopup(null);
//     }, 2000);
//   });

//   // 5️⃣ Cleanup (important)
//   return () => {
//     socket.off("newNotification");
//   };
// }, []);
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className={darkMode ? "bg-slate-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
//       <Navbar />
//       {popup && (
//         <div className="notification-popup">
//           {popup.message}
//         </div>
//       )}
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/notifications" element={<Notifications />} />

//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//         <Route path="/profile/:id" element={<PublicProfile />} />

//         <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
//         <Route path="/skills/:category" element={<SkillCategory />} />

//         <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
//         <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//         <Route path="/edit-public-profile" element={<EditPublicProfile />} />

//         <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
//         <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
//         <Route path="/completed-sessions" element={<ProtectedRoute><CompletedSessions /></ProtectedRoute>} />

//         <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
//         <Route path="/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />

//         <Route path="/login-success" element={<LoginSuccess />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/matches" element={<SkillMatch />} />
//         <Route path="/leaderboard" element={<LeaderboardPage />} />
//         <Route
//           path="/sessions/:id/schedule"
//           element={
//             <ProtectedRoute>
//               <ScheduleSession />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/video-call/:roomId" element={<VideoCall />} />
//         <Route path="/messages" element={<ChatListPage />} />

//         <Route
//           path="/chat/:userId"
//           element={
//             <ProtectedRoute>
//               <ChatPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Post-call review page — shown to both users after video call ends */}
//         <Route
//           path="/review/:sessionId"
//           element={
//             <ProtectedRoute>
//               <PostCallReview />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import Skills from "./pages/Skills";
import EditProfile from "./pages/EditProfile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import Requests from "./pages/Requests";
import Sessions from "./pages/Sessions";
import Badges from "./pages/Badges";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import PublicProfile from "./pages/PublicProfile.jsx";
import EditPublicProfile from "./pages/EditPublicProfile.jsx";
import LoginSuccess from "./pages/LoginSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import SkillCategory from "./pages/SkillCategory";
import SkillMatch from "./pages/SkillMatch";
import VideoCall from "./pages/VideoCall";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import CompletedSessions from "./pages/Completedsessions";
import ScheduleSession from "./pages/ScheduleSession";
import PostCallReview from "./pages/PostCallReview";
import LeaderboardPage from "./pages/LeaderboardPage";

import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ SOCKET (outside component)
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { loading, user } = useContext(AuthContext);

  const [popup, setPopup] = useState(null);

  // ✅ SOCKET LOGIC
  useEffect(() => {
    if (!user || !user._id) return;

    console.log("📡 Joining room:", user._id);

    socket.emit("join", user._id);

    const handleNotification = (data) => {
      console.log("🎯 RECEIVED:", data);

      setPopup(data);

      setTimeout(() => {
        setPopup(null);
      }, 2000);
    };

    socket.on("newNotification", handleNotification);
    // Add after socket.on("newNotification", ...)
    socket.onAny((eventName, ...args) => {
      console.log("📡 SOCKET EVENT:", eventName, args);
    });
    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, [user]);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "bg-slate-900 text-white min-h-screen"
          : "bg-white text-gray-900 min-h-screen"
      }
    >
      <Navbar />

      {/* ✅ NOTIFICATION POPUP */}
      {popup && (
        <div className="notification-popup">
          {popup.message}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/profile/:id" element={<PublicProfile />} />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route path="/skills/:category" element={<SkillCategory />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="/edit-public-profile" element={<EditPublicProfile />} />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/completed-sessions"
          element={
            <ProtectedRoute>
              <CompletedSessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/badges"
          element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          }
        />

        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/matches" element={<SkillMatch />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        <Route
          path="/sessions/:id/schedule"
          element={
            <ProtectedRoute>
              <ScheduleSession />
            </ProtectedRoute>
          }
        />

        <Route path="/video-call/:roomId" element={<VideoCall />} />
        <Route path="/messages" element={<ChatListPage />} />

        <Route
          path="/chat/:userId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:sessionId"
          element={
            <ProtectedRoute>
              <PostCallReview />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;