/* eslint-disable max-len,react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { every } from 'lodash';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import {
  changeTabPage,
  validateFieldsBlank,
  goBackToPart,
  setTabName,
  setTabPageIndex,
  validateFieldValue,
  showPopupPIN,
} from '../../actions/registration';
import ignoredFields from '../../localdata/noValidatedFiels';

function isFieldsFilled(fieldNames, fields) {
  const remainingFields = fieldNames.filter(name => !ignoredFields.includes(name));
  return every(remainingFields, name => (fields[name] && fields[name] !== ''));
}

function isFieldError(fieldsList, errorsList) {
  return fieldsList.filter(field => errorsList[field]).length > 0;
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
  if (props.fieldNames.filter(field =>
    (field.includes('zip_code') && props.registrationData[field] && props.registrationData[field].length < 5)).length > 0) {
    disabled = true;
  }

  function handleChangePage(arrow) {
    if (props.tabName === 'member' && props.tabIndex === 2 && arrow === 'forward') {
      props.showPopupPIN()
      return
    }
    props.changeTabPage(props.tabName, props.tabIndex, arrow)
  }

  function goBackToReview() {
    props.setTabName('final_review');
    props.setTabPageIndex(0);
    props.goBackToPart(false);
  }

  return (
    <div>
      <button
        type="button"
        className="btn--navigate btn--prev "
        onClick={() => handleChangePage('backward')}
      >
        <MdArrowBack size={20} />
      </button>
      <div
        style={{ display: 'inline-block' }}
        onClick={() => {
          props.validateFieldsBlank(props.fieldNames);
          props.validateFieldValues(props.fieldNames, props.registrationData);
        }}
      >
        <button
          type="button"
          className={`btn--navigate btn--next ${!disabled && 'btn--navigate--active'}`}
          onClick={() => handleChangePage('forward')}
          disabled={disabled}
        >
          <MdArrowForward size={20} />
        </button>
      </div>
      {
        props.userBackToPart && props.tabName !== 'final_review' &&
        <button
          className="btn-default btn-default_green"
          onClick={goBackToReview}
          disabled={disabled}
        >
          Go back to Review
        </button>
      }
    </div>
  );
};

NavButtons.propTypes = {
  tabName: PropTypes.string,
  tabIndex: PropTypes.number,
  userBackToPart: PropTypes.bool,
  registrationData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  checkboxes: PropTypes.object.isRequired,
  fieldNames: PropTypes.array,
  changeTabPage: PropTypes.func.isRequired,
  validateFieldsBlank: PropTypes.func.isRequired,
  validateFieldValues: PropTypes.func.isRequired,
  setTabName: PropTypes.func.isRequired,
  setTabPageIndex: PropTypes.func.isRequired,
  goBackToPart: PropTypes.func.isRequired,
  showPopupPIN: PropTypes.func.isRequired,
};

NavButtons.defaultProps = {
  tabIndex: 1,
  tabName: 'info',
  fieldNames: [],
  userBackToPart: false,
};

function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
    tabIndex: state.registration.tabIndex || 1,
    registrationData: state.registration.registrationData,
    errors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
    userBackToPart: state.registration.userBackToPart,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    validateFieldsBlank: fieldNames => dispatch(validateFieldsBlank(fieldNames)),
    validateFieldValues: (fieldNames, data) => fieldNames.forEach(field => dispatch(validateFieldValue(field, data[field]))),
    changeTabPage: (tabName, tabIndex, direction) => dispatch(changeTabPage(tabName, tabIndex, direction)),
    setTabPageIndex: index => dispatch(setTabPageIndex(index)),
    setTabName: tabName => dispatch(setTabName(tabName)),
    goBackToPart: status => dispatch(goBackToPart(status)),
    showPopupPIN: () => dispatch(showPopupPIN())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButtons);
