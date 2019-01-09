import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overview from './Pages/Overview';
import Positions from './Pages/Positions';
import Performance from './Pages/Performance';
import Cash from './Pages/Cash'
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import GlobalNetworkPage from './Pages/GlobalNetworkPage';
import PasswordReminderModal from './PasswordReminderModal';
import { closeModal } from '../../actions/dashboard';
import MarketAccessPage from './Pages/MarketAccessPage';
import Funding from './Pages/InvestmentProfile/Funding';
import Account from './Pages/InvestmentProfile/Account';
import PopupPIN from '../registration/PopupPIN';
import ShowPageOrRejection from './ShowPageOrRejection';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  mapPageToComponent = (page) => {
    const { currentColorScheme, allowedSections } = this.props;
    switch (page) {
      case 'overview':
        return ShowPageOrRejection(
          {
            sectionName: 'overview',
            allowedSections
          },
          Overview);
      case 'positions':
        return ShowPageOrRejection(
          {
            sectionName: 'positions',
            currentColorScheme,
            allowedSections
          },
          Positions);
      case 'performance':
        return ShowPageOrRejection(
          {
            sectionName: 'performance',
            allowedSections
          },
          Performance);
      case 'cash':
        return ShowPageOrRejection(
          {
            sectionName: 'cash',
            allowedSections
          }, Cash);
      case 'orders':
        return ShowPageOrRejection(
          {
            sectionName: 'orders',
            allowedSections
          },
          Orders);
      case 'timeline':
      case 'community':
      case 'groups':
      case 'blogs':
        return ShowPageOrRejection(
          {
            sectionName: 'social',
            allowedSections,
            page,
          },
          GlobalNetworkPage);
      case 'profile':
        return ShowPageOrRejection(
          {
            sectionName: 'profile',
            allowedSections
          },
          Profile);
      case 'market':
        return ShowPageOrRejection(
          {
            sectionName: 'market',
            allowedSections
          },
          MarketAccessPage);
      case 'funding':
        return ShowPageOrRejection(
        {
          sectionName: 'funding',
          allowedSections
        },
          Funding);
      case 'global portfolio':
        return ShowPageOrRejection(
          {
            sectionName: 'global portfolio',
            allowedSections
          },
          Account);
      default:
        return '';
    }
  };

  render() {
    const {
      sidebarCollapsed,
      activePageDashboard,
      currentColorScheme,
      popupPINType,
      showPopupPIN,
    } = this.props;
    return (
      <div
        className={sidebarCollapsed ? `dashboard dashboard_${currentColorScheme}` : `dashboard dashboard_full dashboard_${currentColorScheme}`}
      >
        {this.mapPageToComponent(activePageDashboard)}
        {/*{ !['timeline', 'community', 'groups', 'blogs'].includes(activePageDashboard) && <Footer /> }*/}
        <PasswordReminderModal
          handleClose={this.props.closeModal}
          open={this.props.reminderModalOpen}
         />
        {
          showPopupPIN && <PopupPIN
            type={popupPINType}
            source="dashboard"
          />
        }
      </div>
    );
  }
}

export default connect(state => ({
  reminderModalOpen: state.dashboard.modalOpen && state.dashboard.openModalName === 'passwordReminder',
  activePageDashboard: state.dashboard.activePageDashboard,
  currentColorScheme: state.dashboard.currentColorScheme,
  showPopupPIN: state.dashboard.showPopupPIN,
  popupPINType: state.dashboard.popupPINType,
  allowedSections: state.dashboard.allowedSections,
}), dispatch => ({
  closeModal: () => dispatch(closeModal()),
}))(Main);
