import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import FlatButton from 'material-ui/FlatButton';
import EmpalaInput from '../registration/EmpalaInput';
import { GREEN, TORCH_RED, WHITE } from '../../constants/colors';
import { setInputFieldValueById } from '../../actions/registration';
import {
  clearLoginState,
  loginRequest,
  sendActivationLink,
  setPasswordForgotten,
  unblockAccountInit,
} from '../../actions/auth';


const style = {
  loginBtn: {
    backgroundColor: GREEN,
    width: '80px',
    height: '30px',
    lineHeight: '15px',
    float: 'right',
  },
  labelLoginBtn: {
    color: WHITE,
    fontSize: '12px',
    textAlign: 'center',
    padding: 0,
    verticalAlign: 'top',
  },
  warningTextBlock: {
    maxWidth: '400px',
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
    verticalAlign: 'text-top',
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
    <FlatButton
      label="Send a link"
      style={{ ...style.loginBtn, width: 'auto', padding: '0 5px' }}
      labelStyle={style.labelLoginBtn}
      onClick={props.handleClick}
    />
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
    <div>
      Please log in or
      <Link href="/registration">
        <span className="index_placeholder__link"> register</span>
      </Link>
      <div>
        <EmpalaInput
          key="username"
          id="index_username"
          type="text"
          label="E-mail"
          handleChange={e => props.setInputValueById(e)}
          errorText={props.errorText}
        />
        <EmpalaInput
          key="password"
          id="index_password"
          type="password"
          label="Password"
          handleChange={e => props.setInputValueById(e)}
        />
        <span
          style={{ ...style.markedText, ...style.markedText_link }}
          onClick={props.setPasswordForgotten}
        >Forgot password?
        </span>
        <FlatButton
          label="Log in"
          style={style.loginBtn}
          labelStyle={style.labelLoginBtn}
          onClick={props.handleLogin}
        />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    errorText: state.auth.authError === 'Invalid credentials' ?
      'Account not found' :
      state.auth.authError,
    accountSuspended: state.auth.isBlocked,
    linkSent: state.auth.linkSent,
    forgotPassword: state.auth.forgotPassword,
  }),
  dispatch => ({
    handleLogin: () => dispatch(loginRequest()),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    unblockAccount: () => dispatch(unblockAccountInit()),
    sendActivationLink: () => dispatch(sendActivationLink('unblockAccount')),
    setPasswordForgotten: () => dispatch(setPasswordForgotten()),
    sendPasswordRecoveryLink: () => dispatch(sendActivationLink('passwordRecovery')),
    clearLoginState: () => dispatch(clearLoginState()),
  }),
)(Login);
