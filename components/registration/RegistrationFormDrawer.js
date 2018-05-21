import React, { Component } from 'react';

import EmpalaInput from './EmpalaInput';
import EmpalaSelect from './EmpalaSelect';

export default class RegistrationFormDrawer extends Component {

  mappingComponent = (item) => {
    if (item.options) {
      return (
        <EmpalaSelect
          id={item.id}
          key={item.label}
          options={item.options}
          label={item.label}
        />
      )
    }
    return (
      <EmpalaInput
        key={item.id}
        id={item.id}
        type={item.type}
        label={item.label}
        value={"тупо значение"}
        placeholder={item.placeholder}
      />
    )
  };


  render() {
    return (
      <div>
        {this.props.fields ? this.props.fields.map((item) => this.mappingComponent(item))
        : "NULL"}
      </div>
    )
  }
};
