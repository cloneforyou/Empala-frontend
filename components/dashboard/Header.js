import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../../assets/img/logo.png';
import * as dashboardActions from '../../actions/dashboard'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarCollapsed: props.sidebarCollapsed
    }
  }

  collapseMenu = () => {
    const { sidebarCollapsed } = this.state
    this.setState({ sidebarCollapsed: !sidebarCollapsed })
    this.props.collapseSidebar(sidebarCollapsed)
  }


  render() {
    return (
      <div className="navbar fixed-top flex-md-nowrap p-0 dashboard-header">
        <a className="navbar-brand mr-0 dashboard-header__logo" href="#">
          <img src={logo} alt=""/>
        </a>
        <div className='dashboard-header__main row'>
          <button
            className="navbar-toggler collapsed dashboard-header__toogler"
            onClick={this.collapseMenu}
          >
            <span className="navbar-toggler-icon"/>
          </button>
          <input className="form-control col-6" type="text" placeholder="Search" aria-label="Search"/>
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
  return {
    sidebarCollapsed: state.dashboard.sidebarCollapsed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collapseSidebar: (bool) => dispatch(dashboardActions.collapseSidebar(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
