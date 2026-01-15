import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Sessions = () => {
  const { darkMode } = useContext(DarkModeContext); // ✅ use darkMode boolean

  const [sessions, setSessions] = useState([
    {
      id: 1,
      partner: "Ankit Sharma",
      email: "ankit@gmail.com",
      skill: "Web Development",
      date: "15 Feb 2026",
      time: "6:00 PM",
      status: "not available",
    },
    {
      id: 2,
      partner: "Priya Verma",
      email: "priya@gmail.com",
      skill: "UI/UX Design",
      date: "10 Feb 2026",
      time: "4:00 PM",
      status: "completed",
    },
    {
      id: 3,
      partner: "Rohit Mehta",
      email: "rohit@gmail.com",
      skill: "Python Basics",
      date: "05 Feb 2026",
      time: "7:30 PM",
      status: "completed",
    },
    {
      id: 4,
      partner: "Sneha Kapoor",
      email: "sneha@gmail.com",
      skill: "System Design",
      date: "20 Feb 2026",
      time: "5:00 PM",
      status: "upcoming",
    },
  ]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`w-full max-w-6xl rounded-3xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}>

        {/* HEADER */}
        <div className={`p-10 ${darkMode ? "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-white" : "bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 text-gray-800"}`}>
          <h2 className="text-3xl font-bold">My Sessions</h2>
          <p className="text-sm mt-2">
            Track your upcoming and completed learning sessions
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">
          {sessions.length === 0 ? (
            <p className={`${darkMode ? "text-slate-300" : "text-gray-500"}`}>
              No sessions scheduled yet.
            </p>
          ) : (
            <div className="grid gap-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`border rounded-2xl p-6 transition ${darkMode ? "bg-slate-700 border-slate-600 hover:shadow-lg" : "bg-gray-50 hover:shadow-md"}`}
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`${darkMode ? "text-white" : "text-gray-800"} text-xl font-semibold`}>
                        {session.skill}
                      </h3>
                      <p className={`${darkMode ? "text-slate-300" : "text-gray-500"} text-sm`}>
                        With {session.partner} ({session.email})
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === "upcoming"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className={`${darkMode ? "text-slate-300" : "text-gray-500"} text-xs`}>Date</p>
                      <p className={`${darkMode ? "text-white" : "text-gray-700"} text-sm font-medium`}>
                        {session.date}
                      </p>
                    </div>

                    <div>
                      <p className={`${darkMode ? "text-slate-300" : "text-gray-500"} text-xs`}>Time</p>
                      <p className={`${darkMode ? "text-white" : "text-gray-700"} text-sm font-medium`}>
                        {session.time}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  {session.status === "upcoming" && (
                    <div className="flex gap-4 justify-end">
                      <button className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600 transition">
                        Join Session
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
