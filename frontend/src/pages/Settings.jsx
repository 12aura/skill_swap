import { useState, useContext } from "react";
import BasicInfo from "../components/settings/BasicInfo";
import AccountInfo from "../components/settings/AccountInfo";
import EditModal from "../components/settings/EditModal";
import { DarkModeContext } from "../context/DarkModeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [editField, setEditField] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen p-10 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className={`text-2xl font-semibold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          Profile Settings
        </h1>
        <p className={`text-sm text-gray-500`}>
          Manage your account details and preferences.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className={`w-full md:w-1/4 p-6 rounded-xl shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("basic")}
              className={`flex items-center px-4 py-3 rounded-lg transition
                ${activeTab === "basic"
                  ? "bg-teal-500 text-white"
                  : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Basic Info
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center px-4 py-3 rounded-lg transition
                ${activeTab === "account"
                  ? "bg-teal-500 text-white"
                  : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Account Information
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className={`w-full md:w-3/4 p-6 rounded-xl shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {activeTab === "basic" && <BasicInfo onEdit={setEditField} />}
          {activeTab === "account" && <AccountInfo onEdit={setEditField} />}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editField && (
        <EditModal field={editField} onClose={() => setEditField(null)} />
      )}
    </div>
  );
};

export default Settings;
