import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../static/images/login_logo.png';
import { twoFactorAuthentication } from '../../actions/auth';

class AuthPhone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '000000',
    }
  }

  handleChange = (e) => {
    this.setState({ code: e.target.value })
  }

  handleLogin = () => {
    const registrationData = localStorage.getItem('registrationData');
    const data = JSON.parse(registrationData)
    const login = data.index_username;
    const password = data.index_password;
    const { code } = this.state;
    this.props.twoFactorAuthentication(login, password, code);
  };

  render() {
    const { code } = this.state;
    return (
      <div className="row login mfa">
        <div className="login__content">
          <img className="login__logo" src={logo} alt="Logotype" />
          <h1 className="mfa__title">Two-Factor Authentication</h1>
          <p className="mfa__sub-title">
            Enter the code we have just sent to the mobile phone registered with your account.
          </p>
          <input
            type="text"
            placeholder={code}
            className="mfa__input"
            onChange={this.handleChange}
          />

          <button
            className="login__btn login__btn_sm"
            onClick={this.handleLogin}
          >
            CONTINUE
          </button>
        </div>
      </div>
    )
  }
}

export default connect(state => {}, dispatch => ({
  twoFactorAuthentication: (login, password, code) => dispatch(twoFactorAuthentication(login, password, code))
}))(AuthPhone);