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
  CLEAR_ALPS_TRANSFER_FIELDS,
  ALPS_TRANSFER,
  ALPS_TRANSFER_FAIL, INIT_FUNDS_TRANSFER, SUBMIT_TRANSFER,
} from '../constants/funding';

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
export function clearALPSTransferFields() {
  return {
    type: CLEAR_ALPS_TRANSFER_FIELDS,
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
