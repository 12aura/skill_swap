import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import ScheduleModal from "../components/ScheduleModal";

const Sessions = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  // 🔹 Fetch sessions
  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/sessions/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // 🔹 Delete session
  const deleteSession = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/sessions/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete session", err);
      alert("Failed to delete session");
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-6xl mx-auto rounded-3xl shadow-xl ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div className="p-10 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400">
          <h2 className="text-3xl font-bold">My Sessions</h2>
          <p className="text-sm mt-2">
            Track your upcoming and completed learning sessions
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">
          {loading && <p>Loading sessions...</p>}

          {!loading && sessions.length === 0 && (
            <p className="text-gray-500">No sessions created yet.</p>
          )}

          <div className="grid gap-6">
            {sessions.map((session) => {
              const partner =
                session.userA?._id === user?._id
                  ? session.userB
                  : session.userA;

              return (
                <div
                  key={session._id}
                  className="border rounded-2xl p-6 bg-gray-50"
                >
                  {/* TOP */}
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {session.skill}
                      </h3>
                      <p className="text-sm text-gray-500">
                        With {partner?.name}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {session.status}
                    </span>
                  </div>

                  {/* DATE & TIME */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p>{session.date || "Not scheduled"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p>{session.time || "Not scheduled"}</p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS ✅ CORRECT LOCATION */}
                  <div className="flex justify-end gap-3 mt-6">

                    {/* Schedule */}
                    {!session.date && (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Schedule
                      </button>
                    )}

                    {/* ✅ JOIN VIDEO CALL */}
                    {session.videoCallLink && (
                      <a
                        href={session.videoCallLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Join Video Call
                      </a>
                    )}

                    {/* Reschedule */}
                    {session.date && (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                      >
                        Reschedule
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => deleteSession(session._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedSession && (
        <ScheduleModal
          session={selectedSession}
          closeModal={() => setSelectedSession(null)}
          refreshSessions={fetchSessions}
        />
      )}
    </div>
  );
};

export default Sessions;
