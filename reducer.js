import { combineReducers } from 'redux';
import registration from './reducers/registration';
import dashboard from './reducers/dashboard';
import {SET_FIELD_VALUE} from "./constants/registration";

export const InitialState = {
  loginError: false,
  index_username: false,
  index_password: false,
};

function reducer(state = InitialState, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return { ...state, [action.id]: action.value };
    case 'LOGIN_REQUEST_FAIL':
      return { ...state, loginError: action.err };
    case 'LOGIN_REQUEST_SUCCESS':
      return { ...state, loginError: false };
    default:
      return state;
  }
}

export default combineReducers({
  reducer,
  registration,
  dashboard,
});
