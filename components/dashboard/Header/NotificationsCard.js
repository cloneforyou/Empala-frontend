import React, { Component } from "react";

class NotificationsCard extends Component {
  render() {
    return (
      <div className="notifications-card">
        <div className="notifications-card__img">
          <span className="img-border background-border_green" />
          <i className="image" />
        </div>
        <div className={`notifications-card__message ${this.props.page ? 'fs-15' : 'fs-12'}`}>
          <div>
            <p className="message-title">PEGA Earnings Announcement</p>
            <p className="message-text">PEGA announced quarterly of $0.00 per share, missing expectations by $0.21</p>
          </div>
          <p className={`message-date ${this.props.popup && 'horizontal-align_end'}`}>8 hours ago</p>
        </div>
        {this.props.page && (<i className="icon-dots" />)}
      </div>
    );
  }
}

export default NotificationsCard;