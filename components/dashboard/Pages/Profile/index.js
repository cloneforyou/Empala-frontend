import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Membership from './TabsContainers/Membership';
import Regulatory from './TabsContainers/Regulatory';
import Experience from './TabsContainers/Experience';
import Documents from './TabsContainers/Documents';
import OrderConfig from './TabsContainers/OrderConfig';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

});

class Profile extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root + ' tabs-line'}>
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
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <Documents />}
        {value === 5 && <OrderConfig />}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);