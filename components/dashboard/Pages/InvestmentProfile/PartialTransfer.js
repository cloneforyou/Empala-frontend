import React, { Component } from 'react';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import EmpalaInput from '../../../registration/EmpalaInput';

export default class PartialTransfer extends Component {
  constructor(props) {
    super(props);
    this.ssnMask = '999-99-9999';
    this.options = {
      member_title: [
        {
          value: 'Mr',
          title: 'Mr',
        },
        {
          value: 'Mrs',
          title: 'Mrs',
        },
        {
          value: 'Ms',
          title: 'Ms',
        },
        {
          value: 'Dr',
          title: 'Dr',
        },
      ],
    };
  }
  isSpecifiedTypeSelected(type, value) {
    return value ? this.props[type] === value : this.props[type];
  }
  render() {
    return (
      <div className="funding-partial-wrapper no-gutters" >
        <h2>Partial transfer form</h2>

          <EmpalaInput
            id="funding_comments"
            label="Comments"
            value={this.props.funding_comments || ''}
            handleChange={this.props.setInputValueById}
            multiLine
          />
        {/*

        <div className="pr-2 no-gutters text-truncate" style={{ width: '176px', paddingTop: '18px' }} >
          <input
            type="text"
            className="pseudo-input__input"
            id="member_first_name"
            value={this.props.member_first_name || ''}
          />
        </div>
        <div className="pr-2 no-gutters text-truncate" style={{ width: '256px', paddingTop: '18px'}} >
          <input
            className="pseudo-input__input"
            id="member_last_name"
            value={this.props.member_last_name || ''}
          />
        </div>
        <div className="w-100 d-block d-md-none" />
        <div className="pr-2 no-gutters" style={{ width: '188px' }}>
          <EmpalaInput
            id="member_primary_ssn"
            type="text"
            label="Primary Gov ID/SSN"
            value={this.props.member_primary_ssn || ''}
            readOnly
          />
        </div>
        <div className="no-gutters" style={{ width: '176px' }}>
          <EmpalaInput
            id="member_secondary_ssn"
            type="text"
            label="Secondary Gov ID/SSN"
            value={this.props.member_secondary_ssn || ''}
            handleChange={this.props.setInputValueById}
            mask={this.ssnMask}
            placeholder="123-45-6789"
          />
        </div> */}
      </div>
    );
  }
}

