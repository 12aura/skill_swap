import { useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      from: "Ankit Sharma",
      email: "ankit@gmail.com",
      skillOffered: "Web Development",
      skillRequested: "Data Structures",
      message: "I can help you build projects in MERN stack.",
      status: "pending",
    },
    {
      id: 2,
      from: "Priya Verma",
      email: "priya@gmail.com",
      skillOffered: "UI/UX Design",
      skillRequested: "React",
      message: "Looking to improve my React skills.",
      status: "pending",
    },
    {
      id: 3,
      from: "Rohit Mehta",
      email: "rohit@gmail.com",
      skillOffered: "Python",
      skillRequested: "Machine Learning",
      message: "I have experience with automation and scripting.",
      status: "accepted",
    },
    {
      id: 4,
      from: "Sneha Kapoor",
      email: "sneha@gmail.com",
      skillOffered: "Java",
      skillRequested: "System Design",
      message: "Would love to exchange knowledge weekly.",
      status: "rejected",
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Skill Requests
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Manage incoming skill exchange requests
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-10">

          {requests.length === 0 ? (
            <p className="text-gray-500">
              No skill requests available.
            </p>
          ) : (
            <div className="grid gap-6">

              {requests.map((req) => (
                <div
                  key={req.id}
                  className="border rounded-2xl p-6 bg-gray-50 hover:shadow-md transition"
                >
                  {/* USER INFO */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {req.from}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {req.email}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm">
                      Offers: {req.skillOffered}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
                      Wants: {req.skillRequested}
                    </span>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-sm text-gray-600 mb-4">
                    “{req.message}”
                  </p>

                  {/* ACTIONS */}
                  {req.status === "pending" && (
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Requests;
