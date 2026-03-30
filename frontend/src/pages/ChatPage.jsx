// // import { useEffect, useState, useContext } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { StreamChat } from "stream-chat";
// // import {
// //   Chat,
// //   Channel,
// //   Window,
// //   ChannelHeader,
// //   MessageList,
// //   MessageInput,
// //   Thread,
// // } from "stream-chat-react";
// // import "stream-chat-react/dist/css/v2/index.css";
// // import { AuthContext } from "../context/AuthContext";

// // const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// // const ChatPage = () => {
// //   const { userId: targetUserId } = useParams();
// //   const { user: authUser } = useContext(AuthContext);

// //   const [chatClient, setChatClient] = useState(null);
// //   const [channel, setChannel] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!authUser) return;

// //     let client;
// // const initChat = async () => {
// //   try {
// //     const authToken = localStorage.getItem("token");

// //     // 1. Get token for logged-in user (also upserts them)
// //     const { data } = await axios.get(
// //       "http://localhost:5000/api/chat/token",
// //       { headers: { Authorization: `Bearer ${authToken}` } }
// //     );

// //     // 2. Upsert the TARGET user so they exist in Stream ← THIS IS THE FIX
// //     await axios.post(
// //       `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
// //       {},
// //       { headers: { Authorization: `Bearer ${authToken}` } }
// //     );

// //     client = StreamChat.getInstance(STREAM_API_KEY);

// //     if (!client.userID) {
// //       await client.connectUser(
// //         { id: authUser._id, name: authUser.name, image: authUser.profilePic },
// //         data.token
// //       );
// //     }

// //         const membersSorted = [authUser._id.toString(), targetUserId.toString()].sort();
// //         const channelId = `chat-${membersSorted[0]}-${membersSorted[1]}`;

// //         const newChannel = client.channel("messaging", channelId, {
// //           members: membersSorted,
// //         });

// //         await newChannel.watch();

// //         setChatClient(client);
// //         setChannel(newChannel);
// //       } catch (error) {
// //         console.error("Chat init error:", error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initChat();

// //     return () => {
// //       if (client) client.disconnectUser();
// //     };
// //   }, [targetUserId, authUser]);

// //   if (loading) return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
// //   if (!chatClient || !channel) return <div className="flex items-center justify-center h-screen">Could not load chat.</div>;

// //   return (
// //     <div style={{ height: "90vh" }}>
// //       <Chat client={chatClient} theme="messaging light">
// //         <Channel channel={channel}>
// //           <Window>
// //             <ChannelHeader />
// //             <MessageList />
// //             <MessageInput />
// //           </Window>
// //           <Thread />
// //         </Channel>
// //       </Chat>
// //     </div>
// //   );
// // };

// // export default ChatPage;



// // import { useEffect, useState, useContext } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { StreamChat } from "stream-chat";
// // import {
// //   Chat,
// //   Channel,
// //   Window,
// //   ChannelHeader,
// //   MessageList,
// //   MessageInput,
// //   Thread,
// // } from "stream-chat-react";
// // import "stream-chat-react/dist/css/v2/index.css";
// // import { AuthContext } from "../context/AuthContext";
// // import socket from "../socket"; // ✅ import your existing socket

// // const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// // const ChatPage = () => {
// //   const { userId: targetUserId } = useParams();
// //   const { user: authUser }       = useContext(AuthContext);

// //   const [chatClient, setChatClient] = useState(null);
// //   const [channel,    setChannel]    = useState(null);
// //   const [loading,    setLoading]    = useState(true);

// //   useEffect(() => {
// //     if (!authUser) return;

// //     let client;

// //     const initChat = async () => {
// //       try {
// //         const authToken = localStorage.getItem("token");

// //         // 1. Get token for logged-in user
// //         const { data } = await axios.get(
// //           "http://localhost:5000/api/chat/token",
// //           { headers: { Authorization: `Bearer ${authToken}` } }
// //         );

// //         // 2. Upsert the target user so they exist in Stream
// //         await axios.post(
// //           `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
// //           {},
// //           { headers: { Authorization: `Bearer ${authToken}` } }
// //         );

// //         client = StreamChat.getInstance(STREAM_API_KEY);

// //         if (!client.userID) {
// //           await client.connectUser(
// //             { id: authUser._id, name: authUser.name, image: authUser.profilePic },
// //             data.token
// //           );
// //         }

// //         const membersSorted = [authUser._id.toString(), targetUserId.toString()].sort();
// //         const channelId     = `chat-${membersSorted[0]}-${membersSorted[1]}`;

// //         const newChannel = client.channel("messaging", channelId, {
// //           members: membersSorted,
// //         });

// //         await newChannel.watch();

// //         // ✅ Listen for new messages on this channel
// //         // When the CURRENT user sends a message, notify the TARGET user
// //         newChannel.on("message.new", (event) => {
// //           const senderId = event.user?.id;

// //           // Only emit if the current user sent the message (not when receiving)
// //           if (senderId !== authUser._id.toString()) return;

// //           // Tell backend to notify the receiver via socket
// //           socket.emit("notify_message", {
// //             senderId:    authUser._id,
// //             senderName:  authUser.name,
// //             receiverId:  targetUserId,
// //           });
// //         });

// //         setChatClient(client);
// //         setChannel(newChannel);
// //       } catch (error) {
// //         console.error("Chat init error:", error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initChat();

// //     return () => {
// //       if (client) client.disconnectUser();
// //     };
// //   }, [targetUserId, authUser]);

// //   if (loading)
// //     return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
// //   if (!chatClient || !channel)
// //     return <div className="flex items-center justify-center h-screen">Could not load chat.</div>;

