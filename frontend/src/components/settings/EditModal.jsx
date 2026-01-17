import { useState } from "react";

const EditModal = ({ field, onClose }) => {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 capitalize">
          Edit {field}
        </h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
