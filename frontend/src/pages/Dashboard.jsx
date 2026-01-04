import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <Link to="/profile" className="btn btn-outline btn-sm">
          View Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Skill Requests</div>
          <div className="stat-value text-primary">5</div>
          <div className="stat-desc">Pending requests</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Active Sessions</div>
          <div className="stat-value text-secondary">2</div>
          <div className="stat-desc">Ongoing learning</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Skills Shared</div>
          <div className="stat-value">8</div>
          <div className="stat-desc">Total exchanges</div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/search"
          className="card bg-base-100 shadow hover:shadow-lg transition"
        >
          <div className="card-body text-center">
            <h3 className="card-title justify-center">
              Search Skills
            </h3>
            <p>Find users to exchange skills</p>
          </div>
        </Link>

        <Link
          to="/requests"
          className="card bg-base-100 shadow hover:shadow-lg transition"
        >
          <div className="card-body text-center">
            <h3 className="card-title justify-center">
              Requests
            </h3>
            <p>Manage incoming requests</p>
          </div>
        </Link>

        <Link
          to="/sessions"
          className="card bg-base-100 shadow hover:shadow-lg transition"
        >
          <div className="card-body text-center">
            <h3 className="card-title justify-center">
              Sessions
            </h3>
            <p>View scheduled sessions</p>
          </div>
        </Link>

        <Link
          to="/profile"
          className="card bg-base-100 shadow hover:shadow-lg transition"
        >
          <div className="card-body text-center">
            <h3 className="card-title justify-center">
              Profile
            </h3>
            <p>Update your skills & info</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Dashboard;
