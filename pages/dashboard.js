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


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: props.sidebarCollapsed,
    };
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collapseSidebar: (bool) => dispatch(dashboardActions.collapseSidebar(bool)),
    getUserData: () => dispatch(dashboardActions.getUserData()),
    startSocket: () => dispatch(dashboardActions.startSocket()),
    setActivePage: (page) => dispatch(dashboardActions.setActivePage(page)),
  }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
