import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../../static/images/logo.png';
import iconLogo from '../../static/images/dashboard-icons/icon-logo.svg';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {sidebarCollapsed} = this.props
    return (
      <div
        className={sidebarCollapsed ? "navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_collapsed" : "navbar fixed-top flex-md-nowrap p-0 dashboard-header"}>
        <a className="navbar-brand mr-0 dashboard-header__logo" href="#">
          {
            sidebarCollapsed ?
              <img src={logo} alt="" /> :
              <img src={iconLogo} alt="" />
          }
        </a>
        <div className='dashboard-header__main row'>
          <button
            className="navbar-toggler collapsed dashboard-header__toogler"
            onClick={this.props.collapseMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <input className="form-control col-6" type="text" placeholder="Search" aria-label="Search" />
          <ul className="navbar-nav px-3 col-4">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
