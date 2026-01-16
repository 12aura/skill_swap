import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
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

  /* -----------------------------------------
     SEARCH FILTER
  ----------------------------------------- */
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
    return <p className="p-10">Loading skills...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Browse Skills
      </h1>
      <p className="text-gray-600 mb-6">
        Discover skills shared by mentors and learners
      </p>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search skill (e.g. React, Java, C++)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl px-4 py-3 mb-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      {filteredMentors.length === 0 ? (
        <p className="text-gray-500">No mentors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.name}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {mentor.name}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                Teaches:
              </p>

              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full"
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
