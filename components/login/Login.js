import React from 'react';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import EmpalaInput from '../registration/EmpalaInput';
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
import FaSpinner from 'react-icons/lib/fa/spinner';
import AuthPhone from './AuthPhone';

const isNode = require('detect-node');

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
      className="login__link green"
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
  <div className="login__text-container">
    <h2>Security warning</h2>
    <p>You have too many failed login attempts on your account.</p>
    <p>We {props.linkSent ? 'have sent' : 'will send'} you <span className="green">activation link</span> to your email to reactivate your account.
    </p>
    <span
      className="login__link green"
      onClick={props.clearLoginState}
    >Go back
    </span>
    <div>
      <ConfirmationText {...props} />
    </div>

  </div>
);

const ForgotPasswordForm = (props) => {
  if (props.linkSent) {
    return (
      <div>
        <p>We have sent you a link for password reset procedure. Please check your e-mail for details.</p>
        <span
          className="login__link green"
          onClick={props.clearLoginState}
        >Go back
        </span>
      </div>
    );
  }
  return (
    <div className="login__text-container">
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
  if (props.loginMfa || props.socialLoginMfa) return <AuthPhone />;
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
      <div className="login__content">
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
            { !isNode ? (
              <div className="social-auth__row">
                <FacebookAuth handlelogin={props.handleLogin} />
                <GoogleAuth handlelogin={props.handleLogin} />
                <LinkedInAuth handlelogin={props.handleLogin} />
              </div>
            ) :
              <FaSpinner size={40} className="spinner" /> }
          </div>

          <div className="text-center">
            <Link href="/registration">
              <a className="gray-link">New member registration</a>
            </Link>
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
};

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
    loginMfa: state.auth.loginMfa,
    socialLoginMfa: state.auth.socialLoginMfa,
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
