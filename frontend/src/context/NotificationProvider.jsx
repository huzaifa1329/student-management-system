import { useState } from "react";
import { NotificationContext } from "./NotificationContext";

const STORAGE_KEY = "notifications";

function getInitialNotifications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(
    getInitialNotifications
  );

  const addNotification = (message, type = "info") => {
    const notification = {
      id: Date.now(),
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setNotifications((previous) => {
      const updated = [notification, ...previous];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((previous) => {
      const updated = previous.map((notification) => ({
        ...notification,
        read: true,
      }));

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);

    localStorage.removeItem(STORAGE_KEY);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}