import React from 'react';
import { connect } from 'react-redux';

import EmpalaInput from '../registration/EmpalaInput';
import EmpalaRadioButton from '../registration/EmpalaRadioButton';
import { dataFields } from '../../localdata/memberPageData';
import {
  setInputFieldValueById,
  setMemberDocumentType,
} from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import DatePickerField from '../registration/DatePickerField';
import { usStatesList } from '../../localdata/usStatesList';
import { getValuesForSelectField } from '../../utils/registrationUtils';
import { countriesList } from '../../localdata/countriesList';

const usStates = getValuesForSelectField(usStatesList);


const mapStateToProps = (state) => {
  return ({
    registrationData: state.registration.registrationData,
    page: state.registration.tabIndex,
    fieldsErrors: state.registration.fieldsErrors,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setInputValueById: (e) => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    switchDocumentType: (e) => dispatch(setMemberDocumentType(e.target.value)),
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  });
};


class MemberInfoForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
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
          numberField={item.numberField}
        />
      );
    };
    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }

  render() {
    if (this.props.page !== 3) {
      return (
        <form className="row">
          {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
        </form>
      );
    }

    return (
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
          value={this.props.registrationData['member_passport_number'] || ''}
          handleChange={this.props.setInputValueById}
          disabled={!this.isRadioChecked('passport')}
          errorText={this.props.fieldsErrors['member_passport_number']}
          mask="a999999999"
        />
        <DatePickerField
          id={'member_passport_issue_date'}
          label={'Date of issue'}
          disabled={!this.isRadioChecked('passport')}
          handleDatePick={this.props.setPickedDate}
          value={this.props.registrationData['member_passport_issue_date'] || ''}
          errorText={this.props.fieldsErrors['member_passport_issue_date']}
          col={6}
          dateIssue
        />
        <DatePickerField
          id={'member_passport_expiry_date'}
          label={'Date of expiry'}
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
          labelStyle={this.isRadioChecked('drivers_license') ? {color: '#98c73a'} : {}}
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
          id={'member_drivers_license_issue_date'}
          label={'Date of issue'}
          disabled={!this.isRadioChecked('drivers_license')}
          handleDatePick={this.props.setPickedDate}
          value={this.props.registrationData['member_drivers_license_issue_date'] || ''}
          errorText={this.props.fieldsErrors['member_drivers_license_issue_date']}
          col={6}
          dateIssue
        />
        <DatePickerField
          id={'member_drivers_license_expiry_date'}
          label={'Date of expiry'}
          disabled={!this.isRadioChecked('drivers_license')}
          handleDatePick={this.props.setPickedDate}
          value={this.props.registrationData['member_drivers_license_expiry_date'] || ''}
          errorText={this.props.fieldsErrors['member_drivers_license_expiry_date']}
          col={6}
          dateExpiry
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoForm)
