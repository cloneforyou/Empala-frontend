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
import { getActiveAccountTab, changeActiveAccountTab } from '../../../../../actions/account';

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
              <Tab label="Global" />
              <Tab label="EMARA" />
              <Tab label="North America" />
              <Tab label="Canada" />
              <Tab label="UK" />
              <Tab label="France" />
              <Tab label="Singapore" />
              <Tab label="Australia" />
              <Tab label="Japan" />
            </Tabs>
          </AppBar>
        </div>
        <TitleBar />
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
  }),
  dispatch => ({
    setActivePage: page => dispatch(setActivePage(page)),
    getActiveAccountTab: () => dispatch(getActiveAccountTab()),
    changeActiveAccountTab: value => dispatch(changeActiveAccountTab(value)),
  }),
)(Account));