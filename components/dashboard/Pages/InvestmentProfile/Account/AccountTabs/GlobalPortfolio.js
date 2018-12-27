import React, { Component } from 'react';

import AccountsGlobal from './AccountsGlobal';
import Graphics from './Graphics';
import PortfolioValue from './PortfolioValue';


export default class GlobalPortfolio extends Component {
  render() {
    return (
      <div className="global-portfolio">
        <div className="global-portfolio__container">
          <PortfolioValue {...this.props} />
          <AccountsGlobal {...this.props} />
          <Graphics {...this.props} />
        </div>
      </div>
    );
  }
}
