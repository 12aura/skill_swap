import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";

const Search = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [skillsData, setSkillsData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const openProfile = async (name) => {
  try {
    const res = await axios.get(
      `/api/public/user-by-name/${encodeURIComponent(name)}`
    );

    const userId = res.data._id;

    navigate(`/profile/${userId}`);
  } catch (err) {
    console.error("Profile open failed", err);
    alert("User not found");
  }
};


  

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/skills/all")
      .then((res) => setSkillsData(res.data.skills))
      .catch((err) => console.error("Failed to load skills", err))
      .finally(() => setLoading(false));
  }, []);

  /* -----------------------------------------
     GROUP SKILLS UNDER EACH MENTOR
  ----------------------------------------- */
    const mentors = useMemo(() => {
  const map = {};

  skillsData.forEach((skill) => {
    skill.mentors.forEach((mentor) => {
      if (!map[mentor.id]) {
        map[mentor.id] = {
          id: mentor.id,
          name: mentor.name,
          skills: new Set(),
        };
      }
      map[mentor.id].skills.add(skill.name);
    });
  });

  return Object.values(map)
    .map((m) => ({
      id: m.id,
      name: m.name,
      skills: Array.from(m.skills),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}, [skillsData]);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredMentors = useMemo(() => {
    if (!search.trim()) return mentors;

    const query = search.toLowerCase();
    return mentors.filter((mentor) =>
      mentor.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      )
    );
  }, [search, mentors]);

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
      {/* ---------- HERO ---------- */}
      <div className="max-w-6xl mx-auto mb-14">
        <h1
          className={`text-5xl font-extrabold leading-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Find your next <span className="text-teal-500">Mentor</span> 
        </h1>

        <p
          className={`mt-4 max-w-xl ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Connect with world-class experts sharing their craft in a
          peer-to-peer ecosystem designed for growth.
        </p>
      </div>

      {/* ---------- SEARCH BAR ---------- */}
      <div
        className={`max-w-6xl mx-auto mb-16 rounded-full px-6 py-4 shadow-sm ${
          darkMode ? "bg-slate-800" : "bg-gray-50"
        }`}
      >
        <input
          type="text"
          placeholder="What would you like to learn today?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full bg-transparent outline-none text-lg ${
            darkMode
              ? "text-white placeholder-slate-400"
              : "text-gray-900 placeholder-gray-400"
          }`}
        />
      </div>

      {/* ---------- MENTOR CARDS ---------- */}
     {filteredMentors.length === 0 ? (
  <p
    className={`text-center ${
      darkMode ? "text-slate-400" : "text-gray-500"
    }`}
  >
    No mentors found.
  </p>
) : (
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {filteredMentors.map((mentor) => (
            <div
  key={mentor.name}
  className={`rounded-3xl p-6 transition-all duration-300 ${
    darkMode
      ? "bg-slate-800 border border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1"
      : "bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
  }`}
>

             <h3
  className={`text-xl font-semibold mb-3 ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>

                {mentor.name}
              </h3>

              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-slate-300" : "text-gray-500"
                }`}
              >
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
              <button
onClick={() => navigate(`/profile/${mentor.id}`)}

  className="mt-5 w-full py-2 rounded-xl border text-teal-600 border-teal-400 hover:bg-teal-50 transition"
>
  View Details
</button>


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;