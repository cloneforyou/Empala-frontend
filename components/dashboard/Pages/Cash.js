import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getTableHeaderByName, parseOrderDate, parseDateString } from '../../../utils/dashboardUtils';
import WidgetHead from '../Widget/WidgetHead';
import { initGA, logPageView } from '../../../utils/analytics';
import { getACHTransactionList } from '../../../actions/funding';


const parsePositionsToTableData = positions => positions.map((pos) => {
  const avgPrice = ((pos.AverageClosePrice + pos.AverageOpenPrice) / 2).toFixed(2);
  return [
    { value: parseDateString(pos.ModifyDate) },
    { value: pos.Symbol },
    { value: pos.CompanyName },
    { value: pos.SecurityId },
    { value: pos.Quantity },
    { value: formatNumberWithFixedPoint(avgPrice, 2), mark: 'numeric' },
    { value: 0 }, // Exec fees
    { value: 0 }, // Reg fees
    { value: formatNumberWithFixedPoint(pos.Quantity * avgPrice, 2) },
    { value: 'USD' },
    { value: formatNumberWithFixedPoint(pos.Quantity * avgPrice * -1, 2) }, // Currency Effect
    { value: 0 }, // Emara Balance
    { value: formatNumberWithFixedPoint(pos.Quantity * avgPrice, 2) }, // USD Balance
    { value: 0 }, // EUR Balance
    { value: 0 }, // GBP Balance
    { value: <a href="#"><i className="cash__icon cash__icon_link" /></a> },
    {
      value:
  <Tooltip title="Comment comment comment comment">
    <i className="cash__icon cash__icon_comment" />
  </Tooltip>,
    },
  ];
});

const parseTransactions = transactions => transactions
  .filter(transaction => transaction.transfer_state === 'COMPLETE')
  .map(transaction => [
    { value: parseDateString(transaction.initiated_time) },
    { value: '' },
    { value: transaction.institution_name },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: 0 }, // Exec fees
    { value: 0 }, // Reg fees
    { value: formatNumberWithFixedPoint(transaction.amount, 2) },
    { value: 'USD' },
    { value: formatNumberWithFixedPoint(transaction.amount * (transaction.transfer_direction === 'INCOMING' ? 1 : -1), 2) }, // Currency Effect
    { value: 0 }, // Emara Balance
    { value: formatNumberWithFixedPoint(transaction.amount) }, // USD Balance
    { value: 0 }, // EUR Balance
    { value: 0 }, // GBP Balance
    { value: '' },
    { value: '' },
  ]);
const widget = getTableHeaderByName('dashboard_cash');
class Cash extends Component {
  componentDidMount() {
    this.props.getACHTransactionList('complete');

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <div
        className={`widget-col col-lg-${widget.col}`}
        key={widget.id}
      >
        <div className="widget" style={{ maxHeight: `${widget.height}px` }}>
          <WidgetHead
            widget={widget}
          />
          <EmpalaTable
            tableName="dashboard_cash"
            tableData={[
              ...parsePositionsToTableData(this.props.positions),
              ...parseTransactions(this.props.ACHTransactionList),
              ]}
            striped
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  positions: state.dashboard.positions || [],
  ACHTransactionList: state.funding.ACHTransactionList || [],
}), dispatch => ({
  getACHTransactionList: status => dispatch(getACHTransactionList(status)),
}))(Cash);
