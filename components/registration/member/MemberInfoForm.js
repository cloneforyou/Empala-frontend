import React from 'react';
import EmpalaInput from '../EmpalaInput';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import EmpalaRadioButton from '../EmpalaRadioButton';
import { dataFields } from '../../../localdata/memberPageData';
import { connect } from 'react-redux';
import {
  getMenuItems,
  setInputFieldValueById,
  setMemberDocumentType,
  setTabName,
  setTabPageIndex
} from '../../../actions/registration';
import EmpalaSelect from '../EmpalaSelect';
import DatePickerField from '../DatePickerField';


const mapStateToProps = (state) => {
  return ({
    registrationData: state.registration.registrationData,
    page: state.registration.tabIndex,
    fieldsErrors: state.registration.fieldsErrors,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setInputValueById: (e) => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    switchDocumentType: (e) => dispatch(setMemberDocumentType(e.target.value)),
    setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  })
};


class MemberInfoForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      if (item.options) {
        return (
          <EmpalaSelect
            id={item.id}
            key={item.id}
            options={item.options}
            label={item.label}
            value={this.props.registrationData[item.id] || ''}
            handleChange={this.props.setSelectedValueById}
            col={item.col}
            hint={item.hint || item.label}
          />
        )
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
        />
      )
    };
    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }

  render() {
    // console.log('*** member page props', this.props);
    if (this.props.page !== 3) {
      return (
        <form className='row no-gutters'>
          {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
        </form>
      )
    }

    return (
      <div className='row no-gutters'>
          <EmpalaRadioButton
            value='passport'
            label='Passport'
            onClick={this.props.switchDocumentType}
            checked={this.isRadioChecked('passport')}
            labelStyle={this.isRadioChecked('passport') ? {color: '#98c73a'} : {}}
          />
          <EmpalaInput
            key='member-passport-countryOfIssue'
            id='member_passport_countryOfIssue'
            type='text'
            label='Country of issue'
            value={this.props.registrationData['member_passport_countryOfIssue'] || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('passport')}
          />
          <EmpalaInput
            key='member-passport-number'
            id='member_passport_number'
            type='text'
            label='Passport no.'
            value={this.props.registrationData['member_passport_number'] || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('passport')}
          />
          <DatePickerField
            id={'member_passport_issue_date'}
            label={'Date of issue'}
            disabled={!this.isRadioChecked('passport')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_passport_issue_date'] || ''}
            col={6}
          />
          <DatePickerField
            id={'member_passport_expiry_date'}
            label={'Date of expiry'}
            disabled={!this.isRadioChecked('passport')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_passport_expiry_date'] || ''}
            col={6}
          />
        <EmpalaRadioButton
          value='drivers_license'
          label='Drivers License'
          onClick={this.props.switchDocumentType}
          checked={this.isRadioChecked('drivers_license')}
          labelStyle={this.isRadioChecked('drivers_license') ? {color: '#98c73a'} : {}}
          style={{ marginTop: '20px'}}
        />
          <EmpalaInput
            key='member-drivers-license-state'
            id='member_drivers_license_state'
            type='text'
            label='State'
            value={this.props.registrationData['member_drivers_license_state'] || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('drivers_license')}
          />
          <EmpalaInput
            key='member-drivers-license-number'
            id='member_drivers_license_number'
            type='text'
            label='License no.'
            value={this.props.registrationData['member_drivers_license_number'] || ''}
            handleChange={this.props.setInputValueById}
            disabled={!this.isRadioChecked('drivers_license')}
          />
          <DatePickerField
            id={'member_drivers_license_issue_date'}
            label={'Date of issue'}
            disabled={!this.isRadioChecked('drivers_license')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_drivers_license_issue_date'] || ''}
            col={6}
          />
          <DatePickerField
            id={'member_drivers_license_expiry_date'}
            label={'Date of expiry'}
            disabled={!this.isRadioChecked('drivers_license')}
            handleDatePick={this.props.setPickedDate}
            value={this.props.registrationData['member_drivers_license_expiry_date'] || ''}
            col={6}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoForm)
