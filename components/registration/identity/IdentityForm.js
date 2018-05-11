import React from 'react';
import EmpalaInput from '../EmpalaInput';
import EmpalaSelect from '../EmpalaSelect';
import EmpalaCheckbox from '../EmpalaCheckbox';
import { dataFields } from '../../../localdata/identityPageData';
import {connect} from "react-redux";
import {
  closeIdentityModal,
  getMenuItems,
  setInputFieldValueById,
  setMemberDocumentType,
  setTabName,
  setTabPageIndex, toggleCheckboxById
} from '../../../actions/registration';
import ModalWindow from '../ModalWindow';

const mapStateToProps = (state) => {
  // const identityCheckboxes = Object.getOwnPropertyNames(state['registration']).filter(name => /identity_checkbox/.test(name));
  // const showModal = identityCheckboxes.some(item => state['registration'][item]);
  // console.log(' ***88888 ', state, identityCheckboxes, showModal);
  return (
    {
      registrationData: state.registration.registrationData,
      page: state.registration.tabIndex,
      showModal: state.registration.showIdentityModal,
     }
  )
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      setInputValueById: (e) => {
        console.log(e.target.id, e.target.value);
        dispatch(setInputFieldValueById(e.target.id, e.target.value))
      },
      toggleCheckboxById: (e, checked) => {
        console.log('---------->>>>>>>>>>>>>>>>', e.target.id)
        dispatch(toggleCheckboxById(e.target.id));
      },
      closeModal: () => dispatch(closeIdentityModal()),
    }
  )
};


class IdentityForm extends React.Component {

  constructor(props) {
    super(props);

    this.mappingComponent = (item) => {
      switch (item.field) {
        case 'input':
          return (
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              placeholder={item.placeholder}
              handleChange={this.props.setInputValueById}
            />
          );
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.id}
              options={item.options}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              handleChange={this.props.setSelectedValueById}
              col={item.col}
              hint={item.hint || item.label}
            />
          );
        case 'checkbox':
          return (
              <EmpalaCheckbox
                key={item.id}
                id={item.id}
                label={item.label}
                handleCheck={this.props.toggleCheckboxById}
              />
          )
      }
    };
  }

  render() {
    // if (this.props.tabIndex === 4) {
    //
    //   return (
    //     <div>
    //       <ModalWindow open={this.props.showModal}/>
    //     </div>
    //   )
    // }

    return (
      <div>
        {dataFields[this.props.page-1].map((item) => this.mappingComponent(item))}
        <ModalWindow
          open={this.props.showModal}
          handleClose={this.props.closeModal}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityForm)