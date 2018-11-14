import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import EmpalaSelect from '../../registration/EmpalaSelect';
import EmpalaInput from '../../registration/EmpalaInput';
import {
  closeModalAddManualBankAccount,
  changeModalAddManualBankAccountValueById,
  addManualBankAccount,
} from '../../../actions/funding';


class AddManualBankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      { value: 'SAVINGS', title: 'Savings' },
      { value: 'CHECKING', title: 'Checking' },
    ];
  }
  handleClose = (e) => {
    e.stopPropagation();
    this.props.closeModal();
  };

  handleChangeValue = (e) => {
    const { target: { value, id: rawId}  } = e;
    const id = rawId.split('.')[1];

    this.props.changeModalAddManualBankAccountValueById(id, value);

  };

  handleChangeSelect = (rawId, value, index) => {
    const id = rawId.split('.')[1];
    this.props.changeModalAddManualBankAccountValueById(id, value);
  };

  addBank = () => {
    if (!this.props.bankName || !this.props.accountType ||
      !this.props.routingNumber || !this.props.accountNumber ||
      this.props.routingNumber.length !== 9
    ) {
      return;
    }

    const data = {
      bankName: this.props.bankName,
      accountType: this.props.accountType,
      routingNumber: this.props.routingNumber,
      accountNumber: this.props.accountNumber,
    };

    this.props.closeModal();
    this.props.addManualBankAccount(data);
  };

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Create manual account
          </DialogTitle>
          <DialogContent>
            <EmpalaInput
              id="modalCreateBankAccount.bankName"
              type="text"
              label="Financial Institute"
              value={this.props.bankName}
              handleChange={this.handleChangeValue}
            />
            <EmpalaSelect
              id="modalCreateBankAccount.accountType"
              options={this.options|| ''}
              label="Account type"
              value={this.props.accountType}
              handleChange={this.handleChangeSelect}
              // // errorText={this.props.fieldsErrors.funding}
              hint="Choose account type"
            />
            <EmpalaInput
              id="modalCreateBankAccount.routingNumber"
              type="text"
              label="Routing number"
              value={this.props.routingNumber}
              handleChange={this.handleChangeValue}
            />
            <EmpalaInput
              id="modalCreateBankAccount.accountNumber"
              type="text"
              label="Account number"
              value={this.props.accountNumber}
              handleChange={this.handleChangeValue}
            />
          </DialogContent>
          <DialogActions>
            <button
              className="modal__btn modal__btn_green"
              onClick={this.addBank}
            >
              OK
            </button>
            <button
              className="default-btn"
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  state => ({
    open: state.funding.isOpenModalAddManualBankAccount,
    bankName: state.funding.modalCreateBankAccount.bankName,
    accountType: state.funding.modalCreateBankAccount.accountType,
    routingNumber: state.funding.modalCreateBankAccount.routingNumber,
    accountNumber: state.funding.modalCreateBankAccount.accountNumber,
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModalAddManualBankAccount()),
    changeModalAddManualBankAccountValueById: (id, value) => dispatch(changeModalAddManualBankAccountValueById(id, value)),
    addManualBankAccount: data => dispatch(addManualBankAccount(data)),
  }))(AddManualBankAccount);
