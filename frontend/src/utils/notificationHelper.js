// src/utils/notificationHelper.js

export function triggerNotification({ type, title, message }) {
  window.dispatchEvent(
    new CustomEvent("skillswap:notification", {
      detail: { type, title, message },
    })
  );
}