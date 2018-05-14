import React from 'react';
import EmpalaInput from '../EmpalaInput';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { dataFields } from '../../../localdata/profilePageData';
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


class ProfileForm extends React.PureComponent {
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
    // console.log('*** profile page props', this.props);
      return (
        <form className='row'>
          {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
        </form>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
