import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NavButtons from './NavButtons';
import EmpalaInput from '../registration/EmpalaInput';
import EmpalaSelect from '../registration/EmpalaSelect';
import { duplicateForm, duplicateDelivery } from '../../localdata/duplicateFormData';
import { statesAbbvs } from '../../localdata/usStatesList';
import { cleanErrorText, cleanImage, setUploadableImage, uploadImage } from '../../actions/registration';


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
    const {
      registrationData,
      setSelectedValueById,
      setInputValueById,
    } = this.props;

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
              handleChange={setInputValueById}
              typeField={item.typeField}
              col={item.col}
            />
          );
        default: return null;
      }
    };

    this.handleImageChange = this.handleImageChange.bind(this);

    this.state = {
      imagePreviewUrl: '',
    };

    this.green = { backgroundColor: '#98c73a' };
  }

  handleImageChange(e) {
    e.preventDefault();
    const data = new FormData();
    const reader = new FileReader();
    data.append('file', e.target.files[0]);
    data.append('description', 'form407 signed image');
    data.append('tags', 'DOCUMENT');
    this.props.setUploadableImage(data);
    console.log(' ** ', data);
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const {
      fieldNames,
      image,
      image407uploaded,
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
                <div className="d-flex align-items-center mr-3 pr-3 position-relative">
                  <span>
                    If you are able to do so, you can
                    upload a signed 3210/407 letter here
                  </span>
                  <i
                    className="registration__icon info-icon_position"
                  />
                </div>
                <div className="text-center mr-5">
                  <div className="file_upload">
                    <i className={`${image407uploaded ? 'icon-letter icon-letter_green' : 'icon-letter'}`} />
                    { !image && !image407uploaded &&
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
                    }
                    {image &&
                    <button
                      type="button"
                      className="fs-18 t-strong t-black"
                      onClick={this.props.uploadImage}
                    >
                      Upload
                    </button>
                    }

                  </div>
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

const mapStateToProps = state => (
  {
    image: state.registration.uploadableImage,
    image407uploaded: state.registration.image407uploaded,
    errorText: state.registration.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setUploadableImage: data => dispatch(setUploadableImage(data)),
    uploadImage: () => dispatch(uploadImage()),
    handleCancel: () => {
      dispatch(cleanImage());
      dispatch(cleanErrorText());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateForm);
