import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';
import { formatNumberWithFixedPoint } from '../../../../utils/dashboardUtils';
import AddInstitutionContainer from './AddInstitutionContainer';
import ActionConfirm from '../../Modal/ActionConfirm';
import MicroDepositsApprove from '../../Modal/MicroDepositsApprove';

const TransferForm = props => {
  const transferFromToFieldsValue = (inputField) => {
    let result = '';

    if (inputField === 'from') {
      if (props.transfer_direction_ACH === 'Inbound') {
        result = props.selected_institution || '';
      }
      if (props.transfer_direction_ACH === 'Outbound') {
        result = props.selectedAccount ? 'Empala - US Account' : '';
      }
    } else if (inputField === 'to') {
      if (props.transfer_direction_ACH === 'Outbound') {
        result = props.selected_institution || '';
      }
      if (props.transfer_direction_ACH === 'Inbound') {
        result = props.selectedAccount ? 'Empala - US Account' : '';
      }
    }
    return result;
  };

  return (
    <div className="funding-ach-payment-box dark-theme">
      <h2 className="funding-content-header__title funding-ach-payment-box_title-margin">Transfer funds</h2>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaSelect
          id="transfer_direction_ACH"
          options={props.options.transfer_direction}
          label="Transfer direction"
          value={props.transfer_direction_ACH || ''}
          handleChange={props.setSelectedValueById}
          // errorText={this.props.fieldsErrors.funding}
          hint="Choose transfer direction"
        />
      </div>
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
          // value="Empala - US Account"
          value={transferFromToFieldsValue('to')}
        />
      </div>
      <div className="funding-ach-payment-box_input-margin">
        <NumberFormat
          customInput={EmpalaInput}
          // value={this.props.value}
          id="ach_amount"
          type="text"
          label="Amount"
          value={props.ach_amount ? props.ach_amount : ''}
          handleChange={props.setInputValueById}
          decimalScale={2}
          allowEmptyFormatting
          thousandSeparator
          prefix='$'
        />
      </div>
      {
        props.submitted &&
        <p>Your funds will be immediately available on the Empala Platform.</p>
      }
      <div style={{textAlign: 'center'}}>
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
      {props.errorDeposit && <div className="funding__error text-center mt-3">
        some errors occur
      </div>}
    </div>
    );
};

const Tile = props => (
  <Fragment>
    <div
      className="funding-ach-tiles-tile"
      onClick={() => {
        if (props.isCustom && props.currentStatus === 'PENDING') {
          props.openModalMicroDepositsApprove(props.institutionId);
          return;
        };
        props.setPaymentIntitution(props.institution_name);
      }}
      role="button"
    >
      <div
        className="funding-ach-tiles-tile__delete"
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          props.removeInstitution(props.institutionId);
         //  props.openModal('actionModal');
        }}
      >
        &times;
      </div>
      <div className="funding-ach-tiles-tile__image">
        {/*<img src="..." alt={props.institution_name} />*/}
        <span>{props.institution_name}</span>
        {props.isCustom && <div>{props.currentStatus}</div>}
      </div>
      <div className="funding-ach-tiles-tile__text">
        <span className={`funding-ach-tiles-tile__check
         ${(props.selected_institution !== props.institution_name) && 'd-none'}`}
        />
        Account: {`****${props.account_no.slice(-4)}`}
      </div>
      {/*<ActionConfirm*/}
        {/*text="Are you sure to delete this institution link?"*/}
        {/*submitFunction={() => props.removeInstitution(props.institutionId)}*/}
      {/*/>*/}
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
            <div className="funding-ach-selection-box__input no-gutters d-flex" >
              <EmpalaSelect
                id="funding_type"
                options={this.props.options.funding}
                label="Account funding"
                value={this.props.funding_type || ''}
                handleChange={this.props.setSelectedValueById}
                // errorText={this.props.fieldsErrors.funding}
                hint="Choose funding type"
              />
            </div>
            <div className="funding__bank-and-account-list">
              <div className="bank-and-account-list__item">
                <h2 className="funding-content-header__title ach_title-margin">Linked Bank Accounts</h2>
                <div className="funding-ach-tiles">
                  {this.props.institutionsList.map(item => (
                    <Tile
                      key={item.institution_id}
                      institutionId={item.institution_id}
                      institution_name={item.name}
                      account_no={item.accounts[0].mask || ''} // TODO investigate about account no
                      setPaymentIntitution={this.props.setPaymentIntitution}
                      selected_institution={this.props.selected_institution}
                      removeInstitution={this.props.removeInstitution}
                      openModal={this.props.openModal}
                      isCustom={item.custom}
                      currentStatus={item.status}
                      openModalMicroDepositsApprove={this.props.openModalMicroDepositsApprove}
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

