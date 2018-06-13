import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import FlatButton from 'material-ui/FlatButton';
import EmpalaInput from '../registration/EmpalaInput';
import { GREEN, TORCH_RED, WHITE } from '../../constants/colors';
import { setInputFieldValueById } from '../../actions/registration';
import { loginRequest, sendActivationLink, unblockAccountInit } from '../../actions/auth';


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
};

const ConfirmationText = (props) => {
  if (props.linkSent) return <p>Please check your e-mail for details.</p>;
  if (props.errorText) {
    return <p><span style={style.errorText}>Sorry, an error occurs when sending activation link</span></p>;
  }
  return (
    <form>
      Please type your account e-mail below.
      <EmpalaInput
        key="index_email"
        id="index_email"
        type="text"
        label="E-mail"
        handleChange={props.setInputValueById}
      />
      <FlatButton
        label="Send a link"
        style={{ ...style.loginBtn, width: 'auto', padding: '0 5px' }}
        labelStyle={style.labelLoginBtn}
        onClick={props.sendActivationLink}
      />
    </form>
  );
}

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

const Login = (props) => {
  if (props.accountSuspended) {
    return <SuspendedForm {...props} />;
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
    errorText: state.auth.loginError,
    accountSuspended: state.auth.isBlocked,
    linkSent: state.auth.linkSent,
  }),
  dispatch => ({
    handleLogin: () => dispatch(loginRequest()),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    unblockAccount: () => dispatch(unblockAccountInit()),
    sendActivationLink: () => dispatch(sendActivationLink()),
  }),
)(Login);
