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
  }

  closeEditForm = () => {
    this.setState({ formIsOpen: false });
  }

  render() {
    const { field, userData, fieldsErrors } = this.props;
    const { formIsOpen } = this.state;
    return (
      <div className="name-edit col-12">
        <div className="name-edit__pseudo-input pseudo-input">
          <span className="pseudo-input__label">{field.label}</span>
          <input
            type="text"
            className="pseudo-input__input"
            value={field.value || 'Mr. Iain David James Clarke Sr.'}
            onFocus={this.openEditForm}
          />
        </div>


        <div className={formIsOpen ? 'name-edit__form' : 'name-edit__form  name-edit__form_close'}>
          <div className="row">
            {fieldsFullName.map(item => <FormGroupMapping
              item={item}
              userData={userData}
              fieldsErrors={fieldsErrors} />)}
          </div>
        </div>


      </div>
    );
  }
}

export default FullName;
