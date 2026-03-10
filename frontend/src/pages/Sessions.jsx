// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import ScheduleModal from "../components/ScheduleModal";
// import { useNavigate } from "react-router-dom";
// const Sessions = () => {
//   const { darkMode } = useContext(DarkModeContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSession, setSelectedSession] = useState(null);

//   // 🔹 Fetch sessions
//   const fetchSessions = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/sessions/my",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSessions(res.data);
//     } catch (err) {
//       console.error("Failed to fetch sessions", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   // 🔹 Delete session
//   const deleteSession = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this session?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/sessions/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSessions((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete session", err);
//       alert("Failed to delete session");
//     }
//   };

//   //Joining video call
//   const handleJoinCall = (sessionId) => {
//   navigate(`/video-call/${sessionId}`);
// };

//   return (
//     <div
//       className={`min-h-screen p-6 ${
//         darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <div
//         className={`w-full max-w-6xl mx-auto rounded-3xl shadow-xl ${
//           darkMode ? "bg-slate-800" : "bg-white"
//         }`}
//       >
//         {/* HEADER */}
//         <div className="p-10 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400">
//           <h2 className="text-3xl font-bold">My Sessions</h2>
//           <p className="text-sm mt-2">
//             Track your upcoming and completed learning sessions
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="p-10">
//           {loading && <p>Loading sessions...</p>}

//           {!loading && sessions.length === 0 && (
//             <p className="text-gray-500">No sessions created yet.</p>
//           )}

//           <div className="grid gap-6">
//             {sessions.map((session) => {
//               const partner =
//                 session.userA?._id === user?._id
//                   ? session.userB
//                   : session.userA;

//               return (
//                 <div
//                   key={session._id}
//                   className="border rounded-2xl p-6 bg-gray-50"
//                 >
//                   {/* TOP */}
//                   <div className="flex justify-between mb-4">
//                     <div>
//                       <h3 className="text-xl font-semibold">
//                         {session.skill}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         With {partner?.name}
//                       </p>
//                     </div>

//                     <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
//                       {session.status}
//                     </span>
//                   </div>

//                   {/* DATE & TIME */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Date</p>
//                       <p>{session.date || "Not scheduled"}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Time</p>
//                       <p>{session.time || "Not scheduled"}</p>
//                     </div>
//                   </div>

//                   {/* ACTION BUTTONS ✅ CORRECT LOCATION */}
//                   <div className="flex justify-end gap-3 mt-6">

//                     {/* Schedule */}
//                     {!session.date && (
//                       <button
//                         onClick={() => setSelectedSession(session)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                       >
//                         Schedule
//                       </button>
//                     )}

//                     <button
//                 onClick={() => handleJoinCall(session._id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//               >
//                     Join Video Call
//                   </button>
//                     {/* Reschedule */}
//                     {session.date && (
//                       <button
//                         onClick={() => setSelectedSession(session)}
//                         className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
//                       >
//                         Reschedule
//                       </button>
//                     )}

//                     {/* Delete */}
//                     <button
//                       onClick={() => deleteSession(session._id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedSession && (
//         <ScheduleModal
//           session={selectedSession}
//           closeModal={() => setSelectedSession(null)}
//           refreshSessions={fetchSessions}
//         />
//       )}
//     </div>
//   );
// };

// export default Sessions;


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import ScheduleModal from "../components/ScheduleModal";
import { useNavigate } from "react-router-dom";

// ✅ Expired = 1 hour AFTER session start time
const isExpired = (date, time) => {
  if (!date || !time) return false;
  const sessionDateTime = new Date(`${date}T${time}`);
  const expiryTime = new Date(sessionDateTime.getTime() + 60 * 60 * 1000);
  return new Date() > expiryTime;
};

// ✅ Session has started = current time >= scheduled time
const hasStarted = (date, time) => {
  if (!date || !time) return false;
  const sessionDateTime = new Date(`${date}T${time}`);
  return new Date() >= sessionDateTime;
};

const statusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "upcoming":
    case "scheduled":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "completed":
      return "bg-green-100 text-green-700 border border-green-300";
    case "cancelled":
      return "bg-red-100 text-red-700 border border-red-300";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-300";
  }
};

