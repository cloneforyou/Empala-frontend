import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
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
