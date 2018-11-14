import React from 'react';
import PlaidLink from 'react-plaid-link';
// import { Plaid } from '../../../../keys';
import ChooseInstituteAdding from '../../Modal/ChooseInstituteAdding';
import AddManualBankAccount from '../../Modal/AddManualBankAccount';


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
      />
      <AddManualBankAccount />
    </div>
  );
};

export default AddInstitutionContainer;
