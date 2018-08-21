import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import fieldNeedsLabel from '../../localdata/noLabelFields';
import style from './RegistrationFieldsStyle';
import { openInfoPopup } from '../../actions/registration';


const EmpalaSelect = (props) => {
  const { currentColorScheme } = props;
  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      <div className="registration-label">
        {props.label}
        {props.infoButton && (
          <button className="info-popup__btn" onClick={(e) => {e.preventDefault(); props.openInfoPopup(props.id); }}>
            <i className="registration__icon" />
          </button>
        )}
      </div>
      <SelectField
        id={props.id}
        value={props.value}
        autoWidth={props.autoWidth}
        className="dashboard-select text-field fs-18"
        floatingLabelStyle={style.floatingLabelStyle}
        hintText={fieldNeedsLabel(props.id) && (props.hint || props.label)}
        hintStyle={currentColorScheme === 'light' ?
          style.hintStyleLightTheme :
          style.hintStyleDarkTheme
        }
        labelStyle={props.disabled ? style.labelStyleDisabled :
          (currentColorScheme === 'light' ?
              style.labelStyleLightTheme :
              style.labelStyleDarkTheme
          )
        }
        inputStyle={props.disabled ?
          (currentColorScheme === 'light' ?
              style.inputStyleDisabledLight :
              style.inputStyleDisabledDark
          ) :
          (currentColorScheme === 'light' ?
              style.inputStyleLightTheme :
              style.inputStyleDarkTheme
          )
        }
        style={style.selectFieldStyle}
        iconStyle={style.iconSelectStyle}
        menuItemStyle={style.menuItemStyle}
        selectedMenuItemStyle={style.selectedMenuItemStyle}
        underlineStyle={style.underlineStyle}
        underlineShow={false}
        underlineDisabledStyle={{
          border: 'none',
        }}
        maxHeight={300}
        onChange={(e, i, v) => {
          props.handleChange(props.id, v);
        }}
        disabled={props.disabled}
        errorText={props.disabled ? '' : props.errorText}
        margin="none"
      >
        {props.options.map(option => (
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
  infoButton: PropTypes.bool,
};
export default connect(
  state => ({
    currentColorScheme: state.dashboard.currentColorScheme,
  }),
  dispatch => ({
    openInfoPopup: (name) => dispatch(openInfoPopup(name)),
  }),
)(EmpalaSelect);

