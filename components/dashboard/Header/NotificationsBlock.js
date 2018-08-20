import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationsCard from '../Header/NotificationsCard';
import { dropNotification } from '../../../actions/dashboard';


class NotificationsBlock extends Component {

  render() {
    const { notificationsList } = this.props;
    return (
      <div className="notifications-block notifications-block_position">
        { notificationsList.map((notification, index) =>
          (
            <div
              key={notification.id}
              onClick={() => this.props.dropNotification(index)}
            >
              <NotificationsCard
            popup
            text={notification.action}
            title={notification.title}
            timestamp={notification.date_created}
            type={notification.notification_type}
          />
            </div>)) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationsList: state.dashboard.notifications,
});
const mapDispatchToProps = dispatch => ({
  dropNotification: (index) => dispatch(dropNotification(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBlock);
