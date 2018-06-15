import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#98c73a',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 22,
    height: 13,
    marginTop: -6,
    marginLeft: -8,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 11,
    height: 11,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class Switcher extends Component {
  state = {
    checked: true,
    selected: 'Your'
  };

  handleChange = label => {
    this.setState((prevState) => {
      return { checked: label === 'Your', selected: label }
    });
  };

  render() {
    const { classes } = this.props;
    const { selected, checked } = this.state
    return (
      <div className="switcher">
        <div className="row align-items-center justify-content-center">
          <button
            className={selected === 'Empala' ? "switcher__label switcher__label_checked" : "switcher__label"}
            onClick={() => this.handleChange('Empala')}
          >
            Empala network
          </button>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  classes={{
                    switchBase: classes.iOSSwitchBase,
                    bar: classes.iOSBar,
                    icon: classes.iOSIcon,
                    iconChecked: classes.iOSIconChecked,
                    checked: classes.iOSChecked,
                  }}
                  disableRipple
                  checked={checked}
                  value="Your network"
                />
              }
            />
          </FormGroup>
          <button
            className={selected === 'Your' ? "switcher__label switcher__label_checked" : "switcher__label"}
            onClick={() => this.handleChange("Your")}
          >
            Your network
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Switcher);
