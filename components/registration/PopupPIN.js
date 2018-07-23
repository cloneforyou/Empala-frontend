import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconPadlock from '../../static/images/dashboard-icons/icon-padlock.svg';
import { verifySendRequest, sendCodeVerify, closePopupPIN } from '../../actions/registration'

class PopupPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  verifyCode = () => {
    const { verify_code } = this.state;
    this.props.sendCodeVerify(verify_code)
  }

  closePopup = () => {
    this.props.closePopupPIN()
  }

  render() {
    const { verify_code } = this.state;
    const { showVerifyEmailForm, codeVerifyError } = this.props;
    return (
      <div className="popup-verify">
        <div className="popup-verify__wrap">
          <h2 className="popup-verify__title">Verify your email address</h2>
          {
            codeVerifyError && <span className="red">Error</span>
          }
          {
            !showVerifyEmailForm ?
              <div className="popup-verify__body">
                <img className="popup-verify__icon" src={iconPadlock} alt="" />
                <p className="popup-verify__sub-title">Click ‘send’ to receive an email with a one-time code.</p>
                <div className="popup-verify__foot buttons-row">
                  <button
                    className="popup-verify__btn-green"
                    onClick={() => this.props.verifySendRequest()}
                  >
                    Send
                  </button>
                  <button
                    className="popup-verify__btn-default"
                    onClick={this.closePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div> :
              <div className="popup-verify__body">
                <img className="popup-verify__icon" src={iconPadlock} alt="" />
                <p className="popup-verify__sub-title">Enter the code to continue your registration.</p>
                <div className="short-form-group">
                  <label
                    className="short-form-group__label"
                    htmlFor="verify_code"
                  >
                    One-time password
                  </label>
                  <input
                    type="text"
                    placeholder="0000"
                    className="short-form-group__input"
                    value={verify_code}
                    id="verify_code"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="popup-verify__foot buttons-row">
                  <button
                    className="popup-verify__btn-green"
                    onClick={this.verifyCode}
                  >
                    Verify
                  </button>
                  <button
                    className="popup-verify__btn-default"
                    onClick={() => this.props.verifySendRequest()}
                  >
                    Resend
                  </button>
                </div>
              </div>
          }

        </div>
      </div>
    )
  }
}

export default connect((state) => ({
    showVerifyEmailForm: state.registration.showVerifyEmailForm,
    codeVerifyError: state.registration.codeVerifyError,
  }),
  (dispatch) => ({
    closePopupPIN: () => dispatch(closePopupPIN()),
    verifySendRequest: () => dispatch(verifySendRequest()),
    sendCodeVerify: (code) => dispatch(sendCodeVerify(code))
  })
)
(PopupPIN);
