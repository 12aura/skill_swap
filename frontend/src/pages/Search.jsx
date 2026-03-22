import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";

const Search = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [skillsData, setSkillsData]     = useState([]);
  const [search, setSearch]             = useState("");
  const [loading, setLoading]           = useState(true);
  const [hiddenMentors, setHiddenMentors] = useState(() => {
    // ✅ Persist hidden mentors in localStorage
    try {
      return JSON.parse(localStorage.getItem("hiddenMentors")) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
  axios
    .get("http://localhost:5000/api/user/skills/all") // keep localhost for now
    .then((res) => {
      console.log("API response:", res.data); // ✅ add this to see what's coming back
      setSkillsData(res.data.skills || []); // ✅ fallback to empty array
    })
    .catch((err) => console.error("Failed to load skills", err))
    .finally(() => setLoading(false));
}, []);

  /* ---------------- GROUP SKILLS UNDER EACH MENTOR ---------------- */

  const mentors = useMemo(() => {
  const map = {};

  // ✅ Guard — if skillsData is not an array, return empty
  if (!Array.isArray(skillsData)) return [];

  skillsData.forEach((skill) => {
    // ✅ Guard — if skill.mentors is missing
    if (!Array.isArray(skill.mentors)) return;

    skill.mentors.forEach((mentor) => {
      if (!map[mentor.id]) {
        map[mentor.id] = {
          id:     mentor.id,
          name:   mentor.name,
          avatar: mentor.avatar
  ? mentor.avatar
  : `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name || "U")}&background=0d9488&color=fff&size=128`,
          skills: new Set(),
        };
      }
      map[mentor.id].skills.add(skill.name);
    });
  });

  return Object.values(map)
    .map((m) => ({
      id:     m.id,
      name:   m.name,
      avatar: m.avatar,
      skills: Array.from(m.skills),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}, [skillsData]);
  /* ---------------- SEARCH FILTER ---------------- */
  const filteredMentors = useMemo(() => {
    const visible = mentors.filter((m) => !hiddenMentors.includes(m.id));

    if (!search.trim()) return visible;

    const query = search.toLowerCase();
    return visible.filter(
      (mentor) =>
        // ✅ search by mentor name OR skill name
        mentor.name.toLowerCase().includes(query) ||
        mentor.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  }, [search, mentors, hiddenMentors]);

  /* ---------------- HIDE MENTOR ---------------- */
  const handleRemove = (id) => {
    const updated = [...hiddenMentors, id];
    setHiddenMentors(updated);
    // ✅ persist so it survives refresh
    localStorage.setItem("hiddenMentors", JSON.stringify(updated));
  };

  /* ---------------- RESET HIDDEN ---------------- */
  const handleResetHidden = () => {
    setHiddenMentors([]);
    localStorage.removeItem("hiddenMentors");
  };

  if (loading) {
    return (
      <p className={`p-10 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
        Loading skills...
      </p>
    );
  }

  return (
    <div
      className={`min-h-screen px-10 py-12 transition-colors ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-14">
        <h1 className={`text-5xl font-extrabold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
          Find your next <span className="text-teal-500">Mentor</span>
        </h1>
        <p className={`mt-4 max-w-xl ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
          Connect with peers who are eager to share skills and learn together.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className={`max-w-6xl mx-auto mb-10 rounded-full px-6 py-4 shadow-sm ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
        <input
          type="text"
          placeholder="Search by skill or mentor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full bg-transparent outline-none text-lg ${
            darkMode ? "text-white placeholder-slate-400" : "text-gray-900 placeholder-gray-400"
          }`}
        />
      </div>

      {/* RESULTS COUNT + RESET */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
          {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""} found
        </p>

        {/* ✅ Show reset button only if some mentors are hidden */}
        {hiddenMentors.length > 0 && (
          <button
            onClick={handleResetHidden}
            className="text-sm text-teal-500 hover:underline"
          >
            Show {hiddenMentors.length} hidden mentor{hiddenMentors.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* MENTOR CARDS */}
      {filteredMentors.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
            No mentors found for "{search}"
          </p>
          <p className={`text-sm mt-1 ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
            Try a different skill or clear your search
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1"
                  : "bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* HIDE BUTTON */}
              <button
                onClick={() => handleRemove(mentor.id)}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-lg font-bold"
                title="Hide this mentor"
              >
                ×
              </button>

              {/* AVATAR + NAME */}
<div className="flex items-center gap-3 mb-4">
  <img
    src={
      mentor.avatar
        ? mentor.avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name || "U")}&background=0d9488&color=fff&size=128`
    }
    alt={mentor.name}
    className="w-12 h-12 rounded-full object-cover border-2 border-teal-400 flex-shrink-0"
  />
  <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
    {mentor.name}
  </h3>
</div>

              {/* SKILLS */}
              <p className={`text-sm mb-3 ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
                Teaches:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {mentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 text-sm rounded-full ${
                      darkMode
                        ? "bg-teal-900/40 text-teal-300 border border-teal-700/40"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* VIEW PROFILE BUTTON */}
              <button
                onClick={() => navigate(`/profile/${mentor.id}`)}
                className="mt-2 w-full py-2 rounded-xl border text-teal-600 border-teal-400 hover:bg-teal-50 transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;