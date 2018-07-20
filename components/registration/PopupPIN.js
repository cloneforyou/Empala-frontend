import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconPadlock from '../../static/images/dashboard-icons/icon-padlock.svg';

;

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

  render() {
    const { verify_code } = this.state;
    return (
      <div className="popup-verify">
        <div className="popup-verify__body">
          <h2 className="popup-verify__title">Verify your email address</h2>
          <img className="popup-verify__icon" src={iconPadlock} alt="" />
          <p className="popup-verify__sub-title">Click ‘send’ to receive an email with a one-time code.</p>
          {/*<div className="short-form-group">
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
        </div>*/}
        </div>
        <div className="popup-verify__foot buttons-row">
          <button className="popup-verify__btn-green">Send</button>
          <button className="popup-verify__btn-default">Cancel</button>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  showPopupPIN: state.registration.showPopupPIN
}), (dispatch) => {
})(PopupPIN);
