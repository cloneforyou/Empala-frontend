const ReviewPage = () => (
  <div className='review-container'>
    <p className='review-title'>Before We Can Proceed You Are Required to Review and Consent to All of the Following Documents and Information</p>
    <div className='agreements-container'>

      <p className='agreements-title'>THE LEGAL AGREEMENTS I AM AGREEING TO</p>

      <ul className='agreements-list'>
        <li>- Empala Customer Agreement</li>
        <li>- Empala Privacy Statement</li>
        <li>- Empala Securities Terms and Conditions</li>
        <li>- APEX Customer Agreements</li>
        <li>- Empala Securities Use and Risk Disclosures</li>
        <li>- Empala Securities Rule 606 and 607 Disclosures (Payment for Order Flow)</li>
        <li>- Empala Business Continuity Plan</li>
        <li>- FINRA Public Disclosure Program (BrokerCheck)</li>
      </ul>

      <p>By clicking the “Submit Application” button, I agree to this Empala Application Agreement (this “Application Agreement”). I also agree to the terms of the Empala Customer Agreement, Empala Privacy
        Statement, Empala Securities Terms and Conditions, APEX Customer Agreement, Empala Securities Use and Risk Disclosures, Empala Securities Rule 606 and 607 Disclosures (Payment for Order Flow),
        Empala Business Continuity Plan, and FINRA Public Disclosure Program (BrokerCheck), which are incorporated by reference and constitute part of this Application Agreement. In addition, I may, in the
        future, receive from Empala supplemental disclosures, terms, and agreements that pertain to certain account types, features, or services. References to this Application Agreement include such
        supplemental disclosures, terms, and agreements. Capitalized, undefined terms in this Application Agreement have the meaning given in the Empala Customer Agreement. I agree to read this Application
        Agreement and all incorporated disclosures, terms, and agreements carefully.  I understand that any of these agreement may be amended from time to time by Empala, with revised terms and conditions
        posted on the Empala website.  I agree to check for updates to these agreements.  I understand that by continuing to maintain my Empala account without objecting to any revised terms of these
        agreements, I am accepting the terms of the revised agreements and I will be legally bound by their terms and conditions.  If I request other services provided by Empala that require me to agree to
        specific terms and conditions electronically (through clicks or other actions) or otherwise, such terms and conditions will be deemed an amendment and will be incorporated into and made part of
        these agreements.</p>

    </div>
    <div className='row'>

      <div className='col-5'>
        <p className='review-text'>Under penalty of perjury I attest that I am of legal age
          and also that all the information I have provided is true
          and also that I have carefully reviewed, understand and
          agree to the termsand provisions of the
          Empala Customer Agreement.</p>
      </div>

      <div className='col-7 review-form'>
        <div className='review-form__submit-field'>
          <input type="text" className='review-input' />

          <button className='btn--cancel'>Cancel</button>
          <button className='btn--submit'>Submit</button>
        </div>

        <p className='review-form__subtext'>By clicking the “Submit” button above I agree to this Application Agreement and all additonal agreements and disclaimers which have been incorporated
          by reference and constitute part of this Application Agreement, agree to receive all future account information electronically, explicitly agree in advance
          to arbitrate any controversies which may arise between or among me and Empala in accordance with the Predispute Arbitration Clause contained in the
          Empala Customer Agreement, and agree to notify Empala promptly regarding any change in the information provided on this application.</p>
      </div>
    </div>
  </div>
);

export default ReviewPage;