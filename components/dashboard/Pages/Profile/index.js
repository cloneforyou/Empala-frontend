import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Membership from './TabsContainers/Membership';
import Regulatory from './TabsContainers/Regulatory';
import Experience from './TabsContainers/Experience';
import Documents from './TabsContainers/Documents';
import AppSettings from './TabsContainers/AppSettings';
import Account from './TabsContainers/Account';
import { getActiveTabProfile, changeActiveTabProfile } from '../../../../actions/profile';
import { withStyles } from '@material-ui/core/styles';
import { GREEN } from '../../../../constants/colors';

const styles = theme => ({
  indicator: {
    backgroundColor: GREEN,
  },
});

class Profile extends Component {

  handleChange = (event, value) => {
    this.props.changeActiveTabProfile(value);
  };

  render() {
    const value = this.props.tabValue;
    const { classes, currentColorScheme } = this.props;
    return (
      <div className="tabs-line">
        <AppBar
          position="static"
          style={{ backgroundColor: currentColorScheme === 'light' ? "#f3f3f3" : "#211f39" }}
        >
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="auto"
            style={{ color: "#808895" }}
            classes={{
              indicator: classes.indicator,
            }}
          >
            <Tab label="Membership" />
            <Tab label="Regulatory" />
            <Tab label="Experience" />
            <Tab label="Account" />
            <Tab label="Documents" />
            <Tab label="Application Settings" />
            <Tab label="Notifications" />
          </Tabs>
        </AppBar>
        {value === 0 && <Membership />}
        {value === 1 && <Regulatory />}
        {value === 2 && <Experience />}
        {value === 3 && <Account />}
        {value === 4 && <Documents />}
        {value === 5 && <AppSettings />}
        {value === 6 && <div>Item Seven</div>}
      </div>
    );
  }
}


export default withStyles(styles)(connect((state) => ({
  tabValue: state.profile.tabValue,
  currentColorScheme: state.dashboard.currentColorScheme,
}), (dispatch => ({
  getActiveTabProfile: () => dispatch(getActiveTabProfile()),
  changeActiveTabProfile: (value) => dispatch(changeActiveTabProfile(value)),
})))(Profile));