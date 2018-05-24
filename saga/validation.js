/* eslint-disable dot-notation */
import { call, put, select, all } from 'redux-saga/effects';
import {
  copyMailingAddress,
  setFieldInvalid,
  setFieldValid,
  setInputFieldValueById,
  showIdentityModal,
} from '../actions/registration';
import request from '../utils/request';

function* validatePasswordField({ id, value }) {
  const password = yield select(state => state.registration.registrationData['member_account_password']);
  const passwordConfirm = yield select(state => state.registration.registrationData['member_account_password_confirm']);
  if (id === 'member_account_password_confirm') {
    if (password === passwordConfirm) {
      yield put(setFieldValid(id));
    } else {
      yield put(setFieldInvalid(id, 'Passwords mismatch: check password and confirm password fields.'));
    }
  } else if (id === 'member_account_password') {
    if (password.length < 8 || !/[A-Z]+/.test(password) || !/\d+/.test(password)) {
      yield put(setFieldInvalid(id, 'Passwords must contain at least 8 characters and have at least one Capital letter and numerical digit.'));
    } else {
      yield put(setFieldValid(id));
    }
  }
}

function* validateFieldOnServer({ id, value }) {
  const url = '/api/auth/check';
  const options = {
    method: 'POST',
    data: {
      [id]: value,
    },
  };
  try {
    const result = yield call(request, url, options);
    yield put(setFieldValid(id));
  } catch (err) {
    yield put(setFieldInvalid(id, err.message));
  }
}


export function* validateCheckbox(action) {
  const isChecked = yield select(state => state.registration.checkboxes[action.id]);
  if (/identity_checkbox/.test(action.id) && isChecked) {
    yield put(showIdentityModal());
  }
  if (action.id === 'identity_residential_address_same_mailing_address_checkbox' && isChecked) {
    yield put(copyMailingAddress());
  }
  if (action.id === 'identity_trusted_contact_person_trusted_contact_checkbox' && !isChecked) {
    const data = yield select(state => state.registration.registrationData);
    const trustedContactFields = Object.keys(data).filter(key => (/identity_trusted_contact/.test(key)));
    yield all(trustedContactFields.map(field => put(setInputFieldValueById(field, ''))));
  }
}

export function* validateEmptyFields(action) {
  if (action.fields) {
    const data = yield select(state => state.registration.registrationData);
    const blankFields = action.fields.filter(field => (!data[field] || data[field] === ''));
    yield all(blankFields.map(field => put(setFieldInvalid(field, 'This is a required field'))));
  }
}

export function* validateFieldValue({ fieldId, fieldValue }) {
  if (fieldId === 'identity_residential_address_residential_address_line_1' || fieldId === 'identity_residential_address_residential_address_line_2') {
    if (fieldValue.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '') === 'pobox') {
      yield put(setFieldInvalid(fieldId, 'PO Box is not allowed in residential address'));
    }
  }
  if (['identity_zip_code', 'identity_mailing_address_zip_code', 'profile_employment_zip_code'].includes(fieldId)) {
    if (fieldValue.length !== 5) {
      yield put(setFieldInvalid(fieldId, 'Invalid ZIP-code'));
    }
  }
}

export function* validateLiquidWorth({ value }) {
  const data = yield select(state => state.registration.registrationData);
  const liquidNetWorth = data['profile_financials_liquid_net_worth'] || '';
  if (value.length < liquidNetWorth.length ||
    (value.length === liquidNetWorth.length && value[0] <= liquidNetWorth[0])) {
    yield put(setInputFieldValueById('profile_financials_liquid_net_worth', ''));
  }
}

// Add your validation function here


// Spawns validation function according to fieldId
export default function* validationSaga({ id, value }) {
  const serverValidatedFields = [
    'member_account_email',
    'member_passport_number',
    'member_drivers_license_number',
    'regulatory_identification_ssn',
  ];
  yield put(setFieldValid(id));
  if (serverValidatedFields.includes(id)) {
    yield validateFieldOnServer({ id, value });
  } else if (id === 'member_account_password_confirm' || id === 'member_account_password') {
    yield validatePasswordField({ id, value });
  } else if (id === 'profile_financials_total_net_worth') {
    yield validateLiquidWorth({ value });
  }
}
