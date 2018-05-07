import React from 'react';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';

const EmpalaSelect = (props) => {

  return(
    <div className="registration-group">
      <label className='registration-label' htmlFor={props.id}>{props.label}</label>
      <MuiThemeProvider>
        <SelectField
          id={props.id}
          value={props.value}
          floatingLabelText={props.label}
          style={{ fontWeight: 400, margin: 0 }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          underlineFocusStyle={{ borderBottom : '2px solid red' }}
          onChange={(e, i, v) => {props.handleChange(props.id ,v)}}
        >
          {props.options.map((option) => (
            <MenuItem
              key={Date.now()+ Math.random()}
              value={option.value}
              primaryText={option.title}
            />
          ))}
        </SelectField>
      </MuiThemeProvider>
    </div>
  )
};

export default EmpalaSelect;