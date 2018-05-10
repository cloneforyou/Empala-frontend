import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../assets/styles/modules/_input-group.scss'

const EmpalaInput = (props) => {
  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : "registration-group"}>
      <label className='registration-label'
             htmlFor={props.id}>
        {props.label}
      </label>
      <MuiThemeProvider >
        <TextField
          id={props.id}
          type={props.type}
          hintText={props.placeholder}
          style={{ width: '422px' }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          hintStyle={{ color: '#858c99'}}
          value={props.value}
          onChange={(e) => props.handleChange(e)}
          disabled={props.disabled}
          errorText={props.errorText}
        />
      </MuiThemeProvider>
    </div>
  )
};

export default EmpalaInput;