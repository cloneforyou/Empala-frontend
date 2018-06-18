import { GET_USER_DATA_SUCCESS, SET_FIELD_VALUE } from '../constants/dashboard';
import { flattenObject, renameKeys } from '../utils/additional';

const initialState = {
  profileUserData: {},
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        profileUserData: renameKeys(flattenObject(action.data.data.profile), /^Member/, ''),
      };
    case SET_FIELD_VALUE:
      return {
        ...state,
        profileUserData: { ...state.profileUserData, [action.id]: action.value },
      };
    default:
      return state;
  }
}

export default profile;
