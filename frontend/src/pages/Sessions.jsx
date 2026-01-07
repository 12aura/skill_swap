import { useState } from "react";

const Sessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      partner: "Ankit Sharma",
      skill: "Web Development",
      date: "2026-02-15",
      time: "6:00 PM",
      status: "upcoming",
    },
    {
      id: 2,
      partner: "Priya Verma",
      skill: "UI/UX Design",
      date: "2026-02-10",
      time: "4:00 PM",
      status: "completed",
    },
  ]);

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Sessions
      </h2>

      {sessions.length === 0 ? (
        <div className="alert alert-info">
          No sessions scheduled yet
        </div>
      ) : (
        <div className="grid gap-4">

          {sessions.map((session) => (
            <div
              key={session.id}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">

                <h3 className="card-title">
                  {session.skill}
                </h3>

                <p>
                  <span className="font-semibold">With:</span>{" "}
                  {session.partner}
                </p>

                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {session.date}
                </p>

                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {session.time}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge ${
                      session.status === "upcoming"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {session.status}
                  </span>
                </p>

                {session.status === "upcoming" && (
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-outline btn-sm">
                      Join Session
                    </button>
                    <button className="btn btn-error btn-sm">
                      Cancel
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Sessions;
