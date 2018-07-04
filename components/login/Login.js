import React from 'react';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import EmpalaInput from '../registration/EmpalaInput';
import { GREEN, TORCH_RED, WHITE } from '../../constants/colors';
import { setInputFieldValueById } from '../../actions/registration';
import {
  clearLoginState, clearRegistrationData,
  loginRequest,
  sendActivationLink,
  setPasswordForgotten, toggleModal,
  unblockAccountInit,
} from '../../actions/auth';
import GoogleAuth from '../social/auth/GoogleAuth';
import RegistrationModal from './RegistrationModal';
import logo from '../../static/images/login_logo.png';
import FacebookAuth from '../social/auth/FaceBookAuth';

import LinkedInAuth from '../social/auth/LinkedInAuth';

const isNode = require('detect-node');

const style = {
  warningTextBlock: {
    width: '350px',
    fontSize: '14px',
    textAlign: 'justify',
  },
  markedText: {
    color: GREEN,
    fontStyle: 'oblique',
    fontWeight: 'bolder',
  },
  errorText: {
    color: TORCH_RED,
    fontWeight: 'bolder',
  },
  markedText_link: {
    cursor: 'pointer',
    fontSize: '.9rem',
    verticalAlign: 'top',
    display: 'inline-block',
    margin: '10px 0',
  },
};


const UserEmailForm = props => (
  <div className="login__form-width no-gutters clear-fix">
    <EmpalaInput
      key="index_email"
      id="index_email"
      type="text"
      label="E-mail"
      handleChange={props.handleInput}
      errorText={props.errorText}
      onKeyPress={(e) => {
        if (e.key === 'Enter') props.handleClick();
      }}
    />
    {props.goBack &&
    <span
      style={{ ...style.markedText, ...style.markedText_link }}
      onClick={props.handleBack}
    >Go back
    </span>
    }
    <button
      className="login__btn"
      onClick={props.handleClick}
      type="button"
    >SEND
    </button>
  </div>
);
const ConfirmationText = (props) => {
  if (props.linkSent) return <p>Please check your e-mail for details.</p>;
  return (
    <UserEmailForm
      handleClick={props.sendActivationLink}
      handleInput={props.setInputValueById}
      errorText={props.errorText}
    />
  );
};

const SuspendedForm = props => (
  /* Text is a sample */
  <div style={style.warningTextBlock}>
    <h2>Security warning</h2>
    <p>You have too many failed login attempts on your account.</p>
    <p>We have sent you <span style={style.markedText}>activation link</span> to your email to reactivate your account.
    </p>
    <div>
      <ConfirmationText {...props} />
    </div>

  </div>
);

const ForgotPasswordForm = (props) => {
  if (props.linkSent) {
    return (
      <p>We have sent you a link for password reset procedure. Please check your e-mail for details.</p>);
  }
  return (
    <div style={style.warningTextBlock}>
      <h2 className="login__security-title">Let’s find your account</h2>
      <div className="login__description-wrapper">
        <span>Enter your email address</span>
      </div>
      <UserEmailForm
        handleClick={props.sendPasswordRecoveryLink}
        handleInput={props.setInputValueById}
        errorText={props.errorText}
        handleBack={props.clearLoginState}
        goBack
      />
    </div>
  );
};

const Login = props => {
  const handleLogin = (e) => {
    if (e.key === 'Enter') props.handleLogin('local', null);
  };
  return (
    <div className="row login">
      {
        props.loading &&
        <div className="loader__wrap">
          <div className="loader">
            <CircularProgress
              size={100}
              style={{ color: '#98c73a' }}
            />
          </div>
        </div>
      }
      <div className="login__content ">
        <img className="login__logo" src={logo} alt="Logotype" />
        {props.accountSuspended && <SuspendedForm {...props} />}
        {props.forgotPassword && <ForgotPasswordForm {...props} />}
        {!(props.accountSuspended || props.forgotPassword) &&
        <div>
          <h3 className="login__title fw-300">Login to your account</h3>
          <div className="login__form-width no-gutters clear-fix">
            <EmpalaInput
              key="username"
              id="index_username"
              type="text"
              label="Member no. or e-mail"
              handleChange={e => props.setInputValueById(e)}
              errorText={props.errorText || props.fieldsError.index_username}
              onKeyPress={handleLogin}
            />
            <EmpalaInput
              key="password"
              id="index_password"
              type="password"
              label="Password"
              handleChange={e => props.setInputValueById(e)}
              errorText={props.fieldsError.index_password}
              onKeyPress={handleLogin}
            />
            <button
              className="default-btn login__forgot-link fw-300 float-right"
              onClick={props.setPasswordForgotten}
              tabIndex="-1"
            >
              forgot password?
            </button>
            <button className="login__btn" onClick={() => props.handleLogin('local', null)}>SIGN IN</button>
          </div>
          <div className="social-auth">
            <div className="styled-part-separate"><span>or connect with</span></div>
            <div className="social-auth__row">
              {/* <button className="social-btn social-btn__facebook">facebook</button> */}
              <FacebookAuth handlelogin={props.handleLogin} />
              <GoogleAuth handlelogin={props.handleLogin} />
              {!isNode && <LinkedInAuth handlelogin={props.handleLogin} />}
            </div>
          </div>

          <div className="text-center">
            <Link href="/registration"><a className="gray-link">New member registration</a></Link>
          </div>
        </div>
        }
        <RegistrationModal
          handleClose={props.handleModalCancel}
          open={props.modalIsOpen}
        />
      </div>
    </div>
  );
}

export default connect(
  state => ({
    errorText: state.auth.authError === 'Invalid credentials' ?
      'Password is incorrect or account not found' :
      state.auth.authError,
    accountSuspended: state.auth.isBlocked,
    linkSent: state.auth.linkSent,
    forgotPassword: state.auth.forgotPassword,
    fieldsError: state.auth.fieldsErrors,
    modalIsOpen: state.auth.modalIsOpen,
    loading: state.auth.loading,
  }),
  dispatch => ({
    handleLogin: (provider, data) => dispatch(loginRequest(provider, data)),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    unblockAccount: () => dispatch(unblockAccountInit()),
    sendActivationLink: () => dispatch(sendActivationLink('unblockAccount')),
    setPasswordForgotten: () => dispatch(setPasswordForgotten()),
    sendPasswordRecoveryLink: () => dispatch(sendActivationLink('passwordRecovery')),
    clearLoginState: () => dispatch(clearLoginState()),
    handleModalCancel: () => {
      dispatch(clearRegistrationData());
      dispatch(toggleModal());
    },
  }),
)(Login);
