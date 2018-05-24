import React, { Component } from 'react'
import { withReduxSaga } from '../store'
import { connect } from 'react-redux';
import Header from '../components/dashboard/Header';
import Body from '../components/dashboard/Body';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as dashboardActions from '../actions/dashboard';


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
    if (this.props.url.query.page) {
      this.props.setActivePage(this.props.url.query.page.toLowerCase());
    }
  }

  render() {
    const { sidebarCollapsed } = this.state;
    return (
      <MuiThemeProvider>
        <div className="full-height-wrap">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            collapseMenu={this.collapseMenu}
          />
          <Body sidebarCollapsed={sidebarCollapsed} />
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
    setActivePage: (page) => dispatch(dashboardActions.setActivePage(page))
  }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
