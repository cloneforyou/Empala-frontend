import React from 'react';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';
import { dataFields } from '../../localdata/identityPageData';
import { connect } from "react-redux";
import {
  closeIdentityModal,
  getInfoByZipCode,
  setInputFieldValueById,
  toggleCheckboxById
} from '../../actions/registration';
import ModalWindow from '../registration/ModalWindow';

const mapStateToProps = (state) => {
  return (
    {
      registrationData: state.registration.registrationData,
      page: state.registration.tabIndex,
      showModal: state.registration.showIdentityModal,
      trustedContactActive: state.registration.checkboxes['identity_trusted_contact_person_trusted_contact_checkbox'],
      mailingAddressCheckboxChecked: state.registration['identity_residential_address_same_mailing_address_checkbox'],
      fieldsErrors: state.registration.fieldsErrors,
      checkboxes:state.registration.checkboxes,
      }
  )
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      setInputValueById: (e) => {
        const {id, value} = e.target;
        if (value.length === 5 && (id === 'identity_mailing_address_zip_code' || id === 'identity_zip_code')) {
          dispatch(getInfoByZipCode(id, value))
        }
        dispatch(setInputFieldValueById(id, value))
      },
      toggleCheckboxById: (e, checked) => {
        dispatch(toggleCheckboxById(e.target.id));
      },
      closeModal: () => dispatch(closeIdentityModal()),
    }
  )
};


class IdentityForm extends React.Component {

  constructor(props) {
    super(props);


    this.mappingComponent = (item) => {
      let mask ='';
      const  phoneMask = '+9 999 999-9999';
      if (item.id.includes('phone')){
        mask = phoneMask;
      }
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
              col={item.col}
              numberField={item.numberField}
              disabled={!this.props.trustedContactActive && this.props.page === 3}
              errorText={this.props.fieldsErrors[item.id]}
              mask={mask}
            />
          );
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.id}
              options={item.options}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              handleChange={this.props.setSelectedValueById}
              col={item.col}
              hint={item.hint || item.label}
              disabled={!this.props.trustedContactActive && this.props.page === 3}
              errorText={this.props.fieldsErrors[item.id]}
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
          )
      }
    };


  }

  render() {


    return (
      <form className='row'>
        {dataFields[this.props.page - 1].map((item) => this.mappingComponent(item))}
        <ModalWindow
          open={this.props.showModal}
          handleClose={this.props.closeModal}
        />
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityForm)
