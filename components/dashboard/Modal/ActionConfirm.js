import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeModal } from '../../../actions/dashboard';

class ActionConfirm extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    this.props.submitFunction();
    this.props.close();
  };

  handleClose = () => {
    this.props.close();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.props.title
          && <DialogTitle id="alert-dialog-title">
            {this.props.title}
          </DialogTitle>
          }
          <DialogContent>
            {this.props.content}
            <DialogContentText id="alert-dialog-description">
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="modal__btn modal__btn_green"
              onClick={this.handleSubmit}
            >
              OK
            </button>
            <button
              className="default-btn"
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  state => ({
  open: state.dashboard.modalOpen
    && state.dashboard.openModalName === 'actionModal',
}),
  dispatch => ({
    close: () => dispatch(closeModal()),
  }))(ActionConfirm);
