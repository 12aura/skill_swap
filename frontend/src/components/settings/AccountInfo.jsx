const AccountInfo = ({ onEdit }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Account Information
      </h2>

      {[
        ["Email", "auram@gmail.com"],
        ["Password", "********"],
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

export default AccountInfo;
