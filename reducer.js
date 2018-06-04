import { combineReducers } from 'redux';
import registration from './reducers/registration';
import dashboard from './reducers/dashboard';
import keycloak from './reducers/keycloak';

export const InitialState = {

};

function reducer (state = InitialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  reducer,
  registration,
  dashboard,
  keycloak,
});
