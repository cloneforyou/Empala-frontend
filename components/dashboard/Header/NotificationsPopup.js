import React, { Component } from 'react';
import { Link } from '../../../routes';
import NotificationsCard from '../Header/NotificationsCard';


class NotificationsPopup extends Component {
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
  };

  render() {
    const { showNotificationsPopup: isOpened, setActivePage } = this.props;
    return (
      <div className={`notifications-popup ${isOpened && 'd-block'}`}
           ref={node => this.notificationsPopup = node}
      >
        <div className="notifications-popup__notifications">
          <span className="green fw-600">Notifications</span>
          <div className="notifications-links">
            <a href="#">Mark All as Read</a>
            <a href="#">Mute</a>
            <a href="#">Settings</a>
          </div>
        </div>
        <div className="notifications-popup__news">
          <span className="green fw-600">News</span>
        </div>
        <div className="horizontal-align_center py-2">
          You have no notifications
        </div>
        <div className="notifications-popup__earlier">
          <span className="green fw-600">Earlier</span>
        </div>
        <div className="notifications-popup__cards">
          <NotificationsCard popup={true} />
        </div>
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


export default NotificationsPopup;