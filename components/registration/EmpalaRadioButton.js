import React from 'react';
import RadioButton from 'material-ui/RadioButton';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';


class EmpalaRadioButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      check: false
    };

    this.styles = {
      panoramaFishEyeIcon: {
        height: '25px',
        width: '25px',
        fill: '#808895',
      },
      checkCircleIcon: {
        height: '25px',
        width: '25px',
        fill: '#98c73a',
      },
      inputStyle: {
        height: '25px',
        width: '25px',
      }
    }
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
          uncheckedIcon={<MdPanoramaFishEye style={this.styles.panoramaFishEyeIcon}/>}
          checkedIcon={<MdCheckCircle style={this.styles.checkCircleIcon}/>}
          inputStyle={this.styles.inputStyle}
          style={this.props.style}
        />
      </div>
    )
  }
}

export default EmpalaRadioButton;