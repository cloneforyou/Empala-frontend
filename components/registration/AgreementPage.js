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
    this.submitBtn.disabled = true;
    if (this.state.signed && !this.state.disabled) this.props.submitRegistration();
  }

  render() {
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

        <div className="agreements-info" ref={node => this.containerInfo = node}>
          <p className="agreements-info__title">THE LEGAL AGREEMENTS I AM AGREEING TO</p>

          <ul className="list-info">
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Customer Agreement</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Privacy Statement</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Securities Terms and Conditions</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>APEX Customer Agreements</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Securities Use and Risk Disclosures</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Securities Rule 606 and 607 Disclosures (Payment for Order Flow)</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>Empala Business Continuity Plan</ins>
              </a>
            </li>
            <li className="list-info__item">
              <a href="#" className="link-decoration">
                <ins>FINRA Public Disclosure Program (BrokerCheck)</ins>
              </a>
            </li>
            { this.props.addMarginSelected && <MarginWording />}
          </ul>
          <p>
            By clicking the “Submit Application” button, I agree to this Empala Application Agreement (this “Application
            Agreement”). I also agree to the terms of the Empala Customer Agreement, Empala Privacy
            Statement, Empala Securities Terms and Conditions, APEX Customer Agreement, Empala Securities Use and Risk
            Disclosures, Empala Securities Rule 606 and 607 Disclosures (Payment for Order Flow),
            Empala Business Continuity Plan, and FINRA Public Disclosure Program (BrokerCheck), which are incorporated
            by reference and constitute part of this Application Agreement. In addition, I may, in the
            future, receive from Empala supplemental disclosures, terms, and agreements that pertain to certain account
            types, features, or services. References to this Application Agreement include such
            supplemental disclosures, terms, and agreements. Capitalized, undefined terms in this Application Agreement
            have the meaning given in the Empala Customer Agreement. I agree to read this Application
            Agreement and all incorporated disclosures, terms, and agreements carefully. I understand that any of these
            agreement may be amended from time to time by Empala, with revised terms and conditions
            posted on the Empala website. I agree to check for updates to these agreements. I understand that by
            continuing to maintain my Empala account without objecting to any revised terms of these
            agreements, I am accepting the terms of the revised agreements and I will be legally bound by their terms
            and conditions. If I request other services provided by Empala that require me to agree to
            specific terms and conditions electronically (through clicks or other actions) or otherwise, such terms and
            conditions will be deemed an amendment and will be incorporated into and made part of
            these agreements.
          </p>
        </div>
        <div className="confirmation row">
          <div className="confirmation__text col-lg-4">
            <span>Under penalty of perjury I attest that I am of legal age
            and also that all the information I have provided is true
            and also that I have carefully reviewed, understand and
            agree to the terms and provisions of the </span>
            <a href="#" className="confirmation__text_link">Empala Customer Agreement.</a>
          </div>

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
                  className={`btn-submit ${(!this.state.disabled && this.state.signed) && 'btn-active'}`}
                  ref={ref => this.submitBtn = ref}
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >Submit
                </button>
              </div>
            </div>

            <p className="confirmation__subtext">By clicking the “Submit” button above I agree to this Application
              Agreement and all additonal agreements and disclaimers which have been incorporated
              by reference and constitute part of this Application Agreement, agree to receive all future account
              information electronically, explicitly agree in advance
              to arbitrate any controversies which may arise between or among me and Empala in accordance with the
              Predispute Arbitration Clause contained in the
              Empala Customer Agreement, and agree to notify Empala promptly regarding any change in the information
              provided on this application.
            </p>
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