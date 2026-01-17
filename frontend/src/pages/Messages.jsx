import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Messages = () => {
  const { darkMode } = useContext(DarkModeContext);

  // 🧪 Dummy conversations
  const conversations = [
    {
      id: 1,
      name: "MANSH",
      email: "mansh@gmail.com",
      lastMessage: "See you in the session 👍",
      messages: [
        { from: "them", text: "Hey! Ready for Java?" },
        { from: "me", text: "Yes, looking forward to it 😄" },
        { from: "them", text: "See you in the session 👍" },
      ],
    },
    {
      id: 2,
      name: "Ayushi",
      email: "ayushi@gmail.com",
      lastMessage: "Thanks for accepting!",
      messages: [
        { from: "them", text: "Thanks for accepting!" },
        { from: "me", text: "No problem 😊" },
      ],
    },
  ];

  const [activeChat, setActiveChat] = useState(conversations[0]);

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto h-[80vh] rounded-3xl shadow-xl overflow-hidden flex ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* LEFT SIDEBAR */}
        <div
          className={`w-1/3 border-r p-4 ${
            darkMode ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Messages</h2>

          <div className="space-y-3">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`p-3 rounded-xl cursor-pointer transition ${
                  activeChat.id === conv.id
                    ? "bg-teal-100 text-teal-800"
                    : darkMode
                    ? "hover:bg-slate-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-semibold">{conv.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT AREA */}
        <div className="w-2/3 flex flex-col">
          {/* CHAT HEADER */}
          <div
            className={`p-4 border-b ${
              darkMode ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <h3 className="font-semibold">{activeChat.name}</h3>
            <p className="text-xs text-gray-500">{activeChat.email}</p>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {activeChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                  msg.from === "me"
                    ? "ml-auto bg-teal-500 text-white"
                    : darkMode
                    ? "bg-slate-700"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT (DISABLED FOR NOW) */}
          <div
            className={`p-4 border-t ${
              darkMode ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="Messaging feature coming soon 🚀"
              disabled
              className={`w-full px-4 py-2 rounded-lg text-sm ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
