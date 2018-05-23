/* eslint-disable max-len,react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EmpalaInput from '../registration/EmpalaInput';
import { dataFields } from '../../localdata/profilePageData';
import {
  getInfoByZipCode,
  setInputFieldValueById,
} from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import { statesAbbvs } from '../../localdata/usStatesList';

const mapStateToProps = state => ({
  registrationData: state.registration.registrationData,
  page: state.registration.tabIndex,
  fieldsErrors: state.registration.fieldsErrors,
});

const mapDispatchToProps = dispatch => ({
  setInputValueById: (e) => {
    const { id, value } = e.target;
    if (value.length === 5 && (id === 'profile_employment_zip_code')) {
      dispatch(getInfoByZipCode(id, value));
    }
    dispatch(setInputFieldValueById(id, value));
  },
  setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
});


class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mappingComponent = (item, options) => {
      const disabled = this.props.registrationData.profile_employment_employment_type !== 'Employed'
          && this.props.page === 1 && item.id !== 'profile_employment_employment_type';
      if (item.options) {
        return (
          <EmpalaSelect
            id={item.id}
            key={item.label}
            options={options || item.options}
            label={item.label}
            value={this.props.registrationData[item.id] || ''}
            handleChange={this.props.setSelectedValueById}
            col={item.col}
            hint={item.hint || item.label}
            disabled={disabled}
            errorText={this.props.fieldsErrors[item.id]}
            autoWidth={item.autoWidth}
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
          typeField={item.typeField}
          disabled={disabled}
        />
      );
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="row">
          {dataFields[this.props.page - 1].map((item) => {
            if (item.id === 'profile_financials_liquid_net_worth' && this.props.registrationData.profile_financials_total_net_worth) {
              const filteredOptions = item.options.filter(option =>
                (option.value.length < this.props.registrationData.profile_financials_total_net_worth.length ||
                (option.value.length === this.props.registrationData.profile_financials_total_net_worth.length &&
                option.value[0] <= this.props.registrationData.profile_financials_total_net_worth[0])));
              return this.mappingComponent(item, filteredOptions);
            } else if (item.id === 'profile_employment_state') {
              const states = Object.keys(statesAbbvs);
              const selectOptions = item.options.map((option, index) => ({ value: option.value, title: option.value, label: states[index] }));
              return this.mappingComponent(item, selectOptions);
            }
            return this.mappingComponent(item);
          })}
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  page: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  fieldsErrors: PropTypes.object,
  setInputValueById: PropTypes.func.isRequired,
  setSelectedValueById: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  page: 1,
  fieldsErrors: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
