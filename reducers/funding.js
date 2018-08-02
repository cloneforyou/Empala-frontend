import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
} from '../constants/funding';
import { VALIDATE_FIELD_ERROR, VALIDATE_FIELD_SUCCESS } from '../constants/registration';


const initialState = {
  funding_type: false,
  transfer_type: false,
  account_type: 'Single',
  account_no: false,
  fieldsErrors: false,
  funding_comments: false,
  partial_symbols: [
    { symbol: null, quantity: null, sec_type: 'Shares' },
    { symbol: "GOOG", quantity: 5554, sec_type: 'Shares' },
  ],
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
    case ADD_SECURITY:
      return {
        ...state,
        partial_symbols: [
          ...state.partial_symbols,
          ...[{ symbol: null, quantity: null, sec_type: 'Shares' }],
        ],
      };
    case REMOVE_SECURITY:
      return {
        ...state,
        partial_symbols: [
          ...state.partial_symbols.slice(0, action.index),
          ...state.partial_symbols.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default funding;
