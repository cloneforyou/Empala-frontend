import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import { Link } from '../../../../../../routes';
import EmpalaSelect from '../../../../../registration/EmpalaSelect';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import { formatNumberWithFixedPoint } from '../../../../../../utils/dashboardUtils';
import {
  dropFundingType,
  setInputFieldValueById,
} from '../../../../../../actions/funding';


const isTransferEnabled = (transferType, transferAmount, totalAmount) => {
  const transferAmountRaw = transferAmount && +transferAmount.replace(/\D/g, '');
  if (transferType === 'Full transfer' && Number(totalAmount) > 0) return false;
  return !(transferType && transferAmount && totalAmount && transferAmountRaw <= totalAmount);
};

const getSelectedAccountBalance = (accounts, selectedAccount) => {
  const selectedAccountInfo = accounts.filter(el => el.account_number === selectedAccount);
  return selectedAccountInfo.length > 0 && selectedAccountInfo[0].balance;
};

const CheckTransferWording = () => (
  <Fragment>
    <div className="funding-wire-transfer__text-col_subheader">
      Sent to:
    </div>
    <div>Apex Clearing Corp</div>
    <div>Attention: Cashier Department</div>
    <div>350 N. St. Paul Street</div>
    <div>Suite 1300</div>
    <div>Dallas, TX 75201</div>
  </Fragment>);

const transferTypeOptions = [
  { value: 'Full transfer', title: 'Full transfer' },
  { value: 'Partial transfer', title: 'Partial transfer' },
];

const getMemberFullName = ({ firstName, lastName, prefix }) => `${prefix} ${firstName} ${lastName}`;

const TransferInbound = (props) => {
  return (
    <Fragment>
      <div className="funding-wire-transfer__text">
        <p>You can transfer funds into your Empala account by sending a check to our clearing house directly.</p>
        <p>This process generally takes 5 business days for your account to reflect the new balance.</p>
        <p>Checks must be payable to Apex Clearing Corporation</p>
        <div className="funding-wire-transfer__text-col" >
          {
            props.transfer_direction === 'Inbound' && CheckTransferWording()
          }
        </div>
      </div>
      <div>
        <button
          className="profile-btn profile-btn_green"
          onClick={() => setActivePage('global portfolio')}
        >
          <Link
            route="dashboard"
            params={{ page: 'global portfolio' }}
          >
            <span className="fs-18">
              OK
            </span>
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

const TransferOutbound = (props) => {
  const {
    setSelectedValueById,
    setInputValueById,
    setActivePage,
    handleCheckTransfer,
  } = props;
  const accountBalance = getSelectedAccountBalance(props.apexAccounts, props.account_no);
  const amountAvailable = Math.abs(((accountBalance || {}).total || (accountBalance || {}).totalDeposits) || 0)
    - ((accountBalance || {}).totalDisbursements || 0);
  return (
    <Fragment>
      <div className="funding-wire-transfer__text">
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
        <div className="d-flex mb-2">
          <div className="no-gutters w-186">
            <EmpalaSelect
              id="transfer_type"
              options={transferTypeOptions}
              label="Transfer amount"
              value={props.transfer_type || ''}
              handleChange={setSelectedValueById}
              hint="Choose transfer type"
            />
          </div>

          <div className="no-gutters w-186 ml-2">
            <NumberFormat
              customInput={EmpalaInput}
              id="check_amount"
              type="text"
              label="Actual amount"
              value={props.transfer_type === 'Full transfer' ? amountAvailable : props.check_amount || ''}
              handleChange={setInputValueById}
              decimalScale={2}
              allowEmptyFormatting
              thousandSeparator
              prefix="$"
            />
          </div>
          {
            props.transfer_type === 'Partial transfer' &&
            <div className="no-gutters mw-186 ml-5">
              <div className="funding__label">
                Funds available
              </div>
              <div>
                {`$${formatNumberWithFixedPoint(amountAvailable)}`}
              </div>
            </div>
          }
        </div>
        <div className="no-gutters w-75">
          <EmpalaInput
            id="check_memo"
            type="text"
            label="Check memo"
            value={props.check_memo || ''}
            handleChange={setInputValueById}
            placeholder="Optional (up to 30 characters)"
          />
        </div>
      </div>
      {props.error &&
      <div className="mb-4 funding__error">
        {props.error}
      </div>}
      <button
        className="profile-btn profile-btn_green mr-5"
        onClick={handleCheckTransfer}
        disabled={isTransferEnabled(props.transfer_type, props.check_amount, amountAvailable)}
      >
          <span className="fs-18">
          Transfer
          </span>
      </button>
      <button
        className="default-btn"
        onClick={() => setActivePage('global portfolio')}
      >
        <Link
          href="/"
          route="dashboard"
          params={{ page: 'global portfolio' }}
        >
          <span className="fs-18">
            Cancel
          </span>
        </Link>
      </button>
    </Fragment>
  );
};

class CheckTransfer extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="funding-wire-transfer">
          {
            this.props.transfer_direction === 'Inbound' &&
            <TransferInbound {...this.props} />
          }
          {
            this.props.transfer_direction === 'Outbound' &&
            <TransferOutbound {...this.props} />
          }
        </div>
      </Fragment>
    );
  }
}

CheckTransfer.propTypes = {
};

const mapStateToProps = state => ({
  transfer_type: state.funding.transfer_type,
  transfer_direction: state.funding.transfer_direction || 'Inbound',
  account_no: state.funding.account_no || state.funding.account_number,
  member_secondary_ssn: state.funding.member_secondary_ssn,
  member_primary_ssn: state.funding.member_primary_ssn,
  member_title: state.funding.member_title,
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
  check_amount: state.funding.check_amount,
  check_memo: state.funding.check_memo,
  errorALPS: state.funding.errorALPS,
  error: state.funding.error,
  apexAccounts: (state.funding.memberAccountsData || {}).apex || [],
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

    return dispatch(setInputFieldValueById(id, value));
  },
  setActivePage: (page) => {
    dispatch(dropFundingType());
    dispatch(setActivePage(page));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(CheckTransfer);
