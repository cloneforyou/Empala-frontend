import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
  DELETE_USERPIC_SUCCESS, DROP_PROFILE_INFO,
} from '../constants/profile';
import {
  GET_USER_DATA_SUCCESS,
  SET_FIELD_VALUE,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/dashboard';
import { flattenObject, renameKeys } from '../utils/additional';
import { VALIDATE_FIELD_ERROR, VALIDATE_FIELD_SUCCESS } from '../constants/registration';

const initialState = {
  profileUserData: {},
  fieldsErrors: false,
  tabValue: 0,
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_TAB_PROFILE:
      return { ...state, tabValue: action.tabValue };
    case CHANGE_ACTIVE_TAB_PROFILE:
      return { ...state, tabValue: action.activeTab };
    case GET_USER_DATA_SUCCESS:
    case UPLOAD_IMAGE_SUCCESS:
    case DROP_PROFILE_INFO:
      return {
        ...state,
        profileUserData: renameKeys(flattenObject(action.data.data.profile), /^Member/, ''),
      };
    // case DROP_PROFILE_INFO:
    //   return {
    //     ...state,
    //     profileUserData: renameKeys(flattenObject(action.data), /^Member/, ''),
    //   };
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
