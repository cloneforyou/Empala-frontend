import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import EmpalaSelect from '../../../../../registration/EmpalaSelect';
import EmpalaCheckbox from '../../../../../registration/EmpalaCheckbox';
import { setInputFieldValueById, toggleCheckboxById } from '../../../../../../actions/registration';

class FormGroupMapping extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mask = '';
    const { item } = this.props;
    const phoneMask = '+9 999 999-9999';
    if (item.id && item.id.includes('phone')) {
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
    } else if (item.type && item.type === 'checkbox') {
      return (
        <EmpalaCheckbox
          id={item.id}
          key={item.id}
          label={item.label}
          handleCheck={this.props.toggleCheckboxById}
          checked={this.props.checkboxes[item.id]}
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
        mask={mask}
        typeField={item.typeField}
      />
    );
  }
}

export default connect(
  state => ({
    registrationData: state.registration.registrationData,
    fieldsErrors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
  })),
)(FormGroupMapping);
