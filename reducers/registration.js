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
} from '../constants/registration';

const initialState = {
  tabName: false,
  tabIndex: false,
  showIdentityModal: false,
  menuItems: [],
  registrationData: {
    memberDocument: 'passport',
    regulatory_family_dependents: '0',
  },
  fieldsErrors: {},
  checkboxes: {},
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
      return { ...state, registrationData: JSON.parse(localStorage.getItem('registrationData')) };
    case TOGGLE_CHECKBOX:
      return { ...state, checkboxes: { ...state.checkboxes, [action.id]: !state.checkboxes[action.id] } };
    case SHOW_IDENTITY_MODAL:
      return { ...state, showIdentityModal: true };
    case CLOSE_IDENTITY_MODAL:
      return { ...state, showIdentityModal: false };
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
    default:
      return state;
  }
}

export default registration;