// //   return (
// //     <div style={{ height: "90vh" }}>
// //       <Chat client={chatClient} theme="messaging light">
// //         <Channel channel={channel}>
// //           <Window>
// //             <ChannelHeader />
// //             <MessageList />
// //             <MessageInput />
// //           </Window>
// //           <Thread />
// //         </Channel>
// //       </Chat>
// //     </div>
// //   );
// // };

// // export default ChatPage;
// import { useEffect, useState, useContext, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   Window,
//   MessageList,
//   Thread,
//   useChannelStateContext,
//   useChatContext,
//   useTypingContext,
//   useMessageContext,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/v2/index.css";
// import { AuthContext } from "../context/AuthContext";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// /* ═══════════════════════════════════════════════
//    CUSTOM CHANNEL HEADER
// ═══════════════════════════════════════════════ */
// const CustomChannelHeader = () => {
//   const { channel } = useChannelStateContext();
//   const { client } = useChatContext();

//   const members = Object.values(channel?.state?.members || {}).filter(
//     (m) => m.user?.id !== client.userID
//   );
//   const otherUser = members[0]?.user;
//   const isOnline = otherUser?.online ?? false;
//   const memberCount = Object.keys(channel?.state?.members || {}).length;
//   const onlineCount = Object.values(channel?.state?.members || {}).filter(
//     (m) => m.user?.online
//   ).length;

//   const initials = otherUser?.name
//     ? otherUser.name.slice(0, 2).toUpperCase()
//     : "??";

//   return (
//     <div className="ss-header">
//       <div className="ss-avatar-wrap">
//         {otherUser?.image ? (
//           <img src={otherUser.image} alt={otherUser.name} className="ss-avatar-img" />
//         ) : (
//           <div className="ss-avatar">{initials}</div>
//         )}
//         <span className={`ss-presence ${isOnline ? "ss-online" : "ss-offline"}`} />
//       </div>
//       <div className="ss-header-info">
//         <span className="ss-header-name">{otherUser?.name || "Unknown"}</span>
//         <span className="ss-header-sub">
//           {isOnline
//             ? "● Online"
//             : `${memberCount} members, ${onlineCount} online`}
//         </span>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════
//    CUSTOM TYPING INDICATOR
// ═══════════════════════════════════════════════ */
// const CustomTypingIndicator = () => {
//   const { typing } = useTypingContext("CustomTypingIndicator");
//   const { client } = useChatContext("CustomTypingIndicator");

//   const typingUsers = Object.values(typing || {}).filter(
//     (t) => t.user?.id !== client.userID
//   );

//   if (!typingUsers.length) return null;

//   const name = typingUsers[0]?.user?.name || "Someone";

//   return (
//     <div className="ss-typing-row">
//       <div className="ss-typing-avatar">
//         {name.slice(0, 1).toUpperCase()}
//       </div>
//       <div className="ss-typing-bubble">
//         <span className="ss-dot" />
//         <span className="ss-dot" />
//         <span className="ss-dot" />
//       </div>
//       <span className="ss-typing-label">{name} is typing…</span>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════
//    CUSTOM MESSAGE INPUT
//    ── uses channel.sendMessage() directly so
//       there's no dependency on Stream's input
//       context (avoids the handleSubmit error)
// ═══════════════════════════════════════════════ */
// const CustomMessageInput = ({ channel }) => {
//   const inputRef = useRef(null);
//   const typingTimerRef = useRef(null);

//   const handleSend = async () => {
//     const text = inputRef.current?.value?.trim();
//     if (!text || !channel) return;
//     try {
//       await channel.sendMessage({ text });
//       inputRef.current.value = "";
//       inputRef.current.focus();
//     } catch (err) {
//       console.error("Send error:", err);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleChange = () => {
//     if (!channel) return;
//     channel.keystroke();
//     clearTimeout(typingTimerRef.current);
//     typingTimerRef.current = setTimeout(() => channel.stopTyping(), 2000);
//   };

//   return (
//     <div className="ss-input-row">
//       <button className="ss-attach-btn" aria-label="Attach" type="button">
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//           <circle cx="12" cy="12" r="10" />
//           <line x1="12" y1="8" x2="12" y2="16" />
//           <line x1="8" y1="12" x2="16" y2="12" />
//         </svg>
//       </button>
//       <input
//         ref={inputRef}
//         className="ss-msg-input"
//         placeholder="Type your message"
//         onKeyDown={handleKeyDown}
//         onChange={handleChange}
//         autoComplete="off"
//       />
//       <button className="ss-send-btn" onClick={handleSend} type="button" aria-label="Send">
//         <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
//           <path d="M3 20l18-8L3 4v6l10 2-10 2v6z" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════
//    CUSTOM MESSAGE BUBBLE
// ═══════════════════════════════════════════════ */
// const CustomMessage = () => {
//   const { message, isMyMessage } = useMessageContext("CustomMessage");

//   const isDeleted = message.type === "deleted" || !!message.deleted_at;
//   const isMine = isMyMessage();

