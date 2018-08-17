import React, { Component } from 'react';
import NotificationsCard from '../Header/NotificationsCard';


class GlobalNotifications extends Component {
  render() {
    return (
      <div className="notifications-container">
        <div className="notifications-container__header">
          <span className="title">Your Notifications</span>
          <span className="settings">Notification Settings</span>
        </div>
        <div className="notifications-container__cards">
          <NotificationsCard page={true} />
        </div>
      </div>
    );
  }
}

export default GlobalNotifications;