import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Dialog from 'material-ui/Dialog';
import {
  cleanErrorText,
  closeModal,
  setInputFieldValueById, deleteAccount,
} from '../../../../../../actions/dashboard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = {
  errorText: {
    fontSize: '12px',
    lineHeight: '12px',
    color: 'rgb(244, 67, 54)',
    margin: '10px 0',
  },
  warningTextBlock: {
    marginBottom: '50px',
    marginTop: '60px',
    padding: '20px 10px',
  },
  modalStyle: {
    border: 'solid 1px #c9c9c9',
    borderRadius: '19px',
    backdropFilter: 'blur(11.1px)',
    boxShadow: '0 6px 9px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
    height: '329px',
    width: '508px',
  },
  approveInput: {
    width: '88px',
    height: '39px',
    borderRadius: '8px',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
    border: 'solid 1px #c9c9c9',
    fontSize: '1,25em',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#707070',
  },
  confirmationText: {
    fontFamily: 'ProximaNova',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.21,
    color: '#707070',
    margin: '20px 0 20px 30px',
  },
  actionsContainer: {
    marginTop: '66px',
    paddingRight: '27%',
  },
  legalWording: {
    color: '#707070',
    fontFamily: 'ProximaNova-It',
    fontWeight: 300,
    overflow: 'auto',
    width: '450px',
    minHeight: '87px',
    maxHeight: '300px',
    fontStyle: 'oblique',
    border: '1px solid  #dfdfdf',
    margin: '0 6px 18px 6px',
    padding: '9px 14px',
    outline: 'none',
  },
  cancelBtn: {
    fontSize: '14px',
    marginBottom: '28px',
    padding: '5px 30px',
  },
  deleteBtn: {
    marginLeft: '15px',
    marginRight: '70px',
    marginBottom: '28px',
  },
};

class DeleteAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.isDeletionConfirmed = () => this.props.confirmationInputValue && this.props.confirmationInputValue.toLowerCase() === 'yes';
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.modalOpen}
          onClose={this.props.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h2 style={style.confirmationText}>Delete your account?</h2>
          <DialogContent>
            {/* <textarea
            id="membership_account_delete_legal_wording"
            onChange={this.props.setInputValue}
            style={style.legalWording}
            maxLength="300"
            value={this.props.legalWordingtext}
            placeholder="Legal wording"
          /> */}
            <div style={style.legalWording}>
              <p>Text box for legal wording - (to be stored in the database)</p>
            </div>
            <div style={{ textAlign: 'center' }}>

              <p
                style={style.confirmationText}
              >Type ‘yes’ to confirm you want to delete your account
              </p>
              <input
                id="membership_account_delete_confirm"
                type="text"
                style={style.approveInput}
                onChange={this.props.setInputValue}
                value={this.props.confirmationInputValue}
              />
              <div style={style.errorText}>
                {this.props.errorText || ''}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="default-btn"
              style={style.cancelBtn}
              onClick={this.props.handleCancel}
              disabled={this.props.confirmationInputValue !== 'yes'}
            >Cancel
            </button>
            <button
              className="profile-btn profile-btn_red"
              onClick={this.props.submitDelete}
              style={style.deleteBtn}
              disabled={!this.isDeletionConfirmed()}
            >Delete Account
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    confirmationInputValue: state.dashboard.membership_account_delete_confirm,
    legalWordingtext: state.dashboard.mmembership_account_delete_legal_wording,
    modalOpen: state.dashboard.modalOpen && state.dashboard.openModalName === 'accountDelete',
    errorText: state.dashboard.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setInputValue: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    submitDelete: () => dispatch(deleteAccount()),
    handleCancel: () => {
      dispatch(closeModal());
      dispatch(cleanErrorText());
      dispatch(setInputFieldValueById('membership_account_delete_confirm', ''));
      dispatch(setInputFieldValueById('membership_account_delete_legal_wording', ''));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
