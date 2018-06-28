import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PasswordReminderModal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Password expiration reminder</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We have noticed that you've been using your current password for a long time.
              We want to remind you that you need to update your password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="profile-btn profile-btn_green"
              onClick={this.props.handleClose}
              autoFocus
            >OK
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


PasswordReminderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PasswordReminderModal;
