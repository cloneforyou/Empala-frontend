import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  LeagueSwitchBase: {
    '&$LeagueChecked': {
      color: theme.palette.common.white,
      '& + $LeagueBar': {
        backgroundColor: '#98c73a',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  LeagueChecked: {
    transform: 'translateX(15px)',
    '& + $LeagueBar': {
      opacity: 1,
      border: 'none',
    },
  },
  LeagueBar: {
    borderRadius: 13,
    width: 28,
    height: 13,
    marginTop: -6,
    marginLeft: -14,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  LeagueIcon: {
    width: 11,
    height: 11,
  },
  LeagueIconChecked: {
    boxShadow: theme.shadows[1],
  },
  LeagueLabel: {
    marginRight: -20,
  }
});

class Switcher extends Component {
  handleChange = label => {
    // this.setState((prevState) => {
    //   return { checked: label === 'Your', selected: label }
    // });
    this.props.toggleLeague(label);
  };

  render() {
    const { classes, selectedLeague } = this.props;
    return (
      <div className="switcher">
        <div className="row align-items-center justify-content-center">
          <button
            className={selectedLeague === 'community' ? "switcher__label switcher__label_checked" : "switcher__label"}
            onClick={() => this.handleChange('community')}
          >
            Empala network
          </button>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  classes={{
                    switchBase: classes.LeagueSwitchBase,
                    bar: classes.LeagueBar,
                    icon: classes.LeagueIcon,
                    iconChecked: classes.LeagueIconChecked,
                    checked: classes.LeagueChecked,
                  }}
                  onChange={() => this.handleChange()}
                  disableRipple
                  checked={selectedLeague === 'your'}
                  // value="Your network"
                />
              }
              classes={{
                label: classes.LeagueLabel
              }}
            />
          </FormGroup>
          <button
            className={selectedLeague === 'your' ? "switcher__label switcher__label_checked" : "switcher__label"}
            onClick={() => this.handleChange('your')}
          >
            Your network
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Switcher);
