import React from 'react';
import {withReduxSaga} from "../../store";
import {changeTabPage} from "../../actions/registration";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    firstName: state.registration.registrationData.member_name || '',
    lastName: state.registration.registrationData.member_last_name || '',
  }
}

function mapDispatchToProps(dispatch) {
  return (
    {
      changeTabPage:() => dispatch(changeTabPage('agreement', 1, 'backward')),
    })
}

class AgreementPage extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      disabled: true
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.containerInfo.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    this.containerInfo.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    let scroll = event.target.scrollTop;
    let height = event.target.scrollHeight - event.target.clientHeight;
    if (height === scroll) {
      this.setState({
        disabled: false
      });
    }
  };

  render() {
    return (
      <div className='agreements'>
        <p className='agreements-title'>Before We Can Proceed You Are Required to Review and Consent to All of the
          Following Documents and Information</p>

        <div className='agreements-info' ref={ node => this.containerInfo = node }>
          <p className='title-info'>THE LEGAL AGREEMENTS I AM AGREEING TO</p>

          <ul className='list-info'>
            <li className='item-info'>-
              <ins>Empala Customer Agreement</ins>
            </li>
            <li className='item-info'>-
              <ins>Empala Privacy Statement</ins>
            </li>
            <li className='item-info'>-
              <ins>Empala Securities Terms and Conditions</ins>
            </li>
            <li className='item-info'>-
              <ins>APEX Customer Agreements</ins>
            </li>
            <li className='item-info'>-
              <ins>Empala Securities Use and Risk Disclosures</ins>
            </li>
            <li className='item-info'>-
              <ins>Empala Securities Rule 606 and 607 Disclosures (Payment for Order Flow)</ins>
            </li>
            <li className='item-info'>-
              <ins>Empala Business Continuity Plan</ins>
            </li>
            <li className='item-info'>-
              <ins>FINRA Public Disclosure Program (BrokerCheck)</ins>
            </li>
          </ul>

          <p>By clicking the “Submit Application” button, I agree to this Empala Application Agreement (this
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
            these agreements.</p>
        </div>

        <div className='confirmation'>
          <p className='text-confirmation width-35'>
            Under penalty of perjury I attest that I am of legal age<br/>
            and also that all the information I have provided is true<br/>
            and also that I have carefully reviewed, understand and<br/>
            agree to the termsand provisions of the<br/>
            Empala Customer Agreement.
          </p>

          <div className='width-65'>
            <div className='form-confirmation'>
              <label className='label-confirmation'>Signature</label>
              <div><input type="text" className='input-confirmation' value={`${this.props.firstName} ${this.props.lastName}`} readOnly /></div>
              <button className='btn--cancel' onClick={this.props.changeTabPage}>Cancel</button>
              <button id='submit' className={`btn--submit ${!this.state.disabled && 'btn--active'}`} disabled={this.state.disabled} >Submit</button>
            </div>

            <p className='subtext-confirmation'>By clicking the “Submit” button above I agree to this Application
              Agreement and all additonal agreements and disclaimers which have been incorporated
              by reference and constitute part of this Application Agreement, agree to receive all future account
              information electronically, explicitly agree in advance
              to arbitrate any controversies which may arise between or among me and Empala in accordance with the
              Predispute Arbitration Clause contained in the
              Empala Customer Agreement, and agree to notify Empala promptly regarding any change in the information
              provided on this application.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementPage);