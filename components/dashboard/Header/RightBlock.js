import React, { Component } from 'react';
import { Link } from '../../../routes';

import DropdownMenu from './DropdownMenu';
import NotificationsPopup from './NotificationsPopup';
import NotificationsBlock from './NotificationsBlock';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import Icons from '../../../constants/Icons';
import DashboardIcon from '../DashboardIcon';


const TIMER_INTERVAL = 5 * 60 * 1000;

export default class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.audio = null;
    this.state = {
      anchorEl: null,
      notifPopUpIsOpened: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.props.checkUnreadNotifications, TIMER_INTERVAL);
    // Cached audio file of a bell ring,
    // Trick: define audio in lifecycle method for SSR
    this.audio = new Audio('../../../static/audio/bell-sound.mp3');
  }

  componentDidUpdate(prevProps) {
    if (this.props.animationAndRingOfNotifications && !prevProps.animationAndRingOfNotifications) {
      this.playAudio();
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  playAudio = () => {
     if (this.audio) {
       this.audio.play();
     }
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.props.checkUnreadNotifications, TIMER_INTERVAL);
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickNotificationsPopup = (event) => {
    event.preventDefault();
    if (!this.state.notifPopUpIsOpened) {
      event.nativeEvent.stopImmediatePropagation();
    }
    if (this.state.notifPopUpIsOpened) {
      this.props.setNotificationRead(this.props.lastNotifications.map(item => item.id));
    } else {
      this.props.dropLatestNotifications();
      this.props.getLatestNotifications();
    }
    this.setState((prevState) => ({ notifPopUpIsOpened: !prevState.notifPopUpIsOpened }));
  };

  closeNotificationsPopup = () => {
    this.setState({ notifPopUpIsOpened: false });
  };

  setMarketAsActivePage = () => {
    this.props.setActivePage('market');
    this.props.setActiveMarketPage('united states');
  };

  // setApplicationSettingsAsActivePage = () => {
  //   this.props.setActivePage('profile');
  //   this.props.changeActiveTabProfile(4);
  // };

  getBadgeColor(count) {
    if (!!count.new_actions && count.new_actions > 0) return 'red';
    if (!!count.new_notifications && count.new_notifications > 0) return 'green';
  }

  render() {
    const {
      userPic,
      loading,
      setActivePage,
      activePageDashboard,
      lastNotifications,
      muteNotifications,
      notificationsMuted,
      setNotificationRead,
      notificationsCounter,
      changeActiveTabProfile,
      animationAndRingOfNotifications,
      animationOfNotifications,
      currentColorScheme,
    } = this.props;
    const {
      menuAvatarShow,
      anchorEl,
      notifPopUpIsOpened
    } = this.state;

    return (
      <div>
        <ul className="nav user-nav align-items-center">
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link"
                 // onClick={this.setApplicationSettingsAsActivePage}
              >
                <Link
                  route="dashboard"
                  params={{page: 'profile'}}
                >
                  <DashboardIcon
                    name={Icons.iconMarker.id}
                    viewBox={Icons.iconMarker.viewBox}
                    className="user-nav__icon user-nav__icon_location background_light-gray"
                  />
                </Link>
              </a>
              <span className="tooltiptext">Account 2</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link"
                 onClick={this.setMarketAsActivePage}
              >
                {/*TODO: Color of icon change depending on the selected MARKET ACCESS*/}
                <DashboardIcon
                  name={Icons.iconMarker.id}
                  viewBox={Icons.iconMarker.viewBox}
                  className="user-nav__icon user-nav__icon_location active-link_red"
                />
              </a>
              <span className="tooltiptext">Account 1</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link" href="#">
                <DashboardIcon
                  name={Icons.iconChat.id}
                  viewBox={Icons.iconChat.viewBox}
                  className="user-nav__icon user-nav__icon_chat"
                />
              </a>
              <span className="tooltiptext">Chat</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link"
                 onClick={this.handleClickNotificationsPopup}
              >
                <DashboardIcon
                  name={Icons.iconNotification.id}
                  viewBox={Icons.iconNotification.viewBox}
                  className={`user-nav__icon user-nav__icon_notification
                  ${animationOfNotifications && 'icon-notifications_animation'}
                  ${animationAndRingOfNotifications && 'icon-notifications_animation'}`}
                />
                {
                  notificationsCounter &&
                  <div className={`notifications-badge notifications-badge_${this.getBadgeColor(notificationsCounter)}`} />
                }
              </a>
              <span className="tooltiptext">Notifications</span>
            </div>
            {notifPopUpIsOpened && (
            <NotificationsPopup
              showNotificationsPopup={notifPopUpIsOpened}
              closeNotificationsPopup={this.closeNotificationsPopup}
              setActivePage={setActivePage}
              lastNotifications={lastNotifications}
              muteNotifications={muteNotifications}
              notificationsMuted={notificationsMuted}
              setNotificationRead={setNotificationRead}
              changeActiveTabProfile={changeActiveTabProfile}
            />
            )}
            { !notifPopUpIsOpened && <NotificationsBlock /> }
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
             <span
               className={`nav-link user-nav__link ${(activePageDashboard === 'account funding' ||
               activePageDashboard === 'global portfolio') ? 'user-nav__link_active' : ''}`}
               onClick={() => setActivePage('global portfolio')}
               role='button'
             >
              <Link
                route="dashboard"
                params={{page: 'global portfolio'}}
              >
                <DashboardIcon
                  name={Icons.iconWallet.id}
                  viewBox={Icons.iconWallet.viewBox}
                  className="user-nav__icon user-nav__icon_wallet"
                />
              </Link>
            </span>
              <span className="tooltiptext">Account</span>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              className={menuAvatarShow ? "nav-link user-nav__dropdown-btn user-nav__dropdown-btn_open" : "nav-link user-nav__dropdown-btn"}
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <span className="user-nav__text-btn">me</span>
              {
                !loading &&
                <div className={userPic ?
                  'user-nav__avatar-wrap' :
                  "user-nav__avatar-wrap  user-nav__avatar-wrap_bordered"}
                >
                  <img
                    className="user-nav__userPic"
                    src={userPic || avatar}
                    alt="Avatar"
                  />
                </div>

              }
            </button>
            <DropdownMenu
              {...this.props}
              currentColorScheme={currentColorScheme}
              closeMenu={this.closeMenu}
              userPic={userPic}
              anchorEl={anchorEl}
              handleClose={this.handleClose}
            />
          </li>
        </ul>
      </div>
    )
  }
}
