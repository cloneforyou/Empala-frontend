import React, { Component } from 'react';
import avatar from '../../../static/images/avatar-user.svg';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAvatarShow: false,
    };
  }

  toggleMenu = () => {
    this.setState({ menuAvatarShow: !this.state.menuAvatarShow })
  };

  render() {

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
              className="nav-link dropdown-toggle"
              onClick={this.toggleMenu}
            >
              <img src={avatar} alt="" />
            </button>
            <div
              className={(menuAvatarShow === false) ? 'dropdown-menu dropdown-menu-right' : 'dropdown-menu dropdown-menu-right show'}
            >
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default RightBlock