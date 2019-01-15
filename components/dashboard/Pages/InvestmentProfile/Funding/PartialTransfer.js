import React, { Component } from 'react';

import EmpalaInput from '../../../../registration/EmpalaInput';
import PatrialTransferSecurities from './PartialTransferSecurities';


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
      <div className="funding-partial-wrapper" >
        <div className="funding-partial__comment no-gutters">
          <EmpalaInput
            id="funding_comments"
            label="Comments"
            value={this.props.funding_comments || ''}
            handleChange={this.props.setInputValueById}
            multiLine
          />
        </div>
        <PatrialTransferSecurities
          {...this.props}
        />
      </div>
    );
  }
}

