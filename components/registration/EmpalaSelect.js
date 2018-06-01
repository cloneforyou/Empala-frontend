import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

import style from './RegistrationFieldsStyle';


const EmpalaSelect = (props) => {

  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <SelectField
        id={props.id}
        value={props.value}
        autoWidth={props.autoWidth}
        floatingLabelText={props.label}
        floatingLabelFixed
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
        underlineFocusStyle={props.errorText
          ? style.underlineErrorStyle
          : style.underlineFocusStyle}
        maxHeight={300}
        onChange={(e, i, v) => {
          props.handleChange(props.id, v)
        }}
        disabled={props.disabled}
        errorText={props.disabled ? '' : props.errorText}

      >
        {props.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            primaryText={option.title}
            label={option.label}
          />
        ))}
      </SelectField>
    </div>
  );
};

EmpalaSelect.propTypes = {
  autoWidth: PropTypes.bool,
  col: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  handleCheck: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default EmpalaSelect;
