import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const PublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/public/profile/${id}`)
      .then((res) => {
        // handle both response shapes
        const profile = res.data.user || res.data;
        setUser(profile);
      })
      .catch((err) => console.error(err));
  }, [id]);
  const sendRequest = async (skill) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/requests/send",
      {
        toUser: user._id,
        skill: skill,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Request sent successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to send request");
  }
};


  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

      <h3 className="font-semibold mb-2">Teaches:</h3>

      <div className="flex gap-2 flex-wrap">
        {(user.skillsTeach || []).map((skill) => (
          <span
            key={skill._id}
            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
