import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationsCard from '../../../Header/NotificationsCard';
import { getNotifications } from '../../../../../actions/dashboard';

function mapStateToProps(state) {
  return {
    allNotifications: state.dashboard.allNotifications,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getAllNotifications: () => dispatch(getNotifications()),
  });
}

class Notifications extends Component {
  componentDidMount() {
    this.props.getAllNotifications();
  }

  render() {
    const { allNotifications } = this.props;
    return (
      <div className="notifications-container">
        <div className="notifications-container__header">
          <span className="title">Your Notifications</span>
          <span className="settings">Notification Settings</span>
        </div>
        <div className="notifications-container__cards">
          {allNotifications.map((notification, index) => (
            <NotificationsCard
              page
              complete
              key={notification.id}
              id={notification.id}
              text={notification.action}
              title={notification.title}
              timestamp={notification.date_created}
              type={notification.notification_type}
              viewed={notification.viewed}
              completed={notification.completed}
            />
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);