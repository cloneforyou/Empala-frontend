import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBar from '../../TitleBar';
import { Link } from '../../../../routes';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import {
  addInstitution,
  addNewSecurity,
  dropFundingType, getInstitutions,
  removeSecurity,
  setInputFieldValueById, setPaymentIntitution,
  setSecuritiesInputValue,
  togglePlaidLink,
} from '../../../../actions/funding';
import EmpalaInput from '../../../registration/EmpalaInput';
import FundingMemberInfo from './FundingMemberInfo';
import { setActivePage } from '../../../../actions/dashboard';
import PartialTransfer from './PartialTransfer';
import WireTransfer from './WireTransfer';
import ACHTransfer from './ACHTransfer';


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
    <p className="funding-footer__text">
      You have 30 days remaining to access the Empala platform.
      <p />
      You can fund your account at any time by clicking the wallet on the top of the screen.
    </p>
  </div>
);

class Funding extends Component {
  constructor(props) {
    super(props);
    this.options = {
      funding: [
        { value: 'ACH transfer', title: 'ACH transfer' },
        { value: 'Account transfer', title: 'Account transfer' },
        { value: 'Wire/Check', title: 'Wire/Check' },
      ],
      transfer_type: [
        { value: 'Full transfer', title: 'Full transfer' },
        { value: 'Partial transfer', title: 'Partial transfer' },
      ],
      account_type: [
        { value: 'Single', title: 'Single' },
        { value: 'Joint', title: 'Joint' },
      ],
    };
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
  handleSubmit() {
    alert('Fired fund transfer submission procedure!');
  }
  render() {
    return (
      <div>
        <TitleBar />
        <div className="container-fluid">
          <div className="funding-wrapper">
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
                      </div>
                      {
                        this.isSpecifiedTypeSelected('funding_type', 'Account transfer') &&
                        <div className="col-6 no-gutters pl-3">
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
                            this.isSpecifiedTypeSelected('transfer_type') && <EmpalaSelect
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
                    </div>
                    {
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
                            onClick={this.handleSubmit}
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
                      </div>
                    }
                    {
                      this.isSpecifiedTypeSelected('funding_type', 'Wire/Check') &&
                      <WireTransfer
                        setActivePage={this.props.setActivePage}
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
                    handleSubmit={this.handleSubmit}
                    setPaymentIntitution={this.props.setPaymentIntitution}
                    togglePlaidLink={this.props.togglePlaidLink}
                    plaid_link_active={this.props.plaid_link_active}
                    addInstitution={this.props.addInstitution}
                    institutionsList={this.props.institutionsList}
                    getInstitutions={this.props.getInstitutions}
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
  account_type: state.funding.account_type,
  account_no: state.funding.account_no,
  member_secondary_ssn: state.member_secondary_ssn,
  member_primary_ssn: state.profile.profileUserData.regulatory_identification_ssn,
  member_title: state.profile.profileUserData.basic_information_prefix,
  member_first_name: state.profile.profileUserData.basic_information_first_name,
  member_last_name: state.profile.profileUserData.basic_information_last_name,
  funding_comments: state.funding.funding_comments,
  partial_symbols: state.funding.partial_symbols,
  selected_institution: state.funding.selected_institution || '',
  ach_amount: state.funding.ach_amount,
  plaid_link_active: state.funding.plaid_link_active,
  institutionsList: state.funding.institutionsList,
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
    if (id === 'account_no' || id === 'ach_ammount') return dispatch(setInputFieldValueById(id, value.replace(/\D/, '')));
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
  getInstitutions: () => dispatch(getInstitutions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Funding);