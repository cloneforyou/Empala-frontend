import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import { Link } from '../../../../../../routes';
import AddInstitutionContainer from '../AddInstitutionContainer';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import EmpalaSelect from '../../../../../registration/EmpalaSelect';
import { dropFundingType, setInputFieldValueById } from '../../../../../../actions/funding';


const getMemberFullName = ({ firstName, lastName, prefix }) => `${prefix} ${firstName} ${lastName}`;

const transferTypeOptions = [
  { value: 'Full transfer', title: 'Full transfer' },
  { value: 'Partial transfer', title: 'Partial transfer' },
];

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
    <div className="funding-wire-payment-box dark-theme mb-3 mr-3">
      <h2 className="funding-content-header__title mb-3">Transfer funds</h2>
      <div className="w-250 mb-3">
        <EmpalaInput
          id="transfer_from"
          type="text"
          label="From Account"
          value={transferFromToFieldsValue('from')}
        />
      </div>
      <div className="w-250 mb-3">
        <EmpalaInput
          id="transfer_to"
          type="text"
          label="To Account"
          value={transferFromToFieldsValue('to')}
        />
      </div>
      <div className="mb-3">
        <div className="funding__label mb-0">
          Beneficiary
        </div>
        <div className="pl-3">
          { getMemberFullName(props.member_information) }
        </div>
      </div>
      <div className="mb-3">
        <div className="funding__label mb-0" >
          Address
        </div>
        <div className="pl-3">
          { `${props.member_address.line1}, ${props.member_address.line2 && `${props.member_address.line2}, `}${props.member_address.city}, ${props.member_address.state}, ${props.member_address.zipCode}` }
        </div>
      </div>
        <div className="w-186">
          <EmpalaSelect
            id="transfer_type"
            options={transferTypeOptions}
            label="Transfer amount"
            value={props.transfer_type || ''}
            handleChange={props.setSelectedValueById}
            hint="Choose transfer type"
          />
        </div>

        <div className="w-250">
          <NumberFormat
            customInput={EmpalaInput}
            id="check_amount"
            type="text"
            label="Actual amount"
            value={props.transfer_type === 'Full transfer' ? amountAvailable : props.check_amount || ''}
            handleChange={props.setInputValueById}
            decimalScale={2}
            allowEmptyFormatting
            thousandSeparator
            prefix="$"
          />
        </div>
        {
          props.transfer_type === 'Partial transfer' &&
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
        }
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

class WireTransfer extends PureComponent {
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
        {
          this.props.transfer_direction === 'Inbound' &&
          <div className="funding-wire-transfer">
            <div className="funding-wire-transfer__text">
              <p>
                You can transfer funds into your Empala account by sending a check or wiring our clearing house
                directly.
                <p />
                This process generally takes 5 business days for your account to reflect the new balance.
              </p>
              <div className="funding-wire-transfer__text-col" >
                <div className="funding-wire-transfer__text-col_subheader">
                  Wire details:
                </div>
                <div>Routing Number: 12345678</div>
                <div>Account Number: 12345678</div>
                <div>Comment:  Member No: 123456789</div>
              </div>
              <div className="funding-wire-transfer__text-col" >
                <div className="funding-wire-transfer__text-col_subheader">
                  Checks:
                </div>
                <div>Payable: Empala Group LLC</div>
                <div>Member No: 123456789</div>
                <div>123 Cheap Option Way</div>
                <div>San Francisco</div>
                <div>CA 94100</div>
              </div>
            </div>
            <button
              className="profile-btn profile-btn_green"
              onClick={() => this.props.setActivePage('global portfolio')}
            >
              <Link
                route="dashboard"
                params={{ page: 'global portfolio' }}
              >
                <span
                  style={{ fontSize: '18px' }}
                >OK
                </span>
              </Link>
            </button>
          </div>
        }
        {
          this.props.transfer_direction === 'Outbound' &&
          <div className="funding-wire-transfer">
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
          </div>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  transfer_direction: state.funding.transfer_direction || 'Inbound',
  member_information: {
    firstName: state.profile.profileUserData.basic_information_first_name,
    lastName: state.profile.profileUserData.basic_information_last_name,
    prefix: state.profile.profileUserData.basic_information_prefix,
  },
  member_address: {
    city: state.profile.profileUserData.identity_residential_address_city,
    state: state.profile.profileUserData.identity_residential_address_state,
    country: state.profile.profileUserData.identity_residential_address_country,
    zipCode: state.profile.profileUserData.identity_residential_address_zip_code,
    line1: state.profile.profileUserData.identity_residential_address_residential_address_line_1,
    line2: state.profile.profileUserData.identity_residential_address_residential_address_line_2,
  },
});

const mapDispatchToProps = dispatch => ({
  setSelectedValueById: (id, value) => {
    dispatch(setInputFieldValueById(id, value));
  },
  setInputValueById: (e, index) => {
    const { id, value } = e.target;
    if (index || index === 0) {
      if (id === 'quantity') return dispatch(setSecuritiesInputValue(id, index, value.replace(/\D/, '')));
      return dispatch(setSecuritiesInputValue(id, index, value));
    }

    return dispatch(setInputFieldValueById(id, value));
  },
  setActivePage: (page) => {
    dispatch(dropFundingType());
    dispatch(setActivePage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WireTransfer);
