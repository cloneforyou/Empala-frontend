import React, { Fragment } from 'react';
import NumberFormat from "react-number-format";
import { Link } from '../../../../routes';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';


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

const TransferBody = props => {
  const {
    setSelectedValueById,
    fullName,
    memberAddress,
    transferType,
    setInputValueById,
    checkAmount,
  } = props;
  return (
    <div className="funding-wire-transfer__text">
      <div>
        <div className="funding__label">
          Beneficiary
        </div>
        <div>
          { fullName }
        </div>
      </div>
      <div>
        <div className="funding__label">
          Address
        </div>
        <div>
          { `${memberAddress.line1}, ${memberAddress.line2}, ${memberAddress.city}, ${memberAddress.state}, ${memberAddress.zipCode}` }
        </div>
      </div>
      <div className="row no-gutters funding-selection-form">
        <div className="col-6 no-gutters">
          <EmpalaSelect
            id="transfer_type"
            options={transferTypeOptions}
            label="Transfer type"
            value={transferType || ''}
            handleChange={setSelectedValueById}
            // errorText={this.props.fieldsErrors.transfer_type}
            hint="Choose transfer type"
          />
        </div>
        {
          transferType === 'Partial transfer' &&
          <div className="col-6 no-gutters pl-2">
            <NumberFormat
              customInput={EmpalaInput}
              // value={this.props.value}
              id="check_amount"
              type="text"
              label="Amount"
              value={checkAmount ? checkAmount : ''}
              handleChange={setInputValueById}
              decimalScale={2}
              allowEmptyFormatting
              thousandSeparator
              prefix='$'
          />
          </div>
        }
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
      </div>
    }
    {
      props.fundingType === 'Check' &&
      props.transferDirection === 'Outbound' &&
        <TransferBody {...props} />
    }
    <button
      className="profile-btn profile-btn_green"
      onClick={() => props.setActivePage('global portfolio')}
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
);

CheckTransfer.propTypes = {
};

export default CheckTransfer;
