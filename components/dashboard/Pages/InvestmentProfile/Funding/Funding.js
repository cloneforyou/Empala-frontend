/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DashboardInfoPopup from '../../../Modal/DashboardInfoPopup';
import TitleBar from '../../../TitleBar';
import { Link } from '../../../../../routes';
import EmpalaSelect from '../../../../registration/EmpalaSelect';
import {
  addInstitution,
  addNewSecurity,
  dropFundingType,
  getInstitutions, removeInstitution,
  removeSecurity,
  setInputFieldValueById,
  setPaymentIntitution,
  setSecuritiesInputValue,
  togglePlaidLink,
  ACHDeposit,
  ALPSTransfer,
  initFundsTransfer,
  submitTransfer,
  getAccounts,
  getACHTransactionList,
  cancelACHTransfer,
  setPaymentAccount,
  ACHWithdraw,
  openModalChooseInstituteAdding,
  closeModalChooseInstituteAdding,
  closeModalAddManualBankAccount,
  openModalMicroDepositsApprove,
  closeModalMicroDepositsApprove,
  getDTCNumbersRequest,
  selectBrokerageFirm,
  setActiveFundingTab,
} from '../../../../../actions/funding';
import { openModal, setActivePage } from '../../../../../actions/dashboard';
import CheckTransfer from './TypeOfTransfer/CheckTransfer';
import ACHTransfer from './TypeOfTransfer/ACHTransfer';
import PlusIcon from '../../../../common/PlusIcon';
import AccountForTransfers from './AccountForTransfers';
import PendingTransaction from './PendingTransaction';
import AccountTransfer from './TypeOfTransfer/AccountTransfer';
import WireTransfer from './TypeOfTransfer/WireTransfer';
import TabMenu from './TabMenu';


const TransactionRow = (props) => {
  const [year, month, day] = props.initiated_time.split('T')[0].split('-');
  const formattedYear = `${year[2]}${year[3]}`;
  const formattedDay = `${day[0] === '0' ? '' : day[0]}${day[1] ? day[1] : ''}`;
  const formattedAmount = props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="ACH-transaction-list__value-container">
      <div className="ACH-transaction-list__value ACH-transaction-list__initiated-col">
        {month}/{formattedDay}/{formattedYear}
      </div>
      <div className="ACH-transaction-list__value ACH-transaction-list__from-col">
        {props.transfer_direction === 'INCOMING' ? props.institution_name : props.apex_account_number}
      </div>
      <div className="ACH-transaction-list__value ACH-transaction-list__to-col">
        {props.transfer_direction === 'INCOMING' ? props.apex_account_number : props.institution_name}
      </div>
      <div className="ACH-transaction-list__value ACH-transaction-list__amount-col">
        $ {formattedAmount}
      </div>
      <div className="ACH-transaction-list__value ACH-transaction-list__status-col">
        In progress
      </div>
      <div
        className="ACH-transaction-list__cancel-col d-flex justify-content-center align-items-center"
        onClick={() => props.cancelACHTransfer({ transactionId: props.transfer_id })}
      >
        <PlusIcon
          backgroundColor="transparent"
          color="#b2d56b"
          rotate="45deg"
          height="20px"
          cursor="pointer"
        />
      </div>
    </div>

  );
};


const FundingFooter = props => (
  <div className="funding-footer">
    <button
      className="profile-btn profile-btn_green"
      style={{ height: '30px' }}
      onClick={() => props.setActivePage('global portfolio')}
    >
      <Link
        route="dashboard"
        params={{ page: 'global portfolio' }}
      >
        <span >Fund later
        </span>
      </Link>
    </button>
    <div className="funding-footer__text">
      <p>You have 30 days remaining to access the Empala platform.</p>
      <p>You can fund your account at any time by clicking the wallet on the top of the screen.</p>
    </div>
  </div>
);

class Funding extends Component {
  constructor(props) {
    super(props);
    this.options = {
      funding: [
        { value: 'ACH transfer', title: 'ACH transfer' },
        { value: 'Account transfer', title: 'Account transfer' },
        { value: 'Check', title: 'Check transfer' },
        { value: 'Wire', title: 'Wire transfer' },
      ],
      transfer_type: [
        { value: 'Full transfer', title: 'Full transfer' },
        { value: 'Partial transfer', title: 'Partial transfer' },
      ],
      account_type: [
        { value: 'Single', title: 'Individual' },
        { value: 'Joint', title: 'Joint' },
      ],
    };
    this.alpsTransferHandler = this.alpsTransferHandler.bind(this);
    this.achTransfer = this.achTransfer.bind(this);
    this.validateACHTransferFields = this.validateACHTransferFields.bind(this);
    this.interval = null;
  }

