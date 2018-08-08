import { call, put, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import request from '../utils/request';
import { ADD_INSTITUTION_REQUEST, GET_INSTITUTIONS_REQUEST } from '../constants/funding';
import { addInstitutionFail, getInstitutionsFail, setInstitutions } from '../actions/funding';

const urls = {
  getInstitutions: '/api/funding/institutions/my?limit=100',
  addInstitution: '/api/funding/institution/add',
};

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
  console.log('--->>>>>>>', token, institutionData)
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
export default function* fundingSaga() {
  yield all([
    takeLatest(GET_INSTITUTIONS_REQUEST, getInstitutionsData),
    takeLatest(ADD_INSTITUTION_REQUEST, addInstitution),
  ]);
}
