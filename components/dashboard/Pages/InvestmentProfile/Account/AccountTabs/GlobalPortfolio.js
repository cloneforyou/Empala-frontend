import React, { Component } from 'react';
import AnyChart from 'anychart-react';
import { Link } from '../../../../../../routes';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import { Global, GlobalPortfolioData } from '../../../../../../localdata/globalPortfolio';


export default class GlobalPortfolio extends Component {
  render() {
    return (
      <div className="global-portfolio">
        <div className="global-portfolio__container">
          <div className="global-portfolio__container_payments">
            <div className="global-portfolio__input-group vertical-align_center">
              {<EmpalaInput {...Global} />}
            </div>
            <div className="input-group__container">
              <div className="global-portfolio__input-group d-flex flex-wrap">
                {GlobalPortfolioData.map(item => (
                  <EmpalaInput{...{
                    item,
                    key: item.id,
                    label: item.label,
                    notCol: item.notCol,
                  }}
                  />
                ))}
              </div>
            </div>
            <div className="vertical-align_center global-portfolio__button_width">
              <button
                className="profile-btn profile-btn_green"
                onClick={() => this.props.setActivePage('account funding')}
              >
                <Link
                  route="dashboard"
                  params={{ page: 'account funding' }}
                >
                  <span
                    style={{ fontSize: '14px' }}
                  >Fund account
                  </span>
                </Link>
              </button>
            </div>
          </div>
          <div className="global-portfolio__container_graphics row">
            <div className="graphic__wrapper col-lg-6">
              <div style={{
                'fontSize': '14px',
                'textAlign': 'center'
              }}>
                Global Allocation
              </div>
              <AnyChart
                type="pie3d"
                height={300}
                id="chart-container-account-pie"
                data={
                  [
                    { x: "A", value: 637166 },
                    { x: "B", value: 721630 },
                    { x: "C", value: 148662 },
                    { x: "D", value: 78662 },
                    { x: "E", value: 90000 },
                  ]
                }
              />
            </div>
            <div className="graphic__wrapper col-lg-6">
              <div style={{
                'fontSize': '14px',
                'textAlign': 'center'
              }}>
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
                    ["2000", 1100, 1],
                    ["2001", 880, 2],
                    ["2002", 1100, 5],
                    ["2003", 1500, 3],
                    ["2004", 921, 3],
                    ["2005", 1000, 2],
                    ["2006", 1400, 1],
                  ]
                }
              />
            </div>
            <div className="graphic__wrapper col-lg-6">
              <AnyChart
                type="area"
                height={300}
                id="chart-container-account-area2"
                data={
                  [7.44, 7.20, 6.45, 7.42],
                  [6.43, 6.16, 6.36, 6.43],
                  [6.04, 5.58, 6.16, 6.05]
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
