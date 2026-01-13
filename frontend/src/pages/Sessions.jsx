import { useState } from "react";

const Sessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      partner: "Ankit Sharma",
      email: "ankit@gmail.com",
      skill: "Web Development",
      date: "15 Feb 2026",
      time: "6:00 PM",
      status: "upcoming",
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            My Sessions
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Track your upcoming and completed learning sessions
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">

          {sessions.length === 0 ? (
            <p className="text-gray-500">
              No sessions scheduled yet.
            </p>
          ) : (
            <div className="grid gap-6">

              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border rounded-2xl p-6 bg-gray-50 hover:shadow-md transition"
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {session.skill}
                      </h3>
                      <p className="text-sm text-gray-500">
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
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {session.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm font-medium text-gray-700">
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
