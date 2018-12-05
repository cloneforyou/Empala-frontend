/* eslint-disable max-len,react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { every } from 'lodash';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import {
  changeTabPage,
  validateFieldsBlank,
  goBackToPart,
  setTabName,
  setTabPageIndex,
  validateFieldValue,
  checkEmailVerificationRequest,
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
  return Object.keys(checkboxesList).filter(key => (/regulatory_checkbox_[2-5]/.test(key)) && checkboxesList[key]);
}


const NavButtons = (props) => {
  let disabled = !isFieldsFilled(props.fieldNames, props.registrationData) ||
    (props.fieldNames && props.errors && isFieldError(props.fieldNames, props.errors));

  if (props.tabName === 'regulatory') {
    if (props.tabIndex === 1) {
      disabled = filterActiveCheckboxes(props.checkboxes).length > 0;
    } else if (props.tabIndex === 2) {
      disabled = !isFieldsFilled(props.fieldNames, props.registrationData) || !props.image407uploaded;
    } else if (props.tabIndex === 3) {
      const isUSCitizen = /* props.registrationData.member_basic_information_residence === 'United States'
        && */ props.registrationData.regulatory_identification_citizenship === 'United States';
      // todo: do we need to check residence country?
      const fieldsToSkip = [
        'regulatory_identification_residency_status',
        'regulatory_identification_visa_type',
        'regulatory_identification_visa_expiry_date',
      ];
      if (isUSCitizen) {
        const shouldBeFilled = [...props.fieldNames].filter(name => !fieldsToSkip.includes(name));
        disabled = !isFieldsFilled(shouldBeFilled, props.registrationData);
      } else if (!isUSCitizen) {
        if (props.registrationData.regulatory_identification_residency_status === 'Other'
        || props.registrationData.regulatory_identification_visa_type === 'OTHER') {
          disabled = true;
        } else if (props.registrationData.regulatory_identification_residency_status === 'Permanent Resident') {
          const shouldBeFilled = [...props.fieldNames].slice(1).filter(name => !fieldsToSkip.includes(name));
          disabled = !isFieldsFilled(shouldBeFilled, props.registrationData);
        }
      }
    }
  }
  if (props.fieldNames.filter(field =>
    (field.includes('zip_code') && props.registrationData[field] && props.registrationData[field].length < 5)).length > 0) {
    disabled = true;
  }

  function handleChangePage(arrow) {
    if (props.tabName === 'member' && props.tabIndex === 2 && arrow === 'forward') {
      return props.checkEmailVerificationRequest('email');
    }
    if (props.tabName === 'final_review' && arrow === 'forward') {
      return props.checkEmailVerificationRequest('phone');
    }
    props.changeTabPage(props.tabName, props.tabIndex, arrow);
  }

  function goBackToReview() {
    props.setTabName('final_review');
    props.setTabPageIndex(1);
    props.goBackToPart(false);
  }

  return (
    <div>
      <button
        type="button"
        className="btn-navigate btn-prev"
        onClick={() => handleChangePage('backward')}
      >
        <MdChevronLeft size={35} />
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
          className={`btn-navigate btn-next ${!disabled && 'btn--navigate--active'}`}
          onClick={() => handleChangePage('forward')}
          disabled={disabled}
        >
          <MdChevronRight size={35} />
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
  checkEmailVerificationRequest: PropTypes.func.isRequired,
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
    showInfoPopup: state.registration.showInfoPopup,
    image407uploaded: state.registration.image407uploaded,
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
    showPopupPIN: () => dispatch(showPopupPIN()),
    checkEmailVerificationRequest: entityType => dispatch(checkEmailVerificationRequest(entityType)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButtons);
