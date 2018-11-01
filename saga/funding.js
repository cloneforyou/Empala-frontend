import { call, put, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import request from '../utils/request';
import {
  ACH_DEPOSIT_REQUEST,
  ADD_INSTITUTION_REQUEST,
  GET_INSTITUTIONS_REQUEST,
  REMOVE_INSTITUTION_REQUEST,
  ALPS_TRANSFER,
  INIT_FUNDS_TRANSFER,
  GET_ACCOUNTS_REQUEST,
} from '../constants/funding';
import {
  addInstitutionFail,
  getInstitutionsFail,
  removeInstitutionFail,
  setInstitutions,
  unsetPaymentValue,
  unsetPaymentInstitution,
  ACHDepositFail,
  setInputFieldValueById,
  clearALPSTransferFields,
  ALPSTransferFail,
  submitTransferFail,
  submitTransferSuccess,
  setAccountsData,
  getAccountsFail,
} from '../actions/funding';
import { openInfoPopup } from '../actions/dashboard';

const urls = {
  getAccounts: '/api/funding/accounts',
  getInstitutions: '/api/funding/institutions/my?limit=100',
  addInstitution: '/api/funding/institution/add',
  removeInstitution: '/api/funding/institution/delete',
  ACHDeposit: '/api/funding/depositACH',
  ALPSTransfer: '/api/funding/alpsTransfer',
  checkTransfer: '/api/funding/checkTransfer',
};

export function* getAccountsData() {
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const response = yield call(request, urls.getAccounts, options);
    yield put(setAccountsData(response.data.data));
  } catch (err) {
    yield put(getAccountsFail(err.message));
  }
}

export function* getInstitutionsData() {
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const response = yield call(request, urls.getInstitutions, options);
    yield put(setInstitutions(response.data.data.institutions));
  } catch (err) {
    yield put(getInstitutionsFail(err.message));
  }
}

export function* addInstitution({ token, institutionData }) {
  const options = {
    method: 'POST',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
    data: {
      id: institutionData.institution && institutionData.institution.institution_id,
      name: institutionData.institution && institutionData.institution.name,
      token,
    },
  };
  try {
    const response = yield call(request, urls.addInstitution, options);
    yield getInstitutionsData();
  } catch (err) {
    yield put(addInstitutionFail(err.message));
  }
}

export function* removeInstitution({ institutionId }) {
  const options = {
    method: 'DELETE',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  const url = `${urls.removeInstitution}?id=${institutionId}`;
  try {
    const response = yield call(request, url, options);
    yield getInstitutionsData();
  } catch (err) {
    yield put(removeInstitutionFail(err.message));
  }
}

export function* achDeposit({ amount, institutionId }) {
  const options = {
    method: 'POST',
    data: {
      amount,
      institution_id: institutionId,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };

  try {
    yield put(setInputFieldValueById('errorDeposit', false));
    yield put(unsetPaymentValue());
    yield put(unsetPaymentInstitution());
    yield call(request, urls.ACHDeposit, options);
  } catch (err) {
    console.log(err)
    yield put(ACHDepositFail(err.message));
  }
}

export function* alpsTransfer({ data }) {
  const options = {
    method: 'POST',
    data,
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };

  try {
    yield put(setInputFieldValueById('error', false));
    yield put(clearALPSTransferFields());
    yield call(request, urls.ALPSTransfer, options);
  } catch (err) {
    yield put(ALPSTransferFail(err.response.data.data.message));
  }
}

function* transferFunds({ transferMethod }) {
  const options = {
    method: 'POST',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  let url = '';
  if (transferMethod === 'check') {
    const account_no = yield select(state => state.funding.account_no);
    const transfer_type = yield select(state => state.funding.transfer_type);
    let check_amount = transfer_type === 'Partial transfer'
      ? yield select(state => state.funding.check_amount)
      : 'full';
    check_amount = check_amount.replace(/\D/g, '');
    const check_memo = yield select(state => state.funding.check_memo);
    options.data = {
      account_no,
      transfer_type,
      check_amount,
      check_memo,
    };
    url = urls.checkTransfer;

    // alert('Check transfer fired! '+ accountNo + checkAmount + ' \nMemo: ' + memo);
  }
  try {
    const response = yield call(request, url, options);
    yield put(submitTransferSuccess());
    yield put(openInfoPopup());
    console.log(' ** Transfer', response.data);
  } catch (err) {
      console.log('Funds transfer Error:', err.response.data || err, Object.keys(err));
    yield put(submitTransferFail(err.response.data.data));
  }
}

export default function* fundingSaga() {
  yield all([
    takeLatest(GET_INSTITUTIONS_REQUEST, getInstitutionsData),
    takeLatest(ADD_INSTITUTION_REQUEST, addInstitution),
    takeLatest(REMOVE_INSTITUTION_REQUEST, removeInstitution),
    takeEvery(ACH_DEPOSIT_REQUEST, achDeposit),
    takeEvery(ALPS_TRANSFER, alpsTransfer),
    takeEvery(INIT_FUNDS_TRANSFER, transferFunds),
    takeEvery(GET_ACCOUNTS_REQUEST, getAccountsData),
  ]);
}
