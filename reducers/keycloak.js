import { SET_KC_TOKEN } from '../constants/dashboard';

const initialState = {
  kcAuthenticated: false,
  kcToken: false,
};

function keycloak(state = initialState, action) {
  switch (action.type) {
    case SET_KC_TOKEN:
      return {
        ...state,
        kcAuthenticated: true,
        kcToken: action.kcToken,
      };
    default:
      return state;
  }
}

export default keycloak;
