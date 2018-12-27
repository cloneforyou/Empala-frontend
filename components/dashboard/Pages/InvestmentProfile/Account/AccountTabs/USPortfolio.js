import React, { Component } from 'react';

import AccountsUS from './AccountsUS';
import Graphics from './Graphics';
import PortfolioValue from './PortfolioValue';


export default class USPortfolio extends Component {
  render() {
    return (
      <div className="global-portfolio">
        <div className="global-portfolio__container">
          <PortfolioValue {...this.props} />
          <AccountsUS {...this.props} />
          <Graphics {...this.props} />
        </div>
      </div>
    );
  }
}