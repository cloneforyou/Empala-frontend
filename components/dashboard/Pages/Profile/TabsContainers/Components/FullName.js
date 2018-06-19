import React, { Component } from 'react';
import { fieldsFullName } from '../../../../../../localdata/profileData';
import FormGroupMapping from './FormGroupMapping';

class FullName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpen: false,
    };

  }

  openEditForm = () => {
    this.setState({ formIsOpen: true });
  };

  closeEditForm = () => {
    this.setState({ formIsOpen: false });
  };

  getFullName = (userData) => {
    let fullName = '';
    fieldsFullName.forEach((el, index) => {
      if (userData[el.id]) {
        fullName += userData[ el.id ];
        if (index < fieldsFullName.length - 1) {
          fullName += ' ';
        }
      }
    });
    return fullName;
  };
  render() {
    // console.log('PPPPROOOPPPS', this.props)
    const { formIsOpen } = this.state;
    return (
      <div className="name-edit col-12">
        <div className="name-edit__pseudo-input pseudo-input">
          <span className="pseudo-input__label">{this.props.field.label}</span>
          <input
            type="text"
            className="pseudo-input__input"
            value={this.getFullName(this.props.userData) || 'Mr. Iain David James Clarke Sr.'}
            onFocus={this.openEditForm}
            readOnly
          />
        </div>


        <div className={formIsOpen ? 'name-edit__form' : 'name-edit__form  name-edit__form_close'}>
          <div className="row">
            {fieldsFullName.map(item => <FormGroupMapping key={item.id} {...{...this.props, item}} />)}
          </div>
        </div>


      </div>
    );
  }
}

export default FullName;
