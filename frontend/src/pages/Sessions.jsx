import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext"; // ✅ ADD THIS

const Sessions = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext); // ✅ ADD THIS

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchSessions();
  }, []);
  const deleteSession = async (id) => {
  if (!window.confirm("Are you sure you want to delete this session?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/sessions/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSessions((prev) => prev.filter((s) => s._id !== id));
  } catch (err) {
    console.error("Failed to delete session", err);
    alert("Failed to delete session");
  }
};

const joinVideoCall = (sessionId) => {
  // placeholder for now
  alert(`Joining video call for session ${sessionId}`);
};


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

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-6xl mx-auto rounded-3xl shadow-xl overflow-hidden ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div
          className={`p-10 ${
            darkMode
              ? "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"
              : "bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400"
          }`}
        >
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
      className={`border rounded-2xl p-6 transition ${
        darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{session.skill}</h3>
          <p className="text-sm text-gray-500">
            With {partner?.name} ({partner?.email})
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            session.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {session.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="font-medium">{session.date}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Time</p>
          <p className="font-medium">{session.time}</p>
        </div>
      </div>
      {/* ACTION BUTTONS */}
{session.status === "upcoming" && (
  <div className="flex justify-end gap-3 mt-6">
    <button
  onClick={() => joinVideoCall(session._id)}
  className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
>
  Video Call
</button>


    <button
      onClick={() => deleteSession(session._id)}
      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
)}

    </div>
  );
})}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
