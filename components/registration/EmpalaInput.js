import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




const EmpalaInput = (props) => {
  console.log('-- props', props.id, props);
  return(
    <div className="registration-group">
      <label className='registration-label' htmlFor={props.id}>{props.label}</label>
      <MuiThemeProvider >
        <TextField
          style={{ width: '422px' }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          hintText={props.placeholder}
          id={props.id}
          value={props.value}
          type={props.type}
          onChange={(e) => props.handleChange(e)}
        />
      </MuiThemeProvider>
    </div>
  )
};

export default EmpalaInput;