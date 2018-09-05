import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const leagueWidget = getWidgetAttributesByName('dashboard_community_league');

const PrivacyText = () => (
  <div className="performance-privacy-text">
    <p className="performance-privacy-text__content">
      Your configuration is set to high privacy. <br />
      League tables are not available in ‘Ostrich mode’. <br />
      Check your Application Settings to turn on this feature.
    </p>
  </div>
);

const parseLeagueData = data => data.map((item, index) =>
  [
    { value: index + 1 }, // Rank
    { value: item.FakedRankMember.basic_information.full_name}, // Name
    { value: formatNumberWithFixedPoint(item.annual_percent_return, 1) }, // 'Ann % R
    { value: formatNumberWithFixedPoint(item.total_percent_return, 1) }, // Total % R
    { value: formatNumberWithFixedPoint(item.total_net_return, 1) }, // Total $ Ret
    { value: formatNumberWithFixedPoint(item.total_net_value, 2) }, // Total $ Val
    { value: formatNumberWithFixedPoint(item.x1yr_percent_return, 1) }, // 1YR % R
    { value: formatNumberWithFixedPoint(item.x3m_percent_return, 1) }, // 3M % R
    { value: formatNumberWithFixedPoint(item.x1m_percent_return, 1) }, // 1M % R
  ]);

const CommunityLeagueTable = props => (
  <div
    className={`widget-col col ${leagueWidget.col_md && `col-md-${leagueWidget.col_md}`} col-xl-${leagueWidget.col}`}
    // key={widget.id}
  >
    <div className="widget" style={{ maxHeight: `${leagueWidget.height}px` }}>
      <WidgetHead
        widget={leagueWidget}
        assetsRangeFrom={props.assetsRangeFrom}
        assetsRangeTo={props.assetsRangeTo}
        setInputValueById={props.setInputValueById}
        resetRange={props.resetRange}
        selectedLeague={props.selectedLeague}
        toggleLeague={props.toggleLeague}

      />
      <div style={{ width: '100%' }}>
        {
          !props.isPrivate ?
            <div>
              <EmpalaTable
                tableName="dashboard_community_league"
                tableData={parseLeagueData(props.communityLeagueData)}
                striped
                headerSmall
                dividerIndex={9}
              />
              <div className="performance-community-league__footer">
                {formatNumberWithFixedPoint(props.communityLeagueData.length)} Total
              </div>
            </div>
            :
            <PrivacyText />
        }
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    ordersList: state.dashboard.parsedOrdersList || [],
  };
}

export default CommunityLeagueTable;

