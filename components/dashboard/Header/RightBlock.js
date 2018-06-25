import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu';
import avatar from '../../../static/images/default-avatar-of-user.svg';

export default class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAvatarShow: false,
    };
  }


  toggleMenu = () => {
    this.setState({ menuAvatarShow: !this.state.menuAvatarShow })
  };

  closeMenu = () => {
    this.setState({ menuAvatarShow: false })
  };

  render() {
    const { userPic } = this.props;
    const { menuAvatarShow } = this.state;
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
          <li className="nav-item dropdown">
            <button
              className="nav-link user-nav__dropdown-btn"
              onClick={this.toggleMenu}
            >
              {/*<div
                className="user-nav__userPic"
                style={{ backgroundImage: `url(${this.props.userPic || avatar})` }}
                alt=""
              />*/}
              <img
                className={userPic ? 'user-nav__userPic' : "user-nav__userPic  user-nav__userPic_bordered"}
                src={userPic || avatar}
                alt="Avatar"
              />
            </button>
            <DropdownMenu
              closeMenu={this.closeMenu}
              menuAvatarShow={menuAvatarShow}
              userPic={userPic}
            />
          </li>
        </ul>
      </div>
    )
  }
}
