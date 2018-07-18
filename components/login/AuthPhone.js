import React, { Component } from 'react';
import logo from '../../static/images/login_logo.png';
import EmpalaInput from '../registration/EmpalaInput';

class AuthPhone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '0000',
    }
  }

  handleChange = (e) => {
    this.setState({ code: e.target.value })
  }

  handleLogin = (e) => {
    if (e.key === 'Enter') {

    }
  };

  render() {
    const { code } = this.state;
    return (
      <div className="row login mfa">
        <div className="login__content">
          <img className="login__logo" src={logo} alt="Logotype" />
          <h1 className="mfa__title">Two-Factor Authentication</h1>
          <p className="mfa__sub-title">Enter the code we have just sent to the mobile phone
            registered with your account.</p>
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

export default AuthPhone;