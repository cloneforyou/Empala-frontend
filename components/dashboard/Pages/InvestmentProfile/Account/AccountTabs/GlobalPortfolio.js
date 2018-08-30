import React, { Component } from 'react';
import AnyChart from 'anychart-react';
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

export default class GlobalPortfolio extends Component {
  render() {
    const {
      globalData,
      setActivePage,
      textButton,
      accountBalance,
      prefix,
    } = this.props;
    return (
      <div className="global-portfolio">
        <div className="global-portfolio__container">
          <div className="global-portfolio__container_payments">
            <div className="global-portfolio__input-group vertical-align_center">
              {
                <div className="pseudo-input">
                  <span className="pseudo-input__label">{globalData[0].label}</span>
                  <input
                    id={`${prefix}_${globalData[0].id}`}
                    type="text"
                    className="pseudo-input__input"
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
                    <div className="pseudo-input"
                         key={item.id}>
                      <span className="pseudo-input__label">{item.label}</span>
                      <input
                        id={`${prefix}_${item.id}`}
                        type="text"
                        className="pseudo-input__input"
                        value={formatNumberWithFixedPoint(getValueByPrefixAndId(prefix || 'north_america', item.id, accountBalance), 2)}
                        readOnly
                      />
                    </div>))
                }
              </div>
            </div>
            <div className="vertical-align_center global-portfolio__button_width">
              <button
                className="profile-btn profile-btn_green"
                onClick={() => setActivePage('funding')}
              >
                <Link
                  route="dashboard"
                  params={{ page: 'account funding' }}
                >
                  <span
                    style={{ fontSize: '14px' }}
                  >{textButton}
                  </span>
                </Link>
              </button>
            </div>
          </div>
          <div className="global-portfolio__container_graphics row no-gutters">
            <div className="graphic__wrapper col-lg-6">
              <div style={{
                fontSize: '14px',
                textAlign: 'center',
              }}
              >
                Global Allocation
              </div>
              <AnyChart
                type="pie"
                height={300}
                id="chart-container-account-pie"
                data={
                  [
                    { x: 'A', value: 637166 },
                    { x: 'B', value: 721630 },
                    { x: 'C', value: 148662 },
                    { x: 'D', value: 78662 },
                    { x: 'E', value: 90000 },
                  ]
                }
              />
            </div>
            <div className="graphic__wrapper col-lg-6">
              <div>
                Global Portfolio perfomance against Empala Community
              </div>
              <AnyChart
                type="area"
                height={300}
                id="chart-container-account-area"
                data={
                  [7.44, 7.20, 6.45, 7.42],
                  [6.43, 6.16, 6.36, 6.43],
                  [6.04, 5.58, 6.16, 6.05]
                }
              />
            </div>
            <div className="graphic__wrapper col-lg-6">
              <AnyChart
                type="bubble"
                height={300}
                id="chart-container-account-bubble"
                data={
                  [
                    ['2000', 1100, 1],
                    ['2001', 880, 2],
                    ['2002', 1100, 5],
                    ['2003', 1500, 3],
                    ['2004', 921, 3],
                    ['2005', 1000, 2],
                    ['2006', 1400, 1],
                  ]
                }
              />
            </div>
            <div className="graphic__wrapper col-lg-6">
              <AnyChart
                series="splineArea"
                type="area"
                height={300}
                splineArea={
                  [['2018-01-12', 176.179993, 177.360001, 175.649994, 177.089996],
                    ['2018-01-16', 177.899994, 179.389999, 176.139999, 176.190002],
                    ['2018-01-17', 176.149994, 179.25, 175.070007, 179.100006],
                    ['2018-01-18', 179.369995, 180.100006, 178.25, 179.259995],
                    ['2018-01-19', 178.610001, 179.580002, 177.410004, 178.460007],
                    ['2018-01-22', 177.300003, 177.779999, 176.600006, 177],
                    ['2018-01-23', 177.300003, 179.440002, 176.820007, 177.039993],
                    ['2018-01-24', 177.25, 177.300003, 173.199997, 174.220001],
                    ['2018-01-25', 174.509995, 174.949997, 170.529999, 171.110001],
                    ['2018-01-26', 172, 172, 170.059998, 171.509995],
                    ['2018-01-29', 170.160004, 170.160004, 167.070007, 167.960007],
                    ['2018-01-30', 165.529999, 167.369995, 164.699997, 166.970001],
                    ['2018-01-31', 166.869995, 168.440002, 166.5, 167.429993],
                    ['2018-02-01', 167.169998, 168.619995, 166.759995, 167.779999],
                    ['2018-02-02', 166, 166.800003, 160.100006, 160.5],
                    ['2018-02-05', 159.100006, 163.880005, 156, 156.490005],
                    ['2018-02-06', 154.830002, 163.720001, 154, 163.029999],
                    ['2018-02-07', 163.089996, 163.399994, 159.070007, 159.539993],
                    ['2018-02-08', 160.289993, 161, 155.029999, 155.149994],
                    ['2018-02-09', 157.070007, 157.889999, 150.240005, 156.410004],
                    ['2018-02-12', 158.5, 163.889999, 157.509995, 162.710007],
                    ['2018-02-13', 161.949997, 164.75, 161.649994, 164.339996],
                    ['2018-02-14', 163.039993, 167.539993, 162.880005, 167.369995],
                    ['2018-02-15', 169.789993, 173.089996, 169, 172.990005],
                    ['2018-02-16', 172.360001, 174.820007, 171.770004, 172.429993],
                    ['2018-02-20', 172.050003, 174.259995, 171.419998, 171.850006],
                    ['2018-02-21', 172.830002, 174.119995, 171.009995, 171.070007],
                    ['2018-02-22', 171.800003, 173.949997, 171.710007, 172.5],
                    ['2018-02-23', 173.669998, 175.649994, 173.539993, 175.5],
                    ['2018-02-26', 176.350006, 179.389999, 176.210007, 178.970001],
                    ['2018-02-27', 179.100006, 180.479996, 178.160004, 178.389999],
                    ['2018-02-28', 179.259995, 180.619995, 178.050003, 178.119995],
                    ['2018-03-01', 178.539993, 179.779999, 172.660004, 175],
                    ['2018-03-02', 172.800003, 176.300003, 172.449997, 176.210007],
                    ['2018-03-05', 175.210007, 177.740005, 174.520004, 176.820007],
                    ['2018-03-06', 177.910004, 178.25, 176.130005, 176.669998],
                    ['2018-03-07', 174.940002, 175.850006, 174.270004, 175.029999],
                    ['2018-03-08', 175.479996, 177.119995, 175.070007, 176.940002],
                    ['2018-03-09', 177.960007, 180, 177.389999, 179.979996],
                    ['2018-03-12', 180.289993, 182.389999, 180.210007, 181.720001],
                    ['2018-03-13', 182.589996, 183.5, 179.240005, 179.970001],
                    ['2018-03-14', 180.320007, 180.520004, 177.809998, 178.440002],
                    ['2018-03-15', 178.5, 180.240005, 178.070007, 178.649994],
                    ['2018-03-16', 178.649994, 179.119995, 177.619995, 178.020004],
                    ['2018-03-19', 177.320007, 177.470001, 173.660004, 175.300003],
                    ['2018-03-20', 175.240005, 176.800003, 174.940002, 175.240005],
                    ['2018-03-21', 175.039993, 175.089996, 171.259995, 171.270004],
                    ['2018-03-22', 170, 172.679993, 168.600006, 168.850006],
                    ['2018-03-23', 168.389999, 169.919998, 164.940002, 164.940002],
                    ['2018-03-26', 168.070007, 173.100006, 166.440002, 172.770004],
                    ['2018-03-27', 173.679993, 175.149994, 166.919998, 168.339996],
                    ['2018-03-28', 167.25, 170.020004, 165.190002, 166.479996],
                    ['2018-03-29', 167.809998, 171.75, 166.899994, 167.779999],
                    ['2018-04-02', 166.639999, 168.940002, 164.470001, 166.679993],
                    ['2018-04-03', 167.639999, 168.75, 164.880005, 168.389999],
                    ['2018-04-04', 164.880005, 172.009995, 164.770004, 171.610001],
                    ['2018-04-05', 172.580002, 174.229996, 172.080002, 172.800003],
                    ['2018-04-06', 170.970001, 172.479996, 168.199997, 168.380005],
                    ['2018-04-09', 169.880005, 173.089996, 169.850006, 170.050003],
                    ['2018-04-10', 173, 174, 171.529999, 173.25],
                    ['2018-04-11', 172.229996, 173.919998, 171.699997, 172.440002],
                    ['2018-04-12', 173.410004, 175, 173.039993, 174.139999],
                  ]
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
