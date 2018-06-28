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
import OrderConfig from './TabsContainers/OrderConfig';
import Account from './TabsContainers/Account';
import { getActiveTabProfile, changeActiveTabProfile } from '../../../../actions/profile';


class Profile extends Component {

  handleChange = (event, value) => {
    this.props.changeActiveTabProfile(value);
  };

  render() {
    const value = this.props.tabValue;

    return (
      <div className="tabs-line">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="auto"
            style={{ color: "#808895" }}
          >
            <Tab label="Membership" />
            <Tab label="Regulatory" />
            <Tab label="Experience" />
            <Tab label="Account" />
            <Tab label="Documents" />
            <Tab label="Order Config" />
            <Tab label="Notifications" />
          </Tabs>
        </AppBar>
        {value === 0 && <Membership />}
        {value === 1 && <Regulatory />}
        {value === 2 && <Experience />}
        {value === 3 && <Account />}
        {value === 4 && <Documents />}
        {value === 5 && <OrderConfig />}
        {value === 6 && <div>Item Seven</div>}
      </div>
    );
  }
}


export default connect((state) => ({
  tabValue: state.profile.tabValue,
}), (dispatch => ({
  getActiveTabProfile: () => dispatch(getActiveTabProfile()),
  changeActiveTabProfile: (value) => dispatch(changeActiveTabProfile(value)),
})))(Profile);