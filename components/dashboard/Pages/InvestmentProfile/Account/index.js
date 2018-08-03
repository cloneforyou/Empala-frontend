import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleBar from '../../../TitleBar';
import GlobalPortfolio from './AccountTabs/GlobalPortfolio';
import { withStyles } from '@material-ui/core/styles';
import { GREEN } from '../../../../../constants/colors';
import { setActivePage } from '../../../../../actions/dashboard';
import {
  getActiveAccountTab,
  changeActiveAccountTab,
  changeSectionTitleBar,
}from '../../../../../actions/account';

const styles = theme => ({
  indicator: {
    backgroundColor: GREEN,
    height: '6px',
  },
});

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
            style={{ backgroundColor: currentColorScheme === 'light' ? '#f3f3f3' : '#211f39' }}
          >
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
              style={{ color: '#808895' }}
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab label="Global" onClick={() => {this.props.changeSectionTitleBar('Global Portfolio')}} />
              <Tab label="EMARA" onClick={() => {this.props.changeSectionTitleBar('EMARA Tokens')}} />
              <Tab label="North America" onClick={() => {this.props.changeSectionTitleBar('North America Account', 'usa')}} />
              <Tab label="Canada" onClick={() => {this.props.changeSectionTitleBar('Canada Account', 'canada')}} />
              <Tab label="UK" onClick={() => {this.props.changeSectionTitleBar('United Kingdom Account', 'uk')}} />
              <Tab label="France" onClick={() => {this.props.changeSectionTitleBar('France Account', 'france')}} />
              <Tab label="Singapore" onClick={() => {this.props.changeSectionTitleBar('Singapore Account')}} />
              <Tab label="Australia" onClick={() => {this.props.changeSectionTitleBar('Australia Account', 'australia')}} />
              <Tab label="Japan" onClick={() => {this.props.changeSectionTitleBar('Japan Account', 'japan')}} />
            </Tabs>
          </AppBar>
        </div>
        <TitleBar currentSectionTitleBar={this.props.currentSectionTitleBar} iconAccountTitleBar={this.props.iconAccountTitleBar} />
        {value === 0 && <GlobalPortfolio
          setActivePage={this.props.setActivePage}
          textButton={'Fund account'}
        />
        }
        {value === 1 && <div className="account__container">Coming Spring 2019</div>}
        {value === 2 && <GlobalPortfolio textButton={'Fund US account'}/>}
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