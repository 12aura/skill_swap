// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Requests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // ✅ FIXED

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // 🔹 Fetch incoming requests (ONLY where user is receiver)
//   const fetchRequests = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return setLoading(false);

//       const res = await axios.get(
//         "http://localhost:5000/api/requests/incoming",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setRequests(res.data);
//     } catch (err) {
//       console.error("Failed to fetch requests", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Accept / Reject
//   const updateStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:5000/api/requests/${id}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       fetchRequests();
//     } catch (err) {
//       console.error("Failed to update request", err);
//     }
//   };

//   // 🔹 Create session
//   const createSession = async (requestId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/sessions/create-from-request",
//         { requestId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       navigate("/sessions");
//     } catch (err) {
//       console.error("Failed to create session", err);
//       alert("Failed to create session");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-3xl font-bold mb-6">Skill Requests</h1>

//       {loading && <p className="text-gray-500">Loading requests...</p>}
//       {!loading && requests.length === 0 && (
//         <p className="text-gray-500">No incoming requests yet.</p>
//       )}

//       <div className="space-y-6">
//         {requests.map((req) => {
//           const isReceiver = req.toUser === user?._id; // ✅ CORE FIX

//           return (
//             <div
//               key={req._id}
//               className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
//             >
//               {/* LEFT */}
//               <div>
//                 <h2 className="text-lg font-semibold">
//                   {req.fromUser?.name}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {req.fromUser?.email}
//                 </p>

//                 <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                   Skill: {req.skill}
//                 </span>
//               </div>

//               {/* RIGHT */}
//               <div className="flex items-center gap-3">
//                 {/* ✅ ACCEPT / REJECT → ONLY RECEIVER */}
//                 {req.status === "pending" && isReceiver && (
//                   <>
//                     <button
//                       onClick={() => updateStatus(req._id, "accepted")}
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => updateStatus(req._id, "rejected")}
//                       className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {/* STATUS BADGE */}
//                 {req.status !== "pending" && (
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       req.status === "accepted"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {req.status}
//                   </span>
//                 )}

