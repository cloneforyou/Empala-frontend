import React, { Component } from 'react';
import EmpalaInput from '../../../../../registration/EmpalaInput';
import EmpalaSelect from '../../../../../registration/EmpalaSelect';
import EmpalaCheckbox from '../../../../../registration/EmpalaCheckbox';
import FullName from './FullName';

export default class FormGroupMapping extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mask = '';
    const { item, userData, fieldsErrors } = this.props;
    if (!userData) return false;
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
          value={userData[item.id] || ''}
          handleChange={this.props.setSelectedValueById}
          errorText={fieldsErrors[item.id]}
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
      );
    } else if (item.label === 'Full name') {
      return (
        <FullName
          field={item}
          fieldsErrors={fieldsErrors}
          key={item.id}
        />
      );
    }
    return (
      <EmpalaInput
        key={item.id}
        id={item.id}
        type={item.type}
        label={item.label}
        value={userData[item.id] || ''}
        handleChange={this.props.setInputValueById}
        errorText={fieldsErrors[item.id]}
        placeholder={item.placeholder}
        col={item.col}
        mask={mask}
        typeField={item.typeField}
      />
    );
  }
}

