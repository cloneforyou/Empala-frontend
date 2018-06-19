import { GET_USER_DATA_SUCCESS, SET_FIELD_VALUE } from '../constants/dashboard';
import { flattenObject, renameKeys } from '../utils/additional';
import {VALIDATE_FIELD_ERROR, VALIDATE_FIELD_SUCCESS} from '../constants/registration';

const initialState = {
  profileUserData: {},
  fieldsErrors: false,
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
    case VALIDATE_FIELD_ERROR:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: action.message } };
    case VALIDATE_FIELD_SUCCESS:
      return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: '' } };
    default:
      return state;
  }
}

export default profile;
