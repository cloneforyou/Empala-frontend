import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const widget = getWidgetAttributesByName('overview_deals_development');

const parseDealsData = data => data; // todo parse function when actual data been available

const DealsDevelopmentTable = props => (
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
          tableName="overview_deals_development"
          tableData={parseDealsData(props.workingDeals)}
        />
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    workingDeals: [
      [{ value: 'Greenway Toll Road Project' }, { value: '07-27-2018' }, { value: 'New - bids needed' }, { value: '-', color: 'green' }],
      [{ value: 'Madrid Solar Farm Project' }, { value: '07-26-2018' }, { value: 'Data room update' }, { value: '15.7', color: 'green' }],
      [{ value: 'Urban Infrastructure - Sydney, AU' }, { value: '07-22-2018' }, { value: 'Successful Completion' }, { value: '0.0', color: 'green' }],
      [{ value: 'IDG Mining Phase 1 Infrastructure' }, { value: '07-21-2018' }, { value: 'Pricing change' }, { value: '9.7', color: 'green' }],
      [{ value: 'Axocanx trials' }, { value: '07-16-2018' }, { value: 'New bidder' }, { value: '11.6', color: 'green' }],
      [{ value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }],
      [{ value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }],
      [{ value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }, { value: '--' }],
    ],
  };
}

export default connect(mapStateToProps)(DealsDevelopmentTable);

