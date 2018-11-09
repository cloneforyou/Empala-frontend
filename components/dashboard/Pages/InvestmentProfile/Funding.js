/* eslint-disable camelcase */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import DashboardInfoPopup from '../../Modal/DashboardInfoPopup';
import TitleBar from '../../TitleBar';
import { Link } from '../../../../routes';
import EmpalaSelect from '../../../registration/EmpalaSelect';
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
  changeACHApproveMethod, // remove after APEX demo
} from '../../../../actions/funding';
import EmpalaInput from '../../../registration/EmpalaInput';
import FundingMemberInfo from './FundingMemberInfo';
import { cleanErrorText, closeModal, openModal, setActivePage } from '../../../../actions/dashboard';
import PartialTransfer from './PartialTransfer';
import CheckTransfer from './CheckTransfer';
import ACHTransfer from './ACHTransfer';
import PlusIcon from '../../../common/PlusIcon';

// Todo move in saga after testing
import request from '../../../../utils/request';

const TransactionRow = props => {
  const [year, month, day] = props.initiated_time.split('T')[0].split('-');
  const formattedYear = `${year[2]}${year[3]}`;
  const formattedDay = `${day[0] === '0' ? '' : day[0]}${day[1] ? day[1] : ''}`
  const formattedAmount = props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // const cancelTransaction = () => {
  //   props.cancelACHTransfer({ transactionId: props.transfer_id });
  // };


  // Todo remove after testing, change backend for sending only transaction in progress
  // const getStatusTransfer = () => {
  //   const result = {
  //     inProgress: true,
  //     value: '',
  //   };
  //
  //   if (props.transfer_state === 'CANCELED' || props.transfer_state === 'COMPLETED' ||
  //     props.transfer_state === 'REJECTED') {
  //     result.inProgress = false;
  //   }
  //
  //   if (props.transfer_state === 'CANCELED') {
  //     result.value = 'Canceled';
  //   } else if (props.transfer_state === 'COMPLETED') {
  //     result.value = 'Completed';
  //   } else if (props.transfer_state === 'REJECTED') {
  //     result.value = 'Rejected';
  //   } else {
  //     result.value = 'In progress';
  //   }
  //
  //   return result;
  // };

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
      <div className="ACH-transaction-list__cancel-col d-flex justify-content-center align-items-center"
           onClick={() => props.cancelACHTransfer({ transactionId: props.transfer_id })}
      >
        <PlusIcon backgroundColor="transparent"
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

class Funding extends PureComponent {
  constructor(props) {
    super(props);
    this.options = {
      funding: [
        { value: 'ACH transfer', title: 'ACH transfer' },
        { value: 'Account transfer', title: 'Account transfer' },
        { value: 'Check', title: 'Check' },
        // { value: 'Wire', title: 'Wire' }, // todo wire will be added later.
      ],
      transfer_type: [
        { value: 'Full transfer', title: 'Full transfer' },
        { value: 'Partial transfer', title: 'Partial transfer' },
      ],
      transfer_direction: [
        { value: 'Inbound', title: 'Transfer In' },
        { value: 'Outbound', title: 'Transfer Out' },
      ],
      account_type: [
        { value: 'Single', title: 'Single' },
        { value: 'Joint', title: 'Joint' },
      ],
    };
    this.alpsTransferHandler = this.alpsTransferHandler.bind(this);
    this.achTransfer = this.achTransfer.bind(this);
    this.validateACHTransferFields = this.validateACHTransferFields.bind(this);
    // this.accountsDropdownOptions = this.getAccountsDropdownOptions(this.props.apexAccounts);
    this.interval = null;
  }

  componentDidMount() {
    this.props.getACHTransactionList();
    this.props.getAccounts();
    this.interval = setInterval(()=> this.props.getACHTransactionList(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getAccountsDropdownOptions() {
    console.log('apexAccount',this.props.apexAccounts )
    return this.props.apexAccounts.map(el => ({ title: el.account_number, value: el.account_number }));
  }

  getMemberFullName({ firstName, lastName, prefix }) {
    return `${prefix} ${firstName} ${lastName}`;
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

  //
  // handleTransfer(fundingType) {
  //   switch (fundingType) {
  //     case 'ACH transfer':
  //       return this.alpsTransferHandler();
  //     case  'Check':
  //       return this.props.handleCheckTransfer();
  //   }
  // }

  alpsTransferHandler() {
    // Todo add validate after
    if (!this.props.account_no || !this.props.member_first_name ||
      !this.props.member_last_name || (this.props.member_primary_ssn &&
        this.props.member_primary_ssn.replace(/-/g, '').length !== 9)) return;


    const data = {
      deliveryAccountType: this.props.account_type,
      transferType: this.props.transfer_type === 'Full transfer' ? 'FULL_TRANSFER' : 'PARTIAL_TRANSFER_RECEIVER',
      deliveryAccount: this.props.account_no,
      deliveryPrimarySsnOrTaxId: this.props.member_primary_ssn.replace(/-/g, ''),
      deliveryAccountTittle: `${this.props.member_title} ${this.props.member_first_name} ${this.props.member_last_name}`,
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

    let institution_id;

    this.props.institutionsList.forEach((item) => {
      if (item.name !== this.props.selected_institution) return;
      institution_id = item.item.institution_id;
    });

    const data = {
      amount: this.props.ach_amount,
      institutionId: institution_id,
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
            <div className="funding-background" />
            <div className="funding-content">
              <DashboardInfoPopup name='funding_transfer_approved' />
              <div className="funding-content-header">
                <h1 className="funding-content-header__title">
                Account Fund Management
                </h1>
              </div>
              {
                this.props.funding_type !== 'ACH transfer' ?
                (
                  <div className="funding-content-body">
                    <div className="row no-gutters funding-selection-form">
                      <div className="col-6 no-gutters">
                        <EmpalaSelect
                          id="funding_type"
                          options={this.options.funding}
                          label="Account funding"
                          value={this.props.funding_type || ''}
                          handleChange={this.props.setSelectedValueById}
                          // errorText={this.props.fieldsErrors.funding}
                          hint="Choose funding type"
                        />
                        {
                          this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                          this.isSpecifiedTypeSelected('transfer_type') &&
                          <EmpalaInput
                            id="account_no"
                            type="text"
                            label="Account no."
                            value={this.props.account_no || ''}
                            handleChange={this.props.setInputValueById}
                            // errorText={this.props.fieldsErrors.account_no}
                            // placeholder="1234567890"
                          />
                        }
                        {
                          this.isSpecifiedTypeSelected('funding_type', 'Check') &&
                            this.props.transfer_direction === 'Outbound' &&
                            <EmpalaSelect
                              id="account_number"
                              options={this.getAccountsDropdownOptions()}
                              label="Account number"
                              value={this.props.account_no || ''}
                              handleChange={this.props.setSelectedValueById}
                              // errorText={this.props.fieldsErrors.account_type}
                            />
                        }
                      </div>
                      {
                        this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                        <div className="col-6 no-gutters pl-2">
                          <EmpalaSelect
                            id="transfer_type"
                            options={this.options.transfer_type}
                            label="Transfer type"
                            value={this.props.transfer_type || ''}
                            handleChange={this.props.setSelectedValueById}
                            // errorText={this.props.fieldsErrors.transfer_type}
                            hint="Choose transfer type"
                          />
                          {
                            this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                            this.isSpecifiedTypeSelected('transfer_type') &&
                            <EmpalaSelect
                              id="account_type"
                              options={this.options.account_type}
                              label="Account type"
                              value={this.props.account_type || ''}
                              handleChange={this.props.setSelectedValueById}
                              // errorText={this.props.fieldsErrors.account_type}
                            />
                          }
                        </div>
                      }
                      {
                        this.isSpecifiedTypeSelected('funding_type', 'Check') &&
                        <div className="col-6 no-gutters pl-2">
                          <EmpalaSelect
                            id="transfer_direction"
                            options={this.options.transfer_direction}
                            label="Direction"
                            value={this.props.transfer_direction || ''}
                            handleChange={this.props.setSelectedValueById}
                            // errorText={this.props.fieldsErrors.transfer_type}
                            hint="Direction"
                          />
                        </div>
                      }
                    </div>
                    {
                      this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                      this.isSpecifiedTypeSelected('transfer_type') &&
                      <div>
                        <FundingMemberInfo
                          member_secondary_ssn={this.props.member_secondary_ssn}
                          member_primary_ssn={this.props.member_primary_ssn}
                          member_title={this.props.member_title}
                          member_first_name={this.props.member_first_name}
                          member_last_name={this.props.member_last_name}
                          setSelectedValueById={this.props.setSelectedValueById}
                          setInputValueById={this.props.setInputValueById}
                        />
                        {
                          this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                          this.isSpecifiedTypeSelected('transfer_type', 'Partial transfer') &&
                          <PartialTransfer
                            setInputValueById={this.props.setInputValueById}
                            setSelectedValueById={this.props.setSelectedValueById}
                            funding_comments={this.props.funding_comments}
                            partial_symbols={this.props.partial_symbols}
                            addSecurity={this.props.addSecurity}
                            removeSecurity={this.props.removeSecurity}
                          />
                        }
                        <div style={{ marginTop: '35px' }}>
                          <button
                            className="profile-btn profile-btn_green"
                            onClick={this.alpsTransferHandler}
                            // onClick={this.handleSubmit}
                            style={{
                              width: '170px',
                              height: '30px',
                              marginRight: '85px',
                            }}
                          >Submit
                          </button>
                          <button
                            className="default-btn"
                            onClick={() => this.props.setActivePage('global portfolio')}
                          >
                            <Link
                              route="dashboard"
                              params={{ page: 'global portfolio' }}
                            >
                              <span
                                style={{ fontSize: '18px' }}
                              >Cancel
                              </span>
                            </Link>
                          </button>
                        </div>
                        {this.props.errorALPS &&
                        <div className="mt-4 ml-4 funding__error">
                          {this.props.errorALPS}
                        </div>}
                      </div>
                    }
                    {
                      this.isSpecifiedTypeSelected('funding_type', 'Check') &&
                      <CheckTransfer
                        setInputValueById={this.props.setInputValueById}
                        setSelectedValueById={this.props.setSelectedValueById}
                        setActivePage={this.props.setActivePage}
                        fundingType={this.props.funding_type}
                        transferType={this.props.transfer_type}
                        transferDirection={this.props.transfer_direction}
                        fullName={this.getMemberFullName(this.props.member_information)}
                        memberAddress={this.props.member_address}
                        accountNumber={this.props.account_no}
                        checkAmount={this.props.check_amount}
                        checkMemo={this.props.check_memo}
                        handleCheckTransfer={this.props.handleCheckTransfer}
                        error={this.props.error}
                        apexAccounts={this.props.apexAccounts}
                        selectedAccount={this.props.account_no}
                      />
                    }
                    {
                      this.displayFooter() &&
                      <FundingFooter
                        setActivePage={this.props.setActivePage}
                      />
                    }
                  </div>
                )
                :
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
                    transfer_direction_ACH={this.props.transfer_direction_ACH}
                    openModal={this.props.openModal}
                    useMicroDepositApprove={this.props.useMicroDepositApprove}
                    changeACHApproveMethod={this.props.changeACHApproveMethod}
                  />
              }
              {this.props.funding_type === 'ACH transfer' && this.props.ACHTransactionList.length > 0 && (
                <div className="ACH-transaction-list">
                  <div className="ACH-transaction-list__title">
                    Transactions list
                  </div>
                  <div className="ACH-transaction-list__description-row">
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__initiated-col">
                      Intitiated
                    </div>
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__from-col">
                      From account
                    </div>
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__to-col">
                      To account
                    </div>
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__amount-col">
                      Amount
                    </div>
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__status-col">
                      Status
                    </div>
                    <div className="ACH-transaction-list__description-label ACH-transaction-list__cancel-col">
                      Cancel
                    </div>
                  </div>
                  {this.props.ACHTransactionList.map((item) => (
                    <TransactionRow
                      {...item}
                      getACHTransactionList={this.props.getACHTransactionList}
                      key={item.id}
                      cancelACHTransfer={this.props.cancelACHTransfer}
                      openModal={this.props.openModal}
                    />)
                  )}
                </div>
              )}
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
  transfer_direction_ACH: state.funding.transfer_direction_ACH,
  useMicroDepositApprove: state.funding.useMicroDepositApprove,
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
  changeACHApproveMethod: () => dispatch(changeACHApproveMethod()), // remove after APEX demo
});

export default connect(mapStateToProps, mapDispatchToProps)(Funding);
