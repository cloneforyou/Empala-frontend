import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightBlock from './RightBlock';
import Search from './Search';
import logo from '../../../static/images/logo.svg';
import iconLogo from '../../../static/images/dashboard-icons/icon-logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div
        className={sidebarCollapsed ?
          'navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_light dashboard-header_collapsed' :
          'navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_light'
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
            className="navbar-toggler collapsed dashboard-header__toggle"
            onClick={this.props.collapseMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Search />
          <RightBlock />
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
