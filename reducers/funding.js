import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
  SET_SECURITY_FIELD_VALUE,
  SET_PAYMENT_INSTITUTION,
  TOGGLE_PLAID,
  GET_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAILED,
  ADD_INSTITUTION_FAILED,
  REMOVE_INSTITUTION_FAILED,
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
    { symbol: '', quantity: '', sec_type: 'Shares' },
  ],
  selected_institution: false,
  ach_amount: false,
  plaid_link_active: false,
  institutionsList: [],
  error: false,
};

function funding(state = initialState, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        // [action.id]: action.id === 'ach_amount' ? action.value.replace(/^\d+(?:[\.,]\d+)?$/g, '') : action.value,
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
        selected_institution: false,
      };
    case ADD_SECURITY:
      return {
        ...state,
        partial_symbols: [
          ...state.partial_symbols,
          ...[{ symbol: '', quantity: '', sec_type: 'Shares' }],
        ],
      };
    case SET_SECURITY_FIELD_VALUE:
      return {
        ...state,
        partial_symbols: state.partial_symbols.map((el, index) => {
          if (index === action.index) {
            return ({
              ...el,
              [action.id]: action.id === 'quantity' ? action.value.replace(/\D./g, '') : action.value,
            });
          }
          return el;
        }),

      };
    case REMOVE_SECURITY:
      return {
        ...state,
        partial_symbols: [
          ...state.partial_symbols.slice(0, action.index),
          ...state.partial_symbols.slice(action.index + 1),
        ],
      };
    case SET_PAYMENT_INSTITUTION:
      return {
        ...state,
        selected_institution: state.selected_institution === action.name ? '' : action.name,
      };
    case GET_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        institutionsList: action.institutionsList,
      };
    case GET_INSTITUTIONS_FAILED:
    case ADD_INSTITUTION_FAILED:
    case REMOVE_INSTITUTION_FAILED:
      return {
        ...state,
        error: action.err,
      };
    case TOGGLE_PLAID:
      return {
        ...state,
        plaid_link_active: !state.plaid_link_active,
      };
    default:
      return state;
  }
}

export default funding;
