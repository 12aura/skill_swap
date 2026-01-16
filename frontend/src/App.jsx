import React, { useContext } from "react";
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
import Navbar from "./components/Navbar";
import MentorProfile from "./pages/MentorProfile";
import Settings from "./pages/Settings";


import { DarkModeContext } from "./context/DarkModeContext"; // <-- import context
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className={darkMode ? "bg-slate-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
               <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
 

        <Route
  path="/mentor/:name"
  element={
    <ProtectedRoute>
      <MentorProfile />
    </ProtectedRoute>
  }
/>

        <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
