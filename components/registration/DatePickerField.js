import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import PropTypes from 'prop-types';

import style from './RegistrationFieldsStyle';


const DatePickerField = (props) => {
  const { currentColorScheme } = props;
  const errorText = props.disabled ? '' : props.errorText;
  const currentDate = new Date();
  const birthDayYear = currentDate.getFullYear() - 18;
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const dateBirthDay = new Date(birthDayYear, currentMonth, currentDay);
  const licenseIssueYear = currentDate.getFullYear() - 10;
  const licenseExpirationYear = currentDate.getFullYear() + 10;
  const licenseIssueDate = new Date(licenseIssueYear, currentMonth, currentDay);
  const licenseExpirationDate = new Date(licenseExpirationYear, currentMonth, currentDay);

  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <label className="registration-label">
        {props.label}
      </label>
      <div className="date-picker__container data-picker_fs-18">
        <DatePicker
          id={props.id}
          locale="en-US"
          underlineStyle={style.underlineStyle}
          openToYearSelection
          errorText={errorText}
          inputStyle={props.disabled ?
            (currentColorScheme === 'light' ?
                style.inputStyleDisabledLight :
                style.inputStyleDisabledDark
            ) :
            (currentColorScheme === 'light' ?
                style.inputStyleLightTheme :
                style.inputStyleDarkTheme
            )
          }
          underlineShow={false}
          firstDayOfWeek={0}
          disabled={props.disabled}
          textFieldStyle={style.dataPickerTextFieldStyle}
          onChange={(none = null, date) => props.handleDatePick(props.id, date)}
          value={props.value && props.value !== 'Not provided' ? new Date(props.value) : null}
          minDate={(props.dateExpiry && currentDate) || (props.dateIssue && licenseIssueDate)}
          maxDate={(props.birthDay && dateBirthDay) || (props.dateIssue && currentDate) || (props.dateExpiry && licenseExpirationDate)}
        />
        <FaCalendarO style={style.calendarIcon} />
      </div>
    </div>
  );
};

DatePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  col: PropTypes.number,
  id: PropTypes.string.isRequired,
  birthDay: PropTypes.bool,
  dateIssue: PropTypes.bool,
  dateExpiry: PropTypes.bool,
  handleDatePick: PropTypes.func.isRequired,
};

export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}))(DatePickerField);
