import React, { Component } from 'react';

const WireTransfer = props => (
  <div className="funding-wire-transfer">
    <h1>Wire Transfer</h1>
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
        <p>Routing Number: 12345678</p>
        <p>Account Number: 12345678</p>
        <p>Comment:  Member No: 123456789</p>
      </div>
      <div className="funding-wire-transfer__text-col" >
        <div className="funding-wire-transfer__text-col_subheader">
          Checks:
        </div>
        <p>Payable:  Empala Group LLC</p>
        <p>Member No: 123456789</p>
        <p>123 Cheap Option Way</p>
        <p>San Francisco</p>
        <p>CA 94100</p>
      </div>
    </div>
  </div>
);

export default WireTransfer;
