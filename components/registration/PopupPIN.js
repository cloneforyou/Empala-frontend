import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconPadlock from '../../static/images/dashboard-icons/icon-padlock.svg';
import iconShield from '../../static/images/dashboard-icons/icon-shield.svg';
import { verifySendRequest, sendCodeVerify, closePopupPIN, changeTabPage } from '../../actions/registration'

class PopupPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: ''
    };
    this.titles = {
      email: 'Verify your email address',
      phone: 'Phone number confirmation'
    };
    this.formTitle = () => this.titles[this.props.type] || 'title';
  }
  componentDidMount() {
    if (this.props.type === 'phone') {
      this.props.verifySendRequest('phone')
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  };

  verifyCode = () => {
    const { verify_code } = this.state;
    this.props.sendCodeVerify(verify_code, this.props.type)
  };

  closePopup = () => {
    this.props.closePopupPIN(this.props.tabName, this.props.tabIndex)
  };


  render() {
    const { verify_code } = this.state;
    const {
      showVerifyEmailForm,
      codeVerifyError,
      type,
    } = this.props;
    return (
      <div className="popup-verify">
        {
          codeVerifyError && <span className="red">Error</span>
        }
        {
          !showVerifyEmailForm && type ==='email'?
            <div className="popup-verify__body popup-verify__body_h-335">
              <h2 className="popup-verify__title">{this.formTitle()}</h2>
              <img className="popup-verify__icon" src={iconPadlock} alt="" />
              <p className="popup-verify__sub-title">Click ‘send’ to receive an email with a one-time code.</p>
              <div className="popup-verify__foot buttons-row">
                <button
                  className="popup-verify__btn-green"
                  onClick={() => this.props.verifySendRequest(type)}
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
              <h2 className="popup-verify__title">{this.formTitle()}</h2>
              <img className="popup-verify__icon" src={iconShield} alt="" />
              <p className="popup-verify__sub-title">Enter the code to continue your registration.</p>
              {
                type === 'phone' && <p className="text-justify mb-4">Due to security policy we use two-factor authorization at log in,
                  so we you need to ensure you have the access to phone number been provided. <br />
                We have send you sms containing phone number verification code.</p>
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
                  onClick={() => this.props.verifySendRequest(type)}
                >
                  Resend
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
    tabName: state.registration.tabName || 'member',
    tabIndex: state.registration.tabIndex || 1,
  }),
  (dispatch) => ({
    closePopupPIN: (tabName, tabIndex) => {
      dispatch(closePopupPIN());
      dispatch(changeTabPage(tabName, tabIndex, 'forward'))},
    verifySendRequest: (type) => dispatch(verifySendRequest(type)),
    sendCodeVerify: (code, entityType) => dispatch(sendCodeVerify(code, entityType))
  })
)
(PopupPIN);
