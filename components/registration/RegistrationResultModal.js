import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import style from './RegistrationFieldsStyle';

const RegistrationResultModal = (props) => {
  const actionsFailed = [
    <FlatButton
      label="Ok"
      style={style.cancelBtn}
      labelStyle={style.labelCancelBtn}
      onClick={props.handleClose}
    />,
  ];
  const actionsSuccess = [
    <FlatButton
      label="Proceed to log in"
      style={{ ...style.returnBtn, width: 'auto' }}
      labelStyle={style.labelReturnBtn}
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
        props.success ? <h2>Registration successful</h2>
          : <span>Registration denied: {props.message}</span>
      }
    </Dialog>
  );
};

RegistrationResultModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default RegistrationResultModal;
