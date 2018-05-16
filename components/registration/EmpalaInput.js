import React from 'react';
import TextField from 'material-ui/TextField';
import InputMask from 'react-input-mask';
import '../../assets/styles/modules/_input-group.scss'

class EmpalaInput extends React.Component {
  constructor(props) {
    super(props)
  }

  checkRegistrationField = (e) => {
    if ((/^\d*$/).test(e.target.value) && this.props.numberField) {
      this.props.handleChange(e)
    } else if (!this.props.numberField) {
      this.props.handleChange(e)
    }
  };

  render() {
    const errorText = this.props.disabled ? '' : this.props.errorText;
    const style={
      inputStyle: {
        color: '#858c99'
      },
      inputStyleDisabled: {
        color: 'rgb(208, 210, 212)'
      },
    };

    return (
      <div className={this.props.col ? `registration-group col-md-${this.props.col}` : 'registration-group col-12'}>
        <TextField
          id={this.props.id}
          type={this.props.type}
          floatingLabelText={this.props.label}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: '#98c73a'}}
          hintText={props.placeholder}
          style={{ width: '100%' }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          hintStyle={{color: '#c5c5c5'}}
          inputStyle={this.props.disabled ? style.inputStyleDisabled : style.inputStyle}
          value={this.props.value}
          onChange={this.checkRegistrationField}
          disabled={this.props.disabled}
          errorText={errorText}
        >
          {props.mask && <InputMask mask={props.mask} maskChar=" " value={props.value}/>}
        </TextField>
    </div>
  )
  };
}

export default EmpalaInput;
