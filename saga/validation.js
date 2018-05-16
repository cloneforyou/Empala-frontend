import { call, put, select, all } from 'redux-saga/effects';
import {
  copyMailingAddress,
  setFieldInvalid,
  setFieldValid, setTabPageIndex,
  showIdentityModal
} from '../actions/registration';
import request from '../utils/request';

function* validatePasswordField({id, value}) {
  const password = yield select((state) => state.registration.registrationData['member_account_password']);
  const passwordConfirm = yield select((state) => state.registration.registrationData['member_account_password_confirm']);
  if (id === 'member_account_password_confirm') {
    if (password === passwordConfirm) {
      yield put(setFieldValid(id));
    } else {
      yield put(setFieldInvalid(id, 'Passwords mismatch: check password and confirm password fields.'));
    }
  } else if (id === 'member_account_password') {
    if (password.length < 8 || !/[A-Z]+/.test(password) || !/\d+/.test(password) ) {
      yield put(setFieldInvalid(id, 'Passwords must contain at least 8 characters and have at least one Capital letter and numerical digit.'));
    } else {
      yield put(setFieldValid(id));
    }
  }

}

function* validateFieldOnServer({id, value}) {

  const url = '/api/auth/check';
  const options = {
    method: 'POST',
    data: {
      [id]: value
    }
  };
  try {
    const result = yield call(request, url, options);
    yield put(setFieldValid(id));
  } catch (err) {
    yield put(setFieldInvalid(id, err.message));
  }
}


export function* validateCheckbox(action) {
  const isChecked = yield select((state) => state.registration[action.id]);
  if (/identity_checkbox/.test(action.id) &&  isChecked) {
    // console.log(' *** 999', isChecked );
    yield put(showIdentityModal());
  }
  if (action.id === 'identity_residential_address_same_mailing_address_checkbox' && isChecked) {
    yield put(copyMailingAddress());

  }
}

export function* validateEmptyFields(action) {
  if (action.fields) {
    const data = yield select((state) => state.registration.registrationData);
    const blankFields = action.fields.filter((field) => (!data[field] || data[field] === ''));
    // console.log('******* blank ===>', blankFields)
    yield all(blankFields.map(field => put(setFieldInvalid(field, 'This is a required field'))));
  }
}
// Add your validation function here


// Spawns validation function according to fieldId
export default function* validationSaga({id, value}) {
  const serverValidatedFields = [
    'member_account_email',
    'member_passport_number',
    'member_drivers_license_number',
    'regulatory_identification_ssn'
  ];
  yield put(setFieldValid(id));
  if (serverValidatedFields.includes(id)) {
    yield validateFieldOnServer({id, value});
  } else if (id === 'member_account_password_confirm' || id === 'member_account_password' ) {
    yield validatePasswordField({id, value});
  }
};