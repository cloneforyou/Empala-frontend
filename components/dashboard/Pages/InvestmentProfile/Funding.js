import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  ALPSTransfer, initFundsTransfer, submitTransfer,
} from '../../../../actions/funding';
import EmpalaInput from '../../../registration/EmpalaInput';
import FundingMemberInfo from './FundingMemberInfo';
import {cleanErrorText, closeModal, setActivePage} from '../../../../actions/dashboard';
import PartialTransfer from './PartialTransfer';
import CheckTransfer from './CheckTransfer';
import ACHTransfer from './ACHTransfer';

// Todo move in saga after testing
import request from '../../../../utils/request';

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
      !this.props.member_last_name || !this.props.member_primary_ssn) return;


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
        })
      }
    }

    if (data.assets && data.assets.length === 0) return;

    this.props.ALPSTransfer(data);
  }

  achDeposit = () => {
    if (!this.props.selected_institution || !this.props.ach_amount) return;

    let institution_id;

    this.props.institutionsList.forEach((item) => {
      if (item.name !== this.props.selected_institution) return;
      institution_id = item.item.institution_id;
    });

    const data = {
      amount: this.props.ach_amount,
      institutionId: institution_id,
    };

    this.props.ACHDeposit(data);
  };

  getMemberFullName({firstName, lastName, prefix}){
    return `${prefix} ${firstName} ${lastName}`
  }

  render() {
    return (
      <div>
        <TitleBar />
        <div className="container-fluid">
          <div className="funding-wrapper dark-theme">
            <div className="funding-background" />
            <div className="funding-content">
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
                            options={[]} // todo parse accounts here
                            label="Account number"
                            value={this.props.account_number || ''}
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
                        {this.props.errorALPS && <div className="mt-4 ml-4 funding__error">
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
                    achDeposit={this.achDeposit}
                    setPaymentIntitution={this.props.setPaymentIntitution}
                    togglePlaidLink={this.props.togglePlaidLink}
                    plaid_link_active={this.props.plaid_link_active}
                    addInstitution={this.props.addInstitution}
                    institutionsList={this.props.institutionsList}
                    getInstitutions={this.props.getInstitutions}
                    removeInstitution={this.props.removeInstitution}
                    error={this.props.error}
                    submitted={this.props.isTransferSubmitted}
                    submit={this.props.submitTransfer}
                  />
              }
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
  account_no: state.funding.account_no,
  member_secondary_ssn: state.funding.member_secondary_ssn,
  member_primary_ssn: state.funding.member_primary_ssn, // state.profile.profileUserData.regulatory_identification_ssn,
  member_title: state.funding.member_title, // state.profile.profileUserData.basic_information_prefix,
  member_first_name: state.funding.member_first_name, // state.profile.profileUserData.basic_information_first_name,
  member_last_name: state.funding.member_last_name, // state.profile.profileUserData.basic_information_last_name,
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
});
const mapDispatchToProps = dispatch => ({
  setSelectedValueById: (id, value, index) => {
    if (index || index === 0) return dispatch(setSecuritiesInputValue(id, index, value));
    if (id === 'funding_type' && value !== 'Account transfer') dispatch(dropFundingType());
    dispatch(setInputFieldValueById(id, value));
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
  ACHDeposit: (data) => dispatch(ACHDeposit(data)),
  ALPSTransfer: (data) => dispatch(ALPSTransfer(data)),
  handleCheckTransfer: () => dispatch(initFundsTransfer('check')),
  submitTransfer: () => dispatch(submitTransfer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Funding);
