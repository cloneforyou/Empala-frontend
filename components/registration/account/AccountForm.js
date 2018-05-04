import React from 'react';
import EmpalaInput from "../EmpalaInput";
import EmpalaSelect from "../EmpalaSelect";
import { dataFields } from "../../../localdata/accountPageData";

export default class AccountForm extends React.Component {

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
