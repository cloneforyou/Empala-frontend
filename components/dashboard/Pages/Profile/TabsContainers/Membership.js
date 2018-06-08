import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Components/Footer';
import UploadImage from '../../../UploadImage';
import FormGroupMapping from './Components/FormGroupMapping';
import {
  fieldsMembership,
  fieldsResidentialAddress,
  fieldsMaillingAddress,
  fieldsPersonalWealth,
  fieldsMemberPersonal,
  fieldResetPassword,
} from '../../../../../localdata/profileData';
import avatar from '../../../../../static/images/avatar-user.svg';
import { openModal } from '../../../../../actions/dashboard';

class Membership extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <div className="row">
            <div className="col-md-6">
              <h2 className="title-part">Membership</h2>
              <div className="row margin-bt-30">
                {fieldsMembership.map(item => <FormGroupMapping item={item} />)}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-lg-8">
                  {fieldsMemberPersonal.map(item => <FormGroupMapping item={item} />)}
                </div>
                <div className="col-lg-4 text-center">
                  <div
                    className="profile-image"
                    onClick={this.props.showUploadDialog}
                  >
                    <img src={avatar} alt="" />
                  </div>
                  <button className="default-btn">Edit</button>
                </div>
              </div>
              {fieldResetPassword.map(item => <FormGroupMapping item={item} />)}
            </div>
          </div>
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <h2 className="title-part">Residential Address</h2>
              <div className="row margin-bt-30">
                {fieldsResidentialAddress.map(item => <FormGroupMapping item={item} />)}
              </div>
              <h2 className="title-part">Personal Wealth</h2>
              <div className="row">
                {fieldsPersonalWealth.map(item => <FormGroupMapping item={item} />)}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Mailing Address</h2>
              <div className="row margin-bt-30">
                {fieldsMaillingAddress.map(item => <FormGroupMapping item={item} />)}
              </div>
            </div>
          </div>
          <Footer deleteAccountBtnIsShow />
        </div>
        <UploadImage />
      </div>
    );
  }
}


export default connect(state => ({}), (dispatch => ({
  showUploadDialog: () => dispatch(openModal()),
})))(Membership);
