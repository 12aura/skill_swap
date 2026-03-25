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



import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { AuthContext } from "../context/AuthContext";
import socket from "../socket"; // ✅ import your existing socket

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { userId: targetUserId } = useParams();
  const { user: authUser }       = useContext(AuthContext);

  const [chatClient, setChatClient] = useState(null);
  const [channel,    setChannel]    = useState(null);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    if (!authUser) return;

    let client;

    const initChat = async () => {
      try {
        const authToken = localStorage.getItem("token");

        // 1. Get token for logged-in user
        const { data } = await axios.get(
          "http://localhost:5000/api/chat/token",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        // 2. Upsert the target user so they exist in Stream
        await axios.post(
          `http://localhost:5000/api/chat/upsert-user/${targetUserId}`,
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        client = StreamChat.getInstance(STREAM_API_KEY);

        if (!client.userID) {
          await client.connectUser(
            { id: authUser._id, name: authUser.name, image: authUser.profilePic },
            data.token
          );
        }

        const membersSorted = [authUser._id.toString(), targetUserId.toString()].sort();
        const channelId     = `chat-${membersSorted[0]}-${membersSorted[1]}`;

        const newChannel = client.channel("messaging", channelId, {
          members: membersSorted,
        });

        await newChannel.watch();

        // ✅ Listen for new messages on this channel
        // When the CURRENT user sends a message, notify the TARGET user
        newChannel.on("message.new", (event) => {
          const senderId = event.user?.id;

          // Only emit if the current user sent the message (not when receiving)
          if (senderId !== authUser._id.toString()) return;

          // Tell backend to notify the receiver via socket
          socket.emit("notify_message", {
            senderId:    authUser._id,
            senderName:  authUser.name,
            receiverId:  targetUserId,
          });
        });

        setChatClient(client);
        setChannel(newChannel);
      } catch (error) {
        console.error("Chat init error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [targetUserId, authUser]);

  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
  if (!chatClient || !channel)
    return <div className="flex items-center justify-center h-screen">Could not load chat.</div>;

  return (
    <div style={{ height: "90vh" }}>
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;