import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overview from './Pages/Overview';
import Positions from './Pages/Positions';
import Performance from './Pages/Performance';
import Cash from './Pages/Cash'
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import Footer from './Footer';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';
import PasswordReminderModal from './PasswordReminderModal';
import { closeModal } from '../../actions/dashboard';
import MarketAccessPage from './Pages/MarketAccessPage';
import Account from './Pages/Account';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  mapPageToComponent = (page) => {
    switch (page) {
      case 'overview':
        return <Overview />;
      case 'positions':
        return <Positions />;
      case 'performance':
        return <Performance />;
      case 'cash':
        return <Cash />;
      case 'orders':
        return <Orders />;
      case 'timeline':
      case 'community':
      case 'groups':
      case 'blogs':
        return <GlobalNetworkPage page={page} />;
      case 'profile':
        return <Profile />;
      case 'market':
        return <MarketAccessPage />;
      case 'global portfolio':
        return <Account />;
      default:
        return '';
    }
  };

  render() {
    const { sidebarCollapsed, activePageDashboard, currentColorScheme } = this.props;
    return (
      <div
        className={sidebarCollapsed ? `dashboard dashboard_${currentColorScheme}` : `dashboard dashboard_full dashboard_${currentColorScheme}`}>
        {this.mapPageToComponent(activePageDashboard)}
        { !['timeline', 'community', 'groups', 'blogs'].includes(activePageDashboard) && <Footer /> }
        <PasswordReminderModal
          handleClose={this.props.closeModal}
          open={this.props.reminderModalOpen}
         />
      </div>
    );
  }
}

export default connect(state => ({
  reminderModalOpen: state.dashboard.modalOpen && state.dashboard.openModalName === 'passwordReminder',
  activePageDashboard: state.dashboard.activePageDashboard,
  currentColorScheme: state.dashboard.currentColorScheme,
}), dispatch => ({
  closeModal: () => dispatch(closeModal()),
}))(Main);
