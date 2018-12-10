import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from '../../routes';
import { sidebarItems } from '../../localdata/dashboardSidebarMenuItems';
import CountryMenu from './CountryMenu';
import { setGroupCountry, setActivePage, setActiveMarketPage } from '../../actions/dashboard';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryMenuIsOpen: false,
    };
  }

  openMenu = (nextLabel) => {
    this.setState( () => {
      if (this.state.countryMenuIsOpen) return { countryMenuIsOpen: false };
      return { countryMenuIsOpen: true }
      }, () => {
      this.props.setGroupCountry(nextLabel)
    });
  };

  closeMenu = () => {
    setTimeout(() => this.setState( prevState => ({ countryMenuIsOpen: !prevState.countryMenuIsOpen })), 100);
    // this.setState( prevState => ({ countryMenuIsOpen: false }))
  };

  handleClick = (label, market) => {
    label !== 'Funding' && this.props.setActivePage(label && label.toLowerCase()); // TODO update on clarified which section is 'Funding' should lead to
    this.props.setActiveMarketPage(market && market.toLowerCase());
  };

  renderThumbVertical = (props) => {
    return (
      <div {...props} className="sidebar__scroll-block-thumb-vertical" />
    );
  };


  render() {
    const { countryMenuIsOpen } = this.state;
    const { sidebarCollapsed, selectedGroup, activePageDashboard, currentColorScheme } = this.props;
    return (
      <div>
        <div className={sidebarCollapsed ? `sidebar sidebar_collapsed sidebar_${currentColorScheme}-theme` : `sidebar sidebar_${currentColorScheme}-theme`}>
          <div className="sidebar-sticky">
            <Scrollbars
              className="sidebar__scroll-block"
              renderThumbVertical={this.renderThumbVertical}
              universal
            >
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
                              className={(item.label.toLowerCase() === activePageDashboard) ? 'nav-list__item nav-list__item_active' : 'nav-list__item'}
                              key={j}
                              onClick={() => this.handleClick(item.label)}
                            >
                              <Link route="dashboard" params={{ page: `${item.label.toLowerCase()}` }}>
                                <span>
                                  <i
                                    className={`nav-list__icon nav-list__icon_${item.icon}`}
                                  />
                                <span className="nav-list__link">{item.label}</span>
                                </span>
                              </Link>
                            </li>
                          )
                        }
                      })
                    }
                  </ul>
                </div>
              ))
            }
            </Scrollbars>
            <div className="sidebar__user-status user-status user-status_online">
              <span>Online</span>
            </div>
          </div>
        </div>
        {
          countryMenuIsOpen && selectedGroup.list &&
          <CountryMenu
            country={selectedGroup}
            selectMarket={this.handleClick}
          />
        }
      </div>
    );
  }
}


export default connect(state => ({
  selectedGroup: state.dashboard.selectedGroup,
  activePageDashboard: state.dashboard.activePageDashboard,
  currentColorScheme: state.dashboard.currentColorScheme,
}), {
  setGroupCountry,
  setActivePage,
  setActiveMarketPage,
})(Sidebar);
