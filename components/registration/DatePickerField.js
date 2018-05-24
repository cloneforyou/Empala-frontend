import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import PropTypes from 'prop-types';

import style from './RegistrationFieldsStyle';


const DatePickerField = (props) => {
  const errorText = props.disabled ? '' : props.errorText;
  const currentDate = new Date(),
    birthDayYear = currentDate.getFullYear() - 18,
    currentMonth = currentDate.getMonth(),
    currentDay = currentDate.getDate();
  const dateBirthDay = new Date(birthDayYear, currentMonth, currentDay);

  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <label className="registration-label">
        {props.label}
      </label>
      <div className="date-picker__container">
        <DatePicker
          id={props.id}
          locale="en-US"
          underlineStyle={style.underlineStyle}
          openToYearSelection
          errorText={errorText}
          inputStyle={props.disabled ? style.inputStyleDisabled : style.inputStyle}
          firstDayOfWeek={0}
          disabled={props.disabled}
          textFieldStyle={{width: '100%'}}
          underlineDisabledStyle={style.underlineDisabledStyle}
          onChange={(none = null, date) => props.handleDatePick(props.id, date)}
          value={props.value ? new Date(props.value) : null}
          minDate={props.dateExpiry && currentDate}
          maxDate={(props.birthDay && dateBirthDay) || (props.dateIssue && currentDate)}
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

export default DatePickerField;
