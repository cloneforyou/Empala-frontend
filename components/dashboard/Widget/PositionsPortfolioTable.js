import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId, values } from 'lodash';
import { widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';
import { formatNumberWithFixedPoint, getTableHeaderByName } from '../../../utils/dashboardUtils';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';

// const updatePositionsPortfolio = (positions, quotes) => {
//   if (positions.length > 0 && quotes) {
//     return positions.map(pos => (
//       quotes[pos.sec_id] ? {
//         ...pos,
//         m2m: quotes[pos.sec_id].Last,
//         day_chg: Number(quotes[pos.sec_id].ChangePc).toFixed(1),
//         notional: (pos.quantity * quotes[pos.sec_id].Last).toFixed(2),
//         total_chg: ((quotes[pos.sec_id].Last - pos.avg_price) * 100 / pos.avg_price).toFixed(2),
//       }
//         : pos
//     ));
//   }
//   return [];
// };
// TODO  remove later if unused


const getPositionsPLs = (positions) => {
  if (!positions) return false;
  const out = {};
  positions.length>0 && positions.forEach((pos) => {
    out[pos.sec_id] = pos.rpl;
    return true;
  });
  return out;
};

const getPositionMark = (pos, quotes) => {
   if (!pos || !quotes) return false;
   return quotes[pos.sec_id].Mark
};
const calculateDayRPL = pos => pos && pos[19] ? pos[19] : false;
const calculateDayPL = pos => calculateMarketValue(pos) - calculatePrevMarketValue(pos) + calculateDayRPL(pos);

class PositionsPortfolioTable extends React.Component {
  constructor(props) {
    super(props);
    this.widget = getTableHeaderByName('dashboard_positions_portfolio');
    this.positions = this.getPositionsData(this.props.positionsParsed);
    this.positionsPLs = getPositionsPLs(this.props.positionsParsed);
  }

  componentDidMount() {
    this.props.subscribeQuotes();
  }

  componentWillUnmount() {
    this.props.unsubscribeQuotes();
  }
  mapETNACategoryToEmpala(categoryName) {
    switch (categoryName) {
      case 'CommonStock':
        return 'Stock';
      default: return categoryName;
    }
  }
  getPositionMark = pos => {
    if (!pos || !this.props.quotes) return false;
    return this.props.quotes[pos[3].value].Mark
  };
  calculateMarketValue = pos => this.getPositionMark(pos) * pos[12].value * (pos[4].value === 'Stock' ? 1 : 100);
  calculatePrevMarketValue = pos => pos[20].value * pos[12].value * (pos[4].value === 'Stock' ? 1 : 100);
  calculateDayRPL = pos => pos && pos[19].value ? pos[19].value : false;
  calculateDayPL = pos => this.calculateMarketValue(pos) - this.calculatePrevMarketValue(pos) + this.calculateDayRPL(pos);

  getPositionsData(position) {
    const self = this;
    return position && position.map(list => ([
      { value: list.start_date }, // 'Start date'
      { value: list.symbol }, // 'Symbol'
      { value: list.sec_name }, // 'Sec name'
      { value: list.sec_id }, // 'Sec ID'
      { value: self.mapETNACategoryToEmpala(list.category) }, // 'Category'
      { value: 'USA' }, // 'Country'
      { value: list.currency }, // 'Curr'
      { value: list.ann_cf }, // 'Ann CF%'
      { value: list.carry }, // 'Carry'
      { value: list.ann_ret }, // 'Ann Ret'
      { value: list.var_cont }, // 'VAR Count'
      { value: formatNumberWithFixedPoint(list.avg_price, 2), mark: 'numeric' }, // 'Avg Price'
      { value: list.quantity }, // 'Quantity'
      { value: formatNumberWithFixedPoint(list.m2m, 2) }, // 'M2M'
      { value: formatNumberWithFixedPoint(list.notional, 2) }, // 'Notional'
      { value: formatNumberWithFixedPoint(list.total_chg, 2), mark: 'numeric' }, // 'Tot % Chg'
      { value: formatNumberWithFixedPoint(list.total_pl, 2) }, // 'Tot P&L'
      { value: formatNumberWithFixedPoint(list.day_chg, 2), mark: 'numeric' }, // 'Day % Chg'
      { value: formatNumberWithFixedPoint(list.day_pl, 2), mark: 'numeric' }, // 'Day P&L'
      { value: list.rpl }, // RealisedProfitLoss
      { value: list.prev_close_avg }, // AverageClosePrice
    ]));
  }
  updatePositionsData(positions, quotes) {
    if (positions && quotes) {
      positions.forEach((pos) => {
        const secId = pos[3].value;
        if (quotes[secId]) {
          pos[13].value = formatNumberWithFixedPoint(quotes[secId].Last, 2);
          pos[17].value = formatNumberWithFixedPoint(quotes[secId].ChangePc, 2);
          pos[14].value = formatNumberWithFixedPoint(pos[12].value * quotes[secId].Last, 2);
          pos[15].value = formatNumberWithFixedPoint((quotes[secId].Last - pos[11].value) * 100 / pos[11].value, 2);
          pos[18].value = formatNumberWithFixedPoint(this.calculateDayPL(pos), 2);
        }
      });
    }
    return positions;
  }

  render() {
    const positions = this.updatePositionsData(this.positions, this.props.quotes);
    return (
      <div
        className={`widget-col col-lg-${this.widget.col}`}
        // key={this.widget.id}
      >
        <div className="widget" style={{ maxHeight: `${this.widget.height}px` }}>
          <WidgetHead
            widget={this.widget}
          />
          <div style={{ width: '100%' }}>
            <EmpalaTable
              tableName="dashboard_positions_portfolio"
              tableData={positions}
              striped
            />
          </div>
        </div>
      </div>
    );
  }
}
PositionsPortfolioTable.defaultProps = {
  positionsParsed: [],
  quotes: [],
};
export default connect(
  state => ({
    positionsParsed: state.dashboard.parsedPositions ? state.dashboard.parsedPositions : [],
    // positions: state.dashboard.positions ? state.dashboard.positions : [],
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
  }),
)(PositionsPortfolioTable);
