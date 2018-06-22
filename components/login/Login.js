import React from 'react';
import Link from 'next/link';
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
import logo from '../../static/images/logo.svg';
import FacebookAuth from '../social/auth/FaceBookAuth';

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
  <form>
    Please type your account e-mail below.
    <EmpalaInput
      key="index_email"
      id="index_email"
      type="text"
      label="E-mail"
      handleChange={props.handleInput}
      errorText={props.errorText}
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
    >Send a link
    </button>
  </form>
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
    <p>Too many failed login attempts has been received from your account.</p>
    <p>Account is been suspended for a while. We can send you email, containing <span style={style.markedText}>activation link</span>.
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
      <h2>Have you forgotten your password?</h2>
      <p>Please enter your account email below so we can send you a link for password reset.</p>
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

const Login = (props) => {
  if (props.accountSuspended) {
    return <SuspendedForm {...props} />;
  }
  if (props.forgotPassword) {
    return <ForgotPasswordForm {...props} />;
  }
  return (
    <div className="row login">
      <div className="col-6 login__part login__bg">
        <div className="login__top-layer login__content text-center">
          <img className="login__logo" src={logo} alt="Logotype" />
          <ul className="login__list vertical-list white fw-300">
            <li>Join together</li>
            <li>Invest together</li>
            <li>Succeed together</li>
          </ul>
        </div>
      </div>
      <div className="col-6 login__part">
        <div className="login__content ">
          <h3 className="login__title fw-300">Login to your account</h3>
          <div className="login__form-width no-gutters clear-fix">
            <EmpalaInput
              key="username"
              id="index_username"
              type="text"
              label="E-mail"
              handleChange={e => props.setInputValueById(e)}
              errorText={props.errorText || props.fieldsError.index_username}
            />
            <EmpalaInput
              key="password"
              id="index_password"
              type="password"
              label="Password"
              handleChange={e => props.setInputValueById(e)}
              errorText={props.fieldsError.index_password}
            />
            <a
              className="login__forgot-link fw-300 float-right"
              onClick={props.setPasswordForgotten}
            >
              Forgot password?
            </a>
            <button className="login__btn" onClick={() => props.handleLogin('local', null)}>SIGN IN</button>
          </div>
          <div className="social-auth">
            <div className="styled-part-separate"><span>or connect with</span></div>
            <div className="social-auth__row">
              {/*<button className="social-btn social-btn__facebook">facebook</button>*/}
              <FacebookAuth handlelogin={props.handleLogin} />
              <GoogleAuth handlelogin={props.handleLogin} />
              <button className="social-btn social-btn__linkedin">linkedin</button>
            </div>
          </div>
          <div className="text-center">
            <Link href="/registration"><a className="green-link">Registration</a></Link>
          </div>
          <RegistrationModal
            handleClose={props.handleModalCancel}
            open={props.modalIsOpen}
          />
        </div>
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
