// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/v2/index.css";
// import { AuthContext } from "../context/AuthContext";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//   const { userId: targetUserId } = useParams();
//   const { user: authUser } = useContext(AuthContext);

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!authUser) return;

//     let client;
// const initChat = async () => {
//   try {
//     const authToken = localStorage.getItem("token");

//     // 1. Get token for logged-in user (also upserts them)
//     const { data } = await axios.get(
//       "http://localhost:5000/api/chat/token",
//       { headers: { Authorization: `Bearer ${authToken}` } }
//     );

//     // 2. Upsert the TARGET user so they exist in Stream ← THIS IS THE FIX
//     await axios.post(
//       `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
//       {},
//       { headers: { Authorization: `Bearer ${authToken}` } }
//     );

//     client = StreamChat.getInstance(STREAM_API_KEY);

//     if (!client.userID) {
//       await client.connectUser(
//         { id: authUser._id, name: authUser.name, image: authUser.profilePic },
//         data.token
//       );
//     }

//         const membersSorted = [authUser._id.toString(), targetUserId.toString()].sort();
//         const channelId = `chat-${membersSorted[0]}-${membersSorted[1]}`;

//         const newChannel = client.channel("messaging", channelId, {
//           members: membersSorted,
//         });

//         await newChannel.watch();

//         setChatClient(client);
//         setChannel(newChannel);
//       } catch (error) {
//         console.error("Chat init error:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();

//     return () => {
//       if (client) client.disconnectUser();
//     };
//   }, [targetUserId, authUser]);

//   if (loading) return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
//   if (!chatClient || !channel) return <div className="flex items-center justify-center h-screen">Could not load chat.</div>;

//   return (
//     <div style={{ height: "90vh" }}>
//       <Chat client={chatClient} theme="messaging light">
//         <Channel channel={channel}>
//           <Window>
//             <ChannelHeader />
//             <MessageList />
//             <MessageInput />
//           </Window>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };

// export default ChatPage;



// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/v2/index.css";
// import { AuthContext } from "../context/AuthContext";
// import socket from "../socket"; // ✅ import your existing socket

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//   const { userId: targetUserId } = useParams();
//   const { user: authUser }       = useContext(AuthContext);

//   const [chatClient, setChatClient] = useState(null);
//   const [channel,    setChannel]    = useState(null);
//   const [loading,    setLoading]    = useState(true);

//   useEffect(() => {
//     if (!authUser) return;

//     let client;

//     const initChat = async () => {
//       try {
//         const authToken = localStorage.getItem("token");

//         // 1. Get token for logged-in user
//         const { data } = await axios.get(
//           "http://localhost:5000/api/chat/token",
//           { headers: { Authorization: `Bearer ${authToken}` } }
//         );

//         // 2. Upsert the target user so they exist in Stream
//         await axios.post(
//           `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
//           {},
//           { headers: { Authorization: `Bearer ${authToken}` } }
//         );

//         client = StreamChat.getInstance(STREAM_API_KEY);

//         if (!client.userID) {
//           await client.connectUser(
//             { id: authUser._id, name: authUser.name, image: authUser.profilePic },
//             data.token
//           );
//         }

//         const membersSorted = [authUser._id.toString(), targetUserId.toString()].sort();
//         const channelId     = `chat-${membersSorted[0]}-${membersSorted[1]}`;

//         const newChannel = client.channel("messaging", channelId, {
//           members: membersSorted,
//         });

//         await newChannel.watch();

//         // ✅ Listen for new messages on this channel
//         // When the CURRENT user sends a message, notify the TARGET user
//         newChannel.on("message.new", (event) => {
//           const senderId = event.user?.id;

//           // Only emit if the current user sent the message (not when receiving)
//           if (senderId !== authUser._id.toString()) return;

//           // Tell backend to notify the receiver via socket
//           socket.emit("notify_message", {
//             senderId:    authUser._id,
//             senderName:  authUser.name,
//             receiverId:  targetUserId,
//           });
//         });

//         setChatClient(client);
//         setChannel(newChannel);
//       } catch (error) {
//         console.error("Chat init error:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();

//     return () => {
//       if (client) client.disconnectUser();
//     };
//   }, [targetUserId, authUser]);

//   if (loading)
//     return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
//   if (!chatClient || !channel)
//     return <div className="flex items-center justify-center h-screen">Could not load chat.</div>;

