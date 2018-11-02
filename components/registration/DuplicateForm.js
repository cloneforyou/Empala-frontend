import React, { Component } from 'react';

import NavButtons from './NavButtons';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import { duplicateForm, duplicateDelivery } from '../../localdata/regulatoryPageData';


class DuplicateForm extends Component {
  constructor(props) {
    super(props);
    const {
      registrationData,
      setSelectedValueById,
      setInputValueById,
    } = this.props;

    this.mappingComponent = item => {
      switch (item.field) {
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.label}
              options={item.options}
              label={item.label}
              value={registrationData[item.id] || ''}
              handleChange={setSelectedValueById}
              col={item.col}
              autoWidth={item.autoWidth}
            />
          );
        case 'input':
          return (
            <EmpalaInput
              key={item.id}
              id={item.id}
              type={item.type}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              placeholder={item.placeholder}
              handleChange={setInputValueById}
              typeField={item.typeField}
              col={item.col}
            />
          );
        default: return null;
      }
    };
  }

  render() {
    const { fieldNames } = this.props;

    return (
      <div className="duplicate-container row">
        <div className="col-lg-5">
         <div className="row mw_330">
           <div className="col-12 registration-group__section-title text-center">
             Compliance Officer for Member
           </div>
           {duplicateForm.map(item => this.mappingComponent(item))}
         </div>
        </div>
        <div className="col-lg-7">
          <div className="row mt-21 mb-4">
            <div className="col-4 mw_210 no-gutters pr-5">
              {duplicateDelivery.map(item => this.mappingComponent(item))}
            </div>
            <div className="col-8">
              <div className="registration-group__section-title mt-4 mb-lg-5">
                <a href="#" className="t-strong t-black t-ins">
                  Download Empala 3210 template letter
                </a>
              </div>
              <div className="d-flex mb-4">
                <div className="d-flex align-items-center mr-3 pr-3 position-relative">
                  <span>
                    If you are able to do so, you can
                    upload a signed 3210/407 letter here
                  </span>
                  <i className="registration__icon info-icon_position" />
                </div>
                <div className="text-center mr-5">
                  <i className="icon-letter" />
                  <span className="registration-group__section-title t-strong t-black">Upload</span>
                </div>
              </div>
              <p className="t-small">
                You can also email us a scanned version of your 3210 at support@empala.com
                and continue your application.
              </p>
            </div>
          </div>
          <div className="popup-info text-center mb-5">
            <i className="icon-exclamation" />
            <p className="inf-text mt-4">
              Please note:  Additional charges apply for all physical
              duplicate statements and Trade Confirmations.
            </p>
          </div>
        </div>
        <div className="w-100 text-center">
          <NavButtons
            fieldNames={fieldNames}
          />
        </div>
      </div>
    );
  }
}

export default DuplicateForm;