import React, { Component } from 'react';
import { Link } from '../../../../routes';

const WireTransfer = props => (
  <div className="funding-wire-transfer">
    <div className="funding-wire-transfer__text">
      <p>
        You can transfer funds into your Empala account by sending a check or wiring our clearing house directly.
        <p />
        This process generally takes 5 business days for your account to reflect the new balance.
      </p>
      <div className="funding-wire-transfer__text-col" >
        <div className="funding-wire-transfer__text-col_subheader">
          Wire details:
        </div>
        <div>Routing Number: 12345678</div>
        <div>Account Number: 12345678</div>
        <div>Comment:  Member No: 123456789</div>
      </div>
      <div className="funding-wire-transfer__text-col" >
        <div className="funding-wire-transfer__text-col_subheader">
          Checks:
        </div>
        <div>Payable: Empala Group LLC</div>
        <div>Member No: 123456789</div>
        <div>123 Cheap Option Way</div>
        <div>San Francisco</div>
        <div>CA 94100</div>
      </div>
    </div>
    <button
      className="profile-btn profile-btn_green"
      onClick={() => props.setActivePage('overview')}
    >
      <Link
        route="dashboard"
        params={{ page: 'overview' }}
      >
        <span
          style={{ fontSize: '18px' }}
        >OK
        </span>
      </Link>
    </button>
  </div>
);

export default WireTransfer;
