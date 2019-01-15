import React from 'react';
import PlaidLink from 'react-plaid-link';
// import { Plaid } from '../../../../keys';
import ChooseInstituteAdding from '../../../Modal/ChooseInstituteAdding';
import AddManualBankAccount from '../../../Modal/AddManualBankAccount';


const handleOnSuccess = (token, metadata) => {
  // send token to client server
  console.log(token, metadata);
};

const handleOnExit = () => {
  // handle the case when your user exits Link
};

const AddInstitutionContainer = props => {
  const handleOpenModal = () => {
    props.openModalChooseInstituteAdding();
  };

  const checkDisablingAddPlaidAccount = () => {
    let plaidAccountCount = 0;

    return false // enable create multiple plaid account

    props.institutionsList.forEach((item) => {
      if (item.custom === false) plaidAccountCount += 1;
    })

    return plaidAccountCount >= 1;
  };

  const checkDisablingAddManualAccount = () => {
    let manualAccountCount = 0;

    return true; // disable create manual account

    props.institutionsList.forEach((item) => {
      if (item.custom) manualAccountCount += 1;
    })

    return manualAccountCount >= 3;
  };


  return (
    <div
      className="funding-ach-tiles-tile funding-ach-tiles-tile_add dark-theme d-flex"
      onClick={handleOpenModal}
      role="button"
    >
      <span className="funding-ach-tiles-tile__plus align-self-center" >+</span>
      {/*<PlaidLink*/}
      {/*clientName="Empala"*/}
      {/*env="sandbox"*/}
      {/*product={['auth', 'transactions']}*/}
      {/*publicKey={Plaid.PLAID_PUBLIC_KEY}*/}
      {/*onExit={handleOnExit}*/}
      {/*onSuccess={(token, metadata) => props.addInstitution(token, metadata)}*/}
      {/*>*/}
      {/*<span className="funding-ach-tiles-tile__plus" >+</span>*/}
      {/*</PlaidLink>*/}
      <ChooseInstituteAdding
        addInstitution={props.addInstitution}
        handleOnExit={handleOnExit}
        plaidDisabled={checkDisablingAddPlaidAccount()}
        manualCreateDisabled={checkDisablingAddManualAccount()}
      />
      <AddManualBankAccount />
    </div>
  );
};

export default AddInstitutionContainer;
