import React from 'react';
import EmpalaInput from '../EmpalaInput';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {dataFields} from '../../../localdata/memberPageData';
import {connect} from 'react-redux';
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
  return (
    {
      registrationData: state.registration.registrationData,
      page: state.registration.tabIndex,
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setInputValueById: (e) => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      switchDocumentType: (e) => {console.log('VVVAL RADIO', e.target.value);
        dispatch(setMemberDocumentType(e.target.value))}
    })
};


class MemberInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      if (item.options) {
        return (
          <EmpalaSelect
            id={item.id}
            key={item.label}
            options={item.options}
            label={item.label}
            value={this.props.registrationData[item.id] || ''}
            handleChange={this.props.setSelectedValueById}
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
          placeholder={item.placeholder}
          handleChange={this.props.setInputValueById}
        />
      )
    };

    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }


  render() {
    console.log('---------XXXXXXXXXXX----------------->>>>>>>>', this.props)
    if (this.props.page !== 3) {
    return (
      <form>
        {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
      </form>
    )
  }

  return (
    <div>
      <MuiThemeProvider >
        {/*<RadioButtonGroup*/}
          {/*name='registrationDocument'*/}
          {/*defaultSelected={this.props.registrationData.memberDocument}*/}
          {/*onChange={this.props.switchDocumentType}>*/}
          <RadioButton
            value='passport'
            label='Passport'
            onClick={this.props.switchDocumentType}
            checked={this.isRadioChecked('passport')}
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
          label={'Date of issue'}
          disabled={!this.isRadioChecked('passport')}
        />
        <DatePickerField
          label={'Date of Date of expiry'}
          disabled={!this.isRadioChecked('passport')}
        />
          <RadioButton
            value='drivers-license'
            label='Drivers License'
            onClick={this.props.switchDocumentType}
            checked={this.isRadioChecked('drivers-license')}
          />
        <EmpalaInput
          key='member-drivers-license-state'
          id='member_drivers-license_state'
          type='text'
          label='State'
          value={this.props.registrationData['member_drivers-license_state'] || ''}
          handleChange={this.props.setInputValueById}
          disabled={!this.isRadioChecked('drivers-license')}
        />
        <EmpalaInput
          key='member-drivers-license-number'
          id='member_drivers-license_number'
          type='text'
          label='License no.'
          value={this.props.registrationData['member_drivers-license_number'] || ''}
          handleChange={this.props.setInputValueById}
          disabled={!this.isRadioChecked('drivers-license')}
        />
        <DatePickerField
          label={'Date of issue'}
          disabled={!this.isRadioChecked('drivers-license')}
        />
        <DatePickerField
          label={'Date of Date of expiry'}
          disabled={!this.isRadioChecked('drivers-license')}
        />
        {/*</RadioButtonGroup>*/}
      </MuiThemeProvider>
    </div>

)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoForm)