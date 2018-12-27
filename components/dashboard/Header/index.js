import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RightBlock from './RightBlock';
import Search from './Search';
import logo from '../../../static/images/logo.svg';
import iconLogo from '../../../static/images/dashboard-icons/icon-logo.svg';
import {
  getNotifications,
  muteNotifications,
  setActivePage,
  setNotificationRead,
  checkUnreadNotifications,
  dropLatestNotifications,
  setActiveMarketPage,
} from '../../../actions/dashboard';
import { changeActiveTabProfile } from '../../../actions/profile';
import Icons from '../../../constants/Icons';
import DashboardIcon from '../DashboardIcon';


const propTypes = {
  sidebarCollapsed: PropTypes.bool.isRequired,
  currentColorScheme: PropTypes.string.isRequired,
  collapseMenu: PropTypes.func.isRequired,
};

const Header = ({
  sidebarCollapsed, currentColorScheme, collapseMenu, ...props
}) => (
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
        onClick={collapseMenu}
      >
        <span>
          <DashboardIcon
            name={Icons.iconHumburger.id}
            viewBox={Icons.iconHumburger.viewBox}
          />
        </span>
      </button>
      <Search />
      <RightBlock
        {...props}
        currentColorScheme={currentColorScheme}
      />
    </div>
  </div>
);

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
    activePageDashboard: state.dashboard.activePageDashboard,
    notificationsMuted: state.dashboard.notificationsMuted ||
      state.dashboard.appSettings.notifications_mute,
    lastNotifications: state.dashboard.lastNotifications,
    notificationsCounter: state.dashboard.notificationsCounter,
    animationAndRingOfNotifications: state.dashboard.animationAndRingOfNotifications,
    animationOfNotifications: state.dashboard.animationOfNotifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePage: page => dispatch(setActivePage(page)),
    getLatestNotifications: () => dispatch(getNotifications({ collect: 'latest' })),
    dropLatestNotifications: () => dispatch(dropLatestNotifications()),
    setNotificationRead: id => dispatch(setNotificationRead(id)),
    muteNotifications: () => dispatch(muteNotifications()),
    changeActiveTabProfile: value => dispatch(changeActiveTabProfile(value)),
    checkUnreadNotifications: () => dispatch(checkUnreadNotifications()),
    setActiveMarketPage: page => dispatch(setActiveMarketPage(page)),
  };
}

Header.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
