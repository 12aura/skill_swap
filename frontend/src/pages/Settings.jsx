import { useState } from "react";
import BasicInfo from "../components/settings/BasicInfo";
import AccountInfo from "../components/settings/AccountInfo";
import EditModal from "../components/settings/EditModal";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [editField, setEditField] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl flex">
        
        {/* LEFT MENU */}
        <div className="w-1/4 border-r p-6">
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "basic" && "bg-blue-500 text-white"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </button>

          <button
            className={`block w-full mt-2 text-left px-4 py-2 rounded ${
              activeTab === "account" && "bg-blue-500 text-white"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account Information
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-3/4 p-8">
          {activeTab === "basic" && (
            <BasicInfo onEdit={setEditField} />
          )}

          {activeTab === "account" && (
            <AccountInfo onEdit={setEditField} />
          )}
        </div>
      </div>

      {/* MODAL */}
      {editField && (
        <EditModal
          field={editField}
          onClose={() => setEditField(null)}
        />
      )}
    </div>
  );
};

export default Settings;
