import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNotifications } from "../context/useNotifications";

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAllAsRead, clearNotifications, } = useNotifications();

  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2>Student Management System</h2>
      </div>

      <div className="navbar-right">
      <div className="notification-wrapper">

  <button
    className="notification-btn"
    onClick={() => {
      setShowNotifications((previous) => !previous);

      if (unreadCount > 0) {
        markAllAsRead();
      }
    }}
  >
    <FaBell />

    {unreadCount > 0 && (
      <span className="notification-badge">
        {unreadCount}
      </span>
    )}
  </button>

  {showNotifications && (
    <div className="notification-dropdown">

      <div className="notification-header">
        <h3>Notifications</h3>

        {notifications.length > 0 && (
          <button onClick={clearNotifications}>
            Clear
          </button>
        )}
      </div>

      <div className="notification-list">

        {notifications.length === 0 ? (

          <div className="no-notifications">
            <span>🔔</span>
            <p>No new notifications found</p>
          </div>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification.id}
              className="notification-item"
            >
              <p>{notification.message}</p>

              <small>
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </small>
            </div>

          ))

        )}

      </div>

    </div>
  )}

</div>

        <div className="admin-profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
