import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Components/Footer';
import UploadImage from '../UploadImage';
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
import DeleteAccountModal from './Components/DeleteAccountModal';
import { toggleCheckboxById } from '../../../../../actions/registration';
import EmpalaSelect from '../../../../registration/EmpalaSelect';
import EmpalaInput from '../../../../registration/EmpalaInput';
import FullName from './Components/FullName';
import DatePickerField from '../../../../registration/DatePickerField';
import {flattenObject} from '../../../../../utils/additional';

class Membership extends Component {
  // TODO format for created at, date of birth fields
  // TODO process fullName
  constructor(props) {
    super(props);
    this.mappingComponent = (item, userData) => {
      let mask = '';
      const phoneMask = '+9 999 999-9999';
      if (item.id.includes('phone')) {
        mask = phoneMask;
      }
      if (item.label === 'Full name') return <FullName
        field={item}
        userData={userData}
        fieldsErrors={this.props.fieldsErrors}
      />;
      switch (item.field) {
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.id}
              options={item.options}
              label={item.label}
              value={userData[item.id] || ''}
              handleChange={this.props.setSelectedValueById}
              errorText={this.props.fieldsErrors[item.id]}
              col={item.col}
              hint={item.hint || item.label}
            />
          );
        case 'date':
          return (
            <DatePickerField
              key={item.id}
              id={item.id}
              label={item.label}
              value={userData[item.id] || ''}
              handleDatePick={this.props.setPickedDate}
              errorText={this.props.fieldsErrors[item.id]}
              birthDay={item.birthDay}
            />
          );
        case 'input':
          return (
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              label={item.label}
              value={userData[item.id] || ''}
              handleChange={this.props.setInputValueById}
              errorText={this.props.fieldsErrors[item.id]}
              placeholder={item.placeholder}
              col={item.col}
              mask={mask}
              typeField={item.typeField}
            />
          );
      }
    };
  }

  render() {
    const flattenUserData = flattenObject(this.props.userData.profile);
    const userData = {};
    Object.keys(flattenUserData).forEach((key) => {
      userData[key.replace(/^Member/, '').toLowerCase()] = flattenUserData[key];
    });
    console.log('proff1', userData);
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <h2 className="title-part">Membership</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="row margin-bt-30">
                {fieldsMembership.map(item => this.mappingComponent(item, userData))}
                {/* {fieldsMembership.map(item => <FormGroupMapping item={item} userData={userData} />)}; */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-lg-8">
                  {fieldsMemberPersonal.map(item => this.mappingComponent(item, userData))}
                  {/* {fieldsMemberPersonal.map(item => <FormGroupMapping item={item} userData={userData} />)}; */}
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
              {fieldResetPassword.map(item => this.mappingComponent(item, userData))}
            </div>
          </div>
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <h2 className="title-part">Residential Address</h2>
              <div className="row margin-bt-30">
                {fieldsResidentialAddress.map(item => this.mappingComponent(item, userData))}
              </div>
              <h2 className="title-part">Personal Wealth</h2>
              <div className="row">
                {fieldsPersonalWealth.map(item => this.mappingComponent(item, userData))}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Mailing Address</h2>
              <div className="row margin-bt-30">
                {fieldsMaillingAddress.map(item => this.mappingComponent(item, userData))}
              </div>
            </div>
          </div>
          <Footer deleteAccountBtnIsShow />
        </div>
        <UploadImage />
        <DeleteAccountModal />
      </div>
    );
  }
}



export default connect(state => ({
  userData: state.dashboard.userData.data || {},
  fieldsErrors: state.dashboard.fieldsErrors || {},
}), (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    showUploadDialog: () => dispatch(openModal('uploadImage')),
    toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
  })))(Membership);
