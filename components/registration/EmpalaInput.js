import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import TextField from 'material-ui/TextField';
import style from './RegistrationFieldsStyle';
import {openInfoPopup} from '../../actions/registration';


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
    const {currentColorScheme} = this.props;
    return (
      <div
        className={this.props.col ? `registration-group col-md-${this.props.col}` : this.props.notCol ? '' : 'registration-group col-12'}>
        <div className="registration-label">
          {this.props.label}
          {this.props.infoButton && (
            <button className="info-popup__btn" onClick={this.props.openInfoPopup}>
              <i className="registration__icon"/>
            </button>
          )}
        </div>
        <TextField
          id={this.props.id}
          type={this.props.type}
          hintText={this.props.placeholder}
          style={style.textFieldStyle}
          underlineStyle={style.underlineStyle}
          underlineShow={false}
          underlineDisabledStyle={{
            border: 'none',
            backgroundColor: '#292844'
          }}
          hintStyle={currentColorScheme === 'light' ?
            style.hintStyleLightTheme :
            style.hintStyleDarkTheme
          }
          inputStyle={this.props.disabled ?
            (currentColorScheme === 'light' ?
                style.inputStyleDisabledLight :
                style.inputStyleDisabledDark
            ) :
            (currentColorScheme === 'light' ?
                style.inputStyleLightTheme :
                style.inputStyleDarkTheme
            )
          }
          value={this.props.value}
          onChange={this.checkRegistrationField}
          disabled={this.props.disabled}
          errorText={errorText}
          className="text-field"
          margin="none"
          onKeyPress={this.props.onKeyPress}
        >
          {this.props.mask &&
          <InputMask
            mask={this.props.mask}
            maskChar=""
            formatChars={{
              9: '[0-9]',
              a: '[A-Za-z]',
              A: '[A-Z]',
              '*': '[A-Za-z0-9]',
            }}
            value={this.props.value}
          />
          }
        </TextField>
      </div>
    );
  }
}

export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}), dispatch => ({
  openInfoPopup: () => dispatch(openInfoPopup()),
}))(EmpalaInput);
