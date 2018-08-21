import React, { Component } from 'react';
import { Link } from '../../../routes';
import NotificationsCard from '../Header/NotificationsCard';
import { connect } from 'react-redux';
import { muteNotifications, setNotificationRead } from '../../../actions/dashboard';


class NotificationsPopup extends Component {
  constructor(props) {
    super(props);
    this.handleMute = this.handleMute.bind(this);
    this.handleReadAll = this.handleReadAll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handldeClickOutsideBackground);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handldeClickOutsideBackground);
  }

  handldeClickOutsideBackground = event => {
    if (this.props.showNotificationsPopup && !this.notificationsPopup.contains(event.target)) {
      this.props.closeNotificationsPopup();
    }
    this.props.setNotificationRead(this.props.lastNotifications);
  };

  handleReadAll(e) {
    e.preventDefault();
    this.props.setNotificationRead();
  }

  handleMute(e) {
    e.preventDefault();
    this.props.muteNotifications();
  }

  filterNotifications(list, viewed) {
    if (!list) return [];
    return list.filter(item => item.viewed === viewed);
  }

  render() {
    const {
      showNotificationsPopup: isOpened,
      notificationsMuted,
      lastNotifications,
    } = this.props;
    return (
      <div className={`notifications-popup ${isOpened && 'd-block'}`}
           ref={node => this.notificationsPopup = node}
      >
        <div className="notifications-popup__notifications">
          <span className="green fw-600">Notifications</span>
          <div className="notifications-links">
            <a href="#"
               role="button"
               onClick={this.handleReadAll}
            >Mark All as Read</a>
            <a href="#"
               role="button"
               onClick={this.handleMute}
            >{`${!notificationsMuted ? 'Mute' : 'Unmute'}`}</a>
            <a href="#">Settings</a>
          </div>
        </div>
        <div className="notifications-popup__news">
          <span className="green fw-600">News</span>
        </div>
        {lastNotifications.length > 0 ?
          this.filterNotifications(lastNotifications, false).map(notification =>
            <NotificationsCard
              popup
              key={notification.id}
              text={notification.action}
              title={notification.title}
              timestamp={notification.date_created}
              type={notification.notification_type}
            />)
          : <div className="horizontal-align_center py-2">
            You have no notifications
          </div>
        }
        <div className="notifications-popup__earlier">
          <span className="green fw-600">Earlier</span>
          {this.filterNotifications(lastNotifications, true).map(notification =>
          <NotificationsCard
            popup
            key={notification.id}
            text={notification.action}
            title={notification.title}
            timestamp={notification.date_created}
            type={notification.notification_type}
          />)}
        </div>
        {/*<div className="notifications-popup__cards">*/}
          {/*<NotificationsCard popup />*/}
        {/*</div>*/}
        <div className="notifications-popup__see-all">
          <a href="#" onClick={() => setActivePage('global notifications')}>
            <Link
              route="dashboard"
              params={{page: 'global notifications'}}
            >
              <span>See all</span>
            </Link>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationsMuted: state.dashboard.notificationsMuted,
  lastNotifications: state.dashboard.lastNotifications,
});
const mapDispatchToProps = dispatch => ({
  setNotificationRead: (id) => dispatch(setNotificationRead(id)),
  muteNotifications: () => dispatch(muteNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPopup);