import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconPadlock from '../../static/images/dashboard-icons/icon-padlock.svg';
import iconShield from '../../static/images/dashboard-icons/icon-shield.svg';
import { verifySendRequest, sendCodeVerify, closePopupPIN, changeTabPage } from '../../actions/registration'
import { cancelProfileInfoChange } from '../../actions/profile';

class PopupPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: '',
      resendCode: false,
    };
    this.titles = {
      email: 'Verify your email address',
      phone: 'Verify your Contact No.'
    };
    this.formTitle = () => this.titles[this.props.type] || 'title';
  }
  componentDidMount() {
    if (this.props.type === 'phone') {
      this.props.verifySendRequest('phone')
    }
  }
  handleChange = (e) => {
    if (e.target.value && e.target.value.length <= 4) {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  verifyCode = () => {
    const { verify_code } = this.state;
    this.props.sendCodeVerify(verify_code, this.props.type, this.props.source)
  };

  handleEnter = (e) => {
    if (e.key === 'Enter' && e.target.value && e.target.value.length === 4) {
      this.verifyCode();
    }
  };

  handleClose = () => {
    if (this.props.source === 'dashboard') this.props.cancelProfileInfoChange();
    this.props.closePopupPIN()
  };


  render() {
    const { verify_code, resendCode } = this.state;
    const {
      showVerifyEmailForm,
      codeVerifyError,
      codeSent,
      type,
      source,
    } = this.props;
    return (
      <div className="popup-verify">
        {
          codeVerifyError && <span className="red">Error: {codeVerifyError}</span>
        }
        {
          !showVerifyEmailForm && source !== 'dashboard' && type === 'email'?
            <div className="popup-verify__body popup-verify__body_h-335">
              <div>
                <h2 className="popup-verify__title">{this.formTitle()}</h2>
                <img className="popup-verify__icon" src={iconPadlock} alt="" />
                <p className="popup-verify__sub-title">Click ‘send’ to receive an email with a one-time code.</p>
              </div>
              <div className="popup-verify__foot buttons-row">
                <button
                  className="popup-verify__btn popup-verify__btn_green"
                  onClick={() => this.props.verifySendRequest(type)}
                >
                  Send
                </button>
                <button
                  className="popup-verify__btn_default"
                  onClick={this.handleClose}
                  style={{ fontSize: '16px' }}
                >
                  Cancel
                </button>
              </div>
            </div> :
            <div className="popup-verify__body">
              <h2 className="popup-verify__title">{this.formTitle()}</h2>
              <img className="popup-verify__icon" src={iconShield} alt="" />
              <p className="popup-verify__sub-title">
                {`${source === 'dashboard' ?
                  'Enter the code to confirm your e-mail' :
                  'Enter the code to continue your registration.'}`}
                </p>
              {
                type === 'phone' && <p className="popup-verify__text-info mb-4">Your security is our top priority.
                  As part of our KYC process, we need to validate the contact no. you entered.</p>
              }
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
                  onKeyPress={this.handleEnter}
                />
              </div>
              {
                codeSent && resendCode && <span className='text-success'>Code sent</span>
              }
              <div className="popup-verify__foot buttons-row mb-4">
                {
                  source !== 'dashboard' && <button
                  className="popup-verify__btn popup-verify__btn_outline "
                  onClick={() => {
                    this.props.verifySendRequest(type);
                    this.setState({ resendCode: true });
                  }}
                >
                  Resend
                </button>
                }
                <button
                  className={`popup-verify__btn popup-verify__btn_green
                  ${source === 'dashboard' ? 'popup-verify__btn-block' : ''}`}
                  onClick={this.verifyCode}
                >
                  Verify
                </button>
              </div>
              <div>
                <button
                  className="popup-verify__btn_default"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default connect((state) => ({
    showVerifyEmailForm: state.registration.showVerifyEmailForm,
    codeVerifyError: state.registration.codeVerifyError,
    codeSent: state.registration.codeSent,
    tabName: state.registration.tabName || 'member',
    tabIndex: state.registration.tabIndex || 1,
  }),
  (dispatch) => ({
    closePopupPIN: () => dispatch(closePopupPIN()),
    verifySendRequest: (type) => dispatch(verifySendRequest(type)),
    sendCodeVerify: (code, entityType, source) => dispatch(sendCodeVerify(code, entityType, source)),
    cancelProfileInfoChange: () => dispatch(cancelProfileInfoChange()),
  })
)
(PopupPIN);
