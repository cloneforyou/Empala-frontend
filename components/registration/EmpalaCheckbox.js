import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MdCheckCircle from 'react-icons/lib/md/check-circle';
import MdPanoramaFishEye from 'react-icons/lib/md/panorama-fish-eye';

class EmpalaCheckbox extends React.Component {

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
      },
      labelStyle: {
        color: '#808895'
      },
      checkBoxStyle: {
        marginBottom: '20px'
      }
    }
  }


  render() {
    return (
        <Checkbox
          id={this.props.id}
          label={this.props.label}
          uncheckedIcon={<MdPanoramaFishEye style={ this.styles.panoramaFishEyeIcon }/>}
          checkedIcon={<MdCheckCircle style={ this.styles.checkCircleIcon }/>}
          inputStyle={ this.styles.inputStyle }
          labelStyle={ this.styles.labelStyle }
          style={ this.styles.checkBoxStyle }
          onCheck = {this.props.handleCheck}
          checked={this.props.checked}
        />
    )
  }
}

export default EmpalaCheckbox;
