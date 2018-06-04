import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withReduxSaga } from '../store';
import Header from '../components/dashboard/Header';
import Body from '../components/dashboard/Body';
import * as dashboardActions from '../actions/dashboard';
import stylesheet from '../assets/styles/main.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: props.sidebarCollapsed
    }
  }

  static async getInitialProps({ store, isServer }) {

  }

  collapseMenu = () => {
    const sidebarCollapsed = !this.state.sidebarCollapsed;
    this.setState({ sidebarCollapsed });
    this.props.collapseSidebar(sidebarCollapsed)
  };

  componentDidMount() {
    const keycloak = require('keycloak-js')({
      url: 'http://ec2-13-59-73-0.us-east-2.compute.amazonaws.com/auth',
      realm: 'empala',
      clientId: 'empala_test',
      credentials: {
        "secret": "cd9288b6-e0e5-45fe-b794-ee2319eae898",
        }
      }
    );
    keycloak.init({ onLoad: 'login-required' })
    .success(authenticated => {
      console.log('TOKKENNN', keycloak.token);
      this.props.setKcToken(keycloak.token);
    }).error(function(err) {
      console.log('KC Error:', err);
    });
    this.props.getUserData();
    this.props.startSocket();
    if (this.props.url.query.page) {
      this.props.setActivePage(this.props.url.query.page.toLowerCase());
    } else {
      this.props.setActivePage('overflow');
    }
  }

  render() {
    const {sidebarCollapsed} = this.state;
    const activePageTitle = this.props.url.query.page || ['overflow'];
    if (this.props.kcAuthenticated) {
      return (
        <MuiThemeProvider>
          <div>
            <Head>
              <title>Dashbord - {activePageTitle[0].toUpperCase() + activePageTitle.slice(1)}</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
            </Head>
            <div className="full-height-wrap">
              <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
              <Header
                sidebarCollapsed={sidebarCollapsed}
                collapseMenu={this.collapseMenu}
              />
              <Body sidebarCollapsed={sidebarCollapsed}/>
            </div>
          </div>
        </MuiThemeProvider>
      )
    } else {
      return <p>Not authenticated!</p>
    }
  }
}

function mapStateToProps(state) {
  return {
    sidebarCollapsed: state.dashboard.sidebarCollapsed,
    activePageDashboard: state.dashboard.activePageDashboard,
    kcAuthenticated: state.keycloak.kcAuthenticated,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collapseSidebar: (bool) => dispatch(dashboardActions.collapseSidebar(bool)),
    getUserData: () => dispatch(dashboardActions.getUserData()),
    startSocket: () => dispatch(dashboardActions.startSocket()),
    setActivePage: (page) => dispatch(dashboardActions.setActivePage(page)),
    setKcToken: (kcToken) => dispatch(dashboardActions.setKcToken(kcToken)),
  }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
