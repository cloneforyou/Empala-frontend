import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Main from './Main';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from './Footer';

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed, loadingPage, currentColorScheme } = this.props;
    return (
      <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Sidebar sidebarCollapsed={sidebarCollapsed} />
          {
            !loadingPage ?
              <Main sidebarCollapsed={sidebarCollapsed} /> :
              <div className="loader__wrap">
                <div className="loader">
                  <CircularProgress
                    size={100}
                    style={{ color: '#98c73a' }}
                  />
                </div>
              </div>
          }
        </div>
      </div>
        { !['timeline', 'community', 'groups', 'blogs'].includes(this.props.activePageDashboard)
        && <Footer
          full={sidebarCollapsed}
          theme={currentColorScheme}
        /> }
      </Fragment>
    );
  }
}

export default connect(state => ({
  loadingPage: state.dashboard.loadingPage,
  activePageDashboard: state.dashboard.activePageDashboard,
  currentColorScheme: state.dashboard.currentColorScheme,
}), {})(Body);

