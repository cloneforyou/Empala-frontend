import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import FlatButton from 'material-ui/FlatButton';
import EmpalaInput from '../registration/EmpalaInput';
import { GREEN, WHITE } from '../../constants/colors';
import { setInputFieldValueById } from '../../actions/registration';


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
};

const Login = props => (
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
        errorText={props.errorText}
      />
    </div>
  </div>
);

export default connect(
  state => ({
    errorText: state.reducer.loginError,
  }),
  dispatch => ({
    handleLogin: () => dispatch({
      type: 'LOGIN_REQUEST',
    }),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
  }),
)(Login);
