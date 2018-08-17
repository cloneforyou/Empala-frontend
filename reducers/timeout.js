import { SET_SESSION_TIME_REMAIN } from '../constants/dashboard';

const initialState = {
  timeRemain: false,
};

function timeout(state = initialState, action) {
  switch (action.type) {
    case SET_SESSION_TIME_REMAIN:
      return {
        ...state,
        timeRemain: action.time,
      };
    default:
      return state;
  }
}

export default timeout;
