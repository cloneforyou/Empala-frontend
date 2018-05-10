// Use handleDatePick as props to pass onChange handler function

import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';


const DatePickerField = (props) => (
  <div className="registration-group">
  <label className='registration-label'>{props.label}</label>
  <MuiThemeProvider>
    <div className='date-picker__container'>
      <DatePicker
        id={props.id}
        hintText="calendar"
        locale="en-US"
        underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
        firstDayOfWeek={0}
        disabled={props.disabled}
        style={{display: 'inline-block'}}
        onChange={(none = null, date) => props.handleDatePick(props.id, date)}
      />
      <FaCalendarO style={{ position: 'absolute', top: '20px', left: '240px' }} />
    </div>
  </MuiThemeProvider>
  </div>
);

export default DatePickerField;
