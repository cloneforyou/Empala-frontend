import React, { Component } from 'react';
import { Link } from '../../../../../../routes';
import { formatNumberWithFixedPoint } from '../../../../../../utils/dashboardUtils';


const balanceFieldsMapTable = {
  north_america: {
    // portfolio_value_global: '',
    stock_buying_power_global: 'stockBuyingPower',
    option_buying_power_global: 'optionBuyingPower',
    day_trading_buying_power_global: 'dayTradingBuyingPower',
    pending_order_count_global: 'pendingOrdersCount',
    maintenance_margin_global: 'maintenanceMargin',
    option_maintenance_margin_global: 'optionMaintenanceMargin',
    unrealized_pl_global: 'openPL',
    realized_pl_today_global: 'closePL',
    position_market_value_global: 'marketValue',
  },
};

const getValueByPrefixAndId = (prefix, id, accountBalance) => {
  if (Object.keys(accountBalance).length === 0) return '';
  switch (id) {
    case 'portfolio_value_global':
      if (prefix === 'north_america') {
        return (accountBalance.cash.Value + accountBalance.stockLongMarketValue.Value) - accountBalance.stockShortMarketValue.Value;
      }
      return '';
    default:
      return accountBalance[balanceFieldsMapTable[prefix][id]] &&
        accountBalance[balanceFieldsMapTable[prefix][id]].Value;
  }
};

class PortfolioValue extends Component {
  render() {
    const {
      globalData,
      setActivePage,
      textButton,
      accountBalance,
      prefix,
    } = this.props;

    return (
      <div className="global-portfolio__container_payments d-flex justify-content-between dark-theme">
        <div className="global-portfolio__input-group vertical-align_center ml-10">
          {
            <div className="pseudo-input">
              <span className="pseudo-input__label">{globalData[0].label}</span>
              <input
                id={`${prefix}_${globalData[0].id}`}
                type="text"
                className="pseudo-input__input pseudo-input__input_dark"
                value={formatNumberWithFixedPoint(getValueByPrefixAndId(prefix || 'north_america', globalData[0].id, accountBalance), 2)}
                readOnly
              />
            </div>
          }
        </div>
        <div className="input-group__container">
          <div className="global-portfolio__input-group d-flex flex-wrap">
            {
              globalData.slice(1).map(item => (
                <div
                  className="pseudo-input"
                  key={item.id}
                >
                  <span className="pseudo-input__label">{item.label}</span>
                  <input
                    id={`${prefix}_${item.id}`}
                    type="text"
                    className="pseudo-input__input pseudo-input__input_dark"
                    value={formatNumberWithFixedPoint(
                      getValueByPrefixAndId(prefix || 'north_america', item.id, accountBalance),
                      /pending_order_count/.test(item.id) ? 0 : 2,
                    )}
                    readOnly
                  />
                </div>))
            }
          </div>
        </div>
        <div className="vertical-align_center global-portfolio__button_width mr-10">
          <button
            className="profile-btn profile-btn_green"
            onClick={() => setActivePage('funding')}
          >
            <Link
              route="dashboard"
              params={{ page: 'account funding' }}
            >
                  <span>
                    Transfers
                  </span>
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default PortfolioValue;