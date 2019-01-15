import React, { PureComponent } from 'react';


class TabMenu extends PureComponent {
  setActiveFundingTab = (e) => {
    this.props.setActiveFundingTab(e.target.getAttribute('name'));
  };

  setActiveClassForTabName(tabName) {
    if (this.props.transferDirection === tabName) {
      return 'tabs-menu_active';
    }
    return '';
  }

  render() {
    return (
      <div className="wrapper-tabs-menu">
        <ul className="tabs-menu d-flex">
          <li className="mr-3">
            <button
              className={`tabs-menu__tab invisible-btn ${this.setActiveClassForTabName('Inbound')}`}
              name="Inbound"
              onClick={this.setActiveFundingTab}
            >
              Transfer in
            </button>
          </li>
          <li>
            <button
              className={`tabs-menu__tab invisible-btn ${this.setActiveClassForTabName('Outbound')}`}
              name="Outbound"
              onClick={this.setActiveFundingTab}
            >
              Transfer out
            </button>
          </li>
          <li className={`d-flex align-items-center ml-auto ${this.props.transferDirection === 'Outbound' ? 'outbound' : ''}`}>
            <span className="icon-empala mx-3" />
            <span className="right-chevron mx-3" />
            <span className="icon-bank mx-3" />
          </li>
        </ul>
        <hr />
      </div>
    );
  }
}

export default TabMenu;