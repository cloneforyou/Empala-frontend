import React from 'react';
import PlaidLink from 'react-plaid-link';
import { Plaid } from '../../../../utils/config';

const handleOnSuccess = (token, metadata) => {
  // send token to client server
  console.log(token, metadata);
};

const handleOnExit = () => {
  // handle the case when your user exits Link
};

const PlaidBox = props => (
  <div
    className="funding-ach-tiles-tile funding-ach-tiles-tile_add"
    // onClick={props.togglePlaidLink}
    role="button"
  >
      <PlaidLink
      clientName="Empala"
      env="sandbox"
      product={['auth', 'transactions']}
      publicKey={Plaid.PLAID_PUBLIC_KEY}
      onExit={handleOnExit}
      onSuccess={handleOnSuccess}
    >
        <span className="funding-ach-tiles-tile__plus" >+    </span>
    </PlaidLink>

  </div>
);

export default PlaidBox;
