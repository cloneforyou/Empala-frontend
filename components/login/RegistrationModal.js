import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Link from 'next/link';
import style from '../registration/RegistrationFieldsStyle';

const RegistrationModal = (props) => {
  const actions = [
      <FlatButton
        label="No, thanks"
        style={style.cancelBtn}
        labelStyle={style.labelCancelBtn}
        onClick={props.handleClose}
      />,
    <Link href="/registration">
      <FlatButton
        label="Yes, register"
        style={style.returnBtn}
        labelStyle={style.labelReturnBtn}
      />
    </Link>,
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
      <p>There is no account related to provided social profile in our database.</p>
      <p>Do you want register new one?</p>
    </Dialog>
  );
};

RegistrationModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default RegistrationModal;
