import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import TextField from 'material-ui/TextField';

import '../../assets/styles/modules/_input-group.scss';
import style from './RegistrationFieldsStyle';


export default class EmpalaInput extends Component {
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
          inputStyle={this.props.disabled ? style.inputStyleDisabled : style.inputStyle}
          underlineFocusStyle={style.underlineFocusStyle}
          underlineDisabledStyle={style.underlineDisabledStyle}
          value={this.props.value}
          onChange={this.checkRegistrationField}
          disabled={this.props.disabled}
          errorText={errorText}
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
