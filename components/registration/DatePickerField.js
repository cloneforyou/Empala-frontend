import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';


const DatePickerField = (props) => (
  <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
    <label className= {props.errorText ? 'registration-label registration-label-error' : 'registration-label'}>
      {props.label} {props.errorText}
    </label>
      <div className='date-picker__container'>
        <DatePicker
          id={props.id}
          hintText="calendar"
          locale="en-US"
          underlineStyle={props.errorText ? {borderBottom : '2px solid rgb(244, 67, 54)'}: { borderBottom : '2px solid #e0e0e0' }}
          firstDayOfWeek={0}
          disabled={props.disabled}
          textFieldStyle={{ width: '100%' }}
          onChange={(none = null, date) => props.handleDatePick(props.id, date)}
          value={props.value ? new Date(props.value): null}
        />
        <FaCalendarO style={{ position: 'absolute', top: '20px', right: '0', color: '#98c73a' }} />
      </div>
  </div>
);

export default DatePickerField;
