import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaInput from '../../registration/EmpalaInput';
import EmpalaSelect from '../../registration/EmpalaSelect';
import { fieldsMembership } from '../../../localdata/profileData';
import { setInputFieldValueById } from '../../../actions/registration';

class Membership extends Component {
  constructor(props) {
    super(props);
  }

  mappingComponent(item) {
    let mask = '';
    const phoneMask = '+9 999 999-9999';
    if (item.id.includes('phone')) {
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

  render() {
    return (
      <div className="tab-container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="title-part">Membership</h2>
            <div className="row">
              {fieldsMembership.map(item => this.mappingComponent(item))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => ({
  registrationData: state.registration.registrationData,
  fieldsErrors: state.registration.fieldsErrors,
}), (dispatch => ({
  setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
  setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
})))(Membership);
