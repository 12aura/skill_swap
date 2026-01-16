const BasicInfo = ({ onEdit }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Basic Info</h2>

      {[
        ["Gender", "Female"],
        ["Location", "India, Rajasthan"],
        ["Birthday", "February 16, 2006"],
        ["Work", "Add a workplace"],
        ["Education", "Banasthali Vidyapith - B.Tech (CSE)"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between border-b py-4"
        >
          <div>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>

          <button
            className="text-blue-500"
            onClick={() => onEdit(label.toLowerCase())}
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
};

export default BasicInfo;
