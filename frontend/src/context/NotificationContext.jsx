import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts,      setToasts]      = useState([]);
  const socketRef                      = useRef(null);
  const token                          = localStorage.getItem("token");

  /* ── get userId from JWT ── */
  const getUserId = () => {
    try { return JSON.parse(atob(token.split(".")[1])).id; }
    catch { return null; }
  };

  /* ── fetch initial unread count ── */
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setUnreadCount(data.filter(n => !n.read).length))
      .catch(console.error);
  }, [token]);

  /* ── socket ── */
  useEffect(() => {
    if (!token) return;
    const userId = getUserId();
    if (!userId) return;

    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      // Must match server: socket.join(userId) — no "user_" prefix
      socket.emit("join", userId);
    });

    socket.on("new_notification", (data) => {
      // Show toast popup
      setToasts(prev => [...prev, { ...data, toastId: Date.now() + Math.random() }]);
      // Bump bell count
      setUnreadCount(prev => prev + 1);
    });

    return () => socket.disconnect();
  }, [token]);

  const dismissToast   = useCallback((id) => setToasts(p => p.filter(t => t.toastId !== id)), []);
  const clearUnread    = useCallback(() => setUnreadCount(0), []);

  return (
    <NotificationContext.Provider value={{ unreadCount, clearUnread, toasts, dismissToast }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);