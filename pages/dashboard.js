import React, { Component } from 'react'
import { withReduxSaga } from '../store'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import Header from '../components/dashboard/Header';
import Body from '../components/dashboard/Body';
import stylesheet from '../assets/styles/main.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dashboardActions from '../actions/dashboard';
import { serverOrigins } from "../utils/config";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: props.sidebarCollapsed
    }
  }

  collapseMenu = () => {
    const sidebarCollapsed = !this.state.sidebarCollapsed;
    this.setState({ sidebarCollapsed });
    this.props.collapseSidebar(sidebarCollapsed)
  };

  componentDidMount() {
    this.props.getUserData();
    this.props.startSocket();
  }

  render() {
    const { sidebarCollapsed } = this.state;
    return (
      <MuiThemeProvider>
        <div className="full-height-wrap">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            collapseMenu={this.collapseMenu}
          />
          <Body sidebarCollapsed={sidebarCollapsed}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    sidebarCollapsed: state.dashboard.sidebarCollapsed,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collapseSidebar: (bool) => dispatch(dashboardActions.collapseSidebar(bool)),
    getUserData: () => dispatch(dashboardActions.getUserData()),
    startSocket: () => dispatch(dashboardActions.startSocket()),
  }
}

export default withReduxSaga(connect(mapStateToProps,mapDispatchToProps)(Dashboard))
