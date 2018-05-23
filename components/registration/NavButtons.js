/* eslint-disable max-len,react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { every } from 'lodash';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import { changeTabPage, validateFieldsBlank } from '../../actions/registration';

function isFieldsFilled(fieldNames, fields) {
  return every(fieldNames, name => (fields[name] && fields[name] !== ''));
}

function isFieldError(fieldsList, errorsList) {
  return fieldsList.filter(field => errorsList[field]).length > 0;
}

function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
    tabIndex: state.registration.tabIndex || 1,
    registrationData: state.registration.registrationData,
    errors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    validateFieldsBlank: fieldNames => dispatch(validateFieldsBlank(fieldNames)),
    changeTabPage: (tabName, tabIndex, direction) => dispatch(changeTabPage(tabName, tabIndex, direction)),
  });
}

function filterActiveCheckboxes(checkboxesList) {
  return Object.keys(checkboxesList).filter(key => (/identity_checkbox/.test(key)) && checkboxesList[key]);
}

const NavButtons = (props) => {
  let disabled = !isFieldsFilled(props.fieldNames, props.registrationData) ||
    (props.fieldNames && props.errors && isFieldError(props.fieldNames, props.errors));
  if (props.tabName === 'identity' && props.tabIndex === 4) {
    disabled = filterActiveCheckboxes(props.checkboxes).length > 0;
  }

  return (
    <div>
      <button
        type="button"
        className="btn--navigate btn--prev "
        onClick={() => props.changeTabPage(props.tabName, props.tabIndex, 'backward')}
      >
        <MdArrowBack size={20} />
      </button>
      <div
        style={{ display: 'inline-block' }}
        onClick={() => props.validateFieldsBlank(props.fieldNames)}
      >
        <button
          type="button"
          className={`btn--navigate btn--next ${disabled ? '' : 'btn--navigate--active'}`}
          onClick={() => props.changeTabPage(props.tabName, props.tabIndex, 'forward')}
          disabled={disabled}
        >
          <MdArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

NavButtons.propTypes = {
  tabName: PropTypes.string,
  tabIndex: PropTypes.number,
  registrationData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  checkboxes: PropTypes.object.isRequired,
  fieldNames: PropTypes.array,
  changeTabPage: PropTypes.func.isRequired,
  validateFieldsBlank: PropTypes.func.isRequired,
};

NavButtons.defaultProps = {
  tabIndex: 1,
  tabName: 'info',
  fieldNames: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NavButtons);
