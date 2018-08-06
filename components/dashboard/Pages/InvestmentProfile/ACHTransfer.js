import React from 'react';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';
import { formatNumberWithFixedPoint } from '../../../../utils/dashboardUtils';


const TransferForm = props => {
  if (props.plaid_link_active) return <PlaidBox />;
  return (
    <div>
      <h2 className="funding-content-header__title funding-ach-payment-box_title-margin">Transfer funds</h2>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaInput
          id="institution"
          type="text"
          label="From Account"
          value={props.selected_institution || ''}
          // errorText={this.props.fieldsErrors.account_no}
          // placeholder="1234567890"
        />
      </div>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaInput
          id="institution"
          type="text"
          label="To Account"
          value='Empala - US Account'
          // errorText={this.props.fieldsErrors.account_no}
          // placeholder="1234567890"
        />
      </div>
      <div className="funding-ach-payment-box_input-margin">
        <EmpalaInput
          id="ach_amount"
          type="text"
          label="Amount"
          value={props.ach_amount ? formatNumberWithFixedPoint(props.ach_amount) : ''}
          handleChange={props.setInputValueById}
          // errorText={this.props.fieldsErrors.account_no}
          // placeholder="1234567890"
        />
      </div>
      <p>
        Your funds will be immediately available on the Empala Platform.
      </p>
      <div style={{ textAlign: 'center' }}>
        <button
          className="profile-btn profile-btn_green funding-ach-payment-box_button-margin"
          onClick={props.handleSubmit}
        >Confirm
        </button>
      </div>
    </div>
  );
};

const PlaidBox = props => (
  <div style={{ background: 'silver', textAlign: 'center', paddingTop: '100px', height: '100%' }}>
    !!! Plaid Link comes here !!!
  </div>
)

const Tile = props => (
  <div
    className="funding-ach-tiles-tile"
    onClick={() => props.setPaymentIntitution(props.institution_name)}
    role="button"
  >
    <div className="funding-ach-tiles-tile__image">
      <img src="..." alt={props.institution_name} />
    </div>
    <div className="funding-ach-tiles-tile__text">
      <span className={`funding-ach-tiles-tile__check
       ${(props.selected_institution !== props.institution_name) && 'd-none'}`}
      />
      Account: {`****${props.account_no.slice(-4)}`}
    </div>
  </div>
);

const institutions = [
  { name: 'Bank of America', account: '12345678'},
  { name: 'CHASE', account: '56785548'},
  ];

const ACHTransfer = props => (

  <div className="funding-content__body">
      <div className="funding-ach-selection-box">
        <div>
          <div className="funding-ach-selection-box__input no-gutters">
          <EmpalaSelect
            id="funding_type"
            options={props.options.funding}
            label="Account funding"
            value={props.funding_type || ''}
            handleChange={props.setSelectedValueById}
            // errorText={this.props.fieldsErrors.funding}
            hint="Choose funding type"
          />
        </div>
        </div>
        <h2 className="funding-content-header__title ach_title-margin">Linked accounts</h2>
        <div className="funding-ach-tiles">
          {institutions.map(item => (
            <Tile
              key={item.name}
              institution_name={item.name}
              account_no={item.account}
              setPaymentIntitution={props.setPaymentIntitution}
              selected_institution={props.selected_institution}
            />
          ))}
          <div className="funding-ach-tiles-tile">
            <div className="funding-ach-tiles-tile__institution">
              <p>Financial Institute name</p>
              Account Name
            </div>
            <div className="funding-ach-tiles-tile__text">
              <span className="funding-ach-tiles-tile__check" />
              Account: ****1234
            </div>
          </div>
          <div
            className="funding-ach-tiles-tile"
            onClick={props.togglePlaidLink}
            role="button"
          >
            <div className="funding-ach-tiles-tile__plus" >+</div>
          </div>
        </div>
      </div>
      <div className="col no-gutters">
        <div className="funding-ach-payment-box">
          <TransferForm {...props} />
        </div>
      </div>
  </div>
);

export default ACHTransfer;
