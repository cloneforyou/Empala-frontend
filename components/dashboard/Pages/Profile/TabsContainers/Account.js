import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fieldsAccountFirst,
  fieldsAccountSecond,
} from '../../../../../localdata/profileData';
import Footer from './Components/Footer';
import FormGroupMapping from './Components/FormGroupMapping';
import { setInputFieldValueById } from "../../../../../actions/registration";

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <h2 className="title-part">Account</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="row margin-bt-30">
                {fieldsAccountFirst.map(item => (
                  <FormGroupMapping {...{ ...this.props, item, key: item.id }} />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row margin-bt-30">
                {fieldsAccountSecond.map(item => (
                  <FormGroupMapping {...{ ...this.props, item, key: item.id }} />
                ))}
              </div>
            </div>
          </div>
          <Footer deleteAccountBtnIsShow={false} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    userData: state.profile.profileUserData || {},
    fieldsErrors: state.profile.fieldsErrors || {},
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  })),
)(Account);