//                 {/* ✅ CREATE SESSION → ONLY RECEIVER + ACCEPTED */}
//                 {req.status === "accepted" && isReceiver && (
//                   <button
//                     onClick={() => createSession(req._id)}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-lg"
//                   >
//                     Create Session
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Requests;


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
   const [activeFilter, setActiveFilter] = useState("all");

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);
const hash = location.hash.replace("#", "");
const isPendingOnly = hash === "pending" && !location.pathname.includes("#all");
  // ✅ Read filter from URL hash on mount (e.g. /requests#pending)
 useEffect(() => {
  const hash = location.hash.replace("#", "");

  if (hash === "pending") setActiveFilter("pending");
  else if (hash === "accepted") setActiveFilter("accepted");
  else if (hash === "rejected") setActiveFilter("rejected");
  else setActiveFilter("all");   // ← important line
}, [location.hash]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      const res = await axios.get(
        "http://localhost:5000/api/requests/incoming",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/requests/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error("Failed to update request", err);
    }
  };

  const createSession = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/sessions/create-from-request",
        { requestId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/sessions");
    } catch (err) {
      console.error("Failed to create session", err);
      alert("Failed to create session");
    }
  };

  // ✅ Count per status
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  // ✅ Filtered list based on active tab
  // const filteredRequests =
  //   activeFilter === "all"
  //     ? requests
  //     : requests.filter((r) => r.status === activeFilter);
  const filteredRequests =
  activeFilter === "all"
    ? requests
    : requests.filter((r) => r.status === activeFilter);

  const tabs = [
    { key: "all",      label: "All",      emoji: "📋" },
    { key: "pending",  label: "Pending",  emoji: "⏳" },
    { key: "accepted", label: "Accepted", emoji: "✅" },
    { key: "rejected", label: "Rejected", emoji: "❌" },
  ];

  const statusStyle = {
    pending:  { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    accepted: { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
    rejected: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  };

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "#f0fafa", fontFamily: "'Nunito', sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div style={{
          width: 46, height: 46, borderRadius: 14,
          background: "linear-gradient(135deg, #14b8a6, #0d9488)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>📥</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
            Skill Requests
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
            Manage your incoming skill exchange requests
          </p>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      {!isPendingOnly && (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { key: "pending",  label: "Pending",  emoji: "⏳", color: "#f59e0b", shadow: "#f59e0b33" },
          { key: "accepted", label: "Accepted", emoji: "✅", color: "#10b981", shadow: "#10b98133" },
          { key: "rejected", label: "Rejected", emoji: "❌", color: "#ef4444", shadow: "#ef444433" },
        ].map((card) => (
          <div
            key={card.key}
  onClick={() => {
  setActiveFilter(card.key);
  navigate(`/requests#${card.key}`);
}}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "16px 18px",
              cursor: "pointer",
              border: `2px solid ${activeFilter === card.key ? card.color : "transparent"}`,
              boxShadow: activeFilter === card.key
                ? `0 4px 18px ${card.shadow}`
                : "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{card.emoji}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{counts[card.key]}</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{card.label}</div>
          </div>
        ))}
      </div>
)}
      {/* ── Filter Tabs ── */}
      {!isPendingOnly && (
      <div style={{
        display: "inline-flex", gap: 6, marginBottom: 22,
        background: "#fff", borderRadius: 14, padding: 5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
          onClick={() => {
  setActiveFilter(tab.key);
  navigate(`/requests#${tab.key}`);
}}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              transition: "all 0.2s",
              background: activeFilter === tab.key
                ? "linear-gradient(135deg, #14b8a6, #0d9488)"
                : "transparent",
              color: activeFilter === tab.key ? "#fff" : "#64748b",
              boxShadow: activeFilter === tab.key ? "0 2px 8px #14b8a633" : "none",
            }}
          >
            {tab.emoji} {tab.label}
            <span style={{
              marginLeft: 6,
              background: activeFilter === tab.key ? "rgba(255,255,255,0.25)" : "#f1f5f9",
              color: activeFilter === tab.key ? "#fff" : "#64748b",
              borderRadius: 20, padding: "1px 7px", fontSize: 11,
            }}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>
)}
      {/* ── Loading / Empty ── */}
      {loading && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 }}>
          Loading requests...
        </div>
      )}
      {!loading && filteredRequests.length === 0 && (
        <div style={{
          textAlign: "center", padding: "48px 0",
          background: "#fff", borderRadius: 16,
          color: "#94a3b8", fontSize: 15,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          No {activeFilter === "all" ? "" : activeFilter} requests found.
        </div>
      )}

      {/* ── Request Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredRequests.map((req, i) => {
          const isReceiver = req.toUser === user?._id;
          const sc = statusStyle[req.status] || statusStyle.pending;

          return (
            <div
              key={req._id}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
                animation: "fadeIn 0.3s ease forwards",
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
              }}
            >
              {/* Left: User Info */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: 1,
                }}>
                  {req.fromUser?.name?.slice(0, 2).toUpperCase() || "??"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>
                    {req.fromUser?.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {req.fromUser?.email}
                  </div>
                  <span style={{
                    display: "inline-block", marginTop: 4,
                    padding: "3px 10px", borderRadius: 20,
                    background: "#f0fdfa", color: "#0d9488",
                    fontSize: 12, fontWeight: 600,
                  }}>
                    🎯 {req.skill}
                  </span>
                </div>
              </div>

              {/* Right: Status + Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

                {/* Status Badge */}
                <span style={{
                  padding: "5px 12px", borderRadius: 20,
                  background: sc.bg, color: sc.color,
                  fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: sc.dot, display: "inline-block"
                  }} />
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>

                {/* Accept / Reject — only receiver + pending */}
                {req.status === "pending" && isReceiver && (
                  <>
                    <button
                      onClick={() => updateStatus(req._id, "accepted")}
                      style={{
                        padding: "7px 16px", borderRadius: 10, border: "none",
                        background: "#d1fae5", color: "#065f46",
                        fontWeight: 700, fontSize: 13, cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "rejected")}
                      style={{
                        padding: "7px 16px", borderRadius: 10, border: "none",
                        background: "#fee2e2", color: "#991b1b",
                        fontWeight: 700, fontSize: 13, cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Create Session — only receiver + accepted */}
                {req.status === "accepted" && isReceiver && (
                  <button
                    onClick={() => createSession(req._id)}
                    style={{
                      padding: "7px 16px", borderRadius: 10, border: "none",
                      background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                      color: "#fff", fontWeight: 700, fontSize: 13,
                      cursor: "pointer", boxShadow: "0 2px 8px #14b8a633",
                    }}
                  >
                    Create Session
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Requests;