import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavButtons from '../registration/NavButtons';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import { duplicateForm, duplicateDelivery } from '../../localdata/duplicateFormData';
import { statesAbbvs } from '../../localdata/usStatesList';
import {
  cleanErrorText,
  cleanImage,
  setInputFieldValueById,
  setUploadableImage,
  uploadImage,
} from '../../actions/registration';

const style = {
  errorText: {
    color: 'red',
    fontSize: '11px',
  },
};

const states = Object.keys(statesAbbvs);
const mapSelectOptions = options =>
  options.map((option, index) =>
    ({
      value: option.value,
      title: option.value,
      label: states[index],
    }));

class DuplicateForm extends Component {
  constructor(props) {
    super(props);
    this.mappingComponent = (item, options) => {
      switch (item.field) {
        case 'select':
          return (
            <EmpalaSelect
              id={item.id}
              key={item.label}
              options={options || item.options}
              label={item.label}
              value={this.props.registrationData[item.id] || ''}
              handleChange={this.props.setSelectedValueById}
              col={item.col}
              hint={item.hint || item.label}
              autoWidth={item.autoWidth}
              infoButton={item.infoButton}
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
              handleChange={this.props.setInputValueById}
              typeField={item.typeField}
              col={item.col}
            />
          );
        default: return null;
      }
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.showButtonGroup = this.showButtonGroup.bind(this);

    // this.state = {
    //   imagePreviewUrl: '',
    // };

    this.green = { backgroundColor: '#98c73a' };
  }

  handleImageChange(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('description', 'form407 signed image');
    data.append('tags', 'DOCUMENT');
    data.append('id', this.props.userId);
    this.props.setUploadableImage(data);

  }

  showButtonGroup() {
    if (!this.props.image && !this.props.image407uploaded) {
      return (
        <Fragment>
          <button
            type="button"
            className="t-strong t-black"
          >
            Select file
          </button>
          <input
            type="file"
            onChange={this.handleImageChange}
          />
        </Fragment>
      );
    }
    if (this.props.image) {
      return (
        <Fragment>
          <button
            type="button"
            className="fs-18 t-strong t-black"
            onClick={this.props.uploadImage}
          >
            Upload
          </button>
          <br />
          <button
            type="button"
            className="t-strong t-black"
            onClick={this.props.handleCancel}
          >
            Cancel
          </button>
        </Fragment>
      );
    }
    if (this.props.image407uploaded) {
      return (
        <button
          type="button"
          className="t-strong t-black"
          onClick={this.props.handleCancel}
        >
          Cancel
        </button>
      );
    }
  }

  render() {
    const {
      fieldNames,
      image,
      image407uploaded,
      errorText,
      loading,
    } = this.props;

    return (
      <div className="duplicate-container row">
        <div className="col-lg-5">
          <div className="row mw_330">
            <div className="col-12 registration-group__section-title text-center">
             Compliance Officer for Member
            </div>
            {
             duplicateForm.map((item) => {
             if (item.id === 'regulatory_duplicate_state') {
               return this.mappingComponent(item, mapSelectOptions(item.options));
             }
             return this.mappingComponent(item);
           })
           }
          </div>
        </div>
        <div className="col-lg-7">
          <div className="row mt-21 mb-4">
            <div className="col-4 mw_210 no-gutters pr-5">
              { duplicateDelivery.map(item => this.mappingComponent(item)) }
            </div>
            <div className="col-8">
              <div className="registration-group__section-title mt-4 mb-lg-5">
                <a href="#" className="t-strong t-black t-ins">
                  Download Empala 3210 template letter
                </a>
              </div>
              <div className="d-flex mb-4">
                <div className="d-flex align-items-center mr-3 pr-3">
                  <div className="position-relative">
                    If you are able to do so, you can
                    upload a signed 3210/407 letter here
                    <i
                      className="registration__icon info-icon_position"
                    />
                  </div>

                </div>
                <div className="text-center mr-5">

                  <div className="file_upload">
                    {
                      loading &&
                      <div className="loader">
                        <CircularProgress
                          size={60}
                          style={{ color: '#98c73a' }}
                        />
                      </div>
                    }
                    <i className={`${image407uploaded ? 'icon-letter icon-letter_green' : 'icon-letter'}`} />
                    {this.showButtonGroup()}
                  </div>
                </div>
              </div>
              { errorText &&
                <p style={style.errorText} >
                  {errorText}
                </p>
              }
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

const mapStateToProps = state => (
  {
    image: state.registration.uploadableImage,
    image407uploaded: state.registration.image407uploaded,
    errorText: state.registration.errorMessage,
    userId: state.registration.id,
    loading: state.registration.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setUploadableImage: (data) => {
      dispatch(setUploadableImage(data));
      dispatch(cleanErrorText());
    },
    uploadImage: () => dispatch(uploadImage()),
    handleCancel: () => {
      dispatch(cleanImage());
      dispatch(cleanErrorText());
    },
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateForm);
