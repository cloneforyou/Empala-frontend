/* eslint-disable react/forbid-prop-types,max-len */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';
import { dataFields } from '../../localdata/identityPageData';
import {
  closeIdentityModal,
  getInfoByZipCode,
  setInputFieldValueById,
  toggleCheckboxById,
  validateFieldValue,
} from '../../actions/registration';
import ModalWindow from '../registration/ModalWindow';

const mapStateToProps = state => (
  {
    registrationData: state.registration.registrationData,
    page: state.registration.tabIndex,
    showModal: state.registration.showIdentityModal,
    fieldsErrors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
  }
);

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      setInputValueById: (e) => {
        const { id, value } = e.target;
        if ((id === 'identity_mailing_address_zip_code' || id === 'identity_zip_code') && value.length > 5) {
          return false;
        }
        if (value.length === 5 && (id === 'identity_mailing_address_zip_code' || id === 'identity_zip_code')) {
          dispatch(getInfoByZipCode(id, value));
        }
        dispatch(setInputFieldValueById(id, value));
        if (id === 'identity_residential_address_residential_address_line_1' || id === 'identity_residential_address_residential_address_line_2') {
          dispatch(validateFieldValue(id, value));
        }
        return false;
      },
      closeModal: () => dispatch(closeIdentityModal()),
    }
  );
};

class IdentityForm extends React.Component {
  constructor(props) {
    super(props);


    this.mappingComponent = (item) => {
      let mask = '';
      const phoneMask = '+9 999 999-9999';
      if (item.id.includes('phone')) {
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
              typeField={item.typeField}
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
              autoWidth={item.autoWidth}
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
          );
        default: return null;
      }
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="registration-group__section-title">
          {this.props.page === 1 && 'Enter your residential address:'}
          {this.props.page === 2 && 'Enter your mailing address:'}
        </div>
        <form className="row">
          {dataFields[this.props.page - 1].map(item => this.mappingComponent(item))}
          <ModalWindow
            open={this.props.showModal}
            handleClose={this.props.closeModal}
          />
        </form>
      </div>
    );
  }
}

IdentityForm.propTypes = {
  page: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  fieldsErrors: PropTypes.object,
  checkboxes: PropTypes.object.isRequired,
  showModal: PropTypes.bool,
  setInputValueById: PropTypes.func.isRequired,
  setSelectedValueById: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

IdentityForm.defaultProps = {
  page: 1,
  fieldsErrors: {},
  showModal: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentityForm);
