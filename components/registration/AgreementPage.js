import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { changeTabPage, sendRegistrationForm, closeErrorModal } from '../../actions/registration';
import RegistrationResultModal from './RegistrationResultModal';

function mapStateToProps(state) {
  return {
    firstName: state.registration.registrationData.member_basic_information_first_name || '',
    lastName: state.registration.registrationData.member_basic_information_last_name || '',
    errorMessage: state.registration.errorMessage || '',
    showErrorModal: state.registration.showErrorModal,
    showSuccessModal: state.registration.showSuccessModal,
    loading: state.registration.loading
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

  componentDidMount() {
    this.containerInfo.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.containerInfo.removeEventListener('scroll', this.handleScroll);
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
        })
      }
    }
  };

  handleScroll(event) {
    const scroll = event.target.scrollTop;
    const height = event.target.scrollHeight - event.target.clientHeight;
    if (height === scroll) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleSubmit() {
    this.setState({
      submitted: true,
    });

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
        <p className="agreements__title">Before we can proceed you are required to review and consent to all of the
          following documents and information
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
          </ul>

          <p>
            By clicking the “Submit Application” button, I agree to this Empala Application Agreement (this
            “Application Agreement”). I also agree to the terms of the Empala Customer Agreement, Empala Privacy
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
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
              <div className="form-group form-centering">
                <div>
                  <label className="label-confirmation">Signature</label>
                  <input type="text"
                         className={`input-confirmation form-control border-default ${(!this.state.signed && this.state.submitted) && 'border-error'}`}
                         onChange={this.checkRegistrationName} />
                  {(!this.state.signed && this.state.submitted) &&
                  <p className="text--error">Please make sure that you provided the correct First name and Last
                    name</p>}
                </div>
              </div>
              <div className="group-buttons">
                <button className="btn--cancel" onClick={this.props.changeTabPage}>Cancel</button>
                <button
                  id="submit"
                  className={`btn--submit ${(!this.state.disabled && this.state.signed) && 'btn--active'}`}
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