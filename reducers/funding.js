import {
  DROP_FUNDING_TYPE,
  SET_FIELD_VALUE,
  UNSET_PAYMENT_VALUE,
  ADD_SECURITY,
  REMOVE_SECURITY,
  SET_SECURITY_FIELD_VALUE,
  SET_PAYMENT_INSTITUTION,
  UNSET_PAYMENT_INSTITUTION,
  TOGGLE_PLAID,
  GET_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAILED,
  ADD_INSTITUTION_FAILED,
  REMOVE_INSTITUTION_FAILED,
  ACH_DEPOSIT_FAILED,
  CLEAR_TRANSFER_FIELDS,
  ALPS_TRANSFER_FAIL,
  SUBMIT_TRANSFER,
  TRANSFER_FAILED,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
} from '../constants/funding';

const initialState = {
  funding_type: false,
  transfer_type: false,
  account_type: 'Single',
  account_no: false,
  fieldsErrors: false,
  memberAccountsData: false,
  funding_comments: false,
  partial_symbols: [
    { symbol: '', quantity: '', sec_type: 'Shares' },
  ],
  selected_institution: false,
  ach_amount: false,
  check_amount: false,
  check_memo: false,
  transferSubmitted: false,
  plaid_link_active: false,
  institutionsList: [],
  error: false,
  errorDeposit: '',
  errorALPS: '',
  member_secondary_ssn: false,
  member_primary_ssn: false,
  member_title: '',
  member_first_name: '',
  member_last_name: '',
  ACHTransactionList: [],
};

function funding(state = initialState, action) {
  switch (action.type) {
    case CLEAR_TRANSFER_FIELDS:
      return {
        ...state,
        partial_symbols: [
          { symbol: '', quantity: '', sec_type: 'Shares' },
        ],
        member_secondary_ssn: false,
        member_primary_ssn: false,
        member_title: '',
        member_first_name: '',
        member_last_name: '',
        account_no: false,
        funding_comments: false,
        errorALPS: '',
        transfer_type: false,
        check_amount: false,
        check_memo: false,
        transferSubmitted: false,
      };
    case SET_FIELD_VALUE:
      if (action.id === 'funding_type') {
        return {
          ...initialState,
          memberAccountsData: state.memberAccountsData,
          ACHTransactionList: state.ACHTransactionList,
          account_number: state.account_number,
          [action.id]: action.value,
        };
      }
      return {
        ...state,
        // [action.id]: action.id === 'ach_amount' ? action.value.replace(/^\d+(?:[\.,]\d+)?$/g, '') : action.value,
        [action.id]: action.value,
      };
    case UNSET_PAYMENT_VALUE:
      return {
        ...state,
        ach_amount: false,
      };
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
    case UNSET_PAYMENT_INSTITUTION:
      return {
        ...state,
        selected_institution: false,
      };
    case GET_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        institutionsList: action.institutionsList,
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        memberAccountsData: action.data,
      };
    case GET_INSTITUTIONS_FAILED:
    case ADD_INSTITUTION_FAILED:
    case REMOVE_INSTITUTION_FAILED:
    case TRANSFER_FAILED:
    case GET_ACCOUNTS_FAILED:
      return {
        ...state,
        error: action.err,
      };
    case ALPS_TRANSFER_FAIL:
      return {
        ...state,
        errorALPS: action.err,
      };
    case ACH_DEPOSIT_FAILED:
      return {
        ...state,
        errorDeposit: action.err,
      };
    case TOGGLE_PLAID:
      return {
        ...state,
        plaid_link_active: !state.plaid_link_active,
      };
      case SUBMIT_TRANSFER:
      return {
        ...state,
        transferSubmitted: true,
      };
    default:
      return state;
  }
}

export default funding;
