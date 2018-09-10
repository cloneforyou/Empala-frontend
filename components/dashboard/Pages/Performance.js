import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from '../Widget/WidgetTable';
import { widgetsPerformance } from '../../../localdata/dashboardWidgets';
import { initGA, logPageView } from '../../../utils/analytics';
import WidgetHead from '../Widget/WidgetHead';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getWidgetAttributesByName } from '../../../utils/dashboardUtils';
import { getInfoByZipCode } from '../../../actions/registration';
import {
  getLeagueData,
  resetRange,
  setInputFieldValueById,
  setTableSortSettings,
  toggleLeague,
} from '../../../actions/dashboard';
import CommunityLeagueTable from '../Widget/CommunityLeagueTable';


const PrivacyText = () => (
  <div className="performance-privacy-text">
    <p className="performance-privacy-text__content">
      Your configuration is set to high privacy. <br />
      League tables are not available in ‘Ostrich mode’. <br />
      Check your Application Settings to turn on this feature.
    </p>
  </div>
)
class Performance extends Component {
  constructor(props) {
    super(props);
    this.leagueWidget = getWidgetAttributesByName('dashboard_community_league');
  }
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    if (!this.props.isPrivate) this.props.getLeagueData();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {
            widgetsPerformance.slice(0, 2).map(widget => (
              <WidgetTable widget={widget} key={widget.id} />
            ))
          }
          <CommunityLeagueTable
            assetsRangeFrom={this.props.assetsRangeFrom}
            assetsRangeTo={this.props.assetsRangeTo}
            setInputValueById={this.props.setInputValueById}
            resetRange={this.props.resetRange}
            selectedLeague={this.props.selectedLeague}
            toggleLeague={this.props.toggleLeague}
            communityLeagueData={this.props.communityLeagueData}
            isPrivate={this.props.isPrivate}
            leagueLoadingStatus={this.props.leagueLoadingStatus}
            userId={this.props.userId}
            tableSortSettings={this.props.tableSortSettings('dashboard_community_league')}
            setTableSortSettings={this.props.setTableSortSettings}
          />
          {
            widgetsPerformance.slice(3).map(widget => (
              <WidgetTable widget={widget} key={widget.id} />
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assetsRangeFrom: state.dashboard.dashboard_community_league_rangeInputFrom || '',
  assetsRangeTo: state.dashboard.dashboard_community_league_rangeInputTo || '',
  selectedLeague: state.dashboard.selectedLeague,
  communityLeagueData: state.dashboard.communityLeagueData || [],
  isPrivate: state.dashboard.userData.data.profile.is_private,
  leagueLoadingStatus: state.dashboard.loaders.league,
  userId: state.dashboard.userData.data.profile.id,
  tableSortSettings: tableId => state.dashboard.tableSortSettings[tableId] || {
    direction: false,
    sortIndex: 0,
  },
});
const mapDispatchToProps = dispatch => ({
  setInputValueById: (e) => {
    const { id, value } = e.target;
    dispatch(setInputFieldValueById(id, value));
    return false;
  },
  resetRange: widgetName => dispatch(resetRange(widgetName)),
  toggleLeague: () => dispatch(toggleLeague()),
  getLeagueData: () => dispatch(getLeagueData()),
  setTableSortSettings: (tableId, sortIndex, direction) =>
    dispatch(setTableSortSettings(tableId, sortIndex, direction)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Performance);
