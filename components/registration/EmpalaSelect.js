import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import fieldNeedsLabel from '../../localdata/noLabelFields';
import style from './RegistrationFieldsStyle';
import { closeModal } from "../../actions/dashboard";


const EmpalaSelect = (props) => {
  const { currentColorScheme } = props;
  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <SelectField
        id={props.id}
        value={props.value}
        autoWidth={props.autoWidth}
        floatingLabelText={props.label}
        floatingLabelFixed
        className="dashboard-select"
        floatingLabelStyle={style.floatingLabelStyle}
        hintText={fieldNeedsLabel(props.id) && (props.hint || props.label)}
        hintStyle={currentColorScheme === 'light' ?
          { 'color': '#C5C5C5' } :
          { 'color': '#fff' }
        }
        labelStyle={props.disabled ? style.inputStyleDisabled :
          (currentColorScheme === 'light' ?
              { 'color': '#C5C5C5' } :
              { 'color': '#cacaca' }
          )
        }
        style={style.selectFieldStyle}
        iconStyle={style.iconSelectStyle}
        menuItemStyle={style.menuItemStyle}
        selectedMenuItemStyle={style.selectedMenuItemStyle}
        underlineDisabledStyle={style.underlineDisabledStyle}
        underlineStyle={currentColorScheme === 'light' ?
          { borderBottom: '2px solid #E0E0E0' } :
          { borderBottom: '2px solid #676676' }
        }
        underlineFocusStyle={props.errorText
          ? style.underlineErrorStyle
          : style.underlineFocusStyle}
        maxHeight={300}
        onChange={(e, i, v) => {
          props.handleChange(props.id, v);
        }}
        disabled={props.disabled}
        errorText={props.disabled ? '' : props.errorText}
        margin="none"

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
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  handleCheck: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}))(EmpalaSelect);

