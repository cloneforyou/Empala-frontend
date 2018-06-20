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
  setInputFieldValueById,
} from '../../../../actions/dashboard';
import { resetPassword } from '../../../../actions/profile';

const styles = {
  formWrapper: {
    width: '350px',
    margin: '10px auto',
    textAlign: 'left',
  },
};
const ResetPasswordModal = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      style={style.cancelBtn}
      labelStyle={style.labelCancelBtn}
      onClick={props.handleClose}
    />,
    <FlatButton
      label="Save"
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
      <div style={styles.formWrapper}>
        <EmpalaInput
          key="reset_password"
          id="reset_password"
          type="password"
          label="New password"
          handleChange={props.setInputValue}
          errorText={props.fieldsErrorText.reset_password}
          value={props.password}
        />
        <EmpalaInput
          key="reset_password_confirm"
          id="reset_password_confirm"
          type="password"
          label="Confirm new password"
          handleChange={props.setInputValue}
          errorText={props.fieldsErrorText.reset_password_confirm}
          value={props.passwordConfirm}
        />
        <p>Type in old password here</p>
        <EmpalaInput
          key="reset_password_old"
          id="reset_password_old"
          type="password"
          label="Old password"
          handleChange={props.setInputValue}
          errorText={props.errorText === 'Invalid credentials' ? 'Wrong password' : props.fieldsErrorText.reset_password_old}
          value={props.oldPassword}
        />
        <p className="errorText">{props.errorText}</p>
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
    password: state.profile.profileUserData.reset_password,
    oldPassword: state.profile.profileUserData.reset_password_old,
    passwordConfirm: state.profile.profileUserData.reset_password_confirm,
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
