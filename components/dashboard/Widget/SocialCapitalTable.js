import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const widget = getWidgetAttributesByName('overview_social_capital');

// stub for positioning table data. Todo investigate data source
const positioning = {
  '1M return': Math.random()*100,
  'Inception R': Math.random()*100,
  'Total asset value': Math.random()*100,
  '% Adj net position': Math.random()*100,
  '% VAR': Math.random()*100,
  '% Cash': Math.random()*100,
  '% Equity': Math.random()*100,
  '% Debt': Math.random()*100,
};
const parseNetworkCapitalData = data => Object.keys(data).map(key => [
  { value: key },
  { value: formatNumberWithFixedPoint(data[key]) },
]);

const parsePositioningCapitalData = data => Object.keys(data).map(key => [
  { value: key },
  { value: formatNumberWithFixedPoint(data[key], 1) },
]);

const SocialCapitalTable = props => (
  <div
    className={`widget-col widget-col-${widget.col}`}
    key={widget.id}
  >
    <div
      className="widget"
      style={{ maxHeight: `${widget.height}px`, paddingLeft: `${widget.padding_left && widget.padding_left}px` }}
    >
      <WidgetHead
        widget={widget}
      />
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_social_capital_network"
          tableData={parseNetworkCapitalData(props.social.Network)}
          small
        />
      </div>
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_social_capital_positioning"
          tableData={parsePositioningCapitalData(positioning)}
          small
        />
      </div>
      <div className="w-100" />
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_social_capital_get"
          tableData={parseNetworkCapitalData(props.social.Get)}
          small
        />
      </div>
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_social_capital_give"
          tableData={parseNetworkCapitalData(props.social.Give)}
          small
        />
      </div>
    </div>
  </div>
);

const MapStateToProps = state => ({
  social: {
    ...state.dashboard.userData.data.social_capital,
    Network: {
      // Connections: 20,
      ...state.dashboard.userData.data.social_capital.Network || {},
      Partners: 1,
      'Trusted relationship': 0,
      'Board seats': 0,
      'Advisory roles': 0,
      'Total followers': 12,
      'Monthly blog views': 232,
    },
    Get: {
      'Ratings received': Math.random()*1000,
      'Courses completed': Math.random()*100,
      'Deals assembled': Math.random()*1000,
      'EMARA income': Math.random()*1000000,
    },
    Give: {
      'Ratings given': Math.random()*1000,
      'Blogs posted': Math.random()*100,
      'Deals joined': Math.random()*1000,
      'Opinions given': Math.random()*100,
    },
  }, // todo remove this stub later
});

export default connect(MapStateToProps)(SocialCapitalTable);

