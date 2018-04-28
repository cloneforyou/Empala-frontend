import React from 'react';
import EmpalaInput from '../EmpalaInput';
import EmpalaSelect from '../EmpalaSelect';
import { dataFields } from '../../../localdata/identityPageData';


export default class IdentityForm extends React.Component {

  mappingComponent = (item) => {
    if (this.props.page === 1 || this.props.page === 2) {
      return (
        <EmpalaSelect
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
        placeholder={item.placeholder}
    />
    )
  };

  render() {
    return (
      <div>
        {dataFields[this.props.page].map((item) => this.mappingComponent(item))}
      </div>
    )
  }
}
