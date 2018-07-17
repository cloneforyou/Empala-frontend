import React from 'react';
import { connect } from 'react-redux';
import { widgetsCash } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import EmpalaTable from '../EmpalaTable';
import { parseOrderDate } from '../../../utils/dashboardUtils';


const parsePositionsToTableData = (positions) => {
  // const symbols = {};
  return positions.map(pos => {
    const avgPrice = ((pos.AverageClosePrice + pos.AverageOpenPrice) / 2).toFixed(2);
    return [
      { value: parseOrderDate(pos.ModifyDate).slice(0, 10) },
      { value: pos.Symbol, },
      { value: pos.CompanyName },
      { value: pos.SecurityId },
      { value: pos.Quantity },
      { value: avgPrice, mark: 'numeric' },
      { value: 0 }, // Exec fees
      { value: 0 }, // Reg fees
      { value: (pos.Quantity * avgPrice).toFixed(2) },
      { value: 'USD' },
      { value: (pos.Quantity * avgPrice * -1).toFixed(2) }, // Currency Effect
      { value: 0 }, // Emara Balance
      { value: (pos.Quantity * avgPrice).toFixed(2) }, // USD Balance
      { value: 0 }, // EUR Balance
      { value: 0 }, // GBP Balance
      { value: null },
      { value: null },
    ];
  });
};

const Cash = (props) => (
  <div className="container-fluid">
    <div className="row">
      {
        widgetsCash.map(widget => (
          <WidgetTable widget={widget} key={widget.id} />
          ))
        }
      <EmpalaTable
        tableName="dashboard_cash"
        tableData={parsePositionsToTableData(props.positions)}
        striped
      />
    </div>
  </div>
);

export default connect(state => ({
  positions: state.dashboard.positions || [],
}))(Cash);
