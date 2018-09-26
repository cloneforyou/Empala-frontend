/* eslint-disable dot-notation,react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaRadioButton from '../registration/EmpalaRadioButton';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';
import { dataFields } from '../../localdata/memberPageData';
import {
  setInputFieldValueById,
  setMemberDocumentType,
  toggleCheckboxById,
} from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import DatePickerField from '../registration/DatePickerField';
import { usStatesList } from '../../localdata/usStatesList';
import { getValuesForSelectField } from '../../utils/registrationUtils';
import { countriesList } from '../../localdata/countriesList';
import InfoPopup from '../registration/InfoPopup';
import countriesPhoneCodes from '../../localdata/countriesPhoneCodes';

const usStates = getValuesForSelectField(usStatesList);


const mapStateToProps = state => ({
  registrationData: state.registration.registrationData,
  page: state.registration.tabIndex,
  fieldsErrors: state.registration.fieldsErrors,
  trustedContactActive: state.registration.checkboxes.member_trusted_contact_person_trusted_contact_checkbox,
  checkboxes: state.registration.checkboxes,
  showInfoPopup: state.registration.showInfoPopup,
  infoPopupName: state.registration.infoPopupName,
});

const mapDispatchToProps = dispatch => ({
  setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
  setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
  switchDocumentType: e => dispatch(setMemberDocumentType(e.target.value)),
  setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
});


class MemberInfoForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      const memberCountry = this.props.registrationData.member_basic_information_residence;
      let mask = '';
      // const phoneMask = '+9 999 999-9999';
      const phoneMask = memberCountry ?
        countriesPhoneCodes[memberCountry].mask
        : '';
      const countryCode = memberCountry ? countriesPhoneCodes[memberCountry].code : '';
      if (item.id.includes('phone')) {
        mask = phoneMask ? `${countryCode} ${phoneMask}` : `${countryCode} 999 999-9999`;
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
            disabled={!this.props.trustedContactActive && this.props.page === 4}
          />
        );
      }
      if (item.field === 'checkbox') {
        return (
          <div
            key={item.id}
            style={item.id === 'member_account_add_margin' ?
          {
            marginLeft: '45px',
            marginTop: '10px',
          } : {}}
          >
            <EmpalaCheckbox
              id={item.id}
              label={item.label}
              handleCheck={this.props.toggleCheckboxById}
              checked={this.props.checkboxes[item.id]}
              active={item.id === 'member_trusted_contact_person_trusted_contact_checkbox' && this.props.trustedContactActive}
            />
          </div>
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
          disabled={!this.props.trustedContactActive && this.props.page === 4}
          infoButton={item.infoButton}
        />
      );
    };
    this.isRadioChecked = name => (this.props.registrationData.memberDocument === name);
  }

  render() {
    if (this.props.page !== 3) {
      return (
        <div className="container-fluid">
          <div className="registration-group__section-title margin-bottom40">
            {this.props.page === 1 && 'Enter your details:'}
            {this.props.page === 2 && 'Enter your details:'}
          </div>
          <form className="row">
            {dataFields[this.props.page - 1].map(item => this.mappingComponent(item))}
          </form>
          {this.props.showInfoPopup &&
          <InfoPopup
            showInfoPopup={this.props.showInfoPopup}
            name={this.props.infoPopupName}
          />}
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="registration-group__section-title title-nowrap margin-bottom20">
          {this.props.page === 3 && 'Select one of the government identification to enter.'}
        </div>
        <div className="row">
          <EmpalaRadioButton
            value="passport"
            label="Passport"
            onClick={this.props.switchDocumentType}
            checked={this.isRadioChecked('passport')}
            labelStyle={this.isRadioChecked('passport') ? { color: '#98c73a' } : {}}
          />
          <EmpalaSelect
            key="member-passport-countryOfIssue"
            id="member_passport_countryOfIssue"
            label="Country of issue"
            options={countriesList}
            value={this.props.registrationData['member_passport_countryOfIssue'] || ''}
            handleChange={this.props.setSelectedValueById}
            disabled={!this.isRadioChecked('passport')}
            errorText={this.props.fieldsErrors['member_passport_countryOfIssue']}
            hint="Please select"
            autoWidth
          />
          <EmpalaInput
            key="member-passport-number"
            id="member_passport_number"
            type="text"
            label="Passport no."
            value={this.props.registrationData['member_passport_number'].toUpperCase() || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('passport')}
            errorText={this.props.fieldsErrors['member_passport_number']}
            mask="*99999999"
          />
          <DatePickerField
            id="member_passport_issue_date"
            label="Date of issue"
            disabled={!this.isRadioChecked('passport')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_passport_issue_date'] || ''}
            errorText={this.props.fieldsErrors['member_passport_issue_date']}
            col={6}
            dateIssue
          />
          <DatePickerField
            id="member_passport_expiry_date"
            label="Date of expiry"
            disabled={!this.isRadioChecked('passport')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_passport_expiry_date'] || ''}
            errorText={this.props.fieldsErrors['member_passport_expiry_date']}
            col={6}
            dateExpiry
          />
          <EmpalaRadioButton
            value="drivers_license"
            label="Drivers License"
            onClick={this.props.switchDocumentType}
            checked={this.isRadioChecked('drivers_license')}
            labelStyle={this.isRadioChecked('drivers_license') ? { color: '#98c73a' } : {}}
            style={{ marginTop: '20px' }}
          />
          <EmpalaSelect
            id="member_drivers_license_state"
            key="member_drivers_license_state"
            options={usStates}
            label="State"
            value={this.props.registrationData['member_drivers_license_state'] || ''}
            handleChange={this.props.setSelectedValueById}
            errorText={this.props.fieldsErrors['member_drivers_license_state']}
            disabled={!this.isRadioChecked('drivers_license')}
            hint="Please select"
          />
          <EmpalaInput
            key="member-drivers-license-number"
            id="member_drivers_license_number"
            type="text"
            label="License no."
            value={this.props.registrationData['member_drivers_license_number'] || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('drivers_license')}
            errorText={this.props.fieldsErrors['member_drivers_license_number']}
          />
          <DatePickerField
            id="member_drivers_license_issue_date"
            label="Date of issue"
            disabled={!this.isRadioChecked('drivers_license')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_drivers_license_issue_date'] || ''}
            errorText={this.props.fieldsErrors['member_drivers_license_issue_date']}
            col={6}
            dateIssue
          />
          <DatePickerField
            id="member_drivers_license_expiry_date"
            label="Date of expiry"
            disabled={!this.isRadioChecked('drivers_license')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_drivers_license_expiry_date'] || ''}
            errorText={this.props.fieldsErrors['member_drivers_license_expiry_date']}
            col={6}
            dateExpiry
          />
        </div>
      </div>
    );
  }
}

MemberInfoForm.propTypes = {
  page: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  fieldsErrors: PropTypes.object,
  setInputValueById: PropTypes.func.isRequired,
  setSelectedValueById: PropTypes.func.isRequired,
  switchDocumentType: PropTypes.func.isRequired,
  setPickedDate: PropTypes.func.isRequired,
  trustedContactActive: PropTypes.bool,
  toggleCheckboxById: PropTypes.func.isRequired,
};

MemberInfoForm.defaultProps = {
  page: 1,
  fieldsErrors: {},
  trustedContactActive: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoForm);
