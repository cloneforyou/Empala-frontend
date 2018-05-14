import {
  CHANGE_TAB_PAGE_INDEX,
  GET_MENU_ITEMS,
  SET_TAB_NAME,
  SET_TAB_PAGE_INDEX,
  SET_FIELD_VALUE,
  SET_MEMBER_DOCUMENT_TYPE,
  VALIDATE_FIELD_SUCCESS,
  VALIDATE_FIELD_ERROR,
  GET_DATA_FROM_CACHE,
  TOGGLE_CHECKBOX,
  SHOW_IDENTITY_MODAL, CLOSE_IDENTITY_MODAL, COPY_MAILING_ADDRESS, CLEAN_MAILING_ADDRESS,
  REGISTRATION_SUBMIT_REQUEST, REGISTRATION_SUBMIT_FAIL,
  VALIDATE_FIELDS_BLANK,
} from "../constants/registration";

export function getMenuItems(items) {
  return  {
    type: GET_MENU_ITEMS,
    items,
  }
}

export function setTabName(tabName) {
  return  {
    type: SET_TAB_NAME,
    tabName,
  }
}

export function setTabPageIndex(pageIndex) {
  return  {
    type: SET_TAB_PAGE_INDEX,
    pageIndex,
  }
}

export function changeTabPage(tabName, tabIndex, direction) {
  return  {
    type: CHANGE_TAB_PAGE_INDEX,
    tabName,
    tabIndex,
    direction,
  }
}

export function setInputFieldValueById(id, value) {
  return  {
    type: SET_FIELD_VALUE,
    id,
    value,
  }
}

export function setMemberDocumentType(document) {
  return  {
    type: SET_MEMBER_DOCUMENT_TYPE,
    document,
  }
}

export function setFieldValid(fieldId) {
  return  {
    type: VALIDATE_FIELD_SUCCESS,
    fieldId,
  }
}

export function setFieldInvalid(fieldId, message) {
  return  {
    type: VALIDATE_FIELD_ERROR,
    fieldId,
    message,
  }
}

export function getRegistrationDataFromCache() {
  return  {
    type: GET_DATA_FROM_CACHE,
  }

}

export function toggleCheckboxById(id) {
  return  {
    type: TOGGLE_CHECKBOX,
    id,
  }
}
export function showIdentityModal() {
  return  {
    type: SHOW_IDENTITY_MODAL,
  }
}

export function closeIdentityModal() {
  return  {
    type: CLOSE_IDENTITY_MODAL,
  }
}

export function copyMailingAddress() {
  return  {
   type: COPY_MAILING_ADDRESS,
  }
}

export function cleanMailingAddress() {
  return  {
    type: CLEAN_MAILING_ADDRESS,
  }
}

export function sendRegistrationForm() {
  return  {
    type: REGISTRATION_SUBMIT_REQUEST,
  }
}

export function registrationFail(err) {
  return  {
    type: REGISTRATION_SUBMIT_FAIL,
    err
  }
}
export function validateFieldsBlank(fields) {
  // const fields = {};
  // fieldsArray.forEach(fieldName => fields[fieldName] = 'This ia s required field');
  return  {
    type: VALIDATE_FIELDS_BLANK,
    fields,
  }
}