const Sessions = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/sessions/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();

    // ✅ Re-fetch from backend every 5 seconds
    // This ensures BOTH users see the same status from DB
    // (handles: call ended by other user, session completed, etc.)
    const interval = setInterval(() => {
      fetchSessions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const deleteSession = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete session", err);
      alert("Failed to delete session");
    }
  };

  const handleJoinCall = (session) => {
    if (session.videoCallLink) {
      const parts = session.videoCallLink.split("/video-call/");
      const roomId = parts[1];
      navigate(`/video-call/${roomId}`);
    } else {
      alert("No video call link available. Please reschedule the session.");
    }
  };

  // ✅ Uses DB status — same for BOTH users since we re-fetch every 5s
  const getDisplayStatus = (session) => {
    if (
      isExpired(session.date, session.time) &&
      (session.status === "upcoming" || session.status === "scheduled")
    ) {
      return "completed";
    }
    return session.status;
  };

  // ✅ canJoin: uses getDisplayStatus (DB-synced) + time window check
  // Both users see button at same time because:
  // 1. Both read same status from DB (re-fetched every 5s)
  // 2. Both compare against same sessionDateTime timestamp
  const canJoin = (session) => {
    const status = getDisplayStatus(session);
    if (!session.videoCallLink || !session.date || !session.time) return false;

    return (
      (status === "upcoming" || status === "scheduled") &&
      hasStarted(session.date, session.time) &&  // ✅ session time has arrived
      !isExpired(session.date, session.time)      // ✅ within 1 hour grace window
    );
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
        <div className="p-10 bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 rounded-t-3xl">
          <h2 className="text-3xl font-bold text-white">My Sessions</h2>
          <p className="text-sm mt-2 text-white/80">
            Track your upcoming and completed learning sessions
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">
          {loading && (
            <p className="text-gray-400 animate-pulse">Loading sessions...</p>
          )}

          {!loading && sessions.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg font-medium">No sessions yet</p>
              <p className="text-sm mt-1">
                Accept a skill request to create a session
              </p>
            </div>
          )}

          <div className="grid gap-6">
            {sessions.map((session) => {
              const partner =
                session.userA?._id === user?._id
                  ? session.userB
                  : session.userA;

              const displayStatus = getDisplayStatus(session);
              const sessionCanJoin = canJoin(session);
              const hasSchedule = session.date && session.time;
              const started = hasSchedule && hasStarted(session.date, session.time);
              const fullyExpired = hasSchedule && isExpired(session.date, session.time);

              return (
                <div
                  key={session._id}
                  className={`rounded-2xl p-6 border transition-shadow hover:shadow-md ${
                    darkMode
                      ? "bg-slate-700 border-slate-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          darkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {session.skill}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        With{" "}
                        <span className="font-medium text-teal-500">
                          {partner?.name || "Unknown"}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(
                        displayStatus
                      )}`}
                    >
                      {displayStatus}
                    </span>
                  </div>

                  {/* DATE & TIME */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className={`rounded-xl p-3 ${darkMode ? "bg-slate-600" : "bg-gray-50"}`}>
                      <p className="text-xs text-gray-400 mb-1">📅 Date</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-slate-700"}`}>
                        {session.date || "Not scheduled"}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 ${darkMode ? "bg-slate-600" : "bg-gray-50"}`}>
                      <p className="text-xs text-gray-400 mb-1">⏰ Time</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-slate-700"}`}>
                        {session.time || "Not scheduled"}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {session.notes && (
                    <div className={`rounded-xl p-3 mb-5 text-sm ${darkMode ? "bg-slate-600 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
                      <span className="font-medium">Notes: </span>
                      {session.notes}
                    </div>
                  )}

                  {/* ✅ Status messages — mutually exclusive */}
                  {hasSchedule && !started && displayStatus !== "completed" && (
                    <p className="text-xs text-blue-400 mb-3 italic">
                      🕐 Video call will be available at scheduled time
                    </p>
                  )}
                  {fullyExpired && displayStatus === "completed" && (
                    <p className="text-xs text-gray-400 mb-3 italic">
                      ⏳ Session time has passed
                    </p>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-end gap-3 flex-wrap">

                    {/* Schedule — pending and no schedule yet */}
                    {!hasSchedule && displayStatus === "pending" && (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition"
                      >
                        📅 Schedule
                      </button>
                    )}

                    {/* Reschedule — has schedule, not started, not completed */}
                    {hasSchedule && !started && displayStatus !== "completed" && (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-sm font-medium transition"
                      >
                        🔄 Reschedule
                      </button>
                    )}

                    {/* ✅ Join Video Call — same logic for BOTH users */}
                    {sessionCanJoin && (
                      <button
                        onClick={() => handleJoinCall(session)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition flex items-center gap-1.5 animate-pulse"
                      >
                        🎥 Join Video Call
                      </button>
                    )}

                    {/* Delete — always visible */}
                    <button
                      onClick={() => deleteSession(session._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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