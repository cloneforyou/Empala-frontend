import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaInput from '../../../../registration/EmpalaInput';
import EmpalaSelect from '../../../../registration/EmpalaSelect';
import DatePickerField from '../../../../registration/DatePickerField';
import Footer from './Components/Footer';
import FormGroupMapping from './Components/FormGroupMapping';
import {
  fieldsEmployment,
  fieldsTrustedContactPerson,
} from '../../../../../localdata/profileData';
import { setInputFieldValueById } from '../../../../../actions/registration';
import { countriesList } from '../../../../../localdata/countriesList';

class Regulatory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <div className="row">
            <div className="col-md-6">
              <h2 className="title-part">Employment</h2>
              <div className="row margin-bt-30">
                {fieldsEmployment.map(item => <FormGroupMapping key={item.id} item={item} />)}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Trusted Contact Person</h2>
              <div className="row margin-bt-30">
                {fieldsTrustedContactPerson.map(item => <FormGroupMapping key={item.id} item={item} />)}
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
          <Footer deleteAccountBtnIsShow={false} />
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
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  })),
)(Regulatory);
