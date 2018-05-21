import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sidebarItems } from '../../localdata/dashboardSidebarMenuItems';
import { listContries } from '../../localdata/marketAccesLists';
import CountryMenu from './CountryMenu';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondSideMenu: {
        open: false,
        label: '',
      },
    };
  }

  openMenu = (label) => {
    const { open } = this.state.secondSideMenu;
    this.setState({ secondSideMenu: { open: !open, label } })
  }

  render() {
    const { secondSideMenu } = this.state;
    const { sidebarCollapsed } = this.props;
    return (
      <div>
        <div className={sidebarCollapsed ? 'sidebar sidebar_collapsed sidebar_black' : 'sidebar sidebar_black'}>
          <div className="sidebar-sticky">
            {
              sidebarItems.map((part, index) => (
                <div className="sidebar__part-nav" key={index}>
                  <div className="sidebar__part-title">{part.title}</div>
                  <ul className="nav flex-column sidebar__nav-list nav-list">
                    {
                      part.items.map((item, j) => (
                        <li
                          className={item.color ? `nav-list__item nav-list__item_${item.color}` : 'nav-list__item'}
                          key={j}
                          onFocus={this.openMenu(item.label)}
                        >
                          <i
                            className={`nav-list__icon nav-list__icon_${item.icon}`}
                          />
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
        {
          listContries.map(group => (
            <CountryMenu
              country={group}
              key={Math.random()}
              open={secondSideMenu.open}
              label={secondSideMenu.label}
            />
          ))
        }
      </div>
    );
  }
}


export default connect(state => ({}))(Sidebar);
