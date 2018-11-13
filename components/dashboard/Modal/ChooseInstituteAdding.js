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
import { Plaid } from '../../../utils/config';

class ChooseInstituteAdding extends React.Component {
  handleClose = (e) => {
    e.stopPropagation();
    this.props.closeModal();
  };

  handleOpenAddManualBankAccount = (e) => {
    e.stopPropagation();
    this.props.closeModal();
    this.props.openModalAddManualBankAccount();
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
            Choose bank
          </DialogTitle>
          <DialogContent>
            <div className="d-flex">
              <div style={{width: '200px', marginRight: '20px'}} >
                Find bank in Plaid
                <PlaidLink
                  onEvent={this.props.closeModal}
                  className="shadow"
                  style={{width: '200px', height: '100px'}}
                  clientName="Empala"
                  env="sandbox"
                  product={['auth', 'transactions']}
                  publicKey={Plaid.PLAID_PUBLIC_KEY}
                  onExit={this.props.handleOnExit}
                  onSuccess={(token, metadata) => this.props.addInstitution(token, metadata)}
                >
                  <span className="funding-ach-tiles-tile__plus" >+</span>
                </PlaidLink>
              </div>
              <div style={{width: '200px'}}>
                Create manual account
                <div className="shadow" style={{width: '200px', height: '100px', display: 'flex'}} onClick={this.handleOpenAddManualBankAccount}>
                  <span className="funding-ach-tiles-tile__plus align-self-center" >+</span>
                </div>
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
