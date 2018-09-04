import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from '../Widget/WidgetTable';
import { widgetsPerformance } from '../../../localdata/dashboardWidgets';
import { initGA, logPageView } from '../../../utils/analytics';
import WidgetHead from '../Widget/WidgetHead';
import EmpalaTable from '../EmpalaTable';
import { getWidgetAttributesByName } from '../../../utils/dashboardUtils';
import { getInfoByZipCode } from '../../../actions/registration';
import { resetRange, setInputFieldValueById, toggleLeague } from '../../../actions/dashboard';

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
                <EmpalaTable
                  tableName="dashboard_community_league"
                  tableData={[]}
                  striped
                  headerSmall
                />
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
});
const mapDispatchToProps = dispatch => ({
  setInputValueById: (e) => {
    const { id, value } = e.target;
    dispatch(setInputFieldValueById(id, value));
    return false;
  },
  resetRange: widgetName => dispatch(resetRange(widgetName)),
  toggleLeague: () => dispatch(toggleLeague()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Performance);
