import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Skills = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="p-6">Loading skills...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Skills
          </h1>

          <Link
            to="/profile"
            className="text-sm text-teal-600 hover:underline"
          >
            Back to Profile
          </Link>
        </div>

        {/* SKILLS TO TEACH */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Skills to Teach
          </h2>

          {user.skillsTeach?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.skillsTeach.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven’t added any skills to teach yet.
            </p>
          )}
        </div>

        {/* SKILLS TO LEARN */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Skills to Learn
          </h2>

          {user.skillsLearn?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.skillsLearn.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven’t added any skills to learn yet.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Skills;
