import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import { Link } from '../../../routes';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { userPic, loading, setActivePage, activePageDashboard } = this.props;
    const { menuAvatarShow, anchorEl } = this.state;
    return (
      <div>
        <ul className="nav user-nav align-items-center">
          <li className="nav-item">
            <a className="nav-link user-nav__link" href="#">
              <i className="user-nav__icon user-nav__icon_chat" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link user-nav__link" href="#">
              <i className="user-nav__icon user-nav__icon_notification" />
            </a>
          </li>
          <li className="nav-item">
             <span
               className={`nav-link user-nav__link (${activePageDashboard === 'account funding' ||
               ${activePageDashboard === 'global portfolio') ? 'user-nav__link_active' : ''}`}
               onClick={() => setActivePage('global portfolio')}
               role='button'
             >
              <Link
                route="dashboard"
                params={{ page: 'global portfolio' }}
              >
                <i className="user-nav__icon user-nav__icon_wallet" />
              </Link>
            </span>
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
