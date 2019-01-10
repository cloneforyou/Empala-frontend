import React, { Component, Fragment } from 'react'
import Head from 'next/head';
import { withReduxSaga } from '../store';
import { connect } from 'react-redux';
import Header from '../components/dashboard/Header';
import Body from '../components/dashboard/Body';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dashboardActions from '../actions/dashboard';
import stylesheet from '../assets/styles/main.scss';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { GREEN } from '../constants/colors';
import { restartSessionTimeout, refreshTokens } from '../actions/dashboard';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: props.sidebarCollapsed,
      lastSessionTimerDrop: Date.now(),
    };
    this.userActivityHandler = this.userActivityHandler.bind(this);
  }

  collapseMenu = () => {
    const sidebarCollapsed = !this.state.sidebarCollapsed;
    this.setState({ sidebarCollapsed });
    this.props.collapseSidebar(sidebarCollapsed)
  };

  componentDidMount() {
    this.props.getUserData();
    // this.props.startSocket();
    if (this.props.url.query.page) {
      this.props.setActivePage(this.props.url.query.page.toLowerCase());
    } else {
      this.props.setActivePage('overview');
    }
    document.addEventListener('mousemove', this.userActivityHandler);
    document.addEventListener('keypress', this.userActivityHandler);
    document.addEventListener('scroll', this.userActivityHandler);
    document.addEventListener('click', this.userActivityHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.userActivityHandler);
    document.removeEventListener('keypress', this.userActivityHandler);
    document.removeEventListener('scroll', this.userActivityHandler);
    document.removeEventListener('click', this.userActivityHandler);
  }

  userActivityHandler() {
    // restart session timeout if user activity and 30 seconds before session timeout modal
    if (Date.now() > (this.state.lastSessionTimerDrop + this.props.sessionTimeout * 1000) - 120000 ) {
      this.props.resetSessionTimeout();
      this.setState(() => ({ lastSessionTimerDrop: Date.now() }));
    }
  }

  render() {
    const { sidebarCollapsed } = this.state;
    const activePageTitle = this.props.url.query.page || ['overview'];
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: GREEN,
        primary2Color: GREEN,
        pickerHeaderColor: GREEN,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Fragment>
          <Head>
            <title>Dashboard - {activePageTitle[0].toUpperCase() + activePageTitle.slice(1)}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          </Head>
          <div className="full-height-wrap">
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <Header
              sidebarCollapsed={sidebarCollapsed}
              collapseMenu={this.collapseMenu}
            />
            <Body sidebarCollapsed={sidebarCollapsed} />
          </div>
        </Fragment>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    sidebarCollapsed: state.dashboard.sidebarCollapsed,
    activePageDashboard: state.dashboard.activePageDashboard,
    sessionTimeout: (state.dashboard.appSettings || {}).session_timeout
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collapseSidebar: (bool) => dispatch(dashboardActions.collapseSidebar(bool)),
    getUserData: () => dispatch(dashboardActions.getUserData()),
    startSocket: () => dispatch(dashboardActions.startSocket()),
    setActivePage: (page) => dispatch(dashboardActions.setActivePage(page)),
    resetSessionTimeout: () => {
      dispatch(restartSessionTimeout());
      dispatch(refreshTokens());
    },
  }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
