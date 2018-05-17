import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sidebarItems } from '../../localdata/dashboardSidebarMenuItems';


class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'sidebar sidebar_collapsed sidebar_black' : 'sidebar sidebar_black'}>
        <div className="sidebar-sticky">
          {
            sidebarItems.map((part, index) => (
              <div className="sidebar__part-nav" key={index}>
                <div className="sidebar__part-title">{part.title}</div>
                <ul className="nav flex-column sidebar__nav-list nav-list">
                  {
                    part.items.map((item, j) => (
                      <li className="nav-list__item" key={j}>
                        <i className={`nav-list__icon nav-list__icon_${item.icon}`}/>
                        <a href="#">{item.label}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
          <div className="sidebar__user-status user-status user-status_online">
            <span>Online</span>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => ({}))(Sidebar);
