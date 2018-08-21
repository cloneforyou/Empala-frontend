import React, { Component } from 'react';
import { Link } from '../../../routes';
import DropdownMenu from './DropdownMenu';
import NotificationsPopup from './NotificationsPopup';
import NotificationsBlock from './NotificationsBlock';
import avatar from '../../../static/images/default-avatar-of-user.svg';

export default class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      notifPopUpIsOpened: false,
    };
  }

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
    this.setState((prevState) => ({ notifPopUpIsOpened: !prevState.notifPopUpIsOpened }));
    this.props.getLatestNotifications();
  };

  closeNotificationsPopup = () => {
    this.setState({ notifPopUpIsOpened: false });
  };

  setMarketAsActivePage = () => {
    this.props.setActivePage('market');
  };

  render() {
    const { userPic, loading, setActivePage, activePageDashboard } = this.props;
    const { menuAvatarShow, anchorEl, notifPopUpIsOpened } = this.state;
    return (
      <div>
        <ul className="nav user-nav align-items-center">
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link" href="#">
                <i className="user-nav__icon user-nav__icon_location background_light-gray"/>
              </a>
              <span className="tooltiptext">Set default now</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link" onClick={this.setMarketAsActivePage}>
                <i className={`user-nav__icon user-nav__icon_location ${(activePageDashboard === 'market') ? 'active-link_red' : '' }`} />
              </a>
              <span className="tooltiptext">Account Name</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link" href="#">
                <i className="user-nav__icon user-nav__icon_chat"/>
              </a>
              <span className="tooltiptext">Tooltip text</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-tooltipe">
              <a className="nav-link user-nav__link"
                 href="#"
                 onClick={this.handleClickNotificationsPopup}
              >
                <i className="user-nav__icon user-nav__icon_notification"/>
                {/*<div className="notifications-badge"></div>*/}
              </a>
              <span className="tooltiptext">Notifications</span>
            </div>
            <NotificationsPopup
              showNotificationsPopup={notifPopUpIsOpened}
              closeNotificationsPopup={this.closeNotificationsPopup}
              setActivePage={setActivePage}
            />
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
                <i className="user-nav__icon user-nav__icon_wallet"/>
              </Link>
            </span>
              <span className="tooltiptext">Tooltip text</span>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              className={menuAvatarShow ? "nav-link user-nav__dropdown-btn user-nav__dropdown-btn_open" : "nav-link user-nav__dropdown-btn"}
              // onClick={this.toggleMenu}
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
