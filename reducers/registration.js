/* eslint-disable no-useless-computed-key,dot-notation,max-len */
import {
  CLOSE_IDENTITY_MODAL,
  COPY_MAILING_ADDRESS,
  GET_DATA_FROM_CACHE,
  GET_MENU_ITEMS,
  SET_FIELD_VALUE,
  SET_MEMBER_DOCUMENT_TYPE,
  SET_TAB_NAME,
  SET_TAB_PAGE_INDEX, SHOW_IDENTITY_MODAL, TOGGLE_CHECKBOX,
  VALIDATE_FIELD_ERROR,
  VALIDATE_FIELD_SUCCESS,
  EDITABLE_PART,
  CLOSE_ERROR_MODAL,
  REGISTRATION_SUBMIT_REQUEST,
  REGISTRATION_SUBMIT_FAIL,
  REGISTRATION_SUBMIT_SUCCESS, SET_USER_ID, GET_USER_ID_REQUEST_FAIL,
} from '../constants/registration';

// import { generateId } from '../utils/registrationUtils';

const initialState = {
  tabName: false,
  tabIndex: false,
  showIdentityModal: false,
  showErrorModal: false,
  errorMessage: false,
  menuItems: [],
  registrationData: {
    // member_account_account_no: generateId(),
    memberDocument: 'passport',
    regulatory_family_dependents: '0',
  },
  fieldsErrors: {},
  checkboxes: {},
  userBackToPart: false,
  loading: false,
  id: false,
};

function registration(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return { ...state, menuItems: action.items };
    case SET_TAB_NAME:
      return { ...state, tabName: action.tabName };
    case SET_TAB_PAGE_INDEX:
      return { ...state, tabIndex: action.pageIndex };
    case SET_MEMBER_DOCUMENT_TYPE:
      return { ...state, registrationData: { ...state.registrationData, memberDocument: action.document } };
    case SET_FIELD_VALUE:
      return { ...state, registrationData: { ...state.registrationData, [action.id]: action.value } };
    case VALIDATE_FIELD_ERROR:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: action.message } };
    case VALIDATE_FIELD_SUCCESS:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: '' } };
    case GET_DATA_FROM_CACHE:
      return {
        ...state,
        registrationData: { ...state.registrationData, ...JSON.parse(localStorage.getItem('registrationData')) },
      };
    case TOGGLE_CHECKBOX:
      return { ...state, checkboxes: { ...state.checkboxes, [action.id]: !state.checkboxes[action.id] } };
    case SHOW_IDENTITY_MODAL:
      return { ...state, showIdentityModal: true };
    case CLOSE_IDENTITY_MODAL:
      return { ...state, showIdentityModal: false };
    case CLOSE_ERROR_MODAL:
      return { ...state, showErrorModal: false };
    case REGISTRATION_SUBMIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REGISTRATION_SUBMIT_FAIL:
    case GET_USER_ID_REQUEST_FAIL:
      return {
        ...state,
        showErrorModal: true,
        errorMessage: action.err,
        loading: false,
      };
    case COPY_MAILING_ADDRESS:
      return {
        ...state,
        registrationData: {
          ...state.registrationData,
          ['identity_mailing_address_residential_address_line_1']: state.registrationData['identity_residential_address_residential_address_line_1'],
          ['identity_mailing_address_residential_address_line_2']: state.registrationData['identity_residential_address_residential_address_line_2'],
          ['identity_mailing_address_zip_code']: state.registrationData['identity_zip_code'],
          ['identity_mailing_address_state']: state.registrationData['identity_residential_address_residential_address_state'],
          ['identity_mailing_address_city']: state.registrationData['identity_residential_address_residential_address_city'],
          ['identity_mailing_address_country']: state.registrationData['identity_residential_address_residential_address_country'],
        },
      };
    case EDITABLE_PART:
      return {
        ...state,
        userBackToPart: action.status,
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
}

export default registration;
