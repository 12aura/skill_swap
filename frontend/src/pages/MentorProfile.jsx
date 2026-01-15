import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MentorProfile = () => {
  const { name } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/mentor/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setMentor(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p className="p-10">Loading mentor...</p>;
  if (!mentor) return <p className="p-10">Mentor not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">

          {/* SKILLS PILLS */}
          <div className="flex flex-wrap gap-3 mb-6">
            {mentor.skillsTeach.map((skill) => (
              <span
                key={skill._id}
                className="px-4 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Learn from {mentor.name} and upgrade your skills
          </h1>

          {/* BIO */}
          <p className="text-gray-700 text-lg mb-6">
            {mentor.bio ||
              "Passionate mentor with hands-on experience, focused on helping learners grow with practical knowledge and guidance."}
          </p>

          {/* CLASS LOCATION */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Class Location
            </h3>
            <span className="inline-flex items-center px-4 py-2 rounded-full border text-sm">
              🌐 Online
            </span>
          </div>

          {/* DEMO SECTION */}
          <div className="bg-teal-50 rounded-2xl p-6">
            <h3 className="font-semibold text-teal-800 mb-2">
              🎥 Demo Session
            </h3>
            <p className="text-sm text-teal-700">
              Book a demo session to understand teaching style and approach.
            </p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-3xl shadow p-6 h-fit">

          {/* PROFILE PIC */}
          <div className="flex flex-col items-center text-center">
            <img
              src={
                mentor.avatar ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="mentor"
              className="w-28 h-28 rounded-full object-cover mb-4"
            />

            <h2 className="text-xl font-bold text-gray-900">
              {mentor.name}
            </h2>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-semibold">4.9</span>
              <span className="text-gray-500 text-sm">(25 reviews)</span>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Response Time</span>
              <span className="font-semibold">2h</span>
            </div>
            <div className="flex justify-between">
              <span>Students</span>
              <span className="font-semibold">50+</span>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button className="mt-6 w-full py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
