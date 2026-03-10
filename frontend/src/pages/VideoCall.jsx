import {
  StreamVideo,
  StreamCall,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { StreamVideoClient } from "@stream-io/video-client";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EMOJIS = ["👍", "❤️", "😂", "😮", "👏", "🎉", "🔥", "😢"];

// ─── Floating Emoji ───────────────────────────────────────
function FloatingEmoji({ emoji, id, sender, onDone }) {
  const left = useRef(`${30 + Math.random() * 40}%`);
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 2800);
    return () => clearTimeout(t);
  }, [id, onDone]);

  return (
    <div
      className="fixed pointer-events-none z-50 flex flex-col items-center select-none"
      style={{ left: left.current, bottom: "120px", animation: "floatUp 2.8s ease-out forwards" }}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-xs text-white/70 bg-black/40 px-2 py-0.5 rounded-full mt-1">{sender}</span>
    </div>
  );
}

// ─── Control Button ───────────────────────────────────────
function CtrlBtn({ onClick, active, danger, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center w-12 h-12 rounded-2xl
        transition-all duration-200 hover:scale-110 active:scale-95
        ${danger
          ? "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/40"
          : active
            ? "bg-teal-500/80 text-white hover:bg-teal-500"
            : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}

// ─── Custom Controls ──────────────────────────────────────
function CustomControls({ onLeave, chatOpen, onToggleChat, onSendEmoji, unreadCount }) {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useScreenShareState } = useCallStateHooks();
  const { isMute: micMuted }     = useMicrophoneState();
  const { isMute: camOff }       = useCameraState();
  const { status: screenStatus } = useScreenShareState();
  const isSharing = screenStatus === "enabled";
  const [showEmojis, setShowEmojis] = useState(false);
  const [screenError, setScreenError] = useState(null);

  const toggleMic = async () => {
    try { micMuted ? await call.microphone.enable() : await call.microphone.disable(); }
    catch (e) { console.error("Mic error:", e); }
  };
  const toggleCam = async () => {
    try { camOff ? await call.camera.enable() : await call.camera.disable(); }
    catch (e) { console.error("Cam error:", e); }
  };
  const toggleScreen = async () => {
    setScreenError(null);
    try { isSharing ? await call.screenShare.disable() : await call.screenShare.enable(); }
    catch (e) { if (e.name !== "NotAllowedError") setScreenError("Screen share failed. Please try again."); }
  };

  return (
    <div className="flex flex-col items-center bg-gray-950/95 backdrop-blur-xl border-t border-white/5">
      {isSharing && (
        <div className="flex items-center gap-2 py-1.5 px-4 w-full justify-center bg-teal-500/10 border-b border-teal-500/20">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-teal-400 text-xs font-medium">You are sharing your screen</span>
        </div>
      )}
      {screenError && <p className="text-xs text-red-400 py-1 animate-pulse">{screenError}</p>}
      <div className="flex items-center justify-center gap-3 px-6 py-4">

        <CtrlBtn onClick={toggleMic} active={!micMuted} title={micMuted ? "Unmute" : "Mute"}>
          {micMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </CtrlBtn>

        <CtrlBtn onClick={toggleCam} active={!camOff} title={camOff ? "Start Camera" : "Stop Camera"}>
          {camOff ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </CtrlBtn>

        <CtrlBtn onClick={toggleScreen} active={isSharing} title={isSharing ? "Stop Sharing" : "Share Screen"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </CtrlBtn>

        <div className="relative">
          <CtrlBtn onClick={() => setShowEmojis(v => !v)} active={showEmojis} title="Reactions">
            <span className="text-xl">😊</span>
          </CtrlBtn>
          {showEmojis && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 border border-white/10 rounded-2xl p-3 grid grid-cols-4 gap-2 shadow-2xl z-50 min-w-max">
              {EMOJIS.map(e => (
                <button key={e} onClick={() => { onSendEmoji(e); setShowEmojis(false); }}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 hover:scale-125 transition-all">
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <CtrlBtn onClick={onToggleChat} active={chatOpen} title="Chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </CtrlBtn>
          {unreadCount > 0 && !chatOpen && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-bounce shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <div className="w-px h-8 bg-white/10 mx-1" />

        <CtrlBtn onClick={onLeave} danger title="Leave Call">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </CtrlBtn>
      </div>
    </div>
  );
}

// ─── In-Call Chat ─────────────────────────────────────────
function InCallChat({ messages, onSend }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex flex-col w-72 h-full bg-gray-950/98 border-l border-white/5 shrink-0">
      <div className="px-4 py-3 border-b border-white/5">
        <h3 className="text-white font-semibold text-sm">In-Call Chat</h3>
        <p className="text-white/40 text-xs">{messages.length} messages</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-white/30 text-center gap-2 mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Say something!</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.self ? "items-end" : "items-start"}`}>
            <span className="text-white/40 text-xs mb-1">{msg.sender}</span>
            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] break-words leading-relaxed
              ${msg.self ? "bg-teal-500 text-white rounded-br-sm" : "bg-white/10 text-white rounded-bl-sm"}`}>
              {msg.text}
            </div>
            <span className="text-white/25 text-xs mt-1">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="px-3 pb-4 pt-2 border-t border-white/5">
        <div className="flex gap-2 items-center">
          <input type="text" value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Type a message..."
            className="flex-1 bg-white/10 text-white text-sm rounded-xl px-3 py-2 placeholder-white/30 outline-none focus:bg-white/15 transition border border-white/5 focus:border-teal-500/50"
          />
          <button onClick={handleSend} disabled={!text.trim()}
            className="w-9 h-9 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition hover:scale-105 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── VideoCallInner ───────────────────────────────────────
// ✅ Accepts onEndCall so it can emit socket event before leaving
function VideoCallInner({ onLeave, onEndCall, userName, roomId }) {
  const [chatOpen,       setChatOpen]       = useState(false);
  const [messages,       setMessages]       = useState([]);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [unreadCount,    setUnreadCount]    = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:5000", { reconnection: true });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id, "| joining room:", roomId);
      socket.emit("join-room", roomId);
    });

    socket.on("call-message", (data) => {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(prev => [...prev, {
        text:   data.text,
        sender: data.sender,
        time:   data.time || time,
        self:   false,
      }]);
      setChatOpen(open => {
        if (!open) setUnreadCount(c => c + 1);
        return open;
      });
    });

    socket.on("call-emoji", (data) => {
      setFloatingEmojis(prev => [
        ...prev,
        { emoji: data.emoji, sender: data.sender, id: Date.now() + Math.random() },
      ]);
    });

    // ✅ Other user left — call onLeave (no need to emit again, just navigate)
    socket.on("call-ended", () => {
      console.log("📵 Other user ended the call — leaving");
      onLeave(); // just navigate away, DB already updated by other user
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // ✅ Called when THIS user clicks Leave button
  // Emits call-ended to other user FIRST, then calls onEndCall for DB + navigate
  const handleLeave = useCallback(() => {
    const s = socketRef.current;
    if (s?.connected) {
      console.log("📤 Emitting call-ended to room:", roomId);
      s.emit("call-ended", { roomId }); // ✅ notify other user instantly
    }
    onEndCall(); // ✅ update DB + navigate
  }, [roomId, onEndCall]);

  const sendMessage = useCallback((text) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { text, sender: userName, time, self: true }]);
    const s = socketRef.current;
    if (s?.connected) {
      s.emit("call-message", { roomId, text, sender: userName, time });
    }
  }, [userName, roomId]);

  const sendEmoji = useCallback((emoji) => {
    setFloatingEmojis(prev => [
      ...prev,
      { emoji, sender: "You", id: Date.now() + Math.random() },
    ]);
    const s = socketRef.current;
    if (s?.connected) {
      s.emit("call-emoji", { roomId, emoji, sender: userName });
    }
  }, [userName, roomId]);

  const removeEmoji = useCallback((id) => {
    setFloatingEmojis(prev => prev.filter(e => e.id !== id));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      {floatingEmojis.map(({ emoji, id, sender }) => (
        <FloatingEmoji key={id} emoji={emoji} id={id} sender={sender} onDone={removeEmoji} />
      ))}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative overflow-hidden" style={{ imageRendering: "crisp-edges" }}>
          <SpeakerLayout screenshareLayout="spotlight" />
        </div>
        {chatOpen && <InCallChat messages={messages} onSend={sendMessage} />}
      </div>

      {/* ✅ onLeave now points to handleLeave which emits socket THEN calls DB */}
      <CustomControls
        onLeave={handleLeave}
        chatOpen={chatOpen}
        onToggleChat={() => { setChatOpen(v => !v); setUnreadCount(0); }}
        onSendEmoji={sendEmoji}
        unreadCount={unreadCount}
      />

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0)      scale(1);   opacity: 1; }
          70%  { transform: translateY(-180px) scale(1.4); opacity: 0.9; }
          100% { transform: translateY(-260px) scale(0.8); opacity: 0; }
        }
        .str-video__screen-share-track video,
        .str-video__participant-view video,
        .str-video__video-placeholder video,
        video {
          filter: none !important;
          backdrop-filter: none !important;
          -webkit-filter: none !important;
          image-rendering: crisp-edges !important;
          image-rendering: -webkit-optimize-contrast !important;
          object-fit: contain !important;
        }
        .str-video__screen-share-track,
        .str-video__screen-share-overlay {
          filter: none !important;
          backdrop-filter: none !important;
          background: #000 !important;
        }
        .str-video__participant-view,
        .str-video__speaker-layout__spotlight,
        .str-video__speaker-layout {
          filter: none !important;
          backdrop-filter: none !important;
        }
        .str-video__speaker-layout__spotlight video {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
          filter: none !important;
          image-rendering: crisp-edges !important;
        }
      `}</style>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────
function VideoCall() {
  const { roomId } = useParams();
  const navigate   = useNavigate();
  const { user }   = useContext(AuthContext);

  const [client, setClient] = useState(null);
  const [call,   setCall]   = useState(null);
  const callRef      = useRef(null);
  const clientRef    = useRef(null);
  const hasLeftRef   = useRef(false);

  useEffect(() => {
    if (!user) return;
    hasLeftRef.current = false;

    const initVideo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/video/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        });
        const data = await res.json();

        const videoClient = new StreamVideoClient({
          apiKey: import.meta.env.VITE_STREAM_API_KEY,
          user: { id: user._id, name: user.name || "User" },
          token: data.token,
        });

        const videoCall = videoClient.call("default", roomId);
        await videoCall.join({ create: true });
        await videoCall.camera.enable();
        await videoCall.microphone.enable({
          constraints: {
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          },
        });

        callRef.current   = videoCall;
        clientRef.current = videoClient;
        setClient(videoClient);
        setCall(videoCall);
      } catch (err) {
        console.error("Video init error:", err);
      }
    };

    initVideo();

    return () => {
      if (!hasLeftRef.current) {
        hasLeftRef.current = true;
        callRef.current?.leave().catch(() => {});
        clientRef.current?.disconnectUser().catch(() => {});
      }
    };
  }, [roomId, user]);

  // ✅ Called by handleLeave in VideoCallInner after socket emit
  // Updates DB + leaves Stream + navigates
  const endCall = async () => {
    if (hasLeftRef.current) return;
    hasLeftRef.current = true;

    try {
      // Mark session completed in DB — other user's Sessions.jsx polling picks it up
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/sessions/complete-by-room/${roomId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to complete session:", err);
    }

    try {
      await callRef.current?.leave();
      await clientRef.current?.disconnectUser();
    } catch (e) {
      // already left
    }

    navigate("/sessions");
  };

  // ✅ Called when OTHER user ends call (received via socket)
  // Just leave Stream + navigate — no need to update DB again
  const leaveCall = async () => {
    if (hasLeftRef.current) return;
    hasLeftRef.current = true;

    try {
      await callRef.current?.leave();
      await clientRef.current?.disconnectUser();
    } catch (e) {
      // already left
    }

    navigate("/sessions");
  };

  if (!client || !call) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-950 gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm tracking-wide">Joining call...</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoCallInner
          onLeave={leaveCall}   // ✅ used when OTHER user ends call
          onEndCall={endCall}   // ✅ used when THIS user clicks Leave button
          userName={user?.name || "You"}
          roomId={roomId}
        />
      </StreamCall>
    </StreamVideo>
  );
}

export default VideoCall;