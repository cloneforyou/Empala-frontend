import React, { Component } from 'react';


class GlobalNotifications extends Component {
  render() {
    return (
      <div className="notifications-container">
        <div className="notifications-container__header">
          <span className="title">Your Notifications</span>
          <span className="settings">Notification Settings</span>
        </div>
        <div className="notifications-container__cards">
          <div className="notifications-card">
              <div className="notifications-card__img">
                <span className="img-border background-green"></span>
                <img src="" alt="" className="image background-gray" />
              </div>
              <div className="notifications-card__message">
                <p className="message-title">PEGA Earnings Announcement</p>
                <p className="message-text">PEGA announced quarterly of $0.00 per share, missing expectations by $0.21</p>
                <p className="message-date">8 hours ago</p>
              </div>
                <i className="icon-dots" />
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalNotifications;