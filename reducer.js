import { combineReducers } from 'redux';
import registration from './reducers/registration';
import dashboard from './reducers/dashboard';
import profile from './reducers/profile';
import auth from './reducers/auth';
import funding from './reducers/funding';
import account from './reducers/account';

export const InitialState = {
};

function reducer(state = InitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  dashboard,
  auth,
  registration,
  profile,
  funding,
  account,
});

