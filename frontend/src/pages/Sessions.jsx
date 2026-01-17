import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Sessions = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [newSession, setNewSession] = useState({
    user2: "",
    skill: "",
    scheduledAt: ""
  });

  const token = localStorage.getItem("token");

  // Fetch all users for dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API response:", res.data); 
        setAllUsers(res.data.filter(u => u._id !== user._id)); // exclude self
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  // Fetch sessions for current user
  const fetchSessions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/session/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.sessions || [];
      setSessions(data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSessions();
  }, [user]);

  // Form change
  const handleChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  // Create session
  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!newSession.user2 || !newSession.skill) return alert("Fill all fields");
    try {
      await axios.post(
        "/api/session",
        { ...newSession, user1: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewSession({ user2: "", skill: "", scheduledAt: "" });
      fetchSessions(); // refresh
    } catch (err) {
      console.error("Error creating session:", err);
    }
  };

  // Update status
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/session/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSessions();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p>Loading sessions...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Sessions</h2>

      {/* Create session form */}
      <form onSubmit={handleCreateSession} className="mb-6 flex flex-wrap gap-2">
        <select
          name="user2"
          value={newSession.user2}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select user</option>
          {allUsers.map(u => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="skill"
          placeholder="Skill"
          value={newSession.skill}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="scheduledAt"
          value={newSession.scheduledAt}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Session
        </button>
      </form>

      {/* Session table */}
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Skill</th>
              <th className="p-2 text-left">With</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Scheduled At</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s._id} className="border-b">
                <td className="p-2">{s.skill}</td>
                <td className="p-2">{s.user1._id === user._id ? s.user2.name : s.user1.name}</td>
                <td className="p-2 capitalize">{s.status}</td>
                <td className="p-2">{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : "-"}</td>
                <td className="p-2 flex gap-2">
                  {s.status !== "completed" && (
                    <button
                      onClick={() => handleUpdateStatus(s._id, "completed")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Complete
                    </button>
                  )}
                  {s.status !== "cancelled" && (
                    <button
                      onClick={() => handleUpdateStatus(s._id, "cancelled")}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sessions;
