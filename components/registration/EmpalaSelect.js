import React from 'react';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';

const EmpalaSelect = (props) => {

  return(
    <div className="">
      <MuiThemeProvider>
        <SelectField
          floatingLabelText={props.label}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: '#98c73a'}}
          hintText={props.label}
          hintStyle={{ color: '#858c99'}}
          style={{ width: '422px', margin: 0 }}
          menuStyle={{ top: '51px' }}
          iconStyle={{ top: '-40px', right: '-16px', fill: '#7f8794' }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          underlineFocusStyle={{ borderBottom : '2px solid #98c73a' }}
        >
          {props.options.map((option) => (<MenuItem key={Date.now()+ Math.random()} value={option.value}  primaryText={option.title} />))}
        </SelectField>
      </MuiThemeProvider>
    </div>
  )
};

export default EmpalaSelect;