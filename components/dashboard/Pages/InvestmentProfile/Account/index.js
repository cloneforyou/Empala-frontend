import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleBar from '../../../TitleBar';
import GlobalPortfolio from './AccountTabs/GlobalPortfolio';
import USPortfolio from './AccountTabs//USPortfolio';
import { withStyles } from '@material-ui/core/styles';
import {
  GREEN,
  MAIN_COLOR_TEXT_GRAY,
  CONCRETE,
  MIRAGE,
} from '../../../../../constants/colors';
import {
  getETNAData,
  setActivePage,
  openModal,
  deleteAccount,
} from '../../../../../actions/dashboard';
import {
  getActiveAccountTab,
  changeActiveAccountTab,
  changeSectionTitleBar,
  setInputValueForAccount,
  saveInputValueForAccount,
}from '../../../../../actions/account';
import { getGlobalAccounts } from '../../../../../actions/funding';
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
  prefix: '',
}, {
  label: 'EMARA',
  pageName: 'EMARA Tokens',
  prefix: 'emara',
}, {
  label: 'North America',
  pageName: 'North America Account',
  flag: 'usa',
  prefix: 'north_america',
}, {
  label: 'Canada',
  pageName: 'Canada Account',
  flag: 'canada',
  prefix: 'canada',
}, {
  label: 'UK',
  pageName: 'United Kingdom Account',
  flag: 'uk',
  prefix: 'uk',
}, {
  label: 'France',
  pageName: 'France Account',
  flag: 'france',
  prefix: 'france',
}, {
  label: 'Singapore',
  pageName: 'Singapore Account',
  prefix: 'singapore',
}, {
  label: 'Australia',
  pageName: 'Australia Account',
  flag: 'australia',
  prefix: 'australia',
}, {
  label: 'Japan',
  pageName: 'Japan Account',
  flag: 'japan',
  prefix: 'japan',
}];


class Account extends Component {
  componentDidMount() {
    this.props.getBalance();
    this.props.getGlobalAccounts();
  }

  handleChange = (event, value) => {
    this.props.changeActiveAccountTab(value);
  };

  render() {
    const { classes, currentColorScheme, global_accounts, openModal, submitDelete } = this.props;
    const value = this.props.activeAccountTab;
    const accounts = ((global_accounts || {}).data || {}).data || {};

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
          accounts={accounts}
          setActivePage={this.props.setActivePage}
          globalData={GlobalPortfolioData}
          prefix={TABS[0].prefix}
          accountBalance={this.props.accountBalance.ETNA}
          currentColorScheme={currentColorScheme}
          setInputValueForAccount={this.props.setInputValueForAccount}
          saveInputValueForAccount={this.props.saveInputValueForAccount}
          fieldsErrors={this.props.fieldsErrors}
          />
        }
        {value === 1 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming Spring 2019</div>}
        {
          value === 2 &&
          <USPortfolio
          accounts={accounts} // todo should be filtered with BD related to North America when we will receive account broker-dealer name
          globalData={GlobalPortfolioData}
          prefix={TABS[2].prefix}
          accountBalance={this.props.accountBalance.ETNA}
          currentColorScheme={currentColorScheme}
          openModal={openModal}
          submitDelete={submitDelete}
          setInputValueForAccount={this.props.setInputValueForAccount}
          saveInputValueForAccount={this.props.saveInputValueForAccount}
          fieldsErrors={this.props.fieldsErrors}
          />
        }
        {value === 3 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming Spring 2019
        </div>}
        {value === 4 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming as part of phase 2
        </div>}
        {value === 5 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming as part of phase 2
        </div>}
        {value === 6 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming as part of phase 2
        </div>}
        {value === 7 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming as part of phase 2
        </div>}
        {value === 8 &&
        <div
          className="account__container"
          style={{backgroundColor: currentColorScheme === 'light' ? CONCRETE : MIRAGE}}>
          Coming as part of phase 3
        </div>}
      </div>
    );
  }
}

export default withStyles(styles)(connect(
  state => ({
    accountBalance: state.dashboard.accountBalance || {
      ETNA: {},
      },
    activeAccountTab: state.account.activeAccountTab,
    currentColorScheme: state.dashboard.currentColorScheme,
    currentSectionTitleBar: state.account.currentSectionTitleBar,
    iconAccountTitleBar: state.account.iconAccountTitleBar,
    global_accounts: state.funding.global_accounts,
    fieldsErrors: state.profile.fieldsErrors,
  }),
  dispatch => ({
    setActivePage: page => dispatch(setActivePage(page)),
    getActiveAccountTab: () => dispatch(getActiveAccountTab()),
    getBalance: () => dispatch(getETNAData('balance')),
    getGlobalAccounts: () => dispatch(getGlobalAccounts()),
    changeActiveAccountTab: value => dispatch(changeActiveAccountTab(value)),
    changeSectionTitleBar: (tab, icon) => dispatch(changeSectionTitleBar(tab, icon)),
    openModal: name => dispatch(openModal(name)),
    submitDelete: () => dispatch(deleteAccount()),
    setInputValueForAccount: (account, id) => dispatch(setInputValueForAccount(account, id)),
    saveInputValueForAccount: id => dispatch(saveInputValueForAccount(id)),
  }),
)(Account));