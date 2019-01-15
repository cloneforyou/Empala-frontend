import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import EmpalaSelect from '../../../../../registration/EmpalaSelect';
import SelectWithSearch from '../../../../../common/SelectWithSearch';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import FundingMemberInfo from '../FundingMemberInfo';
import PartialTransfer from '../PartialTransfer';
import { Link } from '../../../../../../routes';
import {
  addNewSecurity,
  dropFundingType,
  getDTCNumbersRequest,
  removeSecurity,
  setInputFieldValueById,
} from '../../../../../../actions/funding';
import { setActivePage } from '../../../../../../actions/dashboard';


class AccountTransfer extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="col-6 no-gutters pl-2 mw-186">
          <EmpalaSelect
            id="transfer_type"
            options={this.props.transferTypeOptions}
            label="Transfer type"
            value={this.props.transfer_type || ''}
            handleChange={this.props.setSelectedValueById}
            hint="Choose transfer type"
          />
        </div>
        <div className="w-100" />
        {
          this.props.transfer_type &&
            <Fragment>
              <div className="row no-gutters mw-372">
                <div className="col-12 no-gutters">
                  <SelectWithSearch
                    label="Brokerage firm"
                    options={this.props.DTCNumbers}
                    value={this.props.brokerage_firm || ''}
                    hint="Choose brokerage firm"
                    handleChange={this.props.selectBrokerageFirm}
                    searchFunction={this.props.getDTCNumbersRequest}
                  />
                </div>
                <div className="col-6 no-gutters">
                  <EmpalaInput
                    id="account_no"
                    type="text"
                    label="Account no."
                    value={this.props.account_no || ''}
                    handleChange={this.props.setInputValueById}
                  />
                </div>
                <div className="col-6 no-gutters pl-2">
                  <EmpalaSelect
                    id="account_type"
                    options={this.props.accountTypeOptions}
                    label="Account type"
                    value={this.props.account_type || ''}
                    handleChange={this.props.setSelectedValueById}
                  />
                </div>
              </div>
              <Fragment>
                <div className="w-100" />
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
                  (this.props.transfer_type === 'Partial transfer') &&
                  <PartialTransfer
                    setInputValueById={this.props.setInputValueById}
                    setSelectedValueById={this.props.setSelectedValueById}
                    funding_comments={this.props.funding_comments}
                    partial_symbols={this.props.partial_symbols}
                    addSecurity={this.props.addSecurity}
                    removeSecurity={this.props.removeSecurity}
                  />
                }
                <div className="w-100" />
                <div style={{ marginTop: '35px' }}>
                  <button
                    className="profile-btn profile-btn_green"
                    onClick={this.props.alpsTransferHandler}
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
                {
                  this.props.errorALPS &&
                  <div className="mt-4 ml-4 funding__error">
                    {this.props.errorALPS}
                  </div>
                }
              </Fragment>
            </Fragment>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  transfer_type: state.funding.transfer_type,
  account_type: state.funding.account_type,
  account_no: state.funding.account_no || state.funding.account_number,
  member_secondary_ssn: state.funding.member_secondary_ssn,
  member_primary_ssn: state.funding.member_primary_ssn,
  member_title: state.funding.member_title,
  member_first_name: state.funding.member_first_name,
  member_last_name: state.funding.member_last_name,
  funding_comments: state.funding.funding_comments,
  partial_symbols: state.funding.partial_symbols,
  errorALPS: state.funding.errorALPS,
  DTCNumbers: state.funding.DTCNumbers,
});

const mapDispatchToProps = dispatch => ({
  setSelectedValueById: (id, value, index) => {
    if (id === 'funding_type' && value !== 'Account transfer') dispatch(dropFundingType());
    dispatch(setInputFieldValueById(id, value));
    dispatch(setInputFieldValueById('errorALPS', ''));
    dispatch(setInputFieldValueById('errorDeposit', ''));
  },
  setActivePage: (page) => {
    dispatch(dropFundingType());
    dispatch(setActivePage(page));
  },
  addSecurity: () => dispatch(addNewSecurity()),
  removeSecurity: i => dispatch(removeSecurity(i)),
  getDTCNumbersRequest: query => dispatch(getDTCNumbersRequest(query)),
  selectBrokerageFirm: value => dispatch(selectBrokerageFirm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransfer);