//   const time = new Date(message.created_at).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className={`ss-msg-row ${isMine ? "ss-mine" : "ss-theirs"}`}>
//       {!isMine && (
//         <div className="ss-msg-avatar">
//           {message.user?.image ? (
//             <img
//               src={message.user.image}
//               alt={message.user.name}
//               className="ss-msg-avatar-img"
//             />
//           ) : (
//             <span>{(message.user?.name || "?").slice(0, 1).toUpperCase()}</span>
//           )}
//         </div>
//       )}
//       <div className="ss-bubble-wrap">
//         <div
//           className={[
//             "ss-bubble",
//             isMine ? "ss-bubble-mine" : "ss-bubble-theirs",
//             isDeleted ? "ss-bubble-deleted" : "",
//           ]
//             .filter(Boolean)
//             .join(" ")}
//         >
//           {isDeleted ? "This message was deleted…" : message.text}
//         </div>
//         <span className={`ss-msg-time ${isMine ? "ss-time-right" : "ss-time-left"}`}>
//           {time}
//         </span>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════
//    MAIN CHAT PAGE
// ═══════════════════════════════════════════════ */
// const ChatPage = () => {
//   const { userId: targetUserId } = useParams();
//   const { user: authUser } = useContext(AuthContext);

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (!authUser) return;
//     let client;

//     const initChat = async () => {
//       try {
//         const authToken = localStorage.getItem("token");

//         const { data } = await axios.get(
//           "http://localhost:5000/api/chat/token",
//           { headers: { Authorization: `Bearer ${authToken}` } }
//         );

//         await axios.post(
//           `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
//           {},
//           { headers: { Authorization: `Bearer ${authToken}` } }
//         );

//         client = StreamChat.getInstance(STREAM_API_KEY);

//         if (!client.userID) {
//           await client.connectUser(
//             {
//               id: authUser._id,
//               name: authUser.name,
//               image: authUser.profilePic,
//             },
//             data.token
//           );
//         }

//         const membersSorted = [
//           authUser._id.toString(),
//           targetUserId.toString(),
//         ].sort();
//         const channelId = `chat-${membersSorted[0]}-${membersSorted[1]}`;

//         const newChannel = client.channel("messaging", channelId, {
//           members: membersSorted,
//         });

//         await newChannel.watch();

//         setChatClient(client);
//         setChannel(newChannel);
//       } catch (err) {
//         console.error("Chat init error:", err.message);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();

//     return () => {
//       if (client) client.disconnectUser();
//     };
//   }, [targetUserId, authUser]);

//   if (loading) {
//     return (
//       <div className="ss-state-screen">
//         <div className="ss-spinner" />
//         <span>Loading chat…</span>
//       </div>
//     );
//   }

//   if (error || !chatClient || !channel) {
//     return (
//       <div className="ss-state-screen">
//         <span>Could not load chat. Please try again.</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{CSS}</style>
//       <div className="ss-page">
//         <div className="ss-chat-card">
//           <Chat client={chatClient} theme="messaging light">
//             <Channel
//               channel={channel}
//               TypingIndicator={CustomTypingIndicator}
//               Message={CustomMessage}
//             >
//               <Window>
//                 <CustomChannelHeader />
//                 <div className="ss-messages-wrap">
//                   <MessageList
//                     TypingIndicator={CustomTypingIndicator}
//                     Message={CustomMessage}
//                   />
//                 </div>
//                 <CustomMessageInput channel={channel} />
//               </Window>
//               <Thread />
//             </Channel>
//           </Chat>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatPage;

// /* ═══════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════ */
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');

// :root {
//   --ss-green:       #0F6E56;
//   --ss-green-dark:  #085041;
//   --ss-green-light: #e8f4ee;
//   --ss-green-faint: #edf7f2;
//   --ss-border:      rgba(15,110,86,0.13);
//   --ss-font:        'DM Sans', system-ui, sans-serif;
// }

// .ss-page *, .ss-page *::before, .ss-page *::after {
//   font-family: var(--ss-font) !important;
//   box-sizing: border-box;
// }

// /* ── Page ── */
// .ss-page {
//   min-height: 90vh;
//   background: var(--ss-green-faint);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
// }

// /* ── Card shell ── */
// .ss-chat-card {
//   width: 100%;
//   max-width: 720px;
//   height: 85vh;
//   background: #fff;
//   border-radius: 20px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 2px 24px rgba(15,110,86,0.10);
// }

// /* ── Strip ALL Stream chrome ── */
// .str-chat,
// .str-chat__container,
// .str-chat-channel,
// .str-chat__channel {
//   height: 100% !important;
//   background: transparent !important;
//   border: none !important;
//   box-shadow: none !important;
//   border-radius: 0 !important;
// }
// .str-chat__channel-header,
// .str-chat__header-livestream,
// .str-chat__input-flat,
// .str-chat__message-input,
// .str-chat__avatar,
// .str-chat__message-simple__actions,
// .str-chat__message-options,
// .str-chat__message-reactions-button {
//   display: none !important;
// }

// /* ── Message list ── */
// .ss-messages-wrap {
//   flex: 1;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   background: var(--ss-green-faint);
// }
// .str-chat__list,
// .str-chat__ul {
//   background: var(--ss-green-faint) !important;
//   padding: 12px 16px !important;
//   display: flex !important;
//   flex-direction: column !important;
//   gap: 2px !important;
// }
// .str-chat__li {
//   padding: 0 !important;
//   background: transparent !important;
//   border: none !important;
// }

// /* ── Date separator ── */
// .str-chat__date-separator {
//   font-size: 11px !important;
//   color: #8aada4 !important;
//   margin: 8px 0 !important;
// }
// .str-chat__date-separator-line {
//   border-color: var(--ss-border) !important;
// }
// .str-chat__date-separator-date {
//   font-size: 11px !important;
//   color: #8aada4 !important;
//   background: var(--ss-green-faint) !important;
//   padding: 0 8px !important;
// }

