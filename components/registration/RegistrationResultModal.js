import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import style from './RegistrationFieldsStyle';
import logo from '../../static/images/icon-empala.svg';


const successContent = () => (
  <div style={{ paddingTop: '50px' }}>
    <div className="text-center">
      <img src={logo} style={style.registrationModalLogo} alt="Logo" />
    </div>
    <p style={style.sucessWording}>
      Thank you for your interest in opening an account with Empala Securities. <br />
      We are excited to have you as a client.<br />
      We will email you shortly once your account has been opened.<br />
    </p>
  </div>
);
const RegistrationResultModal = (props) => {
  const actionsFailed = [
    <FlatButton
      label="OK"
      style={style.cancelBtn}
      labelStyle={style.labelCancelBtn}
      onClick={props.handleClose}
    />,
  ];
  const actionsSuccess = [
    <FlatButton
      label="OK"
      style={style.cancelResultBtn}
      labelStyle={style.labelResultBtn}
      onClick={() => window.location.assign('/')}
    />,
  ];

  return (
    <Dialog
      actions={props.success ? actionsSuccess : actionsFailed}
      modal={props.success}
      open={props.open}
      actionsContainerStyle={style.actionsContainer}
      contentStyle={style.contentStyle}
    >
      {
        props.success ? successContent()
          : <span>Registration denied: {props.message}</span>
      }
    </Dialog>
  );
};

RegistrationResultModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default RegistrationResultModal;
