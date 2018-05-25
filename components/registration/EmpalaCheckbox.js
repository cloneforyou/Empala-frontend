import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';
import PropTypes from 'prop-types';

import style from './RegistrationFieldsStyle';

const EmpalaCheckbox = (props) => {
  return (
    <div className="check-container">
      <Checkbox
        id={props.id}
        label={props.label}
        uncheckedIcon={<MdPanoramaFishEye style={style.panoramaFishEyeIcon} />}
        checkedIcon={<MdCheckCircle style={style.checkCircleIcon} />}
        inputStyle={style.inputSwitchesStyle}
        labelStyle={props.active ? style.labelActiveCheckboxStyle : style.labelCheckboxStyle}
        style={style.checkBoxStyle}
        onCheck={props.handleCheck}
        checked={props.checked}
      />
    </div>
  );
};

EmpalaCheckbox.propTypes = {
  active: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default EmpalaCheckbox;
