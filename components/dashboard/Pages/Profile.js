import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Membership from './Membership';
import UploadImage from '../UploadImage';
import Regulatory from './Regulatory';
import Experience from './Experience';
import Documents from './Documents';

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

class ScrollableTabsButtonAuto extends React.Component {
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
        <UploadImage />
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
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
