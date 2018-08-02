import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleBar from '../../../../components/dashboard/TitleBar';
import GlobalPortfolio from './AccountTabs/GlobalPortfolio';
import { withStyles } from '@material-ui/core/styles';
import { GREEN } from '../../../../constants/colors';

const styles = theme => ({
  indicator: {
    backgroundColor: GREEN,
  },
});

class Account extends Component {
  render() {
    const { classes, currentColorScheme } = this.props;
    return (
      <div>
        <div className="account__tabs">
          <AppBar
            position="static"
            style={{ backgroundColor: currentColorScheme === 'light' ? "#f3f3f3" : "#211f39" }}
          >
            <Tabs
              value="0"
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
              style={{ color: "#808895" }}
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
            </Tabs>
          </AppBar>
        </div>
        <TitleBar />
        <GlobalPortfolio />
      </div>
    );
  }
};

export default withStyles(styles)(connect((state) => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}), null)(Account));