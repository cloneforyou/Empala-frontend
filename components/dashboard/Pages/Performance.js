import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from '../Widget/WidgetTable';
import { widgetsPerformance } from '../../../localdata/dashboardWidgets';
import { initGA, logPageView } from '../../../utils/analytics';
import WidgetHead from '../Widget/WidgetHead';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getWidgetAttributesByName } from '../../../utils/dashboardUtils';
import { getInfoByZipCode } from '../../../actions/registration';
import { getLeagueData, resetRange, setInputFieldValueById, toggleLeague } from '../../../actions/dashboard';


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
          <div
            className={`widget-col col ${this.leagueWidget.col_md && `col-md-${this.leagueWidget.col_md}`} col-xl-${this.leagueWidget.col}`}
            // key={this.widget.id}
          >
            <div className="widget" style={{ maxHeight: `${this.leagueWidget.height}px` }}>
              <WidgetHead
                widget={this.leagueWidget}
                assetsRangeFrom={this.props.assetsRangeFrom}
                assetsRangeTo={this.props.assetsRangeTo}
                setInputValueById={this.props.setInputValueById}
                resetRange={this.props.resetRange}
                selectedLeague={this.props.selectedLeague}
                toggleLeague={this.props.toggleLeague}

              />
              <div style={{ width: '100%' }}>
                { // todo add privacy status check
                 !this.props.isPrivate ?
                   <div>
                     <EmpalaTable
                    tableName="dashboard_community_league"
                    tableData={this.props.communityLeagueData}
                    striped
                    headerSmall
                   />
                     <div className="performance-community-league__footer">
                       {formatNumberWithFixedPoint(this.props.communityLeagueData.length)} Total
                     </div>
                   </div>
                   :
                   <PrivacyText />
                }
              </div>
            </div>
          </div>
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
  isPrivate: state.dashboard.userData.is_private,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Performance);
