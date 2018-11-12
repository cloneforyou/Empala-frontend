const raiseError = text => new Error(text);
export default function setErrorText(err) {
  if (err.response && err.response.status === 401) {
    if (err.response.data.info === 'INVALID_VALUE') {
      return raiseError('Already in use');
    } else if (err.response.data.info === 'MISSING_CHECK_TYPE') {
      return raiseError('Validation failed');
    } else if (err.response.data.info === 'MISSING_ACCESS_TOKEN') {
      return raiseError('Missing access token');
    } else if (err.response.data.info === 'TOKEN_EXPIRED') {
      return raiseError('Token expired');
    } else if (err.response.data.info === 'MISSING_REFRESH_TOKEN') {
      return raiseError('Missing refresh token');
    } else if (err.response.data.info === 'REFRESH_TOKEN_EXPIRED') {
      return raiseError('Refresh token expired');
    } else if (err.response.data.info === 'ACCESS_DENIED' && err.response.data.misc === 'ACCOUNT_NOT_FOUND') {
      return raiseError('We could not find an Empala membership associated to that email address');
    } else if (err.response.data.info === 'ACCESS_DENIED' && err.response.data.misc === 'INVALID_CODE') {
      return raiseError('Invalid security code');
    } else if (err.response.data.info === 'ACCESS_DENIED' &&
      err.response.data.misc === 'ACCOUNT_SUSPENDED') {
      return raiseError('Account suspended');
    } else if (err.response.data.info === 'ACCESS_DENIED' || err.response.data.info === 'WRONG_CREDENTIALS') {
      return raiseError('Invalid credentials');
    } else if (err.response.data.info === 'ACCOUNT_SUSPENDED' &&
      err.response.data.misc === 'MAX_AUTH_FAILS') {
      return raiseError('Account suspended');
    } else if (err.response.data.info === 'INVALID_ACTIVATION_CODE') {
      return raiseError('Invalid activation code');
    } else if (err.response.data.info === 'WRONG_VERIFICATION_CODE') {
      return raiseError('Wrong verification code');
    } else if (err.response.data.info === 'REGISTRATION_DENIED') {
      if (err.response.data.misc === 'SE_ERROR_EMAIL_IN_USE') {
        return raiseError('Email is already in use');
      }
      return raiseError('Service error, please try again later');
    } else if (err.response.data.info === 'CANNOT_CLOSE_ACCOUNT' && err.response.data.misc === 'ACCOUNT_HAS_ASSETS') {
      return raiseError("Account could'n be closed at the moment cause it has assets.");
    }
  }
  if (err.response && err.response.status === 403) {
    if (err.response.data.info === 'INVALID_PASSWORD' && err.response.data.misc === 'PASSWORD_WAS_ALREADY_USED') {
      return raiseError('Password was already used');
    }
    if (err.response.data.info === 'EMAIL_ALREADY_IN_USE') {
      return raiseError('E-mail is already in use');
    }
    if (err.response.data.info === 'VERIFICATION_DENIED' &&
      err.response.data.misc === 'INVALID_CODE') {
      return raiseError('Invalid verification code');
    }
    if (err.response.data.info === 'WRONG_FILE_FORMAT') {
      return raiseError('Wrong file format');
    }
  }
  if (err.response && err.response.status === 400) {
    if (err.response.data.info === 'MATCHING_PASSWORDS') {
      return raiseError('New password matches old password');
    }
  }
  return false;
}
