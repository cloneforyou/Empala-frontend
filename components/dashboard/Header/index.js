import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightBlock from './RightBlock';
import Search from './Search';
import logo from '../../../static/images/logo.svg';
import iconLogo from '../../../static/images/dashboard-icons/icon-logo.svg';
import { setActivePage } from '../../../actions/dashboard';


class Header extends Component {
  render() {
    const {
      sidebarCollapsed,
      userPic,
      memberFullName,
      memberNumber,
      currentColorScheme,
      loading
    } = this.props;
    return (
      <div
        className={sidebarCollapsed ?
          `navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_${currentColorScheme} dashboard-header_collapsed` :
          `navbar fixed-top flex-md-nowrap p-0 dashboard-header dashboard-header_${currentColorScheme}`
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
          <RightBlock
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const fullNameFields = [
    'basic_information_prefix',
    'basic_information_first_name',
    'basic_information_last_name',
  ];
  const getFullName = (fields, userData) => {
    let fullName = '';
    fields.forEach((el, index) => {
      if (userData[el]) {
        fullName += userData[el];
        if (index < fields.length - 1) {
          fullName += ' ';
        }
      }
    });
    return fullName;
  };
  return {
    loading: state.dashboard.loading,
    userPic: state.profile.profileUserData.account_avatar,
    memberNumber: state.profile.profileUserData.account_information_account_number,
    memberFullName: getFullName(fullNameFields, state.profile.profileUserData),
    currentColorScheme: state.dashboard.currentColorScheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {setActivePage: (name) => dispatch(setActivePage(name))};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
