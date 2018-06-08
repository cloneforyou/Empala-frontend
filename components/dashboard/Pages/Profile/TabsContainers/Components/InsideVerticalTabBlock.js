import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabsRoot: {
    borderRight: '1px solid #e8e8e8',
    width: 120,
  },
  flexContainer: {
    flexDirection: 'column',
  },
  tabsIndicator: {
    display: 'none',
  },
  tabRoot: {
    minWidth: 'auto',
    width: '100%',
    textTransform: 'initial',
    fontWeight: 500,
    color: '#808895',
    fontSize: '16px !important',
    marginRight: 0,
    borderLeft: '4px solid #808895',
    marginBottom: '5px',
    '&:hover': {
      color: '#98c73a',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#98c73a',
    },
    '&:focus': {
      color: '#98c73a',
    },
  },
  tabSelected: {
    borderLeft: '4px solid #98c73a',
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class InsideVerticalTabBlock extends Component {
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
      <div className={classes.root + ' default-order'}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, flexContainer: classes.flexContainer, indicator: classes.tabsIndicator }}
        >
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Stocks"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Options"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Forex"
          />
        </Tabs>
        <div className="default-order__wrapper">
          {value === 0 && <div>One</div>}
          {value === 1 && <div>Item Two</div>}
          {value === 2 && <div>Item Three</div>}
        </div>
      </div>
    );
  }
}

InsideVerticalTabBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsideVerticalTabBlock);