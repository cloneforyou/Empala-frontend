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
  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <label className="registration-label">
        {props.label}
      </label>
      <div className="date-picker__container">
        <DatePicker
          id={props.id}
          locale="en-US"
          underlineStyle={currentColorScheme === 'light' ?
            { borderBottom: '2px solid #E0E0E0' } :
            { borderBottom: '2px solid #676676' }
          }
          openToYearSelection
          errorText={errorText}
          inputStyle={props.disabled ? style.inputStyleDisabled :
            (currentColorScheme === 'light' ?
                { color: '#C5C5C5' } :
                { color: '#cacaca' }
            )
          }
          firstDayOfWeek={0}
          disabled={props.disabled}
          textFieldStyle={{ width: '100%' }}
          underlineDisabledStyle={style.underlineDisabledStyle}
          onChange={(none = null, date) => props.handleDatePick(props.id, date)}
          value={props.value && props.value !== 'Not provided' ? new Date(props.value) : null}
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

export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}))(DatePickerField);
