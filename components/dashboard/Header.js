import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../static/images/logo.png';
import iconLogo from '../../static/images/dashboard-icons/icon-logo.svg';
import avatar from '../../static/images/avatar-user.svg';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {sidebarCollapsed} = this.props;
    return (
      <div
        className={sidebarCollapsed ?
          'navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_collapsed' :
          'navbar fixed-top flex-md-nowrap p-0 dashboard-header'
        }
      >
        <a className="navbar-brand mr-0 dashboard-header__logo" href="#">
          {
            sidebarCollapsed ?
              <img src={logo} alt="" /> :
              <img src={iconLogo} alt="" />
          }
        </a>
        <div className="dashboard-header__main row justify-content-between">
          <button
            className="navbar-toggler collapsed dashboard-header__toogler"
            onClick={this.props.collapseMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="col dashboard-search">
            <button className="dashboard-search__btn">
              <i className="dashboard-search__icon" />
            </button>
            <input
              className="form-control dashboard-search__input"
              type="text"
              placeholder="Search"
            />
          </div>
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
              <a className="nav-link dropdown-toggle">
                <img src={avatar} alt="" />
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
