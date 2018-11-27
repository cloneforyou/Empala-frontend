/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EmpalaInput from '../registration/EmpalaInput';
import { dataFields } from '../../localdata/regulatoryPageData';
import {
  setInputFieldValueById,
  toggleCheckboxById,
  closeIdentityModal,
} from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import DatePickerField from '../registration/DatePickerField';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';
import ModalWindow from '../registration/ModalWindow';


const mapStateToProps = state => ({
  registrationData: state.registration.registrationData,
  page: state.registration.tabIndex,
  fieldsErrors: state.registration.fieldsErrors,
  checkboxes: state.registration.checkboxes,
  showModal: state.registration.showIdentityModal,
});

const mapDispatchToProps = dispatch => ({
  setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
  setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
  setPickedDate: (id, date) => dispatch(setInputFieldValueById(id, date)),
  toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
  closeModal: () => dispatch(closeIdentityModal()),
});


class RegulatoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      if (this.props.page === 2) {
        return false;
      }

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
              col={item.col}
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
              col={item.col}
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
              col={item.col}
              dateExpiry={!!item.dateExpiry}
            />
          );
        case 'checkbox':
          return (
            <EmpalaCheckbox
              key={item.id}
              id={item.id}
              label={item.label}
              handleCheck={this.props.toggleCheckboxById}
              checked={this.props.checkboxes[item.id]}
            />
          );
        default: return null;
      }
    };

    this.isRadioChecked = name => (this.props.registrationData.memberDocument === name);
    this.isUSCitizen = () => this.props.registrationData.member_basic_information_residence === 'United States'
      && this.props.registrationData.regulatory_identification_citizenship === 'United States';
    this.dataFields = dataFields;
  }


  render() {
    const data = [...dataFields];
    if (this.isUSCitizen()) {
      data[2] = [...dataFields[2].slice(0, 3), ...dataFields[2].slice(6)];
    } else if (!this.isUSCitizen() && this.props.registrationData.regulatory_identification_residency_status === 'Permanent Resident') {
      data[2] = [...dataFields[2].slice(0, 4), ...dataFields[2].slice(6)];
    }
    console.log('US citizen', this.isUSCitizen(), this.props.registrationData.member_basic_information_residence, this.props.registrationData.regulatory_identification_citizenship)
    return (
      <div className="container-fluid">
        <div className="registration-group__section-title title-nowrap margin-bottom40">
          {this.props.page === 1 && 'Select any of the below that applies to you:'}
          {this.props.page === 3 && 'Enter your details:'}
        </div>
        <form className="row">
          {data[this.props.page - 1].map(item => this.mappingComponent(item))}
          <ModalWindow
            open={this.props.showModal}
            handleClose={this.props.closeModal}
          />
        </form>
      </div>
    );
  }
}

RegulatoryForm.propTypes = {
  page: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  fieldsErrors: PropTypes.object,
  setInputValueById: PropTypes.func.isRequired,
  setSelectedValueById: PropTypes.func.isRequired,
  setPickedDate: PropTypes.func.isRequired,
  checkboxes: PropTypes.object.isRequired,
  toggleCheckboxById: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

RegulatoryForm.defaultProps = {
  page: 1,
  fieldsErrors: {},
  showModal: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegulatoryForm);
