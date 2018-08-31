import React, { Component } from 'react';
import { connect } from 'react-redux';
import { widgetsCash } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getTableHeaderByName, parseOrderDate, parseDateString } from '../../../utils/dashboardUtils';
import WidgetHead from '../Widget/WidgetHead';
import { initGA, logPageView } from '../../../utils/analytics';


const parsePositionsToTableData = (positions) => {
  return positions.map(pos => {
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
      { value: null },
      { value: null },
    ];
  });
};

const widget = getTableHeaderByName('dashboard_cash');
class Cash extends Component {
  componentDidMount() {
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
            tableData={parsePositionsToTableData(this.props.positions)}
            striped
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  positions: state.dashboard.positions || [],
}))(Cash);
