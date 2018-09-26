import React, { Component } from 'react';
import EmpalaInput from '../../../registration/EmpalaInput';

export default class FundingMemberInfo extends Component {
  constructor(props) {
    super(props);
    this.ssnMask = '999-99-9999';
  }
  isSpecifiedTypeSelected(type, value) {
    return value ? this.props[type] === value : this.props[type];
  }
  render() {
    return (
      <div className="d-flex flex-wrap">
        <div className="pr-2 no-gutters" style={{ width: '104px', marginBottom: '12px' }} >
          <EmpalaInput
            id="member_title"
            label="Account name"
            value={this.props.member_title || ''}
            readOnly
          />
        </div>
        <div className="pr-2 no-gutters text-truncate" style={{ width: '176px', paddingTop: '22px' }} >
          <input
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            id="member_first_name"
            value={this.props.member_first_name || ''}
          />
        </div>
        <div
          className="pr-2 no-gutters text-truncate funding-member-info__item_bottom20"
          style={{ width: '256px', paddingTop: '22px' }}
        >
          <input
            className="pseudo-input__input pseudo-input__input_dark"
            id="member_last_name"
            value={this.props.member_last_name || ''}
          />
        </div>
        <div className="d-flex">
          <div
            className="pr-2 no-gutters funding-member-info__item_bottom20"
            style={{ width: '188px', marginBottom: '10px' }}
          >
            <EmpalaInput
              id="member_primary_ssn"
              type="text"
              label="Primary Gov ID/SSN"
              value={this.props.member_primary_ssn || ''}
              readOnly
            />
          </div>
          <div
            className="no-gutters funding-member-info__item_bottom20"
            style={{ width: '176px', marginBottom: '10px' }}
          >
            <EmpalaInput
              id="member_secondary_ssn"
              type="text"
              label="Secondary Gov ID/SSN"
              value={this.props.member_secondary_ssn || ''}
              handleChange={this.props.setInputValueById}
              mask={this.ssnMask}
              // placeholder="123-45-6789"
            />
          </div>
        </div>
      </div>
    );
  }
}

