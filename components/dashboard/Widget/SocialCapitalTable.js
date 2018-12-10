import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';

const filler = '--';
const widget = getWidgetAttributesByName('overview_social_capital');

// stub for positioning table data. Todo investigate data source
const positioning = {
  '1M return': filler,
  'Inception R': filler,
  'Total asset value': filler,
  '% Adj net position': filler,
  '% VAR': filler,
  '% Cash': filler,
  '% Equity': filler,
  '% Debt': filler,
};
const Get = {
  'Ratings received': filler,
  'Courses completed': filler,
  'Deals assembled': filler,
  'EMARA income': filler,
};
const Give = {
  'Ratings given': filler,
  'Blogs posted': filler,
  'Deals joined': filler,
  'Opinions given': filler,
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
    className="widget-col d-inline-block"
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
          tableData={parseNetworkCapitalData(Object.keys(props.social.Get).length > 0 ? props.social.Give : Get)}
          small
        />
      </div>
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_social_capital_give"
          tableData={parseNetworkCapitalData(Object.keys(props.social.Give).length > 0 ? props.social.Give : Give)}
          small
        />
      </div>
    </div>
  </div>
);

const MapStateToProps = state => ({
  social: {
    ...(state.dashboard.userSocial ?
      state.dashboard.userSocial
      : {}),
    Network: {
      ...(state.dashboard.userSocial ?
        state.dashboard.userSocial.Network
        : {}),
      Partners: filler,
      'Trusted relationship': filler,
      'Board seats': filler,
      'Advisory roles': filler,
      'Total followers': filler,
      'Monthly blog views': filler,
    },
  }, // todo remove this stub later
});

export default connect(MapStateToProps)(SocialCapitalTable);

