import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const EmpalaSelect = (props) => {
  console.log('-- props for select', props);

  return(
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
        <SelectField
          id={props.id}
          value={props.value}
          floatingLabelText={props.label}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: '#98c73a'}}
          hintText={props.hint || props.label}
          hintStyle={{ color: '#858c99'}}
          labelStyle={{ color: '#858c99'}}
          style={{ width: '100%', margin: 0 }}
          iconStyle={{ right: '0', fill: '#7f8794' }}
          menuItemStyle={{ color: '#858c99' }}
          selectedMenuItemStyle={{ color: '#98c73a'}}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          underlineFocusStyle={{ borderBottom : '2px solid #98c73a' }}
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
    </div>
  )
};

export default EmpalaSelect;