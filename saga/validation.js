import { call, put, select } from 'redux-saga/effects';
import { setFieldInvalid, setFieldValid } from '../actions/registration';
import request from '../utils/request';

function* validatePasswordField({id, value}) {
  const password = yield select((state) => state.registration.registrationData['member_password']);
  const passwordConfirm = yield select((state) => state.registration.registrationData[id]);
  if (id === 'member_password_confirm') {
    if (password === passwordConfirm) {
      yield put(setFieldValid(id));
    } else {
      yield put(setFieldInvalid(id, 'Passwords mismatch: check password and confirm password fields.'));
    }
  } else if (id === 'member_password') {
    if (password.length < 8 || !/[A-Z]+/.test(password) || !/\d+/.test(password) ) {
      yield put(setFieldInvalid(id, 'Passwords must contain at least 8 characters and have at least one Capital letter and numerical digit.'));
    } else {
      yield put(setFieldValid(id));
    }
  }

}

function* validateFieldOnServer({id, value}) {
  const validatedFields = ['member_email', 'member_passport_number', 'member_drivers_license_number'];

  const url = '/auth/check';
  const options = {
    method: 'POST',
    data: {
      [id]: value
    }
  };
  // console.log(' *** options', options);
  if (validatedFields.includes(id)) {
    try {
      const result = yield call(request, url, options);
      yield put(setFieldValid(id));
    } catch (err) {
      yield put(setFieldInvalid(id, err.message));
    }
  }
}


// Add your validation function here


// Spawns validation function according to fieldId
export default function* validationSaga({id, value}) {
  const validatedFields = [
    'member_email',
    'member_passport_number',
    'member_drivers_license_number'
  ];
  if (validatedFields.includes(id)) {
    yield validateFieldOnServer({id, value});
  } else if (id === 'member_password_confirm' || id === 'member_password' ) {
    yield validatePasswordField({id, value});
  }
};