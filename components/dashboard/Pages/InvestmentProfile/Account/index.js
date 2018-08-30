import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleBar from '../../../TitleBar';
import GlobalPortfolio from './AccountTabs/GlobalPortfolio';
import { withStyles } from '@material-ui/core/styles';
import {
  GREEN,
  MAIN_COLOR_TEXT_GRAY,
  CONCRETE,
  MIRAGE,
} from '../../../../../constants/colors';
import { setActivePage } from '../../../../../actions/dashboard';
import {
  getActiveAccountTab,
  changeActiveAccountTab,
  changeSectionTitleBar,
}from '../../../../../actions/account';
import {
  GlobalPortfolioData,
  NorthAmericaAccountData,
} from '../../../../../localdata/globalPortfolio';


const styles = theme => ({
  indicator: {
    backgroundColor: GREEN,
    height: '6px',
  },
});

const TABS = [{
  label: 'Global',
  pageName: 'Global Portfolio',
}, {
  label: 'EMARA',
  pageName: 'EMARA Tokens',
}, {
  label: 'North America',
  pageName: 'North America Account',
  flag: 'usa',
}, {
  label: 'Canada',
  pageName: 'Canada Account',
  flag: 'canada',
}, {
  label: 'UK',
  pageName: 'United Kingdom Account',
  flag: 'uk',
}, {
  label: 'France',
  pageName: 'France Account',
  flag: 'france',
}, {
  label: 'Singapore',
  pageName: 'Singapore Account',
}, {
  label: 'Australia',
  pageName: 'Australia Account',
  flag: 'australia',
}, {
  label: 'Japan',
  pageName: 'Japan Account',
  flag: 'japan',
}];


class Account extends Component {
  handleChange = (event, value) => {
    this.props.changeActiveAccountTab(value);
  };

  render() {
    const { classes, currentColorScheme } = this.props;
    const value = this.props.activeAccountTab;

    return (
      <div className="account">
        <div className="account__tabs">
          <AppBar
            position="static"
            style={{ backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE }}
          >
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
              style={{ color: MAIN_COLOR_TEXT_GRAY }}
              classes={{
                indicator: classes.indicator,
              }}
            >
              {TABS.map(({ label, pageName, flag = null }) => {
                return  (
                  <Tab
                    key={label}
                    label={label}
                    onClick={() => {this.props.changeSectionTitleBar(pageName, flag)}}
                  />
                );
              })}
            </Tabs>
          </AppBar>
        </div>
        <TitleBar
          currentSectionTitleBar={this.props.currentSectionTitleBar}
          iconAccountTitleBar={this.props.iconAccountTitleBar}
        />
        {
          value === 0 &&
          <GlobalPortfolio
          setActivePage={this.props.setActivePage}
          textButton={'Fund account'}
          globalData={GlobalPortfolioData}
          />
        }
        {value === 1 && <div className="account__container">Coming Spring 2019</div>}
        {
          value === 2 &&
          <GlobalPortfolio
          textButton={'Fund US account'}
          globalData={NorthAmericaAccountData}
          />
        }
        {value === 3 && <div className="account__container">Coming Spring 2019</div>}
        {value === 4 && <div className="account__container">Coming as part of phase 2</div>}
        {value === 5 && <div className="account__container">Coming as part of phase 2</div>}
        {value === 6 && <div className="account__container">Coming as part of phase 2</div>}
        {value === 7 && <div className="account__container">Coming as part of phase 2</div>}
        {value === 8 && <div className="account__container">Coming as part of phase 3</div>}
      </div>
    );
  }
}

export default withStyles(styles)(connect(
  state => ({
    activeAccountTab: state.account.activeAccountTab,
    currentColorScheme: state.dashboard.currentColorScheme,
    currentSectionTitleBar: state.account.currentSectionTitleBar,
    iconAccountTitleBar: state.account.iconAccountTitleBar,
  }),
  dispatch => ({
    setActivePage: page => dispatch(setActivePage(page)),
    getActiveAccountTab: () => dispatch(getActiveAccountTab()),
    changeActiveAccountTab: value => dispatch(changeActiveAccountTab(value)),
    changeSectionTitleBar: (tab, icon) => dispatch(changeSectionTitleBar(tab, icon)),
  }),
)(Account));