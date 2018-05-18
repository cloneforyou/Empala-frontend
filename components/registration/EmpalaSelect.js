import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import style from './RegistrationFieldsStyle';


const EmpalaSelect = (props) => {

  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <SelectField
        id={props.id}
        value={props.value}
        autoWidth={props.autoWidth}
        floatingLabelText={props.label}
        floatingLabelFixed={true}
        floatingLabelStyle={style.floatingLabelStyle}
        hintText={props.hint || props.label}
        hintStyle={style.hintStyle}
        labelStyle={props.disabled ? style.inputStyleDisabled : style.inputStyle}
        style={style.selectFieldStyle}
        iconStyle={style.iconSelectStyle}
        menuItemStyle={style.menuItemStyle}
        selectedMenuItemStyle={style.selectedMenuItemStyle}
        underlineDisabledStyle={style.underlineDisabledStyle}
        underlineStyle={style.underlineStyle}
        underlineFocusStyle={style.underlineFocusStyle}
        maxHeight={300}
        onChange={(e, i, v) => {
          props.handleChange(props.id, v)
        }}
        disabled={props.disabled}
        errorText={props.disabled ? '' : props.errorText}

      >
        {props.options.map((option) => (
          <MenuItem
            key={Date.now() + Math.random()}
            value={option.value}
            primaryText={option.title}
          />
        ))}
      </SelectField>
    </div>
  );
};

export default EmpalaSelect;