// /* ── Header ── */
// .ss-header {
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 14px 20px;
//   background: #fff;
//   border-bottom: 0.5px solid var(--ss-border);
//   flex-shrink: 0;
// }
// .ss-avatar-wrap { position: relative; flex-shrink: 0; }
// .ss-avatar {
//   width: 42px; height: 42px;
//   border-radius: 50%;
//   background: var(--ss-green);
//   color: #fff;
//   font-size: 14px; font-weight: 500;
//   display: flex; align-items: center; justify-content: center;
// }
// .ss-avatar-img {
//   width: 42px; height: 42px;
//   border-radius: 50%; object-fit: cover;
// }
// .ss-presence {
//   position: absolute; bottom: 1px; right: 1px;
//   width: 10px; height: 10px;
//   border-radius: 50%;
//   border: 2px solid #fff;
// }
// .ss-online  { background: #1D9E75; }
// .ss-offline { background: #c5d5d0; }
// .ss-header-info { display: flex; flex-direction: column; gap: 1px; }
// .ss-header-name { font-size: 14.5px; font-weight: 500; color: #1a2e28; }
// .ss-header-sub  { font-size: 12px; color: #1D9E75; }

// /* ── Message bubbles ── */
// .ss-msg-row {
//   display: flex;
//   align-items: flex-end;
//   gap: 7px;
//   max-width: 72%;
//   margin-bottom: 3px;
// }
// .ss-mine   { align-self: flex-end;   flex-direction: row-reverse; margin-left: auto; }
// .ss-theirs { align-self: flex-start; }

// .ss-msg-avatar {
//   width: 28px; height: 28px;
//   border-radius: 50%;
//   background: var(--ss-green);
//   color: #fff;
//   font-size: 11px; font-weight: 500;
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; overflow: hidden;
// }
// .ss-msg-avatar-img { width: 100%; height: 100%; object-fit: cover; }

// .ss-bubble-wrap { display: flex; flex-direction: column; gap: 3px; }

// .ss-bubble {
//   padding: 9px 14px;
//   font-size: 13.5px;
//   line-height: 1.45;
//   word-break: break-word;
//   max-width: 280px;
// }
// .ss-bubble-mine {
//   background: var(--ss-green);
//   color: #fff;
//   border-radius: 18px 18px 4px 18px;
// }
// .ss-bubble-theirs {
//   background: #fff;
//   color: #1a2e28;
//   border-radius: 18px 18px 18px 4px;
//   border: 0.5px solid var(--ss-border);
// }
// .ss-bubble-deleted {
//   background: transparent !important;
//   border: 0.5px dashed #b0cdc5 !important;
//   color: #8aada4 !important;
//   font-style: italic;
//   font-size: 12.5px !important;
//   border-radius: 10px !important;
// }
// .ss-msg-time { font-size: 10.5px; color: #8aada4; }
// .ss-time-right { text-align: right; }
// .ss-time-left  { text-align: left; padding-left: 2px; }

// /* ── Typing indicator ── */
// .ss-typing-row {
//   display: flex; align-items: center; gap: 7px;
//   padding: 5px 16px 8px;
//   background: var(--ss-green-faint);
//   animation: ss-fadein 0.2s ease;
// }
// @keyframes ss-fadein {
//   from { opacity: 0; transform: translateY(4px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// .ss-typing-avatar {
//   width: 24px; height: 24px;
//   border-radius: 50%;
//   background: var(--ss-green);
//   color: #fff;
//   font-size: 10px; font-weight: 500;
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0;
// }
// .ss-typing-bubble {
//   background: #fff;
//   border: 0.5px solid var(--ss-border);
//   border-radius: 14px 14px 14px 4px;
//   padding: 8px 12px;
//   display: flex; align-items: center; gap: 4px;
// }
// .ss-dot {
//   width: 5px; height: 5px;
//   border-radius: 50%; background: #7aada0;
//   display: inline-block;
//   animation: ss-bounce 1.2s infinite;
// }
// .ss-dot:nth-child(2) { animation-delay: 0.15s; }
// .ss-dot:nth-child(3) { animation-delay: 0.30s; }
// @keyframes ss-bounce {
//   0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
//   30%           { transform: translateY(-5px); opacity: 1;   }
// }
// .ss-typing-label { font-size: 11px; color: #7aada0; }

// /* ── Input ── */
// .ss-input-row {
//   display: flex; align-items: center; gap: 8px;
//   padding: 10px 16px;
//   background: #fff;
//   border-top: 0.5px solid var(--ss-border);
//   flex-shrink: 0;
// }
// .ss-attach-btn {
//   background: none; border: none; cursor: pointer;
//   color: #9bbdb4;
//   display: flex; align-items: center; justify-content: center;
//   padding: 6px; border-radius: 50%;
//   transition: background 0.15s, color 0.15s;
//   flex-shrink: 0;
// }
// .ss-attach-btn:hover { background: var(--ss-green-light); color: var(--ss-green); }
// .ss-msg-input {
//   flex: 1; border: none; background: transparent;
//   font-size: 13.5px !important; color: #1a2e28;
//   outline: none; line-height: 1.45; padding: 4px 0;
// }
// .ss-msg-input::placeholder { color: #b0cdc5; }
// .ss-send-btn {
//   width: 36px; height: 36px;
//   border-radius: 50%; background: var(--ss-green);
//   border: none; cursor: pointer;
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0;
//   transition: background 0.15s, transform 0.1s;
// }
// .ss-send-btn:hover  { background: var(--ss-green-dark); }
// .ss-send-btn:active { transform: scale(0.93); }

