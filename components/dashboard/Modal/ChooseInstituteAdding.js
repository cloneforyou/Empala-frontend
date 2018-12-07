import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import {
  closeModalChooseInstituteAdding,
  openModalAddManualBankAccount,
} from '../../../actions/funding';
import PlaidLink from 'react-plaid-link';
import { Plaid } from '../../../keys.js';
import PlusIcon from '../../common/PlusIcon';
import { origin } from '../../../keys';


const getPlaidMode = originName => ((originName === 'prod' ? 'production' : 'sandbox'));
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
  };

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
          classes={{root: 'modal-choose-institute-adding'}}
        >
          <div className="title">
            Choose bank account
          </div>
          <div className="body">
            <div className="body__left-block">
              Find account in Plaid
              {!this.props.plaidDisabled && <PlaidLink
                onEvent={this.closeModalWhenOpenPlaid}
                className="adding-block"
                clientName="Empala"
                style={{}}
                env={getPlaidMode(origin)}
                product={['auth', 'transactions']}
                publicKey={Plaid.PLAID_PUBLIC_KEY}
                onExit={this.fixOverflow}
                onSuccess={(token, metadata) => {
                  this.props.addInstitution(token, metadata);
                  this.fixOverflow();
                }}
              >
                <PlusIcon backgroundColor="#b2d56b"
                          height="43px"
                          lineWidth="13px"
                          cursor="pointer"
                />
              </PlaidLink>}
              {this.props.plaidDisabled && <div className="count-limit-message">
                You can't add more this accounts
              </div>}
            </div>
            <div className="body__right-block">
              Create manual account
              {!this.props.manualCreateDisabled &&
              <div className="adding-block"
                      onClick={this.handleOpenAddManualBankAccount}
              >
                <PlusIcon backgroundColor="#b2d56b"
                          height="43px"
                          lineWidth="13px"
                          cursor="pointer"
                />
              </div>}
              {this.props.manualCreateDisabled && <div className="count-limit-message">
                You can't add more this accounts
              </div>}
            </div>
          </div>
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
