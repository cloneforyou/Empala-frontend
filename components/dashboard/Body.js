import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Main from './Main';
import CircularProgress from '@material-ui/core/CircularProgress';

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed, loadingPage } = this.props;
    return (
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
    );
  }
}

export default connect(state => ({
  loadingPage: state.dashboard.loading,
}), {})(Body);

