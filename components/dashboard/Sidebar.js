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
              <div key={index}>
                <div className="sidebar__part-title">{part.title}</div>
                <ul className="nav flex-column sidebar__nav-group nav-group">
                  {
                    part.items.map((item, j) => (
                      <li className="nav-group__item" key={j}>
                        <a href="">{item.label}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


export default connect(state => ({}))(Sidebar);
