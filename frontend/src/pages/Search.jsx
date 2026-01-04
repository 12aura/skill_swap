import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const skills = [
    {
      id: 1,
      title: "Python for Beginners",
      category: "Coding & Development",
      instructor: "Sarah Chen",
      level: "Beginner",
      rating: "4.8 · 120 learners",
    },
    {
      id: 2,
      title: "Digital Painting",
      category: "Creative Arts",
      instructor: "Alex Morgan",
      level: "Beginner",
      rating: "4.9 · 95 learners",
    },
    {
      id: 3,
      title: "Spanish Conversation Practice",
      category: "Language Exchange",
      instructor: "Maria Gomez",
      level: "Intermediate",
      rating: "4.7 · 210 learners",
    },
    {
      id: 4,
      title: "Mobile App Design (UI/UX)",
      category: "Design",
      instructor: "Emily Jones",
      level: "All Levels",
      rating: "4.8 · 210 learners",
    },
    {
      id: 5,
      title: "Guitar Riffs & Chords",
      category: "Music",
      instructor: "Alex Lee",
      level: "All Levels",
      rating: "4.6 · 210 learners",
    },
    {
      id: 6,
      title: "Music Exchange",
      category: "Music",
      instructor: "Freestyle",
      level: "All Levels",
      rating: "4.6 · 88 learners",
    },
  ];

  const filteredSkills = skills.filter((skill) =>
    skill.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-12">

      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Browse Skills
        </h1>
        <p className="text-gray-600 mt-2">
          Discover skills shared by mentors and learners
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow p-6 mb-12">

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search skills like React, Python, Design..."
          className="input input-bordered bg-white text-gray-800 w-full mb-5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select className="select select-bordered bg-white text-gray-800">
            <option>Category</option>
            <option>Coding</option>
            <option>Design</option>
            <option>Music</option>
          </select>

          <select className="select select-bordered bg-white text-gray-800">
            <option>Skill Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select className="select select-bordered bg-white text-gray-800">
            <option>Availability</option>
            <option>Weekdays</option>
            <option>Weekends</option>
          </select>
        </div>
      </div>

      {/* SKILLS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-3xl shadow hover:shadow-lg transition p-6"
          >
            <div className="text-3xl mb-4">📘</div>

            <h3 className="text-lg font-semibold text-gray-800">
              {skill.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {skill.category}
            </p>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Instructor:</span>{" "}
                {skill.instructor}
              </p>
              <p>
                <span className="font-medium">Level:</span>{" "}
                {skill.level}
              </p>
              <p>
                ⭐ {skill.rating}
              </p>
            </div>

            <button className="btn btn-outline w-full mt-6">
              View Details
            </button>
          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-14">
        <div className="join">
          <button className="join-item btn">Prev</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">Next</button>
        </div>
      </div>

    </div>
  );
};

export default Search;
