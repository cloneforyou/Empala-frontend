import React from 'react';
import { connect } from 'react-redux';
import EmpalaInput from '../registration/EmpalaInput';
import { dataFields } from '../../localdata/regulatoryPageData';
import {
  getMenuItems,
  setInputFieldValueById,
  setMemberDocumentType,
  setTabName,
  setTabPageIndex
} from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import DatePickerField from '../registration/DatePickerField';


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


class RegulatoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      let mask = '';
      const ssnMask = '999-99-9999';
      if (item.id.includes('ssn')) {
        mask = ssnMask;
      }
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
              errorText={this.props.fieldsErrors[item.id]}
              autoWidth={item.autoWidth}
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
              typeField={item.typeField}
              mask={mask}
            />
          );
        case 'date':
          return (
            <DatePickerField
              key={item.id}
              id={item.id}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              handleDatePick={this.props.setPickedDate}
              errorText={this.props.fieldsErrors[item.id]}
              birthDay={item.birthDay}
            />
          );
      }
    };

    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }


  render() {
    return (
      <div className="container-fluid">
        <form className="row">
          {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulatoryForm)
