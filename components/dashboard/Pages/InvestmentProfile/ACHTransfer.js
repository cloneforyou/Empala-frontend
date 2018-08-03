import React from 'react';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';


const TransferForm = props => (
  <div>
    <h2 className="funding-content-header__title">Transfer funds</h2>
    <EmpalaInput
      id="institution"
      type="text"
      label="From Account"
      value={props.selected_institution || ''}
      handleChange={this.props.setInputValueById}
      // errorText={this.props.fieldsErrors.account_no}
      // placeholder="1234567890"
    />
    <EmpalaInput
      id="institution"
      type="text"
      label="To Account"
      value='Empala - US Account'
      // errorText={this.props.fieldsErrors.account_no}
      // placeholder="1234567890"
    />
    <EmpalaInput
      id="institution"
      type="text"
      label="Account no."
      value={props.selected_institution || ''}
      handleChange={this.props.setInputValueById}
      // errorText={this.props.fieldsErrors.account_no}
      // placeholder="1234567890"
    />
  </div>
);

const Tile = props => (
  <div className="funding-ach-tiles-tile" role="button">
    <div className="funding-ach-tiles-tile__image">
      <img src="..." alt={props.institution_name} />
    </div>
    <div className="funding-ach-tiles-tile__text">
      <span className="funding-ach-tiles-tile__check" />
      Account: {`****${props.account_no.slice(-4)}`}
    </div>
  </div>
)

const institutions = [
  {name: 'Bank of America', account: '12345678'},
  {name: 'CHASE', account: '56785548'},
  ];

const ACHTransfer = props => (

  <div className="funding-content-body">
    <div className="row">
      <div className="funding-ach-selection-box col-6">
        <div className="funding-selection-form">
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
          <div className="funding-ach-tiles-tile">
            <div className="funding-ach-tiles-tile__plus" >+</div>
          </div>
        </div>
      </div>
      <div className="col no-gutters">
        <div className="funding-ach-payment-box">
        </div>
      </div>
    </div>
  </div>
);

export default ACHTransfer;
