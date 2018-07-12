import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import TextField from 'material-ui/TextField';
import style from './RegistrationFieldsStyle';


class EmpalaInput extends Component {
  constructor(props) {
    super(props);
  }

  checkRegistrationField = (e) => {
    if ((/^\d*$/).test(e.target.value) && this.props.typeField === 'numberField') {
      this.props.handleChange(e)
    } else if (!this.props.typeField) {
      this.props.handleChange(e)
    }
  };

  render() {
    const errorText = this.props.disabled ? '' : this.props.errorText;
    const { currentColorScheme } = this.props;
    return (
      <div className={this.props.col ? `registration-group col-md-${this.props.col}` : 'registration-group col-12'}>
        <TextField
          id={this.props.id}
          type={this.props.type}
          floatingLabelText={this.props.label}
          floatingLabelFixed
          floatingLabelStyle={style.floatingLabelStyle}
          hintText={this.props.placeholder}
          style={style.textFieldStyle}
          underlineStyle={style.underlineStyle}
          hintStyle={style.hintStyle}
          inputStyle={this.props.disabled ? style.inputStyleDisabled :
            (currentColorScheme === 'light' ?
                { 'color': '#C5C5C5' } :
                { 'color': '#cacaca' }
            )
          }
          underlineFocusStyle={errorText ? style.underlineErrorStyle : style.underlineFocusStyle}
          underlineDisabledStyle={style.underlineDisabledStyle}
          value={this.props.value}
          onChange={this.checkRegistrationField}
          disabled={this.props.disabled}
          errorText={errorText}
          className="text-field"
          margin="none"
          onKeyPress={this.props.onKeyPress}
        >
          {this.props.mask && <InputMask
            mask={this.props.mask}
            maskChar=""
            formatChars={{
              9: '[0-9]',
              a: '[A-Za-z]',
              A: '[A-Z]',
              '*': '[A-Za-z0-9]',
            }}
            value={this.props.value}
          />}
        </TextField>
      </div>
    );
  }
}

export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}))(EmpalaInput);
