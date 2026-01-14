import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Messages = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`min-h-screen flex justify-center p-6 ${
        darkMode ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-3xl shadow-xl p-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Messages
        </h1>

        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Messaging feature coming soon 🚀
        </p>
      </div>
    </div>
  );
};

export default Messages;
