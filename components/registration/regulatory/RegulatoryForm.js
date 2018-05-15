import React from 'react';
import EmpalaInput from '../EmpalaInput';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {dataFields} from '../../../localdata/regulatoryPageData';
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


class RegulatoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      switch (item.field) {
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.label}
              options={item.options}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              handleChange={this.props.setSelectedValueById}
            />
          );
        case 'input':
          return (
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              numberField={item.numberField}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              placeholder={item.placeholder}
              handleChange={this.props.setInputValueById}
              errorText={this.props.fieldsErrors[item.id]}
            />
          );
        case 'date':
          return (
            <DatePickerField
              key={item.id}
              id={item.id}
              value={this.props.registrationData[item.id] || ''}
              handleDatePick={this.props.setPickedDate}
            />
          )
      }
    };

    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }


  render() {
    return (
      <form className='row'>
        {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulatoryForm)