import React from 'react';
import EmpalaInput from '../EmpalaInput';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { connect } from 'react-redux';
import { setInputFieldValueById } from '../../../actions/registration';
import EmpalaSelect from '../EmpalaSelect';
import { dataFields } from '../../../localdata/experiencePageData';

const mapStateToProps = (state) => {
  return ({
    registrationData: state.registration.registrationData,
    page: state.registration.tabIndex,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value))
  })
};


class ExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      return (
        <EmpalaSelect
          id={item.id}
          key={item.label}
          options={item.options}
          label={item.label}
          value={this.props.registrationData[item.id] || ''}
          handleChange={this.props.setSelectedValueById}
          col={item.col}
          hint={item.hint || item.label}
        />
      )
    };
    this.isRadioChecked = (name) => (this.props.registrationData.memberDocument === name);
  }

  render() {
    return (
      <form>
        { dataFields[this.props.page - 1].map((item) => this.mappingComponent(item)) }
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm)
