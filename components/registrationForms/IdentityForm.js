import React from 'react';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';
import { dataFields } from '../../localdata/identityPageData';
import { connect } from "react-redux";
import {
  closeIdentityModal,
  getMenuItems,
  setInputFieldValueById,
  setMemberDocumentType,
  setTabName,
  setTabPageIndex, toggleCheckboxById
} from '../../actions/registration';
import ModalWindow from '../registration/ModalWindow';

const mapStateToProps = (state) => {
  return (
    {
      registrationData: state.registration.registrationData,
      page: state.registration.tabIndex,
      showModal: state.registration.showIdentityModal,
      trustedContactActive: state.registration['identity_trusted_contact_person_trusted_contact_checkbox'],
      mailingAddressCheckboxChecked: state.registration['identity_residential_address_same_mailing_address_checkbox'],
      fieldsErrors: state.registration.fieldsErrors,
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      setInputValueById: (e) => {
        console.log(e.target.id, e.target.value);
        dispatch(setInputFieldValueById(e.target.id, e.target.value))
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
          let checked = false;
          if (item.id === 'identity_trusted_contact_person_trusted_contact_checkbox') {
            checked = this.props.trustedContactActive;
          } else if (item.id === 'identity_residential_address_same_mailing_address_checkbox') {
            checked = this.props.mailingAddressCheckboxChecked;
          }
          return (
            <div className='check-container'>
              <EmpalaCheckbox
                key={item.id}
                id={item.id}
                label={item.label}
                handleCheck={this.props.toggleCheckboxById}
                checked={checked}
              />
            </div>

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
