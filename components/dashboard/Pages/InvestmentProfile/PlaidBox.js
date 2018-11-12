import React from 'react';
import PlaidLink from 'react-plaid-link';
import { Plaid } from '../../../../keys';

const handleOnSuccess = (token, metadata) => {
  // send token to client server
  console.log(token, metadata);
};

const handleOnExit = () => {
  // handle the case when your user exits Link
};

const PlaidBox = props => (
  <div
    className="funding-ach-tiles-tile funding-ach-tiles-tile_add dark-theme"
    // onClick={props.togglePlaidLink}
    role="button"
  >
    <PlaidLink
      clientName="Empala"
      env={Plaid.PLAID_ENV}
      product={['auth', 'transactions']}
      publicKey={Plaid.PLAID_PUBLIC_KEY}
      onExit={handleOnExit}
      onSuccess={(token, metadata) => props.addInstitution(token, metadata)}
    >
      <span className="funding-ach-tiles-tile__plus" >+</span>
    </PlaidLink>

  </div>
);

export default PlaidBox;
