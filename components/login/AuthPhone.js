import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../static/images/login_logo.png';
import { loginRequest, toggleCodeResend, twoFactorAuthentication } from '../../actions/auth';
import { ForgotPasswordForm, SuspendedForm } from './Login';
import EmpalaCheckbox from "../registration/EmpalaCheckbox";
import {toggleCheckboxById} from "../../actions/registration";

class AuthPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '000000',
    }
  }

  handleChange = e => {
    this.setState({ code: e.target.value })
  };

  handleLogin = () => {
    const { code } = this.state;
    this.props.twoFactorAuthentication(code);
  };

  handleResend = () => {
    this.setState({code: '000000'});
    this.props.resendCode();
    this.props.toggleCodeResend();
  };

  pressEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin()
    }
  };

  render() {
    const { code } = this.state;
    return (
      <div className="row login mfa">
        <div className="login__content">
          <img className="login__logo" src={logo} alt="Logotype"/>
          {this.props.accountSuspended && <SuspendedForm {...this.props} />}
          {this.props.forgotPassword && <ForgotPasswordForm {...this.props} />}
          {

            !(this.props.accountSuspended || this.props.forgotPassword) &&
            <div className="text-center">
              <h1 className="mfa__title">Two-Factor Authentication</h1>
              <p
                className="mfa__sub-title">
                Enter the code we have just sent to the mobile phone registered with your account.
              </p>
              <input
                type="text"
                placeholder={code}
                className="mfa__input"
                onChange={this.handleChange}
                onKeyPress={(e) => this.pressEnter(e)}
              />
              <p style={{color: 'red', fontStyle: 'oblique'}}>{this.props.errorText}</p>
              <div className="login__form-width">
                <EmpalaCheckbox
                  id="login_stop_two_factor_authentication"
                  label="Click to trust this device and stop Two-Factor authentication."
                  handleCheck={this.props.toggleCheckboxById}
                  checked={this.props.checkboxes.login_stop_two_factor_authentication}
                />
              </div>
              <button
                className="login__btn login__btn_sm"
                onClick={this.handleLogin}
                disabled={this.props.resendCodeNeeded}
              >
                CONTINUE
              </button>
              <button
                className="login__btn login__btn_sm mt-2"
                onClick={this.handleResend}
                disabled={!this.props.resendCodeNeeded}
              >
                RESEND CODE
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  errorText: state.auth.authError,
  resendCodeNeeded: state.auth.resendCodeNeeded,
  checkboxes: state.registration.checkboxes,
}), dispatch => ({
  twoFactorAuthentication: (code) => dispatch(twoFactorAuthentication(code)),
  resendCode: () => dispatch(loginRequest('resend')),
  toggleCodeResend: () => dispatch(toggleCodeResend()),
  toggleCheckboxById: e => dispatch(toggleCheckboxById(e.target.id)),
}))(AuthPhone);