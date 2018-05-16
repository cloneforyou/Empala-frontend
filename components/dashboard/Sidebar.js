import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sidebarCollapsed } = this.props
    return (
      <div className={sidebarCollapsed ? 'sidebar sidebar_collapsed sidebar_black' : 'sidebar sidebar_black'}>
        <div className='sidebar-sticky'>
          <div className='sidebar__part-title'>Dashboard</div>
          <ul className='nav flex-column sidebar__nav'>
            <li>
              <a href="">Overview</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sidebarCollapsed: state.dashboard.sidebarCollapsed
  }
}

export default connect(mapStateToProps)(Sidebar)