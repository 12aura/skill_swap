import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StreamChat } from "stream-chat";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatListPage = () => {
  const { user: authUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;

    let client;

    const loadChats = async () => {
      try {
        const authToken = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/chat/token",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        client = StreamChat.getInstance(STREAM_API_KEY);

        if (!client.userID) {
          await client.connectUser(
            { id: authUser._id, name: authUser.name },
            data.token
          );
        }

        // Fetch all channels this user is a member of
        const filter = {
          type: "messaging",
          members: { $in: [authUser._id] },
        };
        const sort = { last_message_at: -1 };

        const userChannels = await client.queryChannels(filter, sort, {
          watch: true,
          state: true,
        });

        setChannels(userChannels);
      } catch (err) {
        console.error("Failed to load chats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChats();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [authUser]);

  const getOtherMember = (channel) => {
    const members = Object.values(channel.state.members);
    const other = members.find((m) => m.user.id !== authUser._id);
    return other?.user || null;
  };

  const getLastMessage = (channel) => {
    const messages = channel.state.messages;
    if (!messages.length) return "No messages yet";
    const last = messages[messages.length - 1];
    return last.text || "Attachment";
  };

  const getChannelUserId = (channel) => {
    const other = getOtherMember(channel);
    return other?.id || null;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        Loading conversations...
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-6 py-10 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        {channels.length === 0 ? (
          <p className={`text-center mt-20 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            No conversations yet. Start chatting from Browse Skills!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {channels.map((channel) => {
              const other = getOtherMember(channel);
              const lastMsg = getLastMessage(channel);
              const targetId = getChannelUserId(channel);

              return (
                <div
                  key={channel.id}
                  onClick={() => navigate(`/chat/${targetId}`)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition hover:shadow-md ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {other?.name?.[0]?.toUpperCase() || "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{other?.name || "Unknown"}</p>
                    <p className={`text-sm truncate ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                      {lastMsg}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="text-gray-400 text-xl">›</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
