import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
} from '../constants/funding';
import { VALIDATE_FIELD_ERROR, VALIDATE_FIELD_SUCCESS } from '../constants/registration';

const initialState = {
  funding_type: false,
  transfer_type: false,
  account_type: 'Single',
  account_no: false,
  fieldsErrors: false,
  funding_comments: false,
};

function funding(state = initialState, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        [action.id]: action.value,
      };
    // case VALIDATE_FIELD_ERROR:
    //   return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: action.message } };
    // case VALIDATE_FIELD_SUCCESS:
    //   return { ...state, fieldsErrors: { ...state.fieldsErrors, [action.fieldId]: '' } };
    case DROP_FUNDING_TYPE:
      return {
        ...state,
        funding_type: false,
        transfer_type: false,
      };
    default:
      return state;
  }
}

export default funding;
