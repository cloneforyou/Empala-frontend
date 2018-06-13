import { combineReducers } from 'redux';
import registration from './reducers/registration';
import dashboard from './reducers/dashboard';
import profile from './reducers/profile';
import {SET_FIELD_VALUE} from "./constants/registration";
import auth from "./reducers/auth";

export const InitialState = {
};

function reducer(state = InitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  auth,
  registration,
  dashboard,
  profile,
});
