import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnyChart from 'anychart-react';
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
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <AnyChart
                type="pie3d"
                height={250}
                id="chart-container-account-pie"
                data={
                  [
                    { x: "A", value: 637166 },
                    { x: "B", value: 721630 },
                    { x: "C", value: 148662 },
                    { x: "D", value: 78662 },
                    { x: "E", value: 90000 }
                  ]
                }
              />
            </div>
            <div className="col-md-6">
              <AnyChart
                type="area"
                height={250}
                id="chart-container-account-area"
                data={
                  [7.44, 7.20, 6.45, 7.42],
                  [6.43, 6.16, 6.36, 6.43],
                  [6.04, 5.58, 6.16, 6.05]
                }
              />
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
