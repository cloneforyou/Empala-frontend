import { SET_FIELD_VALUE } from '../constants/registration';
import {
  CLEAN_ERROR_MESSAGE,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  SET_ACCOUNT_BLOCKED,
  SET_ACCOUNT_UNBLOCKED
} from '../constants/auth';

export const InitialState = {
  loginError: false,
  index_username: false,
  index_password: false,
  index_activation_code: false,
  index_email: false,
  isBlocked: false,
};

function auth(state = InitialState, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return { ...state, [action.id]: action.value };
    case LOGIN_REQUEST_FAIL:
      return { ...state, loginError: action.err };
    case LOGIN_REQUEST_SUCCESS:
      return { ...state, loginError: false };
    case SET_ACCOUNT_BLOCKED:
      return { ...state, isBlocked: true };
    case SET_ACCOUNT_UNBLOCKED:
      return { ...state, isBlocked: false };
    case CLEAN_ERROR_MESSAGE:
      return { ...state, loginError: false };
    default:
      return state;
  }
}

export default auth;

