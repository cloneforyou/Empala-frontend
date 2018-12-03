import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const widget = getWidgetAttributesByName('overview_working_deals');

const parseDealsData = data => data; // todo parse function when actual data been available

const WorkingDealsTable = props => (
  <div
    className="widget-col d-inline-block align-top"
    key={widget.id}
  >
    <div
      className="widget"
      style={
        {
          height: `${widget.height}px`,
          paddingLeft: `${widget.padding_left && widget.padding_left}px`,
          paddingRight: `${widget.padding_right && widget.padding_right}px`,
        }
      }
    >
      <WidgetHead
        widget={widget}
      />
      <div>
        <EmpalaTable
          tableName="overview_working_deals"
          tableData={parseDealsData(props.workingDeals)}
        />
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    workingDeals: [
      // TODO: change to actual data from server
      // [{ value: 'Mariposa Short-Term house' }, { value: '450,000' }, { value: '3,725,000' }, { value: '0.0', color: 'green' }, { value: 'Closed' }],
      // [{ value: '3rd St Office complex' }, { value: '1,750,000' }, { value: '9,550,500' }, { value: '0.0', color: 'green' }, { value: 'Closed' }],
      // [{ value: 'Singapore Wind Farms' }, { value: '500,000' }, { value: '5,325,647' }, { value: '1.3', color: 'green' }, { value: 'Action', color: 'red' }],
      // [{ value: 'SantaCruz Hemp Farms' }, { value: '3,000,000' }, { value: '14,753,675' }, { value: '3.9', color: 'green' }, { value: 'Active', color: 'green' }],
    ],
  };
}

export default connect(mapStateToProps)(WorkingDealsTable);

