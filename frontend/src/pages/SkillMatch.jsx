import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SkillMatch = () => {
  const { user, loading } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);

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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h2>Skill Swap Matches</h2>

      {matches.length === 0 && <p>No matches found</p>}

      {matches.map((u) => (
        <div key={u._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <h3>{u.name}</h3>

          <p>
            <b>Teaches:</b>{" "}
            {u.skillsTeach.map(s => s.name).join(", ")}
          </p>

          <p>
            <b>Wants to Learn:</b>{" "}
            {u.skillsLearn.map(s => s.name).join(", ")}
          </p>

          <button>Connect</button>
        </div>
      ))}
    </div>
  );
};

export default SkillMatch;
