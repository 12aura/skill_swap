import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Skills from "./pages/Skills";
import Messages from "./pages/Messages";
import EditProfile from "./pages/EditProfile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Requests from "./pages/Requests";
import Sessions from "./pages/Sessions";
import Badges from "./pages/Badges";
import Settings from "./pages/Settings";
import PublicProfile from "./pages/PublicProfile.jsx";
import EditPublicProfile from "./pages/EditPublicProfile.jsx";
import LoginSuccess from "./pages/LoginSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import SkillCategory from "./pages/SkillCategory";
import SkillMatch from "./pages/SkillMatch";

import Navbar from "./components/Navbar";
import SkillSwap3D from "./components/SkillSwap3D";
import ProtectedRoute from "./components/ProtectedRoute";

import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { loading } = useContext(AuthContext);

  // 🔥 3D Overlay State
  const [show3D, setShow3D] = useState(false);

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
      {/* 🔥 Navbar with 3D trigger */}
      <Navbar open3D={() => setShow3D(true)} />

      {/* 🔥 3D Overlay */}
      {show3D && (
        <SkillSwap3D close={() => setShow3D(false)} />
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages/:id"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

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
        <Route path="/skills/:category" element={<SkillCategory />} />
        <Route path="/matches" element={<SkillMatch />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
