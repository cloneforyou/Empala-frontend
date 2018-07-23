import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Link from 'next/link';
import style from './RegistrationFieldsStyle';

const ModalWindow = (props) => {
  const actions = [
    <Link href="/">
      <FlatButton
        label="Cancel Registration"
        style={style.cancelBtn}
        labelStyle={style.labelCancelBtn}
      />
    </Link>,
    <FlatButton
      label="Return"
      onClick={props.handleClose}
      style={style.returnBtn}
      labelStyle={style.labelReturnBtn}
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
    >
      Sorry we are not yet able to open accounts with
      this characteristic but we are working on it.
    </Dialog>
  );
};

ModalWindow.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ModalWindow;