//   return (
//     <div style={{ height: "90vh" }}>
//       <Chat client={chatClient} theme="messaging light">
//         <Channel channel={channel}>
//           <Window>
//             <ChannelHeader />
//             <MessageList />
//             <MessageInput />
//           </Window>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };

// export default ChatPage;
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  Thread,
  useChannelStateContext,
  useChatContext,
  useTypingContext,
  useMessageContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { AuthContext } from "../context/AuthContext";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/* ═══════════════════════════════════════════════
   CUSTOM CHANNEL HEADER
═══════════════════════════════════════════════ */
const CustomChannelHeader = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const members = Object.values(channel?.state?.members || {}).filter(
    (m) => m.user?.id !== client.userID
  );
  const otherUser = members[0]?.user;
  const isOnline = otherUser?.online ?? false;
  const memberCount = Object.keys(channel?.state?.members || {}).length;
  const onlineCount = Object.values(channel?.state?.members || {}).filter(
    (m) => m.user?.online
  ).length;

  const initials = otherUser?.name
    ? otherUser.name.slice(0, 2).toUpperCase()
    : "??";

  return (
    <div className="ss-header">
      <div className="ss-avatar-wrap">
        {otherUser?.image ? (
          <img src={otherUser.image} alt={otherUser.name} className="ss-avatar-img" />
        ) : (
          <div className="ss-avatar">{initials}</div>
        )}
        <span className={`ss-presence ${isOnline ? "ss-online" : "ss-offline"}`} />
      </div>
      <div className="ss-header-info">
        <span className="ss-header-name">{otherUser?.name || "Unknown"}</span>
        <span className="ss-header-sub">
          {isOnline
            ? "● Online"
            : `${memberCount} members, ${onlineCount} online`}
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   CUSTOM TYPING INDICATOR
═══════════════════════════════════════════════ */
const CustomTypingIndicator = () => {
  const { typing } = useTypingContext("CustomTypingIndicator");
  const { client } = useChatContext("CustomTypingIndicator");

  const typingUsers = Object.values(typing || {}).filter(
    (t) => t.user?.id !== client.userID
  );

  if (!typingUsers.length) return null;

  const name = typingUsers[0]?.user?.name || "Someone";

  return (
    <div className="ss-typing-row">
      <div className="ss-typing-avatar">
        {name.slice(0, 1).toUpperCase()}
      </div>
      <div className="ss-typing-bubble">
        <span className="ss-dot" />
        <span className="ss-dot" />
        <span className="ss-dot" />
      </div>
      <span className="ss-typing-label">{name} is typing…</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   CUSTOM MESSAGE INPUT
   ── uses channel.sendMessage() directly so
      there's no dependency on Stream's input
      context (avoids the handleSubmit error)
═══════════════════════════════════════════════ */
const CustomMessageInput = ({ channel }) => {
  const inputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const handleSend = async () => {
    const text = inputRef.current?.value?.trim();
    if (!text || !channel) return;
    try {
      await channel.sendMessage({ text });
      inputRef.current.value = "";
      inputRef.current.focus();
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = () => {
    if (!channel) return;
    channel.keystroke();
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => channel.stopTyping(), 2000);
  };

  return (
    <div className="ss-input-row">
      <button className="ss-attach-btn" aria-label="Attach" type="button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </button>
      <input
        ref={inputRef}
        className="ss-msg-input"
        placeholder="Type your message"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        autoComplete="off"
      />
      <button className="ss-send-btn" onClick={handleSend} type="button" aria-label="Send">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M3 20l18-8L3 4v6l10 2-10 2v6z" />
        </svg>
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   CUSTOM MESSAGE BUBBLE
═══════════════════════════════════════════════ */
const CustomMessage = () => {
  const { message, isMyMessage } = useMessageContext("CustomMessage");

  const isDeleted = message.type === "deleted" || !!message.deleted_at;
  const isMine = isMyMessage();

  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`ss-msg-row ${isMine ? "ss-mine" : "ss-theirs"}`}>
      {!isMine && (
        <div className="ss-msg-avatar">
          {message.user?.image ? (
            <img
              src={message.user.image}
              alt={message.user.name}
              className="ss-msg-avatar-img"
            />
          ) : (
            <span>{(message.user?.name || "?").slice(0, 1).toUpperCase()}</span>
          )}
        </div>
      )}
      <div className="ss-bubble-wrap">
        <div
          className={[
            "ss-bubble",
            isMine ? "ss-bubble-mine" : "ss-bubble-theirs",
            isDeleted ? "ss-bubble-deleted" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isDeleted ? "This message was deleted…" : message.text}
        </div>
        <span className={`ss-msg-time ${isMine ? "ss-time-right" : "ss-time-left"}`}>
          {time}
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CHAT PAGE
═══════════════════════════════════════════════ */
const ChatPage = () => {
  const { userId: targetUserId } = useParams();
  const { user: authUser } = useContext(AuthContext);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!authUser) return;
    let client;

    const initChat = async () => {
      try {
        const authToken = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/chat/token",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        await axios.post(
          `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        client = StreamChat.getInstance(STREAM_API_KEY);

        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.name,
              image: authUser.profilePic,
            },
            data.token
          );
        }

        const membersSorted = [
          authUser._id.toString(),
          targetUserId.toString(),
        ].sort();
        const channelId = `chat-${membersSorted[0]}-${membersSorted[1]}`;

        const newChannel = client.channel("messaging", channelId, {
          members: membersSorted,
        });

        await newChannel.watch();

        setChatClient(client);
        setChannel(newChannel);
      } catch (err) {
        console.error("Chat init error:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [targetUserId, authUser]);

  if (loading) {
    return (
      <div className="ss-state-screen">
        <div className="ss-spinner" />
        <span>Loading chat…</span>
      </div>
    );
  }

  if (error || !chatClient || !channel) {
    return (
      <div className="ss-state-screen">
        <span>Could not load chat. Please try again.</span>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="ss-page">
        <div className="ss-chat-card">
          <Chat client={chatClient} theme="messaging light">
            <Channel
              channel={channel}
              TypingIndicator={CustomTypingIndicator}
              Message={CustomMessage}
            >
              <Window>
                <CustomChannelHeader />
                <div className="ss-messages-wrap">
                  <MessageList
                    TypingIndicator={CustomTypingIndicator}
                    Message={CustomMessage}
                  />
                </div>
                <CustomMessageInput channel={channel} />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --ss-green:       #0F6E56;
  --ss-green-dark:  #085041;
  --ss-green-light: #e8f4ee;
  --ss-green-faint: #edf7f2;
  --ss-border:      rgba(15,110,86,0.13);
  --ss-font:        'DM Sans', system-ui, sans-serif;
}

.ss-page *, .ss-page *::before, .ss-page *::after {
  font-family: var(--ss-font) !important;
  box-sizing: border-box;
}

/* ── Page ── */
.ss-page {
  min-height: 90vh;
  background: var(--ss-green-faint);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* ── Card shell ── */
.ss-chat-card {
  width: 100%;
  max-width: 720px;
  height: 85vh;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 24px rgba(15,110,86,0.10);
}

/* ── Strip ALL Stream chrome ── */
.str-chat,
.str-chat__container,
.str-chat-channel,
.str-chat__channel {
  height: 100% !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
.str-chat__channel-header,
.str-chat__header-livestream,
.str-chat__input-flat,
.str-chat__message-input,
.str-chat__avatar,
.str-chat__message-simple__actions,
.str-chat__message-options,
.str-chat__message-reactions-button {
  display: none !important;
}

/* ── Message list ── */
.ss-messages-wrap {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--ss-green-faint);
}
.str-chat__list,
.str-chat__ul {
  background: var(--ss-green-faint) !important;
  padding: 12px 16px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}
.str-chat__li {
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}

/* ── Date separator ── */
.str-chat__date-separator {
  font-size: 11px !important;
  color: #8aada4 !important;
  margin: 8px 0 !important;
}
.str-chat__date-separator-line {
  border-color: var(--ss-border) !important;
}
.str-chat__date-separator-date {
  font-size: 11px !important;
  color: #8aada4 !important;
  background: var(--ss-green-faint) !important;
  padding: 0 8px !important;
}

/* ── Header ── */
.ss-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: #fff;
  border-bottom: 0.5px solid var(--ss-border);
  flex-shrink: 0;
}
.ss-avatar-wrap { position: relative; flex-shrink: 0; }
.ss-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--ss-green);
  color: #fff;
  font-size: 14px; font-weight: 500;
  display: flex; align-items: center; justify-content: center;
}
.ss-avatar-img {
  width: 42px; height: 42px;
  border-radius: 50%; object-fit: cover;
}
.ss-presence {
  position: absolute; bottom: 1px; right: 1px;
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.ss-online  { background: #1D9E75; }
.ss-offline { background: #c5d5d0; }
.ss-header-info { display: flex; flex-direction: column; gap: 1px; }
.ss-header-name { font-size: 14.5px; font-weight: 500; color: #1a2e28; }
.ss-header-sub  { font-size: 12px; color: #1D9E75; }

/* ── Message bubbles ── */
.ss-msg-row {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  max-width: 72%;
  margin-bottom: 3px;
}
.ss-mine   { align-self: flex-end;   flex-direction: row-reverse; margin-left: auto; }
.ss-theirs { align-self: flex-start; }

.ss-msg-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--ss-green);
  color: #fff;
  font-size: 11px; font-weight: 500;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; overflow: hidden;
}
.ss-msg-avatar-img { width: 100%; height: 100%; object-fit: cover; }

.ss-bubble-wrap { display: flex; flex-direction: column; gap: 3px; }

.ss-bubble {
  padding: 9px 14px;
  font-size: 13.5px;
  line-height: 1.45;
  word-break: break-word;
  max-width: 280px;
}
.ss-bubble-mine {
  background: var(--ss-green);
  color: #fff;
  border-radius: 18px 18px 4px 18px;
}
.ss-bubble-theirs {
  background: #fff;
  color: #1a2e28;
  border-radius: 18px 18px 18px 4px;
  border: 0.5px solid var(--ss-border);
}
.ss-bubble-deleted {
  background: transparent !important;
  border: 0.5px dashed #b0cdc5 !important;
  color: #8aada4 !important;
  font-style: italic;
  font-size: 12.5px !important;
  border-radius: 10px !important;
}
.ss-msg-time { font-size: 10.5px; color: #8aada4; }
.ss-time-right { text-align: right; }
.ss-time-left  { text-align: left; padding-left: 2px; }

/* ── Typing indicator ── */
.ss-typing-row {
  display: flex; align-items: center; gap: 7px;
  padding: 5px 16px 8px;
  background: var(--ss-green-faint);
  animation: ss-fadein 0.2s ease;
}
@keyframes ss-fadein {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ss-typing-avatar {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--ss-green);
  color: #fff;
  font-size: 10px; font-weight: 500;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ss-typing-bubble {
  background: #fff;
  border: 0.5px solid var(--ss-border);
  border-radius: 14px 14px 14px 4px;
  padding: 8px 12px;
  display: flex; align-items: center; gap: 4px;
}
.ss-dot {
  width: 5px; height: 5px;
  border-radius: 50%; background: #7aada0;
  display: inline-block;
  animation: ss-bounce 1.2s infinite;
}
.ss-dot:nth-child(2) { animation-delay: 0.15s; }
.ss-dot:nth-child(3) { animation-delay: 0.30s; }
@keyframes ss-bounce {
  0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
  30%           { transform: translateY(-5px); opacity: 1;   }
}
.ss-typing-label { font-size: 11px; color: #7aada0; }

/* ── Input ── */
.ss-input-row {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px;
  background: #fff;
  border-top: 0.5px solid var(--ss-border);
  flex-shrink: 0;
}
.ss-attach-btn {
  background: none; border: none; cursor: pointer;
  color: #9bbdb4;
  display: flex; align-items: center; justify-content: center;
  padding: 6px; border-radius: 50%;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.ss-attach-btn:hover { background: var(--ss-green-light); color: var(--ss-green); }
.ss-msg-input {
  flex: 1; border: none; background: transparent;
  font-size: 13.5px !important; color: #1a2e28;
  outline: none; line-height: 1.45; padding: 4px 0;
}
.ss-msg-input::placeholder { color: #b0cdc5; }
.ss-send-btn {
  width: 36px; height: 36px;
  border-radius: 50%; background: var(--ss-green);
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}
.ss-send-btn:hover  { background: var(--ss-green-dark); }
.ss-send-btn:active { transform: scale(0.93); }

/* ── Loading / Error ── */
.ss-state-screen {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  height: 100vh; gap: 16px;
  background: var(--ss-green-faint);
  color: #7aada0; font-size: 14px;
}
.ss-spinner {
  width: 32px; height: 32px;
  border: 2.5px solid rgba(15,110,86,0.15);
  border-top-color: var(--ss-green);
  border-radius: 50%;
  animation: ss-spin 0.75s linear infinite;
}
@keyframes ss-spin { to { transform: rotate(360deg); } }

/* ── Thread ── */
.str-chat__thread {
  background: #fff !important;
  border-left: 0.5px solid var(--ss-border) !important;
}
`;