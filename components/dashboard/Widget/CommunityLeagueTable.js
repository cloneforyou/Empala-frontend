import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';
import DashboardInfoPopup from '../Modal/DashboardInfoPopup';


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
// const myId = 502;
const parseLeagueData = (data, myId) => data.map((item, index) =>
  [
    { value: index + 1, bold: item.member_id === myId }, // Rank
    { value: item.FakedRankMember ? item.FakedRankMember.basic_information.full_name : 'Anonymous', bold: item.member_id === myId }, // Name
    { value: formatNumberWithFixedPoint(item.annual_percent_return, 1), bold: item.member_id === myId }, // 'Ann % R
    { value: formatNumberWithFixedPoint(item.total_percent_return, 1), bold: item.member_id === myId }, // Total % R
    { value: formatNumberWithFixedPoint(item.total_net_return, 1), bold: item.member_id === myId }, // Total $ Ret
    { value: formatNumberWithFixedPoint(item.total_net_value, 2), bold: item.member_id === myId }, // Total $ Val
    { value: formatNumberWithFixedPoint(item.x1yr_percent_return, 1), bold: item.member_id === myId }, // 1YR % R
    { value: formatNumberWithFixedPoint(item.x3m_percent_return, 1), bold: item.member_id === myId }, // 3M % R
    { value: formatNumberWithFixedPoint(item.x1m_percent_return, 1), bold: item.member_id === myId }, // 1M % R
    // { value: item.member_id },
  ]);

const setTableSortSettings = (name, sortIndex, direction, setSortSettings) => {
  console.log(name, sortIndex, direction);
  setSortSettings(
    name,
    sortIndex,
    (() => {
      if (!direction) return 'asc';
      return direction === 'asc' ? 'desc' : 'asc';
    })(),
  );
};
const sortByColumn = (data, col, order) => {
  const fields = [
    'rank',
    'name',
    'annual_percent_return',
    'total_percent_return',
    'total_net_return',
    'total_net_value',
    'x1yr_percent_return',
    'x3m_percent_return',
    'x1m_percent_return',
  ];
  if (!order) return data;
  const newData = [...data];
  return newData.sort((a, b) => {
    if (!a[fields[col]]) return 1;
    if (!b[fields[col]]) return -1;
    if (a[fields[col]] === b[fields[col]]) return 0;
    if (order === 'asc') {
      if (!isNaN(a[fields[col]]) && !isNaN(b[fields[col]])) return a[fields[col]] - b[fields[col]];
      if (a[fields[col]].value > b[fields[col]].value) return 1;
      if (a[fields[col]].value < b[fields[col]].value) return -1;
    }
    if (order === 'desc') {
      if (!isNaN(a[fields[col]]) && !isNaN(b[fields[col]])) return b[fields[col]] - a[fields[col]];
      if (a[fields[col]] > b[fields[col]]) return -1;
      if (a[fields[col]] < b[fields[col]]) return 1;
    }
    return false;
  });
};
const limitDataByAssetsRange = (data, min, max, assetType) => {
  if (!data) return [];
  if (max && min && (+max < +min)) return [];
  if (!min || !assetType) return data;
  return data.filter(el => el[assetType] >= +min && el[assetType] < (max || Number.POSITIVE_INFINITY));
};
const findMyIndex = (data, myId) => data.findIndex(el => el.member_id === myId);
const getTableData = (data, myId, assetsMin, assetsMax) => {
  if (!data) return [];
  const myIndex = findMyIndex(data, myId);
  console.log('my index ===>>>', myIndex)
  const rangedData = limitDataByAssetsRange(data, assetsMin, assetsMax, 'total_net_value');
  // return myIndex <= 11 ?
  //   parseLeagueData(rangedData.slice(0, 10), myId) :
  //   parseLeagueData([...rangedData.slice(0, 10), ...rangedData.slice(myIndex - 1, myIndex + 5)], myId);
  return parseLeagueData(rangedData, myId);
  // const myIndex = data.findIndex(el => el[9] === myId);
  // const rangedData = limitDataByAssetsRange(data, assetsMin, assetsMax, 5);
  // return myIndex <= 11 ?
  //   rangedData.slice(0, 10) :
  //   [...rangedData.slice(0, 10), ...rangedData.slice(myIndex - 1, myIndex + 5)];
};


const CommunityLeagueTable = (props) => {
  const sortedData = sortByColumn(
    props.communityLeagueData,
    props.tableSortIndex,
    props.tableSortDirection,
  );
  const callbacks = Array(9).fill((e, name, index, direction) =>
    setTableSortSettings(name, index, direction, props.setTableSortSettings));
  return (
    <div
      className={`widget-col col ${leagueWidget.col_md && `col-md-${leagueWidget.col_md}`} col-xl-${leagueWidget.col}`}
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
          <DashboardInfoPopup name={leagueWidget.id} />
          {
          !props.isPrivate ?
            <div>
              <EmpalaTable
                tableName="dashboard_community_league"
                tableData={
                  getTableData(
                    sortedData,
                    props.userId,
                    props.assetsRangeFrom,
                    props.assetsRangeTo,
                  )
                }
                striped
                headerSmall
                dividerIndex={getTableData(sortedData, props.userId).length > 10 && 9}
                dividerEndIndex={findMyIndex(sortedData, props.userId) - 1}
                callbacks={callbacks}
                tableSortIndex={props.tableSortIndex}
                tableSortDirection={props.tableSortDirection}
                sortExternal
                leagueDividerShow={props.leagueDividerShow}
                toggleLeagueDivider={props.toggleLeagueDivider}
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
};


export default CommunityLeagueTable;

