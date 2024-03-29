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
  SHOW_IDENTITY_MODAL,
  CLOSE_IDENTITY_MODAL,
  CLOSE_ERROR_MODAL,
  COPY_MAILING_ADDRESS,
  CLEAN_MAILING_ADDRESS,
  REGISTRATION_SUBMIT_REQUEST,
  REGISTRATION_SUBMIT_FAIL,
  VALIDATE_FIELDS_BLANK,
  ADDRESS_INFO_REQUEST,
  VALIDATE_FIELD_VALUE,
  EDITABLE_PART,
  GET_USER_ID_REQUEST,
  SET_USER_ID,
  GET_USER_ID_REQUEST_FAIL,
  CHECK_EMAIL_VERIFICATION,
  SHOW_POPUP_PIN,
  CLOSE_POPUP_PIN,
  VERIFY_SEND_REQUEST,
  VERIFY_SEND_SUCCESS,
  VERIFY_SEND_FAILURE,
  SEND_CODE_VERIFY,
  SEND_CODE_VERIFY_SUCCESS,
  SEND_CODE_VERIFY_FAILURE,
  REGISTRATION_SUBMIT_SUCCESS,
  OPEN_INFO_POPUP,
  CLOSE_INFO_POPUP,
  SHOW_ALERT_MODAL,
  CLOSE_ALERT_MODAL,
  SET_AVAILABLE_STATES,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  CLEAN_IMAGE_DATA,
  SET_UPLOADABLE_IMAGE,
  CLEAN_ERROR_TEXT,
  SET_LEGAL_MESSAGES,
} from '../constants/registration';


export function setLegalMessages(messages) {
  return {
    type: SET_LEGAL_MESSAGES,
    messages,
  };
}

export function getMenuItems(items) {
  return {
    type: GET_MENU_ITEMS,
    items,
  };
}

export function setTabName(tabName) {
  return {
    type: SET_TAB_NAME,
    tabName,
  };
}

export function setTabPageIndex(pageIndex) {
  return {
    type: SET_TAB_PAGE_INDEX,
    pageIndex,
  };
}

export function changeTabPage(tabName, tabIndex, direction) {
  return {
    type: CHANGE_TAB_PAGE_INDEX,
    tabName,
    tabIndex,
    direction,
  };
}

export function setInputFieldValueById(id, value) {
  return {
    type: SET_FIELD_VALUE,
    id,
    value,
  };
}

export function setMemberDocumentType(document) {
  return {
    type: SET_MEMBER_DOCUMENT_TYPE,
    document,
  };
}

export function setFieldValid(fieldId) {
  return {
    type: VALIDATE_FIELD_SUCCESS,
    fieldId,
  };
}

export function setFieldInvalid(fieldId, message) {
  return {
    type: VALIDATE_FIELD_ERROR,
    fieldId,
    message,
  };
}

export function getRegistrationDataFromCache() {
  return {
    type: GET_DATA_FROM_CACHE,
  };
}

export function toggleCheckboxById(id) {
  return {
    type: TOGGLE_CHECKBOX,
    id,
  };
}

export function showIdentityModal() {
  return {
    type: SHOW_IDENTITY_MODAL,
  };
}

export function closeIdentityModal() {
  return {
    type: CLOSE_IDENTITY_MODAL,
  };
}

export function closeErrorModal() {
  return {
    type: CLOSE_ERROR_MODAL,
  };
}

export function copyMailingAddress() {
  return {
    type: COPY_MAILING_ADDRESS,
  };
}

export function cleanMailingAddress() {
  return {
    type: CLEAN_MAILING_ADDRESS,
  };
}

export function sendRegistrationForm() {
  return {
    type: REGISTRATION_SUBMIT_REQUEST,
  };
}

export function registrationFail(err) {
  return {
    type: REGISTRATION_SUBMIT_FAIL,
    err,
  };
}

export function registrationSuccess() {
  return {
    type: REGISTRATION_SUBMIT_SUCCESS,
  };
}

export function validateFieldsBlank(fields) {
  return {
    type: VALIDATE_FIELDS_BLANK,
    fields,
  };
}

export function getInfoByZipCode(fieldId, zipCode) {
  return {
    type: ADDRESS_INFO_REQUEST,
    fieldId,
    zipCode,
  };
}

export function validateFieldValue(fieldId, fieldValue) {
  return {
    type: VALIDATE_FIELD_VALUE,
    fieldId,
    fieldValue,
  };
}

export function goBackToPart(bool) {
  return {
    type: EDITABLE_PART,
    status: bool,
  };
}

export function getUserID() {
  return {
    type: GET_USER_ID_REQUEST,
  };
}

export function setUserID(id) {
  return {
    type: SET_USER_ID,
    id,
  };
}

export function failUserID(err) {
  return {
    type: GET_USER_ID_REQUEST_FAIL,
    err,
  };
}

export function checkEmailVerificationRequest(entityType) {
  return {
    type: CHECK_EMAIL_VERIFICATION,
    entityType,
  };
}

export function showPopupPIN(entityType) {
  return {
    type: SHOW_POPUP_PIN,
    entityType,
  };
}

export function closePopupPIN() {
  return {
    type: CLOSE_POPUP_PIN,
  };
}

export function verifySendRequest(entityType, source) {
  return {
    type: VERIFY_SEND_REQUEST,
    entityType,
    source,
  };
}

export function verifySendSuccess() {
  return {
    type: VERIFY_SEND_SUCCESS,
  };
}

export function verifySendFailure(err) {
  return {
    type: VERIFY_SEND_FAILURE,
    err,
  };
}

export function sendCodeVerify(code, entityType, source) {
  return {
    type: SEND_CODE_VERIFY,
    code,
    entityType,
    source,
  };
}

export function sendCodeVerifySuccess() {
  return {
    type: SEND_CODE_VERIFY_SUCCESS,
  };
}

export function sendCodeVerifyFailure(err) {
  return {
    type: SEND_CODE_VERIFY_FAILURE,
    err
  }
}

export function openInfoPopup(name) {
  return {
    type: OPEN_INFO_POPUP,
    name,
  };
}

export function closeInfoPopup() {
  return {
    type: CLOSE_INFO_POPUP,
  };
}

export function showAlertModal(name) {
  return {
    type: SHOW_ALERT_MODAL,
    name,
  };
}

export function closeAlertModal() {
  return {
    type: CLOSE_ALERT_MODAL,
  };
}

export function setAvailableStates(data) {
  return {
    type: SET_AVAILABLE_STATES,
    data,
  };
}

export const cleanImage = () => ({
  type: CLEAN_IMAGE_DATA,
});

export const setUploadableImage = img => ({
  type: SET_UPLOADABLE_IMAGE,
  img,
});

export const uploadImage = data => ({
  type: UPLOAD_IMAGE_REQUEST,
  data,
});

export const uploadImageFail = err => ({
  type: UPLOAD_IMAGE_FAIL,
  err,
});

export const uploadImageSuccess = data => ({
  type: UPLOAD_IMAGE_SUCCESS,
  data,
});

export const cleanErrorText = () => ({
  type: CLEAN_ERROR_TEXT,
});