  componentDidMount() {
    this.props.getACHTransactionList();
    this.props.getAccounts();
    this.interval = setInterval(() => this.props.getACHTransactionList(), 15000);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  isSpecifiedTypeSelected(type, value) {
    return value ? this.props[type] === value : this.props[type];
  }

  displayFooter() {
    if (!this.isSpecifiedTypeSelected('funding_type') ||
      this.isSpecifiedTypeSelected('funding_type', 'Fund Later')) return true;
    return this.isSpecifiedTypeSelected('funding_type', 'Account Transfer')
      && !this.isSpecifiedTypeSelected('transfer_type');
  }

  alpsTransferHandler() {
    // Todo add validate after
    if (!this.props.account_no || !this.props.member_first_name || !this.props.brokerage_firm ||
      !this.props.member_last_name || (this.props.member_primary_ssn &&
        this.props.member_primary_ssn.replace(/-/g, '').length !== 9)) return;


    const data = {
      deliveryAccountType: this.props.account_type,
      transferType: this.props.transfer_type === 'Full transfer' ? 'FULL_TRANSFER' : 'PARTIAL_TRANSFER_RECEIVER',
      deliveryAccount: this.props.account_no,
      deliveryPrimarySsnOrTaxId: this.props.member_primary_ssn.replace(/-/g, ''),
      deliveryAccountTittle: `${this.props.member_title} ${this.props.member_first_name} ${this.props.member_last_name}`,
      participantNumber: this.props.brokerage_firm.value,
    };

    if (this.props.member_secondary_ssn) {
      data.deliverySecondarySsnOrTaxId = this.props.member_secondary_ssn.replace(/-/g, '');
    }

    if (this.props.transfer_type === 'Partial transfer') {
      data.assets = [];
      data.comment = this.props.funding_comments;

      if (this.props.partial_symbols.length) {
        this.props.partial_symbols.forEach((item) => {
          data.assets.push({
            assetType: 'symbol',
            identifier: item.symbol.toUpperCase(),
            amount: item.quantity,
            isShort: item.symbol.length <= 3,
          });
        });
      }
    }

    if (data.assets && data.assets.length === 0) return;

    this.props.ALPSTransfer(data);
  }

  validateACHTransferFields() {
    if (!this.props.selected_institution || !this.props.ach_amount ||
      !this.props.selectedAccountForACH || !this.props.transfer_direction_ACH) return;

    this.props.submitTransfer();
  }

  achTransfer() {
    if (!this.props.selected_institution || !this.props.ach_amount ||
      !this.props.selectedAccountForACH || !this.props.transfer_direction_ACH) return;

    let ACH_relation_id;

    this.props.institutionsList.forEach((item) => {
      if (item.ACHRelationshipId !== this.props.selected_institution) return;
      ACH_relation_id = item.ACHRelationshipId;
    });

    const data = {
      amount: this.props.ach_amount,
      ACHRelationshipId: ACH_relation_id,
    };

    if (this.props.transfer_direction_ACH === 'Inbound') {
      this.props.ACHDeposit(data);
    } else if (this.props.transfer_direction_ACH === 'Outbound') {
      this.props.ACHWithdraw(data);
    }
  }

  render() {
    return (
      <div className="funding">
        <TitleBar />
        <div className="container-fluid">
          <div className="funding-wrapper dark-theme">
            <TabMenu
              transferDirection={this.props.transfer_direction}
              setActiveFundingTab={this.props.setActiveFundingTab}
            />
            <div className="funding-content">
              <DashboardInfoPopup name="funding_transfer_approved" />
              <AccountForTransfers />
              <hr />
              <div className="funding-content-body">
                <div className="row no-gutters mb-5">
                  <div className="col-6 no-gutters mw-186">
                    <EmpalaSelect
                      id="funding_type"
                      options={this.options.funding}
                      label="Account funding"
                      value={this.props.funding_type || ''}
                      handleChange={this.props.setSelectedValueById}
                      hint="Choose funding type"
                    />
                  </div>
                  {
                    this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                    <AccountTransfer
                      alpsTransferHandler={this.alpsTransferHandler}
                      transferTypeOptions={this.options.transfer_type}
                      accountTypeOptions={this.options.account_type}
                      isSpecifiedTypeSelected={this.isSpecifiedTypeSelected}
                    />
                  }
                </div>
                {
                  this.isSpecifiedTypeSelected('funding_type', 'Check') &&
                  <CheckTransfer transferDirectiOnoptions={this.options.transfer_direction} />
                }
                {
                  this.displayFooter() &&
                  <FundingFooter
                    setActivePage={this.props.setActivePage}
                  />
                }
              </div>
              {
                this.isSpecifiedTypeSelected('funding_type', 'ACH transfer') &&
                <ACHTransfer
                  funding_type={this.props.funding_type}
                  linked_accounts={this.props.linked_accounts}
                  setSelectedValueById={this.props.setSelectedValueById}
                  setInputValueById={this.props.setInputValueById}
                  options={this.options}
                  selected_institution={this.props.selected_institution}
                  ach_amount={this.props.ach_amount}
                  achTransfer={this.achTransfer}
                  setPaymentIntitution={this.props.setPaymentIntitution}
                  togglePlaidLink={this.props.togglePlaidLink}
                  plaid_link_active={this.props.plaid_link_active}
                  addInstitution={this.props.addInstitution}
                  institutionsList={this.props.institutionsList}
                  getInstitutions={this.props.getInstitutions}
                  removeInstitution={this.props.removeInstitution}
                  errorDeposit={this.props.errorDeposit}
                  submitted={this.props.isTransferSubmitted}
                  submit={this.validateACHTransferFields}
                  error={this.props.error}
                  setPaymentAccount={this.props.setPaymentAccount}
                  selectedAccount={this.props.selectedAccountForACH}
                  currentApexAccountNumber={this.props.currentApexAccountNumber}
                  transfer_direction={this.props.transfer_direction}
                  openModal={this.props.openModal}
                  openModalChooseInstituteAdding={this.props.openModalChooseInstituteAdding}
                  closeModalChooseInstituteAdding={this.props.closeModalChooseInstituteAdding}
                  closeModalAddManualBankAccount={this.props.closeModalAddManualBankAccount}
                  openModalMicroDepositsApprove={this.props.openModalMicroDepositsApprove}
                  closeModalMicroDepositsApprove={this.props.closeModalMicroDepositsApprove}
                />
              }
              {
                this.isSpecifiedTypeSelected('funding_type', 'Wire') &&
                <WireTransfer
                  funding_type={this.props.funding_type}
                  linked_accounts={this.props.linked_accounts}
                  setSelectedValueById={this.props.setSelectedValueById}
                  setInputValueById={this.props.setInputValueById}
                  options={this.options}
                  selected_institution={this.props.selected_institution}
                  ach_amount={this.props.ach_amount}
                  achTransfer={this.achTransfer}
                  setPaymentIntitution={this.props.setPaymentIntitution}
                  togglePlaidLink={this.props.togglePlaidLink}
                  plaid_link_active={this.props.plaid_link_active}
                  addInstitution={this.props.addInstitution}
                  institutionsList={this.props.institutionsList}
                  getInstitutions={this.props.getInstitutions}
                  removeInstitution={this.props.removeInstitution}
                  errorDeposit={this.props.errorDeposit}
                  submitted={this.props.isTransferSubmitted}
                  submit={this.validateACHTransferFields}
                  error={this.props.error}
                  setPaymentAccount={this.props.setPaymentAccount}
                  selectedAccount={this.props.selectedAccountForACH}
                  currentApexAccountNumber={this.props.currentApexAccountNumber}
                  transfer_direction={this.props.transfer_direction}
                  openModal={this.props.openModal}
                  openModalChooseInstituteAdding={this.props.openModalChooseInstituteAdding}
                  closeModalChooseInstituteAdding={this.props.closeModalChooseInstituteAdding}
                  closeModalAddManualBankAccount={this.props.closeModalAddManualBankAccount}
                  openModalMicroDepositsApprove={this.props.openModalMicroDepositsApprove}
                  closeModalMicroDepositsApprove={this.props.closeModalMicroDepositsApprove}
                />
              }
              <PendingTransaction
                funding_type={this.props.funding_type}
                ACHTransactionList={this.props.ACHTransactionList}
                getACHTransactionList={this.props.getACHTransactionList}
                cancelACHTransfer={this.props.cancelACHTransfer}
                openModal={this.props.openModal}
                TransactionRow={TransactionRow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  funding_type: state.funding.funding_type,
  transfer_type: state.funding.transfer_type,
  transfer_direction: state.funding.transfer_direction || 'Inbound',
  account_type: state.funding.account_type,
  account_no: state.funding.account_no || state.funding.account_number,
  member_secondary_ssn: state.funding.member_secondary_ssn,
  member_primary_ssn: state.funding.member_primary_ssn,
  member_title: state.funding.member_title,
  member_first_name: state.funding.member_first_name,
  member_last_name: state.funding.member_last_name,
  member_address: {
    city: state.profile.profileUserData.identity_residential_address_city,
    state: state.profile.profileUserData.identity_residential_address_state,
    country: state.profile.profileUserData.identity_residential_address_country,
    zipCode: state.profile.profileUserData.identity_residential_address_zip_code,
    line1: state.profile.profileUserData.identity_residential_address_residential_address_line_1,
    line2: state.profile.profileUserData.identity_residential_address_residential_address_line_2,
  },
  member_information: {
    firstName: state.profile.profileUserData.basic_information_first_name,
    lastName: state.profile.profileUserData.basic_information_last_name,
    prefix: state.profile.profileUserData.basic_information_prefix,
  },
  funding_comments: state.funding.funding_comments,
  partial_symbols: state.funding.partial_symbols,
  selected_institution: state.funding.selected_institution || '',
  ach_amount: state.funding.ach_amount,
  check_amount: state.funding.check_amount,
  check_memo: state.funding.check_memo,
  plaid_link_active: state.funding.plaid_link_active,
  institutionsList: state.funding.institutionsList,
  errorDeposit: state.funding.errorDeposit,
  errorALPS: state.funding.errorALPS,
  isTransferSubmitted: state.funding.transferSubmitted,
  error: state.funding.error,
  apexAccounts: (state.funding.memberAccountsData || {}).apex || [],
  ACHTransactionList: state.funding.ACHTransactionList,
  selectedAccountForACH: state.funding.selected_account_for_ACH,
  currentApexAccountNumber: state.funding.memberAccountsData ? state.funding.memberAccountsData.apex[0].account_number : '',
  DTCNumbers: state.funding.DTCNumbers,
  brokerage_firm: state.funding.brokerage_firm,
});
const mapDispatchToProps = dispatch => ({
  setSelectedValueById: (id, value, index) => {
    if (index || index === 0) return dispatch(setSecuritiesInputValue(id, index, value));
    if (id === 'funding_type' && value !== 'Account transfer') dispatch(dropFundingType());
    dispatch(setInputFieldValueById(id, value));
    dispatch(setInputFieldValueById('errorALPS', ''));
    dispatch(setInputFieldValueById('errorDeposit', ''));
  },
  setInputValueById: (e, index) => {
    const { id, value } = e.target;
    if (index || index === 0) {
      if (id === 'quantity') return dispatch(setSecuritiesInputValue(id, index, value.replace(/\D/, '')));
      return dispatch(setSecuritiesInputValue(id, index, value));
    }
    // TODO remove after
    // if (id === 'account_no' || id === 'ach_amount') return dispatch(setInputFieldValueById(id, value.replace(/\D|[^.]/, '')));
    if (id === 'ach_amount') return dispatch(setInputFieldValueById(id, value.replace(/\D|[^.]/, '')));
    if (id === 'check_memo' && value.length > 30) return false;

    return dispatch(setInputFieldValueById(id, value));
  },
  setActivePage: (page) => {
    dispatch(dropFundingType());
    dispatch(setActivePage(page));
  },
  addSecurity: () => dispatch(addNewSecurity()),
  removeSecurity: i => dispatch(removeSecurity(i)),
  setPaymentIntitution: name => dispatch(setPaymentIntitution(name)),
  togglePlaidLink: () => dispatch(togglePlaidLink()),
  addInstitution: (token, data) => dispatch(addInstitution(token, data)),
  removeInstitution: id => dispatch(removeInstitution(id)),
  getInstitutions: () => dispatch(getInstitutions()),
  ACHDeposit: data => dispatch(ACHDeposit(data)),
  ACHWithdraw: data => dispatch(ACHWithdraw(data)),
  ALPSTransfer: data => dispatch(ALPSTransfer(data)),
  handleCheckTransfer: () => dispatch(initFundsTransfer('check')),
  submitTransfer: () => dispatch(submitTransfer()),
  getAccounts: () => dispatch(getAccounts()),
  getACHTransactionList: () => dispatch(getACHTransactionList()),
  cancelACHTransfer: data => dispatch(cancelACHTransfer(data)),
  setPaymentAccount: data => dispatch(setPaymentAccount(data)),
  openModal: name => dispatch(openModal(name)),
  openModalChooseInstituteAdding: () => dispatch(openModalChooseInstituteAdding()),
  closeModalChooseInstituteAdding: () => dispatch(closeModalChooseInstituteAdding()),
  closeModalAddManualBankAccount: () => dispatch(closeModalAddManualBankAccount()),
  openModalMicroDepositsApprove: institutionId => dispatch(openModalMicroDepositsApprove(institutionId)),
  closeModalMicroDepositsApprove: () => dispatch(closeModalMicroDepositsApprove()),
  getDTCNumbersRequest: query => dispatch(getDTCNumbersRequest(query)),
  selectBrokerageFirm: value => dispatch(selectBrokerageFirm(value)),
  setActiveFundingTab: transferDirection => dispatch(setActiveFundingTab(transferDirection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Funding);
