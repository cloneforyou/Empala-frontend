import React, {Component} from 'react';
import RadioButton from 'material-ui/RadioButton';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';

import style from './RegistrationFieldsStyle';


class EmpalaRadioButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      check: false
    };
  }

  render() {
    return (
      <div className='check-container'>
        <RadioButton
          value={this.props.value}
          label={this.props.label}
          onClick={this.props.onClick}
          checked={this.props.checked}
          labelStyle={this.props.labelStyle}
          uncheckedIcon={<MdPanoramaFishEye style={style.panoramaFishEyeIcon}/>}
          checkedIcon={<MdCheckCircle style={style.checkCircleIcon}/>}
          inputStyle={style.inputSwitchesStyle}
          style={this.props.style}
        />
      </div>
    )
  }
}

export default EmpalaRadioButton;