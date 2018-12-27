import React, { Component } from 'react';
import { Link } from '../../../routes';
import NotificationsCard from '../Header/NotificationsCard';


class NotificationsPopup extends Component {
  constructor(props) {
    super(props);
    this.handleMute = this.handleMute.bind(this);
    this.handleReadAll = this.handleReadAll.bind(this);
    this.handleClickOnSeeAll = this.handleClickOnSeeAll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideBackground);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideBackground);
  }

  handleClickOutsideBackground = event => {
    if (this.props.showNotificationsPopup && !this.notificationsPopup.contains(event.target)) {
      this.props.closeNotificationsPopup();
      this.props.setNotificationRead(this.props.lastNotifications.map(item => item.id));
    }
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

  handleClickOnSeeAll() {
    this.props.setActivePage('profile');
    this.props.changeActiveTabProfile(5);
    this.props.closeNotificationsPopup();
  }

  render() {
    const {
      notificationsMuted,
      lastNotifications,
    } = this.props;
    return (
      <div className="notifications-popup notifications-popup_dark"
           ref={node => this.notificationsPopup = node}
      >
        <div className="notifications-popup__notifications notifications-popup_dark">
          <span className="green fw-600">Notifications</span>
          <div className="notifications-links">
            <a href="#"
               role="button"
               onClick={this.handleReadAll}
            >
              Mark All as Read
            </a>
            <a href="#"
               role="button"
               onClick={this.handleMute}
            >
              {`${!notificationsMuted ? 'Mute' : 'Unmute'}`}
            </a>
            <a href="#">
              Settings
            </a>
          </div>
        </div>
        <div className="notifications-popup__news">
          <span className="green fw-600">New</span>
        </div>
        {this.filterNotifications(lastNotifications, false).length > 0 ?
          this.filterNotifications(lastNotifications, false).map(notification =>
            <NotificationsCard
              popup
              cardMenu
              key={notification.id}
              id={notification.id}
              text={notification.action}
              title={notification.title}
              timestamp={notification.date_created}
              type={notification.notification_type}
              viewed={notification.viewed}
              completed={notification.completed}
            />)
          : <div className="horizontal-align_center py-2">
            You have no new notifications
          </div>
        }
        <div className="notifications-popup__earlier">
          <span className="green fw-600">Earlier</span>
        </div>
        {this.filterNotifications(lastNotifications, true).map(notification =>
          <NotificationsCard
            popup
            cardMenu
            key={notification.id}
            id={notification.id}
            text={notification.action}
            title={notification.title}
            timestamp={notification.date_created}
            type={notification.notification_type}
            viewed={notification.viewed}
            completed={notification.completed}
          />)}
        <div className="notifications-popup__see-all">
          <a href="#"
             role="button"
             onClick={this.handleClickOnSeeAll}>
            <Link
              route="dashboard"
              params={{page: 'profile'}}
            >
              <span>See all</span>
            </Link>
          </a>
        </div>
      </div>
    );
  }
}

export default NotificationsPopup;