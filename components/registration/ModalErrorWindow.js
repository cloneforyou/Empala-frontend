import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import style from './RegistrationFieldsStyle';

const ModalErrorWindow = (props) => {
  const actions = [
    <FlatButton
      label="Ok"
      style={style.cancelBtn}
      labelStyle={style.labelCancelBtn}
      onClick={props.handleClose}
    />
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={props.open}
      actionsContainerStyle={style.actionsContainer}
      contentStyle={style.contentStyle}
    >
     Registration denied: {props.message}
    </Dialog>
  );
};

ModalErrorWindow.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ModalErrorWindow;