// /* ── Loading / Error ── */
// .ss-state-screen {
//   display: flex; flex-direction: column;
//   align-items: center; justify-content: center;
//   height: 100vh; gap: 16px;
//   background: var(--ss-green-faint);
//   color: #7aada0; font-size: 14px;
// }
// .ss-spinner {
//   width: 32px; height: 32px;
//   border: 2.5px solid rgba(15,110,86,0.15);
//   border-top-color: var(--ss-green);
//   border-radius: 50%;
//   animation: ss-spin 0.75s linear infinite;
// }
// @keyframes ss-spin { to { transform: rotate(360deg); } }

// /* ── Thread ── */
// .str-chat__thread {
//   background: #fff !important;
//   border-left: 0.5px solid var(--ss-border) !important;
// }
// `;

import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  Thread,
  useChannelStateContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import EmojiPicker from "emoji-picker-react";
import { AuthContext } from "../context/AuthContext";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/* =========================
   THEME
========================= */
const buildTheme = (isDark) => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --str-chat-primary-color: #1F8F7A;
  --str-chat-surface-color: transparent;
  --str-chat-text-color: ${isDark ? "#e2f4f1" : "#0f2421"};
  --str-chat-font-family: 'Inter', sans-serif;
}

.str-chat,
.str-chat__container,
.str-chat__channel,
.str-chat__main-panel {
  background: ${isDark
    ? "linear-gradient(160deg, #0d1f1c 0%, #091a17 50%, #0b1e1a 100%)"
    : "linear-gradient(160deg, #e8f8f4 0%, #d0f0e8 100%)"} !important;
  font-family: 'Inter', sans-serif !important;
}

.str-chat__list {
  background: transparent !important;
  padding: 24px 32px !important;
}

.str-chat__message--me .str-chat__message-bubble {
  background: linear-gradient(135deg, #1F8F7A, #177a67) !important;
  color: #ffffff !important;
  border-radius: 18px 18px 4px 18px !important;
  box-shadow: 0 4px 16px rgba(31,143,122,0.35) !important;
}

.str-chat__message:not(.str-chat__message--me) .str-chat__message-bubble {
  background: ${isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(255,255,255,0.85)"} !important;
  backdrop-filter: blur(12px);
  border: 1px solid ${isDark
    ? "rgba(31,143,122,0.2)"
    : "rgba(31,143,122,0.15)"} !important;
  border-radius: 18px 18px 18px 4px !important;
  color: ${isDark ? "#e2f4f1" : "#0f2421"} !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08) !important;
}

.str-chat__message-text,
.str-chat__message-text p {
  color: inherit !important;
}

.str-chat__message-data,
.str-chat__message-simple-status,
.str-chat__message-timestamp {
  color: ${isDark ? "rgba(226,244,241,0.4)" : "rgba(15,36,33,0.45)"} !important;
  font-size: 11px !important;
}

.str-chat__avatar { display: none !important; }

.str-chat__thread {
  background: ${isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)"} !important;
  backdrop-filter: blur(12px);
  border-left: 1px solid ${isDark ? "rgba(31,143,122,0.2)" : "rgba(31,143,122,0.15)"} !important;
}

.str-chat__date-separator-date {
  background: ${isDark ? "rgba(31,143,122,0.15)" : "rgba(31,143,122,0.1)"} !important;
  padding: 4px 14px !important;
  border-radius: 999px !important;
  color: ${isDark ? "#5ecfc0" : "#1F8F7A"} !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: 0.03em !important;
}

.str-chat__date-separator-line {
  background: ${isDark ? "rgba(31,143,122,0.12)" : "rgba(31,143,122,0.1)"} !important;
}

.str-chat__list::-webkit-scrollbar { width: 4px; }
.str-chat__list::-webkit-scrollbar-thumb {
  background: ${isDark ? "rgba(31,143,122,0.3)" : "rgba(31,143,122,0.2)"};
  border-radius: 10px;
}

@keyframes chatSpin  { to { transform: rotate(360deg); } }
@keyframes recBeat   { 0%,100%{transform:scale(1);} 50%{transform:scale(1.12);} }
@keyframes chatPulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
`;

/* =========================
   CUSTOM HEADER
========================= */
const CustomHeader = ({ targetUser, authUser, onBack, isDark }) => {
  const { channel } = useChannelStateContext();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!channel) return;

    const getOnlineStatus = () => {
      const members = Object.values(channel.state?.members || {});
      const targetId = targetUser?._id?.toString() || targetUser?.id?.toString();
      const member = members.find(
        (m) => (m.user_id || m.user?.id)?.toString() === targetId
      );
      return member?.user?.online === true;
    };

    setIsOnline(getOnlineStatus());

    const handlePresence = (event) => {
      const targetId = targetUser?._id?.toString() || targetUser?.id?.toString();
      if (event.user?.id?.toString() === targetId) {
        setIsOnline(event.user?.online === true);
      }
    };

    channel.on("user.presence.changed", handlePresence);
    channel.on("user.watching.start", handlePresence);
    channel.on("user.watching.stop", handlePresence);

    return () => {
      channel.off("user.presence.changed", handlePresence);
      channel.off("user.watching.start", handlePresence);
      channel.off("user.watching.stop", handlePresence);
    };
  }, [channel, targetUser]);

  const avatar = (u, fallback) => {
    const src = u?.avatar || u?.profilePic || u?.image;
    return src || `https://ui-avatars.com/api/?name=${encodeURIComponent(fallback || "U")}&background=1F8F7A&color=fff&size=128`;
  };

  const headerBg     = isDark ? "#0b1a17"              : "#ffffff";
  const headerBorder = isDark ? "rgba(31,143,122,0.2)" : "rgba(31,143,122,0.12)";
  const nameColor    = isDark ? "#e2f4f1"              : "#0f2421";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      padding: "16px 24px",
      background: headerBg,
      borderBottom: `1px solid ${headerBorder}`,
      boxShadow: isDark
        ? "0 2px 16px rgba(0,0,0,0.3)"
        : "0 2px 12px rgba(31,143,122,0.07)",
    }}>

      {/* Back */}
      <button onClick={onBack} title="Back"
        style={{
          background: "rgba(31,143,122,0.08)",
          border: "1px solid rgba(31,143,122,0.22)",
          borderRadius: "50%", width: "38px", height: "38px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0, transition: "all 0.18s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,143,122,0.18)"; e.currentTarget.style.borderColor = "#1F8F7A"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(31,143,122,0.08)"; e.currentTarget.style.borderColor = "rgba(31,143,122,0.22)"; }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="#1F8F7A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Target avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={avatar(targetUser, targetUser?.name)}
          alt={targetUser?.name}
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(targetUser?.name || "U")}&background=1F8F7A&color=fff&size=128`; }}
          style={{
            width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover",
            border: `2.5px solid ${isOnline ? "#1F8F7A" : isDark ? "rgba(255,255,255,0.1)" : "rgba(31,143,122,0.2)"}`,
            boxShadow: isOnline ? "0 0 0 3px rgba(31,143,122,0.2)" : "none",
            transition: "all 0.3s",
          }}
        />
        <span style={{
          position: "absolute", bottom: "1px", right: "1px",
          width: "12px", height: "12px",
          background: isOnline ? "#22c55e" : isDark ? "#334155" : "#cbd5e1",
          borderRadius: "50%",
          border: `2px solid ${headerBg}`,
          transition: "background 0.3s",
          boxShadow: isOnline ? "0 0 8px rgba(34,197,94,0.6)" : "none",
        }} />
      </div>

      {/* Name + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          color: nameColor, fontWeight: 800, fontSize: "16px",
          fontFamily: "'Inter', sans-serif", letterSpacing: "-0.4px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {targetUser?.name || "Chat"}
        </div>
        <div style={{
          fontSize: "12px", fontFamily: "'Inter', sans-serif", fontWeight: 600,
          display: "flex", alignItems: "center", gap: "5px", marginTop: "3px",
          color: isOnline ? "#22c55e" : isDark ? "#4a7a72" : "#94a3b8",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
            background: isOnline ? "#22c55e" : isDark ? "#334155" : "#cbd5e1",
            boxShadow: isOnline ? "0 0 6px #22c55e" : "none",
            transition: "all 0.3s",
          }} />
          {isOnline ? "Active now" : "Offline"}
        </div>
      </div>

      {/* Own avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={avatar(authUser, authUser?.name)}
          alt="You"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.name || "Me")}&background=177a67&color=fff&size=128`; }}
          style={{
            width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover",
            border: `2px solid ${isDark ? "rgba(31,143,122,0.4)" : "rgba(31,143,122,0.3)"}`,
            opacity: 0.92,
          }}
          title={`You (${authUser?.name})`}
        />
        <span style={{
          position: "absolute", bottom: "1px", right: "1px",
          width: "10px", height: "10px",
          background: "#22c55e", borderRadius: "50%",
          border: `2px solid ${headerBg}`,
          boxShadow: "0 0 6px rgba(34,197,94,0.5)",
        }} />
      </div>
    </div>
  );
};

