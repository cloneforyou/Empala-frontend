import React from 'react';
import EmpalaInput from '../EmpalaInput';
import EmpalaSelect from '../EmpalaSelect';
import EmpalaCheckbox from '../EmpalaCheckbox';
import { dataFields } from '../../../localdata/identityPageData';
import {connect} from "react-redux";


const mapStateToProps = (state) => {
  return (
    {
      registrationData: state.registration.registrationData,
      page: state.registration.tabIndex,
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setInputValueById: (e) => {
        console.log(e.target.id, e.target.value);
        dispatch(setInputFieldValueById(e.target.id, e.target.value))
      },
    })
};


class IdentityForm extends React.Component {

  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      switch (item.field) {
        case 'input':
          return (
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              placeholder={item.placeholder}
              handleChange={this.props.setInputValueById}
            />
          );
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.label}
              options={item.options}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
            />
          );
        case 'checkbox':
          return (
              <EmpalaCheckbox
                key={item.id}
                id={item.id}
                label={item.label}
              />
          )
      }
    };
  }

  render() {
    if (this.props.tabIndex === 3) {
      return
    }

    return (
      <div>
        {dataFields[this.props.page-1].map((item) => this.mappingComponent(item))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityForm)