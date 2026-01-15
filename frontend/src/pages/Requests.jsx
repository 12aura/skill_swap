import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Requests = () => {
  const { darkMode } = useContext(DarkModeContext); // <-- get darkMode

  const [requests, setRequests] = useState([
    {
      id: 1,
      from: "Ankit Sharma",
      email: "ankit@gmail.com",
      skillOffered: "Web Development",
      skillRequested: "Data Structures",
      message: "I can help you build projects in MERN stack.",
      status: "pending",
    },
    {
      id: 2,
      from: "Priya Verma",
      email: "priya@gmail.com",
      skillOffered: "UI/UX Design",
      skillRequested: "React",
      message: "Looking to improve my React skills.",
      status: "pending",
    },
    {
      id: 3,
      from: "Rohit Mehta",
      email: "rohit@gmail.com",
      skillOffered: "Python",
      skillRequested: "Machine Learning",
      message: "I have experience with automation and scripting.",
      status: "accepted",
    },
    {
      id: 4,
      from: "Sneha Kapoor",
      email: "sneha@gmail.com",
      skillOffered: "Java",
      skillRequested: "System Design",
      message: "Would love to exchange knowledge weekly.",
      status: "rejected",
    },
  ]);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-6xl rounded-3xl shadow-xl overflow-hidden ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div
          className={`p-10 ${
            darkMode
              ? "bg-slate-700 text-white"
              : "bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 text-gray-800"
          }`}
        >
          <h2 className="text-3xl font-bold">Skill Requests</h2>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} mt-2`}>
            Manage incoming skill exchange requests
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">
          {requests.length === 0 ? (
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No skill requests available.
            </p>
          ) : (
            <div className="grid gap-6">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className={`border rounded-2xl p-6 transition hover:shadow-md ${
                    darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* USER INFO */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {req.from}
                      </h3>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                        {req.email}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "pending"
                          ? darkMode
                            ? "bg-yellow-600/30 text-yellow-300"
                            : "bg-yellow-100 text-yellow-700"
                          : req.status === "accepted"
                          ? darkMode
                            ? "bg-green-600/30 text-green-300"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "bg-red-600/30 text-red-300"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? "bg-teal-700 text-teal-200" : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      Offers: {req.skillOffered}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? "bg-sky-700 text-sky-200" : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      Wants: {req.skillRequested}
                    </span>
                  </div>

                  {/* MESSAGE */}
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    “{req.message}”
                  </p>

                  {/* ACTIONS */}
                  {req.status === "pending" && (
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                      >
                        Reject
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

export default Requests;