/* =========================
   CUSTOM INPUT
========================= */
const CustomInput = ({ isDark }) => {
  const { channel } = useChannelStateContext();
  const [value, setValue]             = useState("");
  const [showEmoji, setShowEmoji]     = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sending, setSending]         = useState(false);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [stagedAudio, setStagedAudio] = useState(null);
  const [recordSecs, setRecordSecs]   = useState(0);

  const fileRef   = useRef(null);
  const recRef    = useRef(null);
  const chunksRef = useRef([]);
  const emojiRef  = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    const h = (e) => { if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (isRecording) {
      setRecordSecs(0);
      timerRef.current = setInterval(() => setRecordSecs((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSend = async () => {
    const trimmed = value.trim();
    if ((!trimmed && !stagedFiles.length && !stagedAudio) || sending) return;
    setSending(true);
    try {
      const attachments = [];
      for (const f of stagedFiles) {
        const isImg = f.file.type.startsWith("image/");
        const res   = isImg ? await channel.sendImage(f.file) : await channel.sendFile(f.file);
        attachments.push(isImg
          ? { type: "image", asset_url: res.file, image_url: res.file, title: f.file.name }
          : { type: "file",  asset_url: res.file, title: f.file.name });
      }
      if (stagedAudio) {
        const af  = new File([stagedAudio.blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
        const res = await channel.sendFile(af);
        attachments.push({ type: "audio", asset_url: res.file, title: "Voice message" });
      }
      await channel.sendMessage({
        text: trimmed || (stagedAudio ? "🎙️ Voice message" : ""),
        ...(attachments.length ? { attachments } : {}),
      });
      setValue(""); setStagedFiles([]); setStagedAudio(null);
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStagedFiles((p) => [...p, { file, previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null }]);
    e.target.value = "";
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setStagedAudio({ blob, url: URL.createObjectURL(blob) });
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start(); recRef.current = rec; setIsRecording(true);
    } catch (e) { console.error(e); }
  };

  const stopRec = () => { recRef.current?.stop(); setIsRecording(false); };

  const inputBg      = isDark ? "#091512"               : "#f0faf8";
  const inputFocusBg = isDark ? "#0f1f1c"               : "#ffffff";
  const inputBorder  = isDark ? "rgba(31,143,122,0.25)" : "rgba(31,143,122,0.22)";
  const inputColor   = isDark ? "#e2f4f1"               : "#0f2421";
  const wrapperBg    = isDark ? "#0b1a17"               : "#ffffff";
  const borderTop    = isDark ? "rgba(31,143,122,0.18)" : "rgba(31,143,122,0.1)";
  const stageBg      = isDark ? "#091512"               : "#f0faf8";
  const stageBorder  = isDark ? "rgba(31,143,122,0.15)" : "rgba(31,143,122,0.08)";

  const ghostBtn = (onClick, title, children, active = false) => (
    <button onClick={onClick} title={title} style={{
      background: active ? "rgba(31,143,122,0.18)" : "rgba(31,143,122,0.06)",
      border: `1px solid ${active ? "rgba(31,143,122,0.45)" : "rgba(31,143,122,0.18)"}`,
      borderRadius: "50%", width: "40px", height: "40px",
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, transition: "all 0.18s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,143,122,0.2)"; e.currentTarget.style.borderColor = "#1F8F7A"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = active ? "rgba(31,143,122,0.18)" : "rgba(31,143,122,0.06)"; e.currentTarget.style.borderColor = active ? "rgba(31,143,122,0.45)" : "rgba(31,143,122,0.18)"; }}
    >{children}</button>
  );

  return (
    <div style={{ background: wrapperBg, borderTop: `1px solid ${borderTop}` }}>

      {/* Emoji picker */}
      {showEmoji && (
        <div ref={emojiRef} style={{
          position: "absolute", bottom: "76px", left: "16px", zIndex: 200,
          borderRadius: "18px", overflow: "hidden",
          boxShadow: isDark ? "0 16px 50px rgba(0,0,0,0.5)" : "0 16px 50px rgba(0,0,0,0.12)",
          border: `1px solid ${isDark ? "rgba(31,143,122,0.25)" : "rgba(31,143,122,0.2)"}`,
        }}>
          <EmojiPicker
            onEmojiClick={(d) => { setValue((p) => p + d.emoji); setShowEmoji(false); }}
            height={360} width={320}
            theme={isDark ? "dark" : "light"}
            skinTonesDisabled
            searchDisabled={false}
          />
        </div>
      )}

      {/* Staged previews */}
      {(stagedFiles.length > 0 || stagedAudio) && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px",
          padding: "10px 20px 8px",
          borderBottom: `1px solid ${stageBorder}`,
          background: stageBg,
        }}>
          {stagedFiles.map((f, i) => (
            <div key={i} style={{
              position: "relative", borderRadius: "10px", overflow: "hidden",
              border: "1px solid rgba(31,143,122,0.22)",
              background: isDark ? "#132b26" : "#fff", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(31,143,122,0.08)",
            }}>
              {f.previewUrl
                ? <img src={f.previewUrl} alt="" style={{ width: "64px", height: "64px", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "64px", height: "64px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#1F8F7A", padding: "4px", textAlign: "center" }}>
                    <span style={{ fontSize: "22px" }}>📄</span>
                    <span style={{ marginTop: "2px" }}>{f.file.name.slice(0, 10)}{f.file.name.length > 10 ? "…" : ""}</span>
                  </div>
              }
              <button onClick={() => setStagedFiles((p) => p.filter((_, j) => j !== i))}
                style={{ position: "absolute", top: "3px", right: "3px", width: "16px", height: "16px", borderRadius: "50%", background: "rgba(0,0,0,0.35)", border: "none", color: "#fff", fontSize: "9px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>✕</button>
            </div>
          ))}

          {stagedAudio && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: isDark ? "#132b26" : "#fff", border: "1px solid rgba(31,143,122,0.22)", borderRadius: "10px", padding: "8px 12px", boxShadow: "0 2px 8px rgba(31,143,122,0.08)" }}>
              <span>🎙️</span>
              <audio src={stagedAudio.url} controls style={{ height: "28px", maxWidth: "200px" }} />
              <button onClick={() => setStagedAudio(null)}
                style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(31,143,122,0.15)", border: "none", color: "#1F8F7A", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
          )}
        </div>
      )}

      {/* Recording bar */}
      {isRecording && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 20px", background: "rgba(239,68,68,0.07)", borderBottom: "1px solid rgba(239,68,68,0.15)" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", animation: "chatPulse 1s infinite", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", fontFamily: "'Inter', sans-serif" }}>{fmt(recordSecs)}</span>
          <span style={{ fontSize: "12px", color: "rgba(220,38,38,0.6)", fontFamily: "'Inter', sans-serif" }}>recording — tap stop to finish</span>
        </div>
      )}

      {/* Input row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px" }}>

        {ghostBtn(() => setShowEmoji((p) => !p), "Emoji",
          <span style={{ fontSize: "18px", lineHeight: 1 }}>😊</span>, showEmoji)}

        {ghostBtn(() => fileRef.current?.click(), "Attach file",
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
              stroke="#1F8F7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <input ref={fileRef} type="file" accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
          style={{ display: "none" }} onChange={handleFileChange} />

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend(); }}
          placeholder={isRecording ? "Recording in progress…" : "Type a message…"}
          disabled={isRecording}
          style={{
            flex: 1, padding: "12px 22px",
            borderRadius: "999px",
            border: `1px solid ${inputBorder}`,
            outline: "none", fontSize: "14px", fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            color: inputColor,
            background: inputBg,
            transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
            caretColor: "#1F8F7A",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1F8F7A";
            e.target.style.boxShadow = "0 0 0 3px rgba(31,143,122,0.14)";
            e.target.style.background = inputFocusBg;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = inputBorder;
            e.target.style.boxShadow = "none";
            e.target.style.background = inputBg;
          }}
        />

        {/* Mic / Stop */}
        <button
          onClick={isRecording ? stopRec : startRec}
          title={isRecording ? "Stop recording" : "Voice message"}
          style={{
            width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
            background: isRecording
              ? "linear-gradient(135deg,#dc2626,#ef4444)"
              : "rgba(31,143,122,0.06)",
            border: isRecording ? "none" : "1px solid rgba(31,143,122,0.18)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            animation: isRecording ? "recBeat 1.2s infinite" : "none",
            boxShadow: isRecording ? "0 0 16px rgba(239,68,68,0.4)" : "none",
            transition: "all 0.2s",
          }}
        >
          {isRecording
            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="5" y="5" width="14" height="14" rx="3"/></svg>
            : <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="#1F8F7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="#1F8F7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }
        </button>

        {/* Send */}
        <button
          onClick={handleSend} disabled={sending} title="Send"
          style={{
            width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
            background: sending
              ? "rgba(31,143,122,0.25)"
              : "linear-gradient(135deg,#1F8F7A,#177a67)",
            border: "none", cursor: sending ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: sending ? "none" : "0 4px 18px rgba(31,143,122,0.4)",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(31,143,122,0.55)"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = sending ? "none" : "0 4px 18px rgba(31,143,122,0.4)"; }}
        >
          {sending
            ? <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "chatSpin 0.7s linear infinite" }} />
            : <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }
        </button>
      </div>
    </div>
  );
};

/* =========================
   CHAT INNER
========================= */
const ChatInner = ({ targetUser, authUser, onBack, isDark }) => (
  <Window>
    <CustomHeader targetUser={targetUser} authUser={authUser} onBack={onBack} isDark={isDark} />
    <MessageList />
    <CustomInput isDark={isDark} />
  </Window>
);

/* =========================
   MAIN PAGE
========================= */
const ChatPage = () => {
  const { userId: targetUserId } = useParams();
  const { user: authUser }       = useContext(AuthContext);
  const navigate                 = useNavigate();

  const [client,     setClient]     = useState(null);
  const [channel,    setChannel]    = useState(null);
  const [targetUser, setTargetUser] = useState(null);

  const [isDark, setIsDark] = useState(
    () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(dark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    observer.observe(document.body,            { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!authUser) return;
    let chatClient;

    const init = async () => {
      try {
        const tok = localStorage.getItem("token");

        const [tokenRes, profileRes] = await Promise.all([
          axios.get("http://localhost:5000/api/chat/token", {
            headers: { Authorization: `Bearer ${tok}` },
          }),
          axios.get(`http://localhost:5000/api/user/public/profile/${targetUserId}`, {
            headers: { Authorization: `Bearer ${tok}` },
          }).catch(() => null),
        ]);

        if (profileRes?.data) {
          const u = profileRes.data.user || profileRes.data;
          setTargetUser(u);
        }

        await axios.post(
          `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
          {},
          { headers: { Authorization: `Bearer ${tok}` } }
        );

        chatClient = StreamChat.getInstance(STREAM_API_KEY);

        if (!chatClient.userID) {
          await chatClient.connectUser(
            {
              id:    authUser._id,
              name:  authUser.name,
              image: authUser.avatar || authUser.profilePic || "",
            },
            tokenRes.data.token
          );
        }

        const members = [authUser._id.toString(), targetUserId.toString()].sort();
        const ch = chatClient.channel("messaging", `chat-${members[0]}-${members[1]}`, { members });
        await ch.watch();
        setClient(chatClient);
        setChannel(ch);
      } catch (err) {
        console.error("Chat error:", err);
      }
    };

    init();
    return () => { if (chatClient) chatClient.disconnectUser(); };
  }, [authUser, targetUserId]);

  if (!client || !channel) {
    return (
      <div style={{
        height: "calc(100vh - 64px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
        background: isDark ? "#091512" : "#f0faf8",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          width: "46px", height: "46px",
          border: `3px solid ${isDark ? "rgba(31,143,122,0.2)" : "rgba(31,143,122,0.15)"}`,
          borderTop: "3px solid #1F8F7A",
          borderRadius: "50%", animation: "chatSpin 0.8s linear infinite",
        }} />
        <p style={{ color: "#1F8F7A", fontWeight: 600, margin: 0, fontSize: "14px", letterSpacing: "0.04em" }}>
          Connecting…
        </p>
        <style>{`@keyframes chatSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{buildTheme(isDark)}</style>
      <div style={{
        height: "calc(100vh - 64px)",
        maxWidth: "1400px",
        width: "calc(100% - 32px)",
        margin: "0 auto",
        borderRadius: "16px",
        overflow: "hidden",
        border: isDark
          ? "1px solid rgba(31,143,122,0.3)"
          : "1px solid rgba(31,143,122,0.2)",
        boxShadow: isDark
          ? "0 0 0 1px rgba(31,143,122,0.08), 0 24px 60px rgba(0,0,0,0.5)"
          : "0 8px 40px rgba(31,143,122,0.15), 0 2px 8px rgba(0,0,0,0.04)",
        display: "flex", flexDirection: "column",
        background: isDark ? "#0d1f1c" : "#f0faf8",
        position: "relative",
      }}>
        <Chat client={client} theme="messaging light">
          <Channel channel={channel}>
            <ChatInner
              targetUser={targetUser}
              authUser={authUser}
              onBack={() => navigate(-1)}
              isDark={isDark}
            />
            <Thread />
          </Channel>
        </Chat>
      </div>
    </>
  );
};

export default ChatPage;