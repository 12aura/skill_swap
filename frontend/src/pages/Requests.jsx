import { useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      from: "Ankit Sharma",
      skillOffered: "Web Development",
      skillRequested: "Data Structures",
      status: "pending",
    },
    {
      id: 2,
      from: "Priya Verma",
      skillOffered: "UI/UX Design",
      skillRequested: "React",
      status: "pending",
    },
  ]);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <h2 className="text-3xl font-bold mb-6">
        Skill Requests
      </h2>

      {requests.length === 0 ? (
        <div className="alert alert-info">
          No skill requests available
        </div>
      ) : (
        <div className="grid gap-4">

          {requests.map((req) => (
            <div
              key={req.id}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">

                <h3 className="card-title">
                  {req.from}
                </h3>

                <p>
                  <span className="font-semibold">Offers:</span>{" "}
                  {req.skillOffered}
                </p>

                <p>
                  <span className="font-semibold">Wants to learn:</span>{" "}
                  {req.skillRequested}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "pending" && (
                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAccept(req.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleReject(req.id)}
                    >
                      Reject
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

export default Requests;
