import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  closeModalChooseInstituteAdding,
  openModalAddManualBankAccount,
} from '../../../actions/funding';
import PlaidLink from 'react-plaid-link';
import { Plaid } from '../../../keys.js';

class ChooseInstituteAdding extends React.Component {
  handleClose = () => {
    this.props.closeModal();
  };

  handleOpenAddManualBankAccount = (e) => {
    e.stopPropagation();
    this.props.closeModal();
    this.props.openModalAddManualBankAccount();
  };

  closeModalWhenOpenPlaid = (e) => {
    if (e !== 'OPEN') return;
    this.props.closeModal();
  }

  fixOverflow = () => {
    setTimeout(() => {
      const body = document.body;
      body.style.overflow = null;
    }, 0)
  };

  render() {
    return (
      <div onClick={e => e.stopPropagation()}
           className="modal-choose-institute-adding"
      >
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Choose bank account
          </DialogTitle>
          <DialogContent>
            <div className="d-flex">
              <div style={{width: '200px', marginRight: '20px'}} >
                Find account in Plaid
                {!this.props.plaidDisabled && <PlaidLink
                  onEvent={this.closeModalWhenOpenPlaid}
                  className="shadow"
                  style={{width: '200px', height: '100px'}}
                  clientName="Empala"
                  env="sandbox"
                  product={['auth', 'transactions']}
                  publicKey={Plaid.PLAID_PUBLIC_KEY}
                  onExit={this.fixOverflow}
                  onSuccess={(token, metadata) => {
                    this.props.addInstitution(token, metadata);
                    this.fixOverflow();
                  }}
                >
                  <span className="funding-ach-tiles-tile__plus" >+</span>
                </PlaidLink>}
                {this.props.plaidDisabled && <div>
                  You can't add more this accounts
                </div>}
              </div>
              <div style={{width: '200px'}}>
                Create manual account
                {!this.props.manualCreateDisabled &&
                <button className="shadow"
                     style={{width: '200px', height: '100px', display: 'flex'}}
                     onClick={this.handleOpenAddManualBankAccount}
                >
                  <span className="funding-ach-tiles-tile__plus align-self-center" >+</span>
                </button>}
                {this.props.manualCreateDisabled && <div>
                  You can't add more this accounts
                </div>}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  state => ({
    open: state.funding.isOpenModalChooseInstituteAdding,
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModalChooseInstituteAdding()),
    openModalAddManualBankAccount: () => dispatch(openModalAddManualBankAccount()),
  }))(ChooseInstituteAdding);
