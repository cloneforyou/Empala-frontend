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
import { getInfoByZipCode, setInputFieldValueById } from '../../../../../actions/registration';
import { countriesList } from '../../../../../localdata/countriesList';

class Regulatory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userData = this.props.userData;
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <div className="row">
            <div className="col-md-6">
              <h2 className="title-part">Employment</h2>
              <div className="row margin-bt-30">
                {fieldsEmployment.map(item => (<FormGroupMapping
                  {...{ ...this.props, item, key: item.id }}
                />))}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Trusted Contact Person</h2>
              <div className="row margin-bt-30">
                {fieldsTrustedContactPerson.map(item => (<FormGroupMapping
                  {...{ ...this.props, item, key: item.id }}
                />))}
              </div>
            </div>
          </div>
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <h2 className="title-part">Passport</h2>
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="identification_passport_country_of_issue"
                  label="Country of issue"
                  options={countriesList}
                  value={userData.identification_passport_country_of_issue || ''}
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.identification_passport_country_of_issue}
                  hint="Please select"
                  autoWidth
                />
                <EmpalaInput
                  id="identification_passport_document_number"
                  type="text"
                  label="Passport no."
                  value={userData.identification_passport_document_number || ''}
                  handleChange={this.props.setInputValueById}
                  errorText={this.props.fieldsErrors.identification_passport_document_number}
                  mask="a999999999"
                />
                <DatePickerField
                  id="identification_passport_issue_date"
                  label="Date of issue"
                  handleDatePick={this.props.setPickedDate}
                  value={userData.identification_passport_date_of_issue || ''}
                  errorText={this.props.fieldsErrors.identification_passport_date_of_issue}
                  col={6}
                  dateIssue
                />
                <DatePickerField
                  id="identification_passport_date_of_expiry"
                  label="Date of expiry"
                  handleDatePick={this.props.setPickedDate}
                  value={userData.identification_passport_date_of_expiry || ''}
                  errorText={this.props.fieldsErrors.identification_passport_date_of_expiry}
                  col={6}
                  dateExpiry
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="title-part">Drivers License</h2>
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="identification_drivers_license_country_of_issue"
                  label="Country of issue"
                  options={countriesList}
                  value={userData.identification_drivers_license_country_of_issue || ''}
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.identification_drivers_license_country_of_issue}
                  hint="Please select"
                  autoWidth
                />
                <EmpalaInput
                  id="identification_drivers_license_document_number"
                  type="text"
                  label="Drivers license no."
                  value={userData.identification_drivers_license_document_number || ''}
                  handleChange={this.props.setInputValueById}
                  errorText={this.props.fieldsErrors.identification_drivers_license_document_number}
                />
                <DatePickerField
                  id="dentification_drivers_license_issue_date"
                  label="Date of issue"
                  handleDatePick={this.props.setPickedDate}
                  value={userData.identification_drivers_license_date_of_issue || ''}
                  errorText={this.props.fieldsErrors.identification_drivers_license_date_of_issue}
                  col={6}
                  dateIssue
                />
                <DatePickerField
                  id="dentification_drivers_license_expiry_date"
                  label="Date of expiry"
                  handleDatePick={this.props.setPickedDate}
                  value={userData.identification_drivers_license_date_of_expiry || ''}
                  errorText={this.props.fieldsErrors.identification_drivers_license_date_of_expiry}
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
    userData: state.profile.profileUserData || {},
    fieldsErrors: state.dashboard.fieldsErrors || {},
  }),
  dispatch => ({
    setInputValueById: (e) => {
      const { id, value } = e.target;
      if (/zip_code/.test(id)) {
        if (value.length === 5) {
          dispatch(getInfoByZipCode(id, value));
        } else if (value.length > 5) { return false; }
      }
      dispatch(setInputFieldValueById(id, value));
      return false;
    },
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  }),
)(Regulatory);
