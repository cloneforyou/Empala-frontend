import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import {changeTabPage, sendRegistrationForm, closeErrorModal, toggleCheckboxById} from '../../actions/registration';
import RegistrationResultModal from './RegistrationResultModal';
import EmpalaCheckbox from '../registration/EmpalaCheckbox';

function mapStateToProps(state) {
  return {
    firstName: state.registration.registrationData.member_basic_information_first_name || '',
    lastName: state.registration.registrationData.member_basic_information_last_name || '',
    addMarginSelected: state.registration.registrationData.member_account_account_type === 'Margin',
    errorMessage: state.registration.errorMessage || '',
    showErrorModal: state.registration.showErrorModal,
    showSuccessModal: state.registration.showSuccessModal,
    loading: state.registration.loading,
    legalMessages: state.registration.legalMessages,
    checkboxes: state.registration.checkboxes,
  };
}

function mapDispatchToProps(dispatch) {
  return (
    {
      changeTabPage: () => dispatch(changeTabPage('agreement', 1, 'backward')),
      submitRegistration: () => dispatch(sendRegistrationForm()),
      closeModal: () => {
        dispatch(closeErrorModal());
        dispatch(changeTabPage('agreement', 1, 'backward'));
      },
      toggleCheckboxById: e => dispatch(toggleCheckboxById(e.target.id)),
    });
}

const MarginWording = () => (
  <Fragment>
    <li className="list-info__item">
      <p/>
      <p>As MARGIN account holder I'm agreeing to</p>
      <a href="#" className="link-decoration">
        <ins>Empala Margin Agreement</ins>
      </a>
    </li>
  </Fragment>
);

class AgreementPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signed: false,
      submitted: false,
    };
  }

  focusSubmit() {
    this.submitBtn.focus();
  }

  checkRegistrationName = (e) => {
    const firstName = this.props.firstName.trim().split(' ').join(' ');
    const lastName = this.props.lastName.trim().split(' ').join(' ');
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    let prints = e.target.value.split(' ').filter(el => el !== '').join(' ').toLowerCase();

    this.setState({
      submitted: false,
      signed: false,
    });

    if (prints.indexOf(fullName) > -1) {
      if (fullName.length === prints.length) {
        this.setState({
          signed: true
        });
        this.focusSubmit();
      }
    }
  };

  handleSubmit() {
    this.setState({
      submitted: true,
    });
    if (this.state.signed && this.props.checkboxes.agreements_info_checkbox) {
      this.submitBtn.disabled = true;
      this.props.submitRegistration();
    }
  }

  render() {
    let registrationSubmissionSubmit,
      registrationSubmissionPerjury,
      registrationSubmissionMainCash,
      registrationSubmissionMainMargin;
    if (this.props.legalMessages) {
      this.props.legalMessages.forEach((item) => {
        if (item.page === 'Registration Submission Submit') {
          registrationSubmissionSubmit = item.text;
        }
        if (item.page === 'Registration Submission Perjury') {
          registrationSubmissionPerjury = item.text;
        }
        if (item.page === 'Registration Submission Main (Cash)') {
          registrationSubmissionMainCash = item.text;
        }
        if (item.page === 'Registration Submission Main (Margin)') {
          registrationSubmissionMainMargin = item.text;
        }
      });
    }

    return (
      <div className="agreements">
        {
          this.props.loading &&
          <div className="loader__wrap">
            <div className="loader">
              <CircularProgress
                size={100}
                style={{ color: '#98c73a' }}
              />
            </div>
          </div>
        }
        <p className="agreements__title">Before We Can Proceed You Are Required to Review and Consent to All of the
          Following Documents and Information
        </p>
        <div
          className="agreements-info"
          ref={node => this.containerInfo = node}
          dangerouslySetInnerHTML={{ __html: this.props.addMarginSelected ?
              registrationSubmissionMainMargin :
              registrationSubmissionMainCash
          }}
        />
        <div className="label-confirmation d-flex justify-content-end">(You have to scroll to the bottom to continue)</div>
        <div className="confirmation row">
          <div className="confirmation__text col-lg-4"
               dangerouslySetInnerHTML={{ __html: registrationSubmissionPerjury }}
          />

          <div className="col-lg-8">
            <div className="confirmation__form-submission">
              <div className="input-wrapper_width">
                <div className="mb-3">
                  <label className="label-confirmation">Signature (First name Last name)</label>
                  <input type="text"
                         className="input-confirmation form-control"
                         onChange={this.checkRegistrationName} />
                  {(!this.state.signed && this.state.submitted) &&
                  <p className="text-error">Please make sure that you provided the correct First name and Last
                    name</p>}
                </div>
                <EmpalaCheckbox
                  id="agreements_info_checkbox"
                  label="Click to confirm you have read and agree to our terms and conditions."
                  handleCheck={this.props.toggleCheckboxById}
                  checked={this.props.checkboxes.agreements_info_checkbox}
                />
              </div>
              <div className="group-buttons">
                <button className="btn-cancel" onClick={this.props.changeTabPage}>Cancel</button>
                <button
                  id="submit"
                  className={(this.props.checkboxes.agreements_info_checkbox && this.state.signed) ? 'btn-submit btn-active' : 'btn-submit'}
                  ref={ref => this.submitBtn = ref}
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >Submit
                </button>
              </div>
            </div>
            <p
              className="confirmation__subtext"
              dangerouslySetInnerHTML={{ __html: registrationSubmissionSubmit }}
            />
          </div>
        </div>
        <RegistrationResultModal
          open={this.props.showErrorModal || this.props.showSuccessModal}
          handleClose={this.props.closeModal}
          message={this.props.errorMessage}
          success={this.props.showSuccessModal}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementPage);