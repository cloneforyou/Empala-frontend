import React from 'react';
import RadioButton from 'material-ui/RadioButton';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';

import style from './RegistrationFieldsStyle';

const EmpalaRadioButton = (props) => {
  return (
    <div className="check-container">
      <RadioButton
        value={props.value}
        label={props.label}
        onClick={props.onClick}
        checked={props.checked}
        labelStyle={props.labelStyle}
        uncheckedIcon={<MdPanoramaFishEye style={style.panoramaFishEyeIcon} />}
        checkedIcon={<MdCheckCircle style={style.checkCircleIcon} />}
        inputStyle={style.inputSwitchesStyle}
        style={props.style}
      />
    </div>
  );
};

export default EmpalaRadioButton;