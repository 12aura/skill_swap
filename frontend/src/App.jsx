

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Requests from "./pages/Requests";
import Sessions from "./pages/Sessions";
import Badges from "./pages/Badges";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const isAuthenticated = Boolean(user);

  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        {/* Public Landing */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />

        {/* Protected Routes */}
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
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
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
          path="/badges"
          element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;