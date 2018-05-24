import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sidebarItems } from '../../localdata/dashboardSidebarMenuItems';
import CountryMenu from './CountryMenu';
import {changeCurrentPage, setGroupCountry, setActivePage} from '../../actions/dashboard'

function mapStateToProps(state) {
  return {
    selectedGroup: state.dashboard.selectedGroup,
    activePageDashboard: state.dashboard.activePageDashboard,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGroupCountry: () => dispatch(setGroupCountry()),
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    setActivePage: (label) => dispatch(setActivePage(label))
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryMenuIsOpen: false,
    };
  }

  openMenu = (nextLabel) => {
    const { countryMenuIsOpen } = this.state
    this.setState({ countryMenuIsOpen: !countryMenuIsOpen }, () => {
      this.props.setGroupCountry(nextLabel)
    });
  };

  closeMenu = () => {
    const { countryMenuIsOpen } = this.state;
    this.setState({ countryMenuIsOpen: !countryMenuIsOpen })
  };



  render() {
    const { countryMenuIsOpen } = this.state;
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
                              onClick={() => this.props.setActivePage(item.label.toLowerCase())}
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
          countryMenuIsOpen && selectedGroup.list && <CountryMenu country={selectedGroup} />
        }
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
