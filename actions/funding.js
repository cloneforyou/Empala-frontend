import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  UNSET_PAYMENT_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
  SET_SECURITY_FIELD_VALUE,
  SET_PAYMENT_INSTITUTION,
  UNSET_PAYMENT_INSTITUTION,
  TOGGLE_PLAID,
  ADD_INSTITUTION_REQUEST,
  ADD_INSTITUTION_FAILED,
  GET_INSTITUTIONS_REQUEST,
  GET_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAILED,
  REMOVE_INSTITUTION_REQUEST,
  REMOVE_INSTITUTION_FAILED,
  ACH_DEPOSIT_REQUEST,
  ACH_DEPOSIT_FAILED,
  CLEAR_TRANSFER_FIELDS,
  ALPS_TRANSFER,
  ALPS_TRANSFER_FAIL,
  INIT_FUNDS_TRANSFER,
  SUBMIT_TRANSFER,
  TRANSFER_SUCCESS,
  TRANSFER_FAILED,
  ADD_ACCOUNTS,
  GET_GLOBAL_ACCOUNTS,
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
  GET_ACH_TRANSACTION_LIST,
  CANCEL_ACH_TRANSFER,
  SET_PAYMENT_ACCOUNT,
  ACH_WITHDRAW_REQUEST,
} from '../constants/funding';


export function setPaymentAccount(ApexAccountId) {
  return {
    type: SET_PAYMENT_ACCOUNT,
    ApexAccountId,
  };
}

export function cancelACHTransfer({ transactionId }) {
  return {
    type: CANCEL_ACH_TRANSFER,
    transactionId,
  };
}

export function getACHTransactionList() {
  return {
    type: GET_ACH_TRANSACTION_LIST,
  };
}

export function getAccounts() {
  return {
    type: GET_ACCOUNTS_REQUEST,
  };
}

export function getAccountsFail(err) {
  return {
    type: GET_ACCOUNTS_FAILED,
    err,
  };
}

export function setAccountsData(data) {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    data,
  };
}

export function setInputFieldValueById(id, value) {
  return {
    type: SET_FIELD_VALUE,
    id,
    value,
  };
}
export function unsetPaymentValue() {
  return {
    type: UNSET_PAYMENT_VALUE,
  };
}
export function clearTransferFields() {
  return {
    type: CLEAR_TRANSFER_FIELDS,
  };
}
export function dropFundingType() {
  return {
    type: DROP_FUNDING_TYPE,
  };
}
export function addNewSecurity() {
  return {
    type: ADD_SECURITY,
  };
}
export function removeSecurity(index) {
  return {
    type: REMOVE_SECURITY,
    index,
  };
}
export function setSecuritiesInputValue(id, index, value) {
  return {
    type: SET_SECURITY_FIELD_VALUE,
    id,
    index,
    value,
  };
}

export function setPaymentIntitution(name) {
  return {
    type: SET_PAYMENT_INSTITUTION,
    name,
  };
}

export function unsetPaymentInstitution() {
  return {
    type: UNSET_PAYMENT_INSTITUTION,
  };
}

export function togglePlaidLink() {
  return {
    type: TOGGLE_PLAID,
  };
}

export function addInstitution(token, institutionData) {
  return {
    type: ADD_INSTITUTION_REQUEST,
    token,
    institutionData,
  };
}
export function removeInstitution(institutionId) {
  return {
    type: REMOVE_INSTITUTION_REQUEST,
    institutionId,
  };
}

export function removeInstitutionFail(err) {
  return {
    type: REMOVE_INSTITUTION_FAILED,
    err,
  };
}
export function addInstitutionFail(err) {
  return {
    type: ADD_INSTITUTION_FAILED,
    err,
  };
}

export function getInstitutions() {
  return {
    type: GET_INSTITUTIONS_REQUEST,
  };
}

export function getInstitutionsFail(err) {
  return {
    type: GET_INSTITUTIONS_FAILED,
    err,
  };
}

export function setInstitutions(institutionsList) {
  return {
    type: GET_INSTITUTIONS_SUCCESS,
    institutionsList,
  };
}

export function ACHDeposit({ amount, institutionId}) {
  return {
    type: ACH_DEPOSIT_REQUEST,
    amount,
    institutionId,
  };
}

export function ACHWithdraw({ amount, institutionId}) {
  return {
    type: ACH_WITHDRAW_REQUEST,
    amount,
    institutionId,
  };
}

export function ACHDepositFail(err) {
  return {
    type: ACH_DEPOSIT_FAILED,
    err,
  };
}

export function ALPSTransfer(data) {
  return {
    type: ALPS_TRANSFER,
    data,
  };
}

export function ALPSTransferFail(err) {
  return {
    type: ALPS_TRANSFER_FAIL,
    err,
  };
}

export function initFundsTransfer(transferMethod) {
  return {
    type: INIT_FUNDS_TRANSFER,
    transferMethod,
  };
}

export function submitTransfer() {
  return {
    type: SUBMIT_TRANSFER,
  };
}

export function submitTransferSuccess() {
  return {
    type: TRANSFER_SUCCESS,
  };
}

export function submitTransferFail(err) {
  return {
    type: TRANSFER_FAILED,
    err,
  };
}

export function getGlobalAccounts() {
  return {
    type: GET_GLOBAL_ACCOUNTS,
  };
}

export function addAccounts(accounts) {
  return {
    type: ADD_ACCOUNTS,
    accounts,
  };
}
