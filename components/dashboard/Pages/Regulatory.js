import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaInput from '../../registration/EmpalaInput';
import EmpalaSelect from '../../registration/EmpalaSelect';
import DatePickerField from '../../registration/DatePickerField';
import {
  fieldsEmployment,
  fieldsTrustedContactPerson,
} from '../../../localdata/profileData';
import { setInputFieldValueById } from '../../../actions/registration';
import { countriesList } from '../../../localdata/countriesList';

class Regulatory extends Component {
  constructor(props) {
    super(props);
  }

  mappingComponent(item) {
    let mask = '';
    const phoneMask = '+9 999 999-9999';
    if (item.id.includes('phone')) {
      mask = phoneMask;
    }

    if (item.options) {
      return (
        <EmpalaSelect
          id={item.id}
          key={item.id}
          options={item.options}
          label={item.label}
          value={this.props.registrationData[item.id] || ''}
          handleChange={this.props.setSelectedValueById}
          errorText={this.props.fieldsErrors[item.id]}
          col={item.col}
          hint={item.hint || item.label}
        />
      );
    }
    return (
      <EmpalaInput
        key={item.id}
        id={item.id}
        type={item.type}
        label={item.label}
        value={this.props.registrationData[item.id] || ''}
        handleChange={this.props.setInputValueById}
        errorText={this.props.fieldsErrors[item.id]}
        placeholder={item.placeholder}
        col={item.col}
        mask={mask}
        typeField={item.typeField}
      />
    );
  }

  render() {
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <div className="row">
            <div className="col-md-6">
              <h2 className="title-part">Employment</h2>
              <div className="row margin-bt-30">
                {fieldsEmployment.map(item => this.mappingComponent(item))}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Trusted Contact Person</h2>
              <div className="row margin-bt-30">
                {fieldsTrustedContactPerson.map(item => this.mappingComponent(item))}
              </div>
            </div>
          </div>
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <h2 className="title-part">Passport</h2>
              <div className="row margin-bt-30">
                <EmpalaSelect
                  key="member-passport-countryOfIssue"
                  id="member_passport_countryOfIssue"
                  label="Country of issue"
                  options={countriesList}
                  value={this.props.registrationData.member_passport_countryOfIssue || ''}
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.member_passport_countryOfIssue}
                  hint="Please select"
                  autoWidth
                />
                <EmpalaInput
                  key="member-passport-number"
                  id="member_passport_number"
                  type="text"
                  label="Passport no."
                  value={this.props.registrationData.member_passport_number || ''}
                  handleChange={this.props.setInputValueById}
                  errorText={this.props.fieldsErrors.member_passport_number}
                  mask="a999999999"
                />
                <DatePickerField
                  id="member_passport_issue_date"
                  label="Date of issue"
                  handleDatePick={this.props.setPickedDate}
                  value={this.props.registrationData.member_passport_issue_date || ''}
                  errorText={this.props.fieldsErrors.member_passport_issue_date}
                  col={6}
                  dateIssue
                />
                <DatePickerField
                  id="member_passport_expiry_date"
                  label="Date of expiry"
                  handleDatePick={this.props.setPickedDate}
                  value={this.props.registrationData.member_passport_expiry_date || ''}
                  errorText={this.props.fieldsErrors.member_passport_expiry_date}
                  col={6}
                  dateExpiry
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Drivers License</h2>
              <div className="row margin-bt-30">
                <EmpalaSelect
                  key="member-passport-countryOfIssue"
                  id="member_passport_countryOfIssue"
                  label="Country of issue"
                  options={countriesList}
                  value={this.props.registrationData.member_passport_countryOfIssue || ''}
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.member_passport_countryOfIssue}
                  hint="Please select"
                  autoWidth
                />
                <EmpalaInput
                  key="member-passport-number"
                  id="member_passport_number"
                  type="text"
                  label="Passport no."
                  value={this.props.registrationData.member_passport_number || ''}
                  handleChange={this.props.setInputValueById}
                  errorText={this.props.fieldsErrors.member_passport_number}
                  mask="a999999999"
                />
                <DatePickerField
                  id="member_passport_issue_date"
                  label="Date of issue"
                  handleDatePick={this.props.setPickedDate}
                  value={this.props.registrationData.member_passport_issue_date || ''}
                  errorText={this.props.fieldsErrors.member_passport_issue_date}
                  col={6}
                  dateIssue
                />
                <DatePickerField
                  id="member_passport_expiry_date"
                  label="Date of expiry"
                  handleDatePick={this.props.setPickedDate}
                  value={this.props.registrationData.member_passport_expiry_date || ''}
                  errorText={this.props.fieldsErrors.member_passport_expiry_date}
                  col={6}
                  dateExpiry
                />
              </div>
            </div>
          </div>
          <div className="tab-container__foot buttons-row">
            <div className="buttons-row__right" />
            <div className="buttons-row__left">
              <button className="default-btn">Cancel</button>
              <button className="profile-btn profile-btn_green">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    registrationData: state.registration.registrationData,
    fieldsErrors: state.registration.fieldsErrors,
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
  })),
)(Regulatory);
