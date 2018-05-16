import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';

const underlineStyle = {
  borderBottom : '2px solid #e0e0e0'
};

const DatePickerField = (props) => {
  const errorText = props.disabled ? '' : props.errorText;
  const style={
    inputStyle: {
      color: '#858c99'
    },
    inputStyleDisabled: {
      color: 'rgb(208, 210, 212)'
    },
  };

  return (
      <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
        <label className='registration-label'>
          {props.label}
        </label>
        <div className='date-picker__container'>
          <DatePicker
              id={props.id}
              locale="en-US"
              underlineStyle={underlineStyle}
              errorText={errorText}
              inputStyle={props.disabled ? style.inputStyleDisabled : style.inputStyle}
              firstDayOfWeek={0}
              disabled={props.disabled}
              textFieldStyle={{width: '100%'}}
              underlineDisabledStyle={{borderBottom: '2px dotted rgba(0, 0, 0, 0.3)'}}
              onChange={(none = null, date) => props.handleDatePick(props.id, date)}
              value={props.value ? new Date(props.value) : null}
          />
          <FaCalendarO style={{position: 'absolute', top: '20px', right: '0', color: '#98c73a'}}/>
        </div>
      </div>
  )
};

export default DatePickerField;
