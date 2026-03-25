import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BasicInfo from "../components/settings/BasicInfo";
import AccountInfo from "../components/settings/AccountInfo";
import EditModal from "./EditModal";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Shield } from "lucide-react";

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

  /* FETCH PROFILE */
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
          gender: u.gender || "",
          location: u.location || "",
          birthday: u.birthday || "",
          work: u.work || "",
          education: u.education || "",
        });

        setAccountData({
          email: u.email || "",
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

  /* SAVE FIELD */
  const handleSave = async (field, value) => {
    try {
      const payload = field === "password" ? { password: value } : { [field]: value };

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (activeTab === "basic") {
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

  /* LOADING */
  if (pageLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"}`}>
        {error}
      </div>
    );
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "account", label: "Account & Security", icon: Shield },
  ];

  return (
    <>
      <div className={`min-h-screen px-6 py-10 ${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <SettingsIcon className="text-teal-500" /> Settings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your profile and account preferences
              </p>
            </div>

            {saved && (
              <div className="px-5 py-2 rounded-xl bg-teal-500/10 text-teal-500 text-sm font-semibold">
                Changes saved successfully ✓
              </div>
            )}
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <div className={`rounded-3xl p-6 ${darkMode ? "bg-slate-900" : "bg-white"} shadow-sm`}>

              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 overflow-hidden shadow-md">
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.[0]?.toUpperCase() || "U"
                  )}
                </div>

                <p className="font-semibold text-base">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 mt-1">{accountData?.email}</p>
              </div>

              <div className="flex flex-col gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium
                        ${activeTab === tab.id
                          ? "bg-teal-500 text-white shadow"
                          : darkMode
                          ? "text-gray-300 hover:bg-slate-800"
                          : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:col-span-3 rounded-3xl p-8 ${darkMode ? "bg-slate-900" : "bg-white"} shadow-sm border ${darkMode ? "border-slate-800" : "border-gray-100"}`}
            >
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editField && (
        <EditModal
          field={editField}
          currentValue={activeTab === "basic" ? basicData[editField] : accountData[editField]}
          onSave={handleSave}
          onClose={() => setEditField(null)}
        />
      )}
    </>
  );
};

export default Settings;