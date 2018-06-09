import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {
  cleanErrorText,
  closeModal,
  setInputFieldValueById, deleteAccount,
} from '../../../../../../actions/dashboard';


const style = {
  errorText: {
    fontSize: '12px',
    lineHeight: '12px',
    color: 'rgb(244, 67, 54)',
    margin: '10px 0',
  },
  warningTextBlock: {
    border: 'solid 1px #dfdfdf',
    marginBottom: '50px',
    marginTop: '60px',
    maxWidth: '900px',
    minHeight: '392px',
    padding: '20px 10px',
  },
  modalStyle: {
    border: 'solid 1px #c9c9c9',
    borderRadius: '19px',
    backdropFilter: 'blur(11.1px)',
    boxShadow: '0 6px 9px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
    height: '809px',
    maxWidth: '1083px',
    minWidth: '500px',
    width: '70vw',
  },
  approveInput: {
    width: '120px',
    height: '53px',
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
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.25,
    color: '#707070',
  },
  actionsContainer: {
    marginTop: '66px',
    paddingRight: '27%',
  },
};

const warningText = () => (
  <div style={style.warningTextBlock}>
    <h2>You are intending to delete account</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
      similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
      Et harum quidem rerum facilis est et expedita distinctio.
    </p>
  </div>
);

class DeleteAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.isDeletionConfirmed = () => this.props.confirmationInputValue && this.props.confirmationInputValue.toLowerCase() === 'yes';
  }

  render() {
    const actions = [
      <button
        className="default-btn"
        style={{ marginRight: '116px' }}
        onClick={this.props.handleCancel}
      >Cancel
      </button>,
      <button
        className="profile-btn profile-btn_red"
        onClick={this.props.submitDelete}
        disabled={!this.isDeletionConfirmed()}
      >Delete Account
      </button>,
    ];
    return (
      <Dialog
        onClose={this.props.handleCancel}
        aria-labelledby="simple-dialog-title"
        actions={actions}
        actionsContainerStyle={style.actionsContainer}
        open={this.props.modalOpen}
        paperProps={
          { style: style.modalStyle }
        }
      >
        <div>
          {warningText()}
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
          <div style={style.errorText}>{this.props.errorText || ''}</div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => (
  {
    confirmationInputValue: state.dashboard.membership_account_delete_confirm,
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
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);

