import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sidebarItems } from '../../localdata/dashboardSidebarMenuItems';
import CountryMenu from './CountryMenu';
import { setGroupCountry, setActivePage } from '../../actions/dashboard'


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondSideMenu: {
        open: false,
        label: props.selectedGroup.label || '',
      },
    };
  }


  openMenu = (nextLabel) => {
    const { open, label } = this.state.secondSideMenu;
    this.setState({
      secondSideMenu: {
        open: nextLabel === label ? !open : true,
        label: nextLabel
      }
    }, () => {
      this.props.setGroupCountry(nextLabel)
    });
  };

  closeMenu = () => {
    this.setState({
      secondSideMenu: {
        open: false,
        label: ''
      }
    })
  };

  handleClick = (label) => {
    this.props.setActivePage(label)
  };


  render() {
    const { secondSideMenu } = this.state;
    const { sidebarCollapsed, selectedGroup, activePageDashboard } = this.props;
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
                      part.items.map((item, j) => {
                        if (item.type && item.type === 'button') {
                          return (
                            <li
                              className={item.color ? `nav-list__item nav-list__item_${item.color}` : 'nav-list__item'}
                              key={j}
                            >
                              <button
                                className="invisible-btn"
                                onClick={() => this.openMenu(item.label)}
                                onBlur={this.closeMenu}
                              >
                                <i
                                  className={`nav-list__icon nav-list__icon_${item.icon}`}
                                />
                                <span className="nav-list__link">{item.label}</span>
                              </button>
                            </li>
                          )
                        } else {
                          return (
                            <li
                              className={(item.label === activePageDashboard) ? 'nav-list__item nav-list__item_active' : 'nav-list__item'}
                              key={j}
                              onClick={() => this.handleClick(item.label)}
                            >
                              <i
                                className={`nav-list__icon nav-list__icon_${item.icon}`}
                              />
                              <span className="nav-list__link">{item.label}</span>
                            </li>
                          )
                        }
                      })
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
          secondSideMenu.open && selectedGroup.list && <CountryMenu country={selectedGroup} />
        }
      </div>
    );
  }
}


export default connect(state => ({
  selectedGroup: state.dashboard.selectedGroup,
  activePageDashboard: state.dashboard.activePageDashboard,
}), {
  setGroupCountry,setActivePage
})(Sidebar);
