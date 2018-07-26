import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId, values } from 'lodash';
import { widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';
import { getTableHeaderByName } from '../../../utils/dashboardUtils';
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

class PositionsPortfolioTable extends React.Component {
  constructor(props) {
    super(props);
    this.widget = getTableHeaderByName('dashboard_positions_portfolio');
    this.positions = this.getPositionsData(this.props.positionsParsed);
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
      { value: list.avg_price, mark: 'numeric' }, // 'Avg Price'
      { value: list.quantity }, // 'Quantity'
      { value: list.m2m }, // 'M2M'
      { value: list.notional }, // 'Notional'
      { value: list.total_chg, mark: 'numeric' }, // 'Tot % Chg'
      { value: list.total_pl }, // 'Tot P&L'
      { value: list.day_chg, mark: 'numeric' }, // 'Day % Chg'
      { value: list.day_pl, mark: 'numeric' }, // 'Day P&L'
    ]));
  }
  updatePositionsData(positions, quotes) {
    if (positions && quotes) {
      positions.forEach((pos) => {
        const secId = pos[3].value;
        if (quotes[secId]) {
          pos[13].value = quotes[secId].Last;
          pos[17].value = Number(quotes[secId].ChangePc).toFixed(1);
          pos[14].value = (pos[12].value * quotes[secId].Last).toFixed(2);
          pos[15].value = ((quotes[secId].Last - pos[11].value) * 100 / pos[11].value).toFixed(2);
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
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
  }),
)(PositionsPortfolioTable);
