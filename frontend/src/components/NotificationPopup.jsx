import { useEffect, useState } from "react";

export default function NotificationPopup() {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      console.log("POPUP EVENT:", e.detail); // debug

      setPopup(e.detail);

      setTimeout(() => {
        setPopup(null);
      }, 4000);
    };

    // ✅ listen to global event (NOT socket)
    window.addEventListener("show-popup", handler);

    return () => {
      window.removeEventListener("show-popup", handler);
    };
  }, []);

  if (!popup) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div className="bg-white shadow-xl rounded-xl px-5 py-4 w-[320px] border">
        <p className="font-semibold text-gray-800">🔔 New Notification</p>
        <p className="text-sm text-gray-600 mt-1">
          {popup.message}
        </p>
      </div>
    </div>
  );
}