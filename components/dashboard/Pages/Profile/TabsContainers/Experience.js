import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Components/Footer';
import FormGroupMapping from './Components/FormGroupMapping';
import {
  fieldsInvestmentExperienceOne,
  fieldsInvestmentExperienceTwo,
} from '../../../../../localdata/profileData';
import { setInputFieldValueById } from '../../../../../actions/registration';
import { flattenObject } from '../../../../../utils/additional';

class Experience extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const flattenUserData = flattenObject(this.props.userData.profile);
    const userData = {};
    Object.keys(flattenUserData).forEach((key) => {
      userData[key.replace(/^Member/, '').toLowerCase()] = flattenUserData[key] === 'Not provided' ?
        '' : flattenUserData[key];
    });
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <h2 className="title-part">Investment Experience</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="row margin-bt-30">
                {fieldsInvestmentExperienceOne.map(item => (<FormGroupMapping
                  item={item}
                  userData={userData}
                  fieldsErrors={this.props.fieldsErrors}
                />))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row margin-bt-30">
                {fieldsInvestmentExperienceTwo.map(item => (<FormGroupMapping
                  item={item}
                  userData={userData}
                  fieldsErrors={this.props.fieldsErrors}
                />))}
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
    userData: state.dashboard.userData.data || {},
    fieldsErrors: state.dashboard.fieldsErrors || {},
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  })),
)(Experience);
