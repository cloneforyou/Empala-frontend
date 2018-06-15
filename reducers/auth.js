import {
  SET_FIELD_VALUE,
  VALIDATE_FIELD_ERROR,
  VALIDATE_FIELD_SUCCESS,
} from '../constants/registration';
import {
  CLEAN_ERROR_MESSAGE,
  CLEAR_LOGIN_STATE,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  PASSWORD_UPDATE_REQUEST_FAIL,
  PASSWORD_UPDATE_REQUEST_SUCCESS,
  SEND_ACTIVATION_LINK_FAIL,
  SEND_ACTIVATION_LINK_SUCCESS,
  SET_ACCOUNT_BLOCKED,
  SET_ACCOUNT_UNBLOCKED,
  SET_PASSWORD_FORGOTTEN, TOGGLE_MODAL,
} from '../constants/auth';
import {OPEN_MODAL} from '../constants/dashboard';

export const InitialState = {
  authError: false,
  index_username: false,
  index_password: false,
  index_activation_code: false,
  index_email: false,
  isBlocked: false,
  linkSent: false,
  loading: false,
  forgotPassword: false,
  passwordChanged: false,
  fieldsErrors: {
    index_username: '',
    index_password: '',
  },
  modalIsOpen: false,
};

function auth(state = InitialState, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return { ...state, [action.id]: action.value };
    case VALIDATE_FIELD_ERROR:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: action.message } };
    case VALIDATE_FIELD_SUCCESS:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: '' } };
    case LOGIN_REQUEST_FAIL:
    case SEND_ACTIVATION_LINK_FAIL:
    case PASSWORD_UPDATE_REQUEST_FAIL:
      return { ...state, authError: action.err, loading: false };
    case LOGIN_REQUEST_SUCCESS:
      return { ...state, authError: false, loading: false };
    case SEND_ACTIVATION_LINK_SUCCESS:
      return {
        ...state,
        authError: false,
        loading: false,
        linkSent: true,
      };
    case PASSWORD_UPDATE_REQUEST_SUCCESS:
      return {
        state,
        passwordChanged: true,
      };
    case SET_ACCOUNT_BLOCKED:
      return { ...state, isBlocked: true };
    case SET_ACCOUNT_UNBLOCKED:
      return { ...state, isBlocked: false };
    case CLEAN_ERROR_MESSAGE:
      return { ...state, authError: false };
    case SET_PASSWORD_FORGOTTEN:
      return { ...state, forgotPassword: true };
    case CLEAR_LOGIN_STATE:
      return {
        ...state,
        forgotPassword: false,
        linkSent: false,
        authError: false,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
      };
    default:
      return state;
  }
}

export default auth;

