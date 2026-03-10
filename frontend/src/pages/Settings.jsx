import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BasicInfo from "../components/settings/BasicInfo";
import AccountInfo from "../components/settings/AccountInfo";
import EditModal from "../components/settings/EditModal";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [editField, setEditField] = useState(null);
  const [basicData, setBasicData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  const { darkMode } = useContext(DarkModeContext);
  const { user, setUser } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  // ─── Fetch profile ────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setError("You are not logged in.");
      setPageLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const u = res.data.user;
        setBasicData({
          gender:    u.gender    || "",
          location:  u.location  || "",
          birthday:  u.birthday  || "",
          work:      u.work      || "",
          education: u.education || "",
        });
        setAccountData({
          email:    u.email    || "",
          password: "********",
          username: u.username || "",
          language: u.language || "English",
        });
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile. Please try again.");
      })
      .finally(() => setPageLoading(false));
  }, [token]);

  // ─── Save field ───────────────────────────────────────────
  const handleSave = async (field, value) => {
    try {
      const isBasic = activeTab === "basic";

      const payload =
        field === "password"
          ? { password: value }
          : { [field]: value };

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (isBasic) {
        setBasicData((prev) => ({ ...prev, [field]: value }));
      } else {
        setAccountData((prev) => ({ ...prev, [field]: value }));
      }

      if (res.data.user) setUser(res.data.user);

      setEditField(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  // ─── Loading ──────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center
        ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent
          rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Error ────────────────────────────────────────────────
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
        <p>{error}</p>
      </div>
    );
  }

  const TABS = [
    { id: "basic",   label: "Basic Info" },
    { id: "account", label: "Account Information" },
  ];

  return (
    <div className={`min-h-screen p-10 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>

      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-semibold mb-2
            ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account details and preferences.
          </p>
        </div>
        {saved && (
          <span className="text-sm text-teal-500 font-medium animate-pulse">
            ✓ Changes saved
          </span>
        )}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className={`w-full md:w-1/4 p-6 rounded-xl shadow
          ${darkMode ? "bg-gray-800" : "bg-white"}`}>

          {/* Mini profile */}
          <div className={`flex items-center gap-3 mb-6 pb-4 border-b
            ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center
              justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold truncate
                ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                {user?.name || "User"}
              </p>
              <p className="text-xs text-teal-500 truncate">
                {accountData?.email}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-lg transition text-sm font-medium
                  ${activeTab === tab.id
                    ? "bg-teal-500 text-white"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className={`w-full md:w-3/4 p-6 rounded-xl shadow
          ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {activeTab === "basic" && (
            <BasicInfo
              data={basicData}
              onEdit={(field) => {
                setActiveTab("basic");
                setEditField(field);
              }}
            />
          )}
          {activeTab === "account" && (
            <AccountInfo
              data={accountData}
              onEdit={(field) => {
                setActiveTab("account");
                setEditField(field);
              }}
            />
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editField && (
        <EditModal
          field={editField}
          currentValue={
            activeTab === "basic"
              ? basicData[editField]
              : accountData[editField]
          }
          onSave={handleSave}
          onClose={() => setEditField(null)}
        />
      )}
    </div>
  );
};

export default Settings;