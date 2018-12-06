import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { changeTabPage, sendRegistrationForm, closeErrorModal } from '../../actions/registration';
import RegistrationResultModal from './RegistrationResultModal';

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
      disabled: true,
      signed: false,
      submitted: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  removeButtonLock = () => {
    this.setState({
      disabled: false,
    });
  };

  componentDidMount() {
    this.containerInfo.addEventListener('scroll', this.handleScroll);
    if(this.containerInfo.scrollHeight === this.containerInfo.offsetHeight) {
      this.removeButtonLock();
    }
  }

  componentWillUnmount() {
    this.containerInfo.removeEventListener('scroll', this.handleScroll);
  }

  focusSubmit() {
    this.submitBtn.focus();
  }

  checkRegistrationName = (e) => {
    const firstName = this.props.firstName.split(' ').join(' ');
    const lastName = this.props.lastName.split(' ').join(' ');
    const fullName = firstName + ' ' + lastName;
    let prints = e.target.value.split(' ').join(' ');

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

  handleScroll(event) {
    const scroll = event.target.scrollTop;
    const height = event.target.scrollHeight - event.target.clientHeight;
    if (height === scroll) {
      this.removeButtonLock();
    }
  }

  handleSubmit() {
    this.setState({
      submitted: true,
    });
    if (this.state.signed && !this.state.disabled) {
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
        <div className="confirmation row">
          <div className="confirmation__text col-lg-4"
               dangerouslySetInnerHTML={{ __html: registrationSubmissionPerjury }}
          />

          <div className="col-lg-8">
            <div className="confirmation__form-submission">
              <div className="form-group input-wrapper_width">
                <div>
                  <label className="label-confirmation">Signature (First name Last name)</label>
                  <input type="text"
                         className="input-confirmation form-control"
                         onChange={this.checkRegistrationName} />
                  {(!this.state.signed && this.state.submitted) &&
                  <p className="text-error">Please make sure that you provided the correct First name and Last
                    name</p>}
                </div>
              </div>
              <div className="group-buttons">
                <button className="btn-cancel" onClick={this.props.changeTabPage}>Cancel</button>
                <button
                  id="submit"
                  className={(!this.state.disabled && this.state.signed) ? 'btn-submit btn-active' : 'btn-submit'}
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