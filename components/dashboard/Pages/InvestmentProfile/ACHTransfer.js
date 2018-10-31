import React from 'react';
import NumberFormat from 'react-number-format';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';
import { formatNumberWithFixedPoint } from '../../../../utils/dashboardUtils';
import PlaidBox from './PlaidBox';


const TransferForm = props => (
  <div className="funding-ach-payment-box dark-theme">
    <h2 className="funding-content-header__title funding-ach-payment-box_title-margin">Transfer funds</h2>
    <div className="funding-ach-payment-box_input-margin">
      <EmpalaInput
        id="institution"
        type="text"
        label="From Account"
        value={props.selected_institution || ''}
      />
    </div>
    <div className="funding-ach-payment-box_input-margin">
      <EmpalaInput
        id="institution"
        type="text"
        label="To Account"
        value="Empala - US Account"
      />
    </div>
    <div className="funding-ach-payment-box_input-margin">
      <NumberFormat
        customInput={EmpalaInput}
        // value={this.props.value}
        id="ach_amount"
        type="text"
        label="Amount"
        value={props.ach_amount ? props.ach_amount : ''}
        handleChange={props.setInputValueById}
        decimalScale={2}
        allowEmptyFormatting
        thousandSeparator
        prefix='$'
      />
    </div>
    {
      props.submitted &&
      <p>Your funds will be immediately available on the Empala Platform.</p>
    }
    <div style={{ textAlign: 'center' }}>
      <button
        className="profile-btn profile-btn_green funding-ach-payment-box_button-margin"
        onClick={
          props.submitted
          ? props.achDeposit
          : props.submit
        }
      >
        {props.submitted ? 'Confirm' : 'Submit'}
      </button>
    </div>
    {props.errorDeposit && <div className="funding__error text-center mt-3">
      some errors occur
    </div>}
  </div>
);

const Tile = props => (
  <div
    className="funding-ach-tiles-tile"
    onClick={() => props.setPaymentIntitution(props.institution_name)}
    role="button"
  >
    <div
      className="funding-ach-tiles-tile__delete"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
       props.removeInstitution(props.institutionId);
      }}
    >
      &times;
    </div>
    <div className="funding-ach-tiles-tile__image">
      {/*<img src="..." alt={props.institution_name} />*/}
      <span>{props.institution_name}</span>
    </div>
    <div className="funding-ach-tiles-tile__text">
      <span className={`funding-ach-tiles-tile__check
       ${(props.selected_institution !== props.institution_name) && 'd-none'}`}
      />
      Account: {`****${props.account_no.slice(-4)}`}
    </div>
  </div>
);

export default class ACHTransfer extends React.Component {
  componentDidMount() {
    this.props.getInstitutions();
  }
  render() {
    return (
      <div className="funding-content__body">
        <div className="funding-ach-selection-box">
          <div>
            <div className="funding-ach-selection-box__input no-gutters" >
              <EmpalaSelect
                id="funding_type"
                options={this.props.options.funding}
                label="Account funding"
                value={this.props.funding_type || ''}
                handleChange={this.props.setSelectedValueById}
                // errorText={this.props.fieldsErrors.funding}
                hint="Choose funding type"
              />
            </div>
          </div>
          <h2 className="funding-content-header__title ach_title-margin">Linked accounts</h2>
          <div className="funding-ach-tiles">
            {this.props.institutionsList.map(item => (
              <Tile
                key={item.institution_id}
                institutionId={item.institution_id}
                institution_name={item.name}
                account_no={item.accounts[0].mask || ''} // TODO investigate about account no
                setPaymentIntitution={this.props.setPaymentIntitution}
                selected_institution={this.props.selected_institution}
                removeInstitution={this.props.removeInstitution}
              />
            ))}
            { /* <div className="funding-ach-tiles-tile">
              <div className="funding-ach-tiles-tile__institution">
                <p>Financial Institute name</p>
                Account Name
              </div>
              <div className="funding-ach-tiles-tile__text">
                <span className="funding-ach-tiles-tile__check"/>
                Account: ****1234
              </div>
            </div> */ }
            <PlaidBox
              addInstitution={this.props.addInstitution}
            />
          </div>
        </div>
        <div className="col no-gutters">
          <TransferForm {...this.props} />
        </div>
      </div>
    );
  }
}

