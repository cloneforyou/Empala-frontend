import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import FlatButton from 'material-ui/FlatButton';
import EmpalaInput from '../registration/EmpalaInput';
import { GREEN, WHITE } from '../../constants/colors';
import { setInputFieldValueById } from '../../actions/registration';
import { loginRequest, unblockAccountInit } from "../../actions/auth";


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
};

const SuspendedForm = props => (
  <div style={style.warningTextBlock}>
    <h2>Security warning</h2>
    <p>Too many failed login attempts has been received from your account.</p>
    <p>Account will be suspended until <span style={style.markedText}>activation code</span> been provided. We sent you email, containing that code.
      Please check your e-mail for details.
    </p>
    <p>To activate your account type <span style={style.markedText}>e-mail</span> and <span style={style.markedText}>activation code</span> in fields below.
    </p>
    <form>
      <EmpalaInput
        key="index_email"
        id="index_email"
        type="text"
        label="E-mail"
        handleChange={e => props.setInputValueById(e)}
      />
      <EmpalaInput
        key="index_activation_code"
        id="index_activation_code"
        type="text"
        label="Activation code"
        handleChange={e => props.setInputValueById(e)}
        errorText={props.errorText}
      />
      <FlatButton
        label="Unblock account"
        style={{ ...style.loginBtn, width: 'auto', padding: '0 5px' }}
        labelStyle={style.labelLoginBtn}
        onClick={props.unblockAccount}
      />
    </form>
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
  }),
  dispatch => ({
    handleLogin: () => dispatch(loginRequest()),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    unblockAccount: () => dispatch(unblockAccountInit()),
  }),
)(Login);
