import React from 'react';
import EmpalaInput from '../EmpalaInput';
import {dataFields} from '../../../localdata/memberPageData';
import {connect} from "react-redux";
import {getMenuItems, setInputFieldValueById, setTabName, setTabPageIndex} from "../../../actions/registration";
import EmpalaSelect from "../EmpalaSelect";
import { RadioButton } from 'material-ui/RadioButton';


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
        console.log("---->>>>>>>>>>>---->>>>>>", e.target.id, e.target.value);
        dispatch(setInputFieldValueById(e.target.id, e.target.value))
      },
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    })
};


class MemberInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      if (item.options) {
        return (
          <EmpalaSelect
            id={item.id}
            key={item.label}
            options={item.options}
            label={item.label}
            value={this.props.registrationData[item.id] || ''}
            handleChange={this.props.setSelectedValueById}
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
          placeholder={item.placeholder}
          handleChange={this.props.setInputValueById}
        />
      )
    };
  }


  render() {
    console.log('---------XXXXXXXXXXX----------------->>>>>>>>', this.props)
    if (this.props.page !== 3) {
    return (
      <form>
        {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}

      </form>
    )
  }

  return (
    <div>
      <RadioButton
        value="light"
        label="Passport"
      />
    </div>
)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoForm)