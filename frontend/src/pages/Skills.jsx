import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Skills = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Skills
        </h1>

        {user.skillsTeach?.length || user.skillsLearn?.length ? (
          <div className="flex flex-wrap gap-3">
            {user.skillsTeach?.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm"
              >
                {skill} · Mentor
              </span>
            ))}
            {user.skillsLearn?.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm"
              >
                {skill} · Learner
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No skills added yet.
          </p>
        )}

      </div>
    </div>
  );
};

export default Skills;
