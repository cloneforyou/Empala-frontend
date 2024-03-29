/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setInputFieldValueById } from '../../actions/registration';
import EmpalaSelect from '../registration/EmpalaSelect';
import { dataFields } from '../../localdata/experiencePageData';

const mapStateToProps = state => ({
  registrationData: state.registration.registrationData,
  page: state.registration.tabIndex,
});

const mapDispatchToProps = dispatch => ({
  setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
});


class ExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = item => (
      <EmpalaSelect
        id={item.id}
        key={item.label}
        options={item.options}
        label={item.label}
        value={this.props.registrationData[item.id] || ''}
        handleChange={this.props.setSelectedValueById}
        col={item.col}
        hint={item.hint || item.label}
        autoWidth={item.autoWidth}
      />
    );
    this.isRadioChecked = name => (this.props.registrationData.memberDocument === name);
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="row">
          { dataFields[this.props.page - 1].map(item => this.mappingComponent(item)) }
        </form>
      </div>
    );
  }
}

ExperienceForm.propTypes = {
  page: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  setSelectedValueById: PropTypes.func.isRequired,
};

ExperienceForm.defaultProps = {
  page: 1,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm);
