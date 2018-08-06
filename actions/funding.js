import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
  SET_SECURITY_FIELD_VALUE,
  SET_PAYMENT_INSTITUTION,
  TOGGLE_PLAID,
} from '../constants/funding';

export function setInputFieldValueById(id, value) {
  return {
    type: SET_FIELD_VALUE,
    id,
    value,
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

export function togglePlaidLink() {
  return {
    type: TOGGLE_PLAID,
  };
}

