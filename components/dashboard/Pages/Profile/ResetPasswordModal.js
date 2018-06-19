import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Link from 'next/link';
import style from '../../../registration/RegistrationFieldsStyle';
import EmpalaInput from '../../../registration/EmpalaInput';
import {
  cleanErrorText,
  closeModal,
  resetPassword,
  setInputFieldValueById,
} from '../../../../actions/dashboard';

const ResetPasswordModal = (props) => {
  const actions = [
    <FlatButton
      label="No, thanks"
      style={style.cancelBtn}
      labelStyle={style.labelCancelBtn}
      onClick={props.handleClose}
    />,
    <FlatButton
      label="Yes, register"
      style={style.returnBtn}
      labelStyle={style.labelReturnBtn}
      onClick={props.submitReset}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={this.handleClose}
      actionsContainerStyle={style.actionsContainer}
      contentStyle={style.contentStyle}
      overlayStyle={style.overlayDialogStyle}
      // style={this.styles.style}
    >
      <p>Please provide new password for your account</p>
      <div>
        <EmpalaInput
          key="reset_password"
          id="reset_password"
          type="password"
          label="New password"
          handleChange={e => props.setInputValueById(e)}
          errorText={props.fieldsErrorText.reset_password}
          value={props.password}
        />
        <EmpalaInput
          key="reset_password_confirm"
          id="reset_password_confirm"
          type="password"
          label="Confirm new password"
          handleChange={e => props.setInputValueById(e)}
          errorText={props.fieldsErrorText.reset_password_confirm}
          value={props.passwordConfirm}
        />
        {/* <FlatButton */}
        {/* label="Save" */}
        {/* style={style.submitBtn} */}
        {/* labelStyle={style.labelSubmitBtn} */}
        {/* onClick={handleSubmit} */}
        {/* /> */}
      </div>
    </Dialog>
  );
};

ResetPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  submitReset: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    open: state.dashboard.modalOpen && state.dashboard.openModalName === 'resetPassword',
    errorText: state.dashboard.error,
    fieldsErrorText: state.profile.fieldsErrors,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setInputValue: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    submitReset: () => dispatch(resetPassword()),
    handleClose: () => {
      dispatch(closeModal());
      dispatch(cleanErrorText());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);
