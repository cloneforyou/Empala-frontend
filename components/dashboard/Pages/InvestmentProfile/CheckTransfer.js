import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from '../../../../routes';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';
import { formatNumberWithFixedPoint } from '../../../../utils/dashboardUtils';

const style = {
  availableAmount:
    { lineHeight: '33px' },
  transferText:
    {
      lineHeight: 1,
      marginBottom: '20px',
    },
};
const isTransferEnabled = (transferType, transferAmount, totalAmount) => {
  const transferAmountRaw = transferAmount && +transferAmount.replace(/\D/g, '');
  const totalAmountRaw = totalAmount && +totalAmount.replace(/\D/g, '');
  if (transferType === 'Full transfer') return false;
  return !(transferType && transferAmount && totalAmount && transferAmountRaw <= totalAmountRaw);
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

const TransferBody = (props) => {
  const {
    setSelectedValueById,
    fullName,
    memberAddress,
    transferType,
    setInputValueById,
    checkAmount,
    checkMemo,
    amountAvailable,
    setActivePage,
    handleCheckTransfer,
  } = props;
  return (
    <div className="funding-wire-transfer__text">
      <div style={style.transferText}>
        <div className="funding__label">
          Beneficiary
        </div>
        <div>
          { fullName }
        </div>
      </div>
      <div style={style.transferText}>
        <div className="funding__label" >
          Address
        </div>
        <div>
          { `${memberAddress.line1}, ${memberAddress.line2 && `${memberAddress.line2}, `}${memberAddress.city}, ${memberAddress.state}, ${memberAddress.zipCode}` }
        </div>
      </div>
      <div className="row no-gutters">
        <div className="row no-gutters funding-selection-form">
          <div className="col-6 no-gutters">
            <EmpalaSelect
              id="transfer_type"
              options={transferTypeOptions}
              label="Transfer amount"
              value={transferType || ''}
              handleChange={setSelectedValueById}
            // errorText={this.props.fieldsErrors.transfer_type}
              hint="Choose transfer type"
            />
          </div>

          <div className="col-6 no-gutters pl-2">
            <NumberFormat
              customInput={EmpalaInput}
              id="check_amount"
              type="text"
              label="Actual amount"
              value={transferType === 'Full transfer' ? amountAvailable || '50000' : checkAmount || ''}
              handleChange={setInputValueById}
              decimalScale={2}
              allowEmptyFormatting
              thousandSeparator
              prefix="$"
            />
          </div>
        </div>
        {
          transferType === 'Partial transfer' &&
          <div className="d-inline-block pl-2">
            <div className="funding__label">
              Funds available
            </div>
            <div style={style.availableAmount}>
              {`$${formatNumberWithFixedPoint(amountAvailable || '50000')}`}
            </div>
          </div>
        }
        <div className="row no-gutters w-75">
          <EmpalaInput
            id="check_memo"
            type="text"
            label="Check memo"
            value={checkMemo || ''}
            handleChange={setInputValueById}
            placeholder="Optional (up to 30 characters)"
          />
        </div>
      </div>
      <div className="funding-wire-transfer__button-wrap">
        {props.error &&
        <div className="mb-4 funding__error">
          {props.error}
        </div>}
      <button
        className="profile-btn profile-btn_green mr-5"
        onClick={handleCheckTransfer}
        disabled={isTransferEnabled(transferType, checkAmount, amountAvailable || '50000')}
      >
        <span style={{ fontSize: '18px' }} >
          Transfer
        </span>
      </button>
      <button
        className="default-btn"
        onClick={() => setActivePage('global portfolio')}
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
  );
};

const CheckTransfer = props => (
  <div className="funding-wire-transfer">
    {
      props.fundingType === 'Check' &&
      props.transferDirection === 'Inbound' &&
      <div className="funding-wire-transfer__text">
        <p>You can transfer funds into your Empala account by sending a check to our clearing house directly.</p>
        <p>This process generally takes 5 business days for your account to reflect the new balance.</p>
        <p>Checks must be payable to Apex Clearing Corporation</p>
        <div className="funding-wire-transfer__text-col" >
          {
            props.fundingType === 'Check' && props.transferDirection === 'Inbound' && CheckTransferWording()
          }
        </div>
        <div className="funding-wire-transfer__button-wrap">
          <button
            className="profile-btn profile-btn_green"
            onClick={() => setActivePage('global portfolio')}
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

      </div>
    }
    {
      props.fundingType === 'Check' &&
      props.transferDirection === 'Outbound' &&
        <TransferBody {...props} />
    }
  </div>
);

CheckTransfer.propTypes = {
};

export default CheckTransfer;
