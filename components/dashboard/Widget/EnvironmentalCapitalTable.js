import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const widget = getWidgetAttributesByName('overview_environmental_capital');

const parseTableData = data => Object.keys(data).map(key => [
  { value: key },
  { value: /%/.test(key) ? formatNumberWithFixedPoint(data[key], 1) : formatNumberWithFixedPoint(data[key])},
]);

const EnvironmentalCapitalTable = props => (
  <div
    className={`widget-col d-inline-block`}
    key={widget.id}
  >
    <div
      className="widget"
      style={{ maxHeight: `${widget.height}px`, paddingLeft: `${widget.padding_left && widget.padding_left}px` }}
    >
      <WidgetHead
        widget={widget}
      />
      <div className="d-inline-block align-top" style={{ width: '280px' }}>
        <EmpalaTable
          tableName="overview_environmental_capital_size_growth"
          tableData={parseTableData(props.env_capital['Size & growth'])}
          small
        />
        <EmpalaTable
          tableName="overview_environmental_capital_opinions"
          tableData={parseTableData(props.env_capital['Opinions'])}
          small
        />
      </div>
      <div
        className="d-inline-block align-top"
        style={{ padding: '0 10px 0 10px' }}
      >
        <div className="table-responsive">  {/* todo replace later with aclual elements */}
          <table className="table table-borderless emp-table">
            <thead>
              <tr className="emp-table__tr">
                <th scope="col" className="emp-table__th text-left" style={{ width: '125px', padding: '80px' }}>Sentiments</th>
                <th scope="col" className="emp-table__th text-left" style={{ width: '150px' }} />
              </tr>
            </thead>
            <tbody>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Equities</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart1.svg" alt="" />
                </td>
              </tr>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Inflation</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart2.svg" alt="" />
                </td>
              </tr>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Volatility</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart1.svg" alt="" />
                </td>
              </tr><tr className="emp-table__tr">
                <td className="emp-table__td text-left">Domestic currency</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart1.svg" alt="" />
                </td>
                   </tr>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Domestic economy</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart2.svg" alt="" />
                </td>
              </tr>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Global economy</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart1.svg" alt="" />
                </td>
              </tr> <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Negative surprise</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart2.svg" alt="" />
                </td>
              </tr>
              <tr className="emp-table__tr">
                <td className="emp-table__td text-left">Positive surprise</td>
                <td className="emp-table__td emp-table__td_chart"><img src="../../static/images/sentim-chart1.svg" alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const MapStateToProps = state => ({
  env_capital: {
    ...state.dashboard.userData.data.env_capital,
    'Size & growth': {
      'Community assets': '--',
      'Community 1 YR % Return': '--',
      'Community members': '--',
      'Public rate (% assets)': '--',
      'Private rate (% assets)': '--',
      'EMARA price': '--',
      'EMARA market cap': '--',
      'EMARA volume transacted': '--',
    },
    Opinions: {
      'Votes completed': '--',
      'Recommends gathered': '--',
      'Q&A sessions closed': '--',
      'Solicitations finish': '--',
    },
  }, // todo remove this stub later
});

export default connect(MapStateToProps)(EnvironmentalCapitalTable);

