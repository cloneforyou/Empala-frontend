import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const style = {
  contentStyle: {
    width: '508px',
    textAlign: 'center',
    boxShadow: '2px 4px 20px 0 rgba(0, 0, 0, 0.34)',
    backgroundColor: '#ffffff',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
  },
  actionsContainer: {
    textAlign: 'center',
    paddingBottom: '50px',
  },
  icon: {
    width: '60px',
    height: '60px',
    display: 'inline-block',
    margin: '25px 0',
  },
};
const getContentByName = (name) => {
  switch (name) {
    case 'invalidState':
      return (
        <Fragment>
          <img src="../../static/images/Timeline.svg" alt="alert icon" style={style.icon} />
          <p>
            Unfortunately, we are not covering your state at this time.
          </p>
          <p>WORDING WORDING WORDING!!!</p>
          <p>
            Or, we will contact you as soon as our timeline <br />
            gets to your boring state.
          </p>
        </Fragment>
      );
    case 'invalidResidential':
      return (
        <Fragment>
          <img src="../../static/images/exclaimation.svg" alt="alert icon" style={style.icon} />
          <p>As the Empala... Lorem Lorem Lorem Lorem Lorem Lorem Lorem ...</p>
          <p>
            Thank you for... Lorem Lorem Lorem Lorem Lorem....
          </p>
        </Fragment>
      );
    default:
      return null;
  }
};

const AlertModal = (props) => {
  const handleClose = () => {
    props.handleClose();
    if (props.name === 'invalidResidential') window.location.href = '/';
  };
  const actions = [
    <button
      className="modal__btn modal__btn_green"
      onClick={handleClose}
    >Continue
    </button>,
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={props.handleClose}
      actionsContainerStyle={style.actionsContainer}
      contentStyle={style.contentStyle}
      // overlayStyle={style.overlayDialogStyle}
    >
      { getContentByName(props.name) }
    </Dialog>
  );
};

AlertModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default AlertModal;
