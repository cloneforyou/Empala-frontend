import React from 'react';
import EmpalaInput from "./EmpalaInput";
import EmpalaSelect from "./EmpalaSelect";
import { dataFields  as memberDataFields } from "../../localdata/memberPageData";
import { dataFields  as identityDataFields } from "../../localdata/identityPageData";



export default class RegistrationFormDrawer extends React.Component {

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

  getDataFieldByTabName(tabName) {
    switch (tabName) {
      case 'member':
        return memberDataFields;
      case 'identity':
        return identityDataFields;
      default:
        return [];
    }
  };


  render() {
    const fields = this.getDataFieldByTabName(this.props.tabName)[this.props.page];
    return (
      <div>
        {fields ? fields.map((item) => this.mappingComponent(item))
        : this.props.tabName.toUpperCase()}
      </div>
    )
  }
}