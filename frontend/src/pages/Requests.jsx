import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ FIXED

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 Fetch incoming requests (ONLY where user is receiver)
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      const res = await axios.get(
        "http://localhost:5000/api/requests/incoming",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Accept / Reject
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

  // 🔹 Create session
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

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Skill Requests</h1>

      {loading && <p className="text-gray-500">Loading requests...</p>}
      {!loading && requests.length === 0 && (
        <p className="text-gray-500">No incoming requests yet.</p>
      )}

      <div className="space-y-6">
        {requests.map((req) => {
          const isReceiver = req.toUser === user?._id; // ✅ CORE FIX

          return (
            <div
              key={req._id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <h2 className="text-lg font-semibold">
                  {req.fromUser?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {req.fromUser?.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Skill: {req.skill}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                {/* ✅ ACCEPT / REJECT → ONLY RECEIVER */}
                {req.status === "pending" && isReceiver && (
                  <>
                    <button
                      onClick={() => updateStatus(req._id, "accepted")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* STATUS BADGE */}
                {req.status !== "pending" && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      req.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.status}
                  </span>
                )}

                {/* ✅ CREATE SESSION → ONLY RECEIVER + ACCEPTED */}
                {req.status === "accepted" && isReceiver && (
                  <button
                    onClick={() => createSession(req._id)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Create Session
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
