import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';

import style from './RegistrationFieldsStyle';


class EmpalaCheckbox extends Component {

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
        <Checkbox
          id={this.props.id}
          label={this.props.label}
          uncheckedIcon={<MdPanoramaFishEye style={ style.panoramaFishEyeIcon }/>}
          checkedIcon={<MdCheckCircle style={ style.checkCircleIcon }/>}
          inputStyle={ style.inputSwitchesStyle }
          labelStyle={ style.labelCheckboxStyle }
          style={ style.checkBoxStyle }
          onCheck = {this.props.handleCheck}
          checked={this.props.checked}
        />
      </div>
    )
  }
}

export default EmpalaCheckbox;
