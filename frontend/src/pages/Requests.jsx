import { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

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

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/requests/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchRequests();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Skill Requests</h1>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading requests...</p>}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <p className="text-gray-500">No incoming requests yet.</p>
      )}

      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white p-6 rounded-xl shadow flex justify-between"
          >
            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold">
                {req.fromUser?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {req.fromUser?.email}
              </p>

              <div className="mt-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Skill: {req.skill}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {req.status === "pending" ? (
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
              ) : (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    req.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
