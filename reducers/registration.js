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
  CHECK_EMAIL_VERIFICATION,
  SHOW_POPUP_PIN,
  CLOSE_POPUP_PIN,
  VERIFY_SEND_REQUEST,
  VERIFY_SEND_SUCCESS,
  VERIFY_SEND_FAILURE,
  SEND_CODE_VERIFY,
  SEND_CODE_VERIFY_SUCCESS,
  SEND_CODE_VERIFY_FAILURE,
  OPEN_INFO_POPUP,
  CLOSE_INFO_POPUP, SHOW_ALERT_MODAL, CLOSE_ALERT_MODAL, SET_AVAILABLE_STATES,
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
    regulatory_407form_need: false,
    profile_investment_experience_equities: 'None',
    profile_investment_experience_cryptocurrencies: 'None',
    profile_investment_experience_options: 'None',
    profile_investment_experience_private_equity: 'None',
    profile_investment_experience_bonds: 'None',
    profile_investment_experience_margin_accounts: 'None',
    profile_investment_experience_margin_currencies: 'None',
    profile_investment_experience_borrowing_money: 'None',
    profile_investment_experience_futures: 'None',
    profile_investment_experience_lending_money: 'None',
    profile_investment_experience_foreign_markets: 'None',
    profile_investment_experience_exotics: 'None',
    member_account_add_margin: false,
  },
  fieldsErrors: {},
  checkboxes: {},
  userBackToPart: false,
  loading: false,
  id: false,
  showPopupPIN: false,
  popupPINType: false,
  showAlertModal: false,
  alertModalName: false,
  verifyLoading: false,
  showVerifyEmailForm: false,
  codeVerify: null,
  codeVerifyError: null,
  showSuccessModal: false,
  codeSent: false,
  showInfoPopup: false,
  infoPopupName: false,
  availableStatesList: false,
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
      if (action.id === 'member_basic_information_residence') {
        return {
          ...state,
          registrationData: {
            ...state.registrationData,
            [action.id]: action.value,
            member_account_contact_phone: '',
          },
        };
      }
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
      return {
        ...state,
        checkboxes: { ...state.checkboxes, [action.id]: !state.checkboxes[action.id] },
        registrationData: {
          ...state.registrationData,
          member_account_add_margin: action.id === 'member_account_add_margin' && !state.checkboxes[action.id],
          regulatory_407form_need: action.id === 'regulatory_checkbox_1' && !state.checkboxes[action.id],
        },
      };
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
        showSuccessModal: true,
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
    case CHECK_EMAIL_VERIFICATION:
      return {
        ...state,
        showPopupPIN: false,
        entityType: action.entityType,
      };
    case SHOW_POPUP_PIN:
      return {
        ...state,
        showPopupPIN: true,
        popupPINType: action.entityType,
      };
    case CLOSE_POPUP_PIN:
      return {
        ...state,
        showPopupPIN: false,
      };
    case VERIFY_SEND_REQUEST:
      return {
        ...state,
        verifyLoading: true,
      };
    case VERIFY_SEND_SUCCESS:
      return {
        ...state,
        verifyLoading: false,
        showVerifyEmailForm: true,
        codeVerifyError: null,
        codeSent: true,
      };
    case VERIFY_SEND_FAILURE:
      return {
        ...state,
        verifyLoading: false,
        showVerifyEmailForm: false,
        codeVerifyError: action.err,
      };
    case SEND_CODE_VERIFY:
      return {
        ...state,
        verifyLoading: true,
        codeVerify: action.code,
      };
    case SEND_CODE_VERIFY_SUCCESS:
      return {
        ...state,
        verifyLoading: false,
        codeVerify: null,
        showVerifyEmailForm: false,
        showPopupPIN: false,
        codeVerifyError: null,
        codeSent: false,
      };
    case SEND_CODE_VERIFY_FAILURE:
      return {
        ...state,
        verifyLoading: false,
        codeVerify: null,
        codeVerifyError: action.err,
      };
    case OPEN_INFO_POPUP:
      return {
        ...state,
        showInfoPopup: true,
        infoPopupName: action.name,
      };
    case CLOSE_INFO_POPUP:
      return {
        ...state,
        showInfoPopup: false,
        infoPopupName: false,
      };
    case SHOW_ALERT_MODAL:
      return {
        ...state,
        showAlertModal: true,
        alertModalName: action.name,
      };
    case CLOSE_ALERT_MODAL:
      return {
        ...state,
        showAlertModal: false,
        alertModalName: false,
      };
    case SET_AVAILABLE_STATES:
      return {
        ...state,
        availableStatesList: action.data,
      };
    default:
      return state;
  }
}

export default registration;
