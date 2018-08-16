import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {
  closeModal,
  logout,
  refreshTokens,
  restartSessionTimeout,
  setUploadableImage,
  uploadImage,
} from '../../../actions/dashboard';


class SessionExpire extends PureComponent {
  constructor(props) {
    super(props);
    this.actions = [
      <button
        className="modal__btn modal__btn_green"
        onClick={this.props.handleContinue}
      >Continue
      </button>,
      <button
        className="modal__btn modal__btn_outline modal__btn_right-shift10"
        onClick={this.props.logout}
      >Log out
      </button>,
    ]
  }

  render() {
    return (
      <Dialog
        onClose={this.props.handleCancel}
        aria-labelledby="simple-dialog-title"
        actions={this.actions}
        contentClassName="session-expire-container"
        actionsContainerClassName="session-expire-action-container session-expire-action-container_top-shift25"
        open={this.props.modalOpen}
      >
        <div className="session-expire__text-wrapper">
          <p className="session-expire__text"><i className="session-expire__icon session-expire__icon_shift" />Session Timeout</p>
          <p className="session-expire__text">Your online session will expire in</p>
          <div className="session-expire__counter">
            <span>{Math.floor(this.props.timeRemain / 60)} min </span>
            <span>{this.props.timeRemain - Math.floor(this.props.timeRemain / 60) * 60} sec</span>
          </div>
          <p className="session-expire__text">
            Please click “Continue” to keep working;
            or click “Log off” to end your session now.
          </p>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => (
  {
    modalOpen: state.dashboard.modalOpen && state.dashboard.openModalName === 'sessionExpire',
    timeRemain: state.timeout.timeRemain,
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleContinue: () => {
      dispatch(closeModal());
      dispatch(restartSessionTimeout());
      dispatch(refreshTokens());
    },
    logout: () => dispatch(logout()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SessionExpire);

