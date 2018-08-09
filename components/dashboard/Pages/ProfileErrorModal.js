import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import style from '../../registration/RegistrationFieldsStyle';

const ProfileErrorModal = (props) => {
  const actions = [
    <FlatButton
      label="Ok"
      style={style.returnBtn}
      labelStyle={style.labelReturnBtn}
      onClick={props.handleClose}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      open={props.open}
      actionsContainerStyle={style.actionsContainer}
      contentStyle={style.contentStyle}
    >
      <h2>Error while saving data</h2>
      <span>{props.message}</span>
    </Dialog>
  );
};

ProfileErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ProfileErrorModal;
