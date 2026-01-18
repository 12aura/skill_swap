import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const SkillMatch = () => {
  const { user, loading } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const [matches, setMatches] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/match/skill-match/${user._id}`
      );
      setMatches(res.data);
    };

    fetchMatches();
  }, [user]);

  // ✅ SEND REQUEST → STORED IN DB
const sendRequest = async (toUserId, skillName) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/requests/send",
      {
        toUser: toUserId,
        skill: skillName, // ✅ REQUIRED FIELD
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSentRequests((prev) => [...prev, toUserId]);
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to send request");
  }
};



  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Please login</p>;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50"
      }`}
    >
      {/* ===== HEADER ===== */}
      <div className="bg-teal-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Skill Matches</h1>
        <p className="text-sm opacity-90">
          Find students who match your learning goals
        </p>
      </div>

      {/* ✅ CONFIRMATION MESSAGE */}
      {successMsg && (
        <div className="max-w-xl mx-auto mt-6 bg-teal-100 text-teal-800 px-6 py-3 rounded-xl text-center font-medium">
          {successMsg}
        </div>
      )}

      {/* ===== MATCH CARDS ===== */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8">
        {matches.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No matches found
          </p>
        )}

        {matches.map((u) => {
          const isSent = sentRequests.includes(u._id);

          return (
            <div
              key={u._id}
              className={`rounded-2xl p-6 shadow-md transition hover:-translate-y-1 ${
                darkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              {/* NAME ONLY (NO IMAGE) */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-sm text-gray-500">
                  {u.location || "Remote"}
                </p>
              </div>

              {/* TEACHES */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  TEACHES
                </p>
                <div className="flex flex-wrap gap-2">
                  {u.skillsTeach.map((s) => (
                    <span
                      key={s._id}
                      className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* WANTS TO LEARN */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  WANTS TO LEARN
                </p>
                <div className="flex flex-wrap gap-2">
                  {u.skillsLearn.map((s) => (
                    <span
                      key={s._id}
                      className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* SEND REQUEST */}
         <button
  disabled={isSent}
  onClick={() =>
    sendRequest(u._id, u.skillsTeach[0]?.name)
  }
  className={`w-full py-2 rounded-lg ${
    isSent
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-teal-500 hover:bg-teal-600 text-white"
  }`}
>
  {isSent ? "Request Sent ✓" : "Send Request"}
</button>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillMatch;
