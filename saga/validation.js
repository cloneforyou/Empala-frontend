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
import ignoredFields from '../localdata/noValidatedFiels';

function* validatePasswordField(id) {
  const password = yield select(state => state.registration.registrationData['member_account_password']);
  const passwordConfirm = yield select(state => state.registration.registrationData['member_account_password_confirm']);
  const newPassword = yield select(state => state.auth['recovery_password'] || state.profile.profileUserData['reset_password']);
  const newPasswordConfirm = yield select(state => state.registration.registrationData['recovery_password_confirm'] ||
    state.profile.profileUserData['reset_password_confirm']);
  if (id === 'member_account_password_confirm' || id === 'recovery_password_confirm' || id === 'reset_password_confirm') {
    if (id === 'member_account_password_confirm' && password === passwordConfirm) {
      yield put(setFieldValid('member_account_password_confirm'));
    } else if (id === 'recovery_password_confirm' && newPassword === newPasswordConfirm) {
      yield put(setFieldValid('recovery_password_confirm'));
    } else if (id === 'reset_password_confirm' && newPassword === newPasswordConfirm) {
      yield put(setFieldValid('reset_password_confirm'));
    } else {
      yield put(setFieldInvalid(id, 'Passwords mismatch: check password and confirm password fields.'));
    }
  } else if (id === 'member_account_password' || id === 'recovery_password' || id === 'reset_password') {
    let checkedPassword = password;
    if (id === 'recovery_password' || id === 'reset_password') checkedPassword = newPassword;
    if (checkedPassword.length < 8 || !/[A-Z]+/.test(checkedPassword) || !/\d+/.test(checkedPassword)) {
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
    const blankFields = action.fields.filter(field => (!ignoredFields.includes(field) &&
      (!data[field] || data[field] === '')));
    yield all(blankFields.map(field => put(setFieldInvalid(field, 'This is a required field'))));
  }
}

export function* validateFieldValue({ fieldId, fieldValue }) {
  if (fieldId === 'identity_residential_address_residential_address_line_1' ||
    fieldId === 'identity_residential_address_residential_address_line_2') {
    if (fieldValue && (fieldValue.toLowerCase().replace(/[&/\\#,+()$~%.'":*?<>{} ]/g, '').includes('pobox') ||
        fieldValue.toLowerCase().replace(/[&/\\#,+()$~%.'":*?<>{} ]/g, '').includes('postofficebox'))) {
      yield put(setFieldInvalid(fieldId, 'Post Office Boxes are not allowed in residential address'));
    }
  }
  if (['identity_zip_code', 'identity_mailing_address_zip_code', 'profile_employment_zip_code'].includes(fieldId)) {
    if (fieldValue && fieldValue.length !== 5) {
      yield put(setFieldInvalid(fieldId, 'Invalid ZIP-code format, please provide five digits code'));
    }
  }
  if (fieldId === 'profile_employment_employment_type' && fieldValue !== 'Employed') {
    let data = yield select(state => state.registration.registrationData);
    if (!data.profile_employment_employment_type) {
      data = yield select(state => state.profile.profileUserData);
    }
    const employementFields = Object.keys(data).filter(key => (/profile_employment/.test(key) && key !== 'profile_employment_employment_type'));
    yield all(employementFields.map(field => put(setInputFieldValueById(field, ''))));
  }
}

export function* validateLiquidWorth({ value }) {
  const registrationData = yield select(state => state.registration.registrationData);
  const profileData = yield select(state => state.profile.profileUserData);
  const liquidNetWorth = registrationData['profile_financials_liquid_net_worth'] ||
    profileData['profile_financials_liquid_net_worth'] || '';
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
    'member_account_account_no',
  ];
  const passwordFields = [
    'member_account_password_confirm',
    'member_account_password',
    'recovery_password',
    'recovery_password_confirm',
    'reset_password_confirm',
    'reset_password',
  ];
  yield put(setFieldValid(id));
  if (serverValidatedFields.includes(id)) {
    yield validateFieldOnServer({ id, value });
  } else if (passwordFields.includes(id)) {
    yield validatePasswordField(id);
  } else if (id === 'profile_financials_total_net_worth') {
    yield validateLiquidWorth({ value });
  }
}
