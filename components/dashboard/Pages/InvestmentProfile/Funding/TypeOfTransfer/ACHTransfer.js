import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';

import EmpalaInput from '../../../../../registration/EmpalaInput';
import AddInstitutionContainer from '../AddInstitutionContainer';
import MicroDepositsApprove from '../../../../Modal/MicroDepositsApprove';


const TransferForm = props => {
  const transferFromToFieldsValue = (inputField) => {
    let result = '';

    if (inputField === 'from') {
      if (props.transfer_direction === 'Inbound') {
        props.institutionsList.forEach((item) => {
          if (item.ACHRelationshipId === props.selected_institution) {
            result = `****${item.accountMask}`;
          }
        });
      }
      if (props.transfer_direction === 'Outbound') {
        result = props.selectedAccount ? 'Empala - US Account' : '';
      }
    } else if (inputField === 'to') {
      if (props.transfer_direction === 'Outbound') {
        props.institutionsList.forEach((item) => {
          if (item.ACHRelationshipId === props.selected_institution) {
            result = `****${item.accountMask}`;
          }
        });
      }
      if (props.transfer_direction === 'Inbound') {
        result = props.selectedAccount ? 'Empala - US Account' : '';
      }
    }
    return result;
  };

  return (
    <div className="funding-ach-payment-box dark-theme">
      <h2 className="funding-content-header__title funding-ach-payment-box_title-margin">Transfer funds</h2>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaInput
          id="transfer_from"
          type="text"
          label="From Account"
          value={transferFromToFieldsValue('from')}
        />
      </div>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaInput
          id="transfer_to"
          type="text"
          label="To Account"
          value={transferFromToFieldsValue('to')}
        />
      </div>
      <div className="funding-ach-payment-box_input-margin">
        <NumberFormat
          customInput={EmpalaInput}
          id="ach_amount"
          type="text"
          label="Amount"
          value={props.ach_amount ? props.ach_amount : ''}
          handleChange={props.setInputValueById}
          decimalScale={2}
          allowEmptyFormatting
          thousandSeparator
          prefix="$"
        />
      </div>
      {
        props.submitted &&
        <p>Your funds will be immediately available on the Empala Platform.</p>
      }
      <div className="text-center">
        <button
          className="profile-btn profile-btn_green funding-ach-payment-box_button-margin"
          onClick={
            props.submitted
              ? props.achTransfer
              : props.submit
          }
        >
          {props.submitted ? 'Confirm' : 'Submit'}
        </button>
      </div>
      {
        props.errorDeposit &&
        <div className="funding__error text-center mt-3">
          some errors occur
        </div>
      }
    </div>
  );
};

const Tile = props => (
  <Fragment>
    <div
      className="funding-ach-tiles-tile"
      onClick={() => {
        if (props.isCustom && props.currentStatus === 'PENDING') {
          props.openModalMicroDepositsApprove({
            institutionId: props.institutionId,
            institutionName: props.institution_name,
            institutionMask: props.account_no,
            institutionType: props.institutionType,
          });
          return;
        }
        props.setPaymentIntitution(props.ACHRelationshipId);
      }}
      role="button"
    >
      <div
        className="funding-ach-tiles-tile__delete"
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          props.removeInstitution(props.ACHRelationshipId);
        }}
      >
        &times;
      </div>
      <div className="funding-ach-tiles-tile__image">
        <span>{props.institution_name}</span>
        {props.isCustom && <div>{props.currentStatus}</div>}
      </div>
      <div className="funding-ach-tiles-tile__text">
        <span className={`funding-ach-tiles-tile__check
         ${(props.selected_institution !== props.ACHRelationshipId) && 'd-none'}`}
        />
        Account: {`****${props.account_no.slice(-4)}`}
      </div>
    </div>
  </Fragment>
);

const EmpalaAccount = props => (
  <div
    className="funding-ach-tiles-tile"
    onClick={() => props.setPaymentAccount(props.currentApexAccountNumber)}
    role="button"
  >
    <div className="test" />
    <div className="funding-ach-tiles-tile__text">
      <span className={`funding-ach-tiles-tile__check
       ${(props.selectedAccount !== props.currentApexAccountNumber) && 'd-none'}`}
      />
      Individual Cash Account
    </div>
  </div>
);


export default class ACHTransfer extends React.Component {
  componentDidMount() {
    this.props.getInstitutions();
  }

  componentWillUnmount() {
    this.props.closeModalChooseInstituteAdding();
    this.props.closeModalAddManualBankAccount();
    this.props.closeModalMicroDepositsApprove();
  }

  render() {
    return (
      <Fragment>
        <div className="funding-content__body">
          <div className="funding__bank-and-account-list-container">
            <div className="funding__bank-and-account-list">
              <div className="bank-and-account-list__item">
                <h2 className="funding-content-header__title ach_title-margin">Linked Bank Accounts</h2>
                <div className="funding-ach-tiles">
                  {this.props.institutionsList.map(item => (
                    <Tile
                      key={item.ACHRelationshipId}
                      institutionId={item.institution_id}
                      ACHRelationshipId={item.ACHRelationshipId}
                      institution_name={item.name}
                      account_no={item.accountMask}
                      setPaymentIntitution={this.props.setPaymentIntitution}
                      selected_institution={this.props.selected_institution}
                      removeInstitution={this.props.removeInstitution}
                      openModal={this.props.openModal}
                      isCustom={item.custom}
                      currentStatus={item.status}
                      openModalMicroDepositsApprove={this.props.openModalMicroDepositsApprove}
                      institutionType={item.institutionType}
                    />
                  ))}
                  <AddInstitutionContainer
                    addInstitution={this.props.addInstitution}
                    openModalChooseInstituteAdding={this.props.openModalChooseInstituteAdding}
                    institutionsList={this.props.institutionsList}
                  />
                </div>
              </div>
              <div className="bank-and-account-list__divider" />
              <div className="bank-and-account-list__item">
                <h2 className="funding-content-header__title ach_title-margin">Empala Accounts</h2>
                <div className="funding-ach-tiles">
                  <EmpalaAccount
                    setPaymentAccount={this.props.setPaymentAccount}
                    selectedAccount={this.props.selectedAccount}
                    currentApexAccountNumber={this.props.currentApexAccountNumber}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <TransferForm {...this.props} />
          </div>
        </div>
        <MicroDepositsApprove />
      </Fragment>
    );
  }
}

