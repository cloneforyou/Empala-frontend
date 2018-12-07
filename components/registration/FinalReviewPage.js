/* eslint-disable max-len */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setTabName, setTabPageIndex, goBackToPart } from '../../actions/registration';
import NavButtons from './NavButtons';
import FieldComponent from './FieldComponent';

class FinalReviewPage extends PureComponent {
  convertDate(date) {
    const createDate = new Date(date);
    const month = createDate.getMonth() ? createDate.getMonth() + 1 : 1;
    const year = createDate.getFullYear() ? createDate.getFullYear() : 1970;
    const day = createDate.getDate() ? createDate.getDate() : 1;
    return `${month}/${day}/${year}`;
  }

  goBack(tabName, tabIndex) {
    this.props.setTabName(tabName);
    this.props.setTabPageIndex(tabIndex);
    this.props.goBackToPart(true);
  }

  render() {
    const data = this.props.registrationData;
    const empty = ' ';
    const noExperience = 'No experience';
    const fullName = `${data.member_basic_information_prefix || ''} ${data.member_basic_information_first_name || ''} ${data.member_basic_information_last_name || ''} ${data.member_basic_information_suffix || ''}`;
    return (
      <div className="final-review__outer-wrap">
        <div className="final-review__inner-wrap">
          <div className="final-review__title">
            Final Review
          </div>
          <div className="final-review__text">
            <span>Final review before submission. Click the&nbsp;</span>
            <i
              className="final-review__icon_arrow-back"
            />
            <span className="final-review__text_info">headers</span>
            <span>&nbsp;if you need to go back and amend any details.</span>
          </div>
          <div className="fields-group">
            <div className="fields-group__row row">
              <div className="col-md-6 padding-right50">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('member', 1)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Member
                </div>
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Name"
                    value={fullName || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Email address"
                    value={data.member_account_email || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Contact number"
                    value={data.member_account_contact_phone || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Member no."
                    value={`${data.member_account_account_no}` || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Customer type"
                    value={data.member_account_customer_type || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Country of citizenship"
                    value={data.member_basic_information_residence || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Account type"
                    value={data.member_account_account_type || empty}
                  />
                </div>
              </div>
              <div className="col-md-3 padding-x20">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('member', 3)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Passport
                </div>
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Country of issue"
                    value={data.member_passport_countryOfIssue || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Passport no."
                    value={data.member_passport_number || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Date of issue"
                    value={data.member_passport_issue_date
                    && (this.convertDate(data.member_passport_issue_date) || empty)}
                  />
                  <FieldComponent
                    col={12}
                    label="Date of expiry"
                    value={data.member_passport_expiry_date
                    && (this.convertDate(data.member_passport_expiry_date) || empty)}
                  />
                </div>
              </div>
              <div className="col-md-3 padding-x20">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('member', 3)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Drivers License
                </div>
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Country of issue"
                    value={data.member_drivers_license_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="License no."
                    value={data.member_drivers_license_number || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Date of issue"
                    value={data.member_drivers_license_issue_date
                    && (this.convertDate(data.member_drivers_license_issue_date) || empty)}
                  />
                  <FieldComponent
                    col={12}
                    label="Date of expiry"
                    value={data.member_drivers_license_expiry_date
                    && (this.convertDate(data.member_drivers_license_expiry_date) || empty)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fields-group">
            <div className="fields-group__row row">
              <div className="col-md-6 padding-right50">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('identity', 1)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Residential Address
                </div>
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Residental address line 1"
                    value={data.identity_residential_address_residential_address_line_1 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Residental address line 2"
                    value={data.identity_residential_address_residential_address_line_2 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="City"
                    value={data.identity_residential_address_residential_address_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Zip code"
                    value={data.identity_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="State"
                    value={data.identity_residential_address_residential_address_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Country"
                    value={data.identity_residential_address_residential_address_country || empty}
                  />
                </div>
              </div>
              <div className="col-md-6 padding-x20">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('identity', 2)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Mailing Address
                </div>
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Residental address line 1"
                    value={data.identity_mailing_address_residential_address_line_1 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Residental address line 2"
                    value={data.identity_mailing_address_residential_address_line_2 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="City"
                    value={data.identity_mailing_address_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Zip code"
                    value={data.identity_mailing_address_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="State"
                    value={data.identity_mailing_address_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Country"
                    value={data.identity_mailing_address_country || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fields-group">
            <div className="fields-group__row row">
              <div className="col-md-6 padding-right50">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('member', 4)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Trusted Contact Person
                </div>
                <div className="row">
                  <FieldComponent
                    col={6}
                    label="First name"
                    value={data.member_trusted_contact_person_first_name || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Last name"
                    value={data.member_trusted_contact_person_last_name || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Contact telephone no."
                    value={data.member_trusted_contact_person_phone || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Relationship"
                    value={data.member_trusted_contact_person_relationship || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Email address"
                    value={data.member_trusted_contact_person_email || empty}
                  />
                </div>
              </div>
              <div className="col-md-6 padding-x20">
                <div
                  className="fields-group__title pointer"
                  onClick={() => this.goBack('regulatory', 3)}
                >
                  <i
                    className="final-review__icon_arrow-back"
                  />
                  Identification
                </div>
                <div className="row">
                  <FieldComponent
                    col={6}
                    label="Date of birth"
                    value={data.regulatory_identification_dateOfBirth
                    && (this.convertDate(data.regulatory_identification_dateOfBirth) || empty)}
                  />
                  <FieldComponent
                    col={6}
                    label="Marital status"
                    value={data.regulatory_family_martial_status || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Government tax id (SSN / SIN)"
                    value={data.regulatory_identification_ssn || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="No. of dependents"
                    value={data.regulatory_family_dependents || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Country of citizenship"
                    value={data.regulatory_identification_citizenship || empty}
                  />
                  {
                    data.regulatory_identification_citizenship !== 'United States' &&
                    <FieldComponent
                      col={12}
                      label="Residency Status"
                      value={data.regulatory_identification_residency_status || empty}
                    />
                  }
                  {
                    data.regulatory_identification_residency_status && data.regulatory_identification_residency_status !== 'Permanent Resident' &&
                    <Fragment>
                      <FieldComponent
                        col={6}
                        label="Visa type"
                        value={data.regulatory_identification_visa_type || empty}
                      />
                      <FieldComponent
                        col={6}
                        label="Visa expiry date"
                        value={this.convertDate(data.regulatory_identification_visa_expiry_date) || empty}
                      />
                    </Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="fields-group">
            <div
              className="fields-group__title pointer"
              onClick={() => this.goBack('profile', 1)}
            >
              <i
                className="final-review__icon_arrow-back"
              />
              Employment
            </div>
            <div className="fields-group__row row">
              <div className="col-md-6 padding-right50">
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Employment type"
                    value={data.profile_employment_employment_type || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Employer name"
                    value={data.profile_employment_employer_name || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="City"
                    value={data.profile_employment_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="Zip code"
                    value={data.profile_employment_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label="State"
                    value={data.profile_employment_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Country"
                    value={data.profile_employment_employment_country || empty}
                  />
                </div>
              </div>
              <div className="col-md-6 padding-x20">
                <div className="row">
                  <FieldComponent
                    col={12}
                    label="Annual income"
                    value={data.profile_financials_annual_income && (data.profile_financials_annual_income || empty)}
                  />
                  <FieldComponent
                    col={12}
                    label="Total net worth"
                    value={data.profile_financials_total_net_worth && (data.profile_financials_total_net_worth || empty)}
                  />
                  <FieldComponent
                    col={12}
                    label="Liquid net worth"
                    value={data.profile_financials_liquid_net_worth && (data.profile_financials_liquid_net_worth || empty)}
                  />
                  <FieldComponent
                    col={12}
                    label="Tax rate profile"
                    value={data.profile_financials_tax_rate_profile || empty}
                  />
                  <FieldComponent
                    col={12}
                    label="Investment objectives"
                    value={data.profile_financials_investment_objectives || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fields-group">
            <div
              className="fields-group__title pointer"
              onClick={() => this.goBack('profile', 3)}
            >
              <i
                className="final-review__icon_arrow-back"
              />
              Investment experience
            </div>
            <div className="fields-group__row row">
              <div className="col-md-6 padding-right50">
                <div className="row">
                  <FieldComponent
                    col={6}
                    label="Equities"
                    value={
                      (data.profile_investment_experience_equities !== 'None' && `${data.profile_investment_experience_equities} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Currencies"
                    value={
                      (data.profile_investment_experience_margin_currencies !== 'None' && `${data.profile_investment_experience_margin_currencies} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Options"
                    value={
                      (data.profile_investment_experience_options !== 'None' && `${data.profile_investment_experience_options} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Futures"
                    value={
                      (data.profile_investment_experience_futures !== 'None' && `${data.profile_investment_experience_futures} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Bonds"
                    value={
                      (data.profile_investment_experience_bonds !== 'None' && `${data.profile_investment_experience_bonds} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Foreign markets"
                    value={
                      (data.profile_investment_experience_foreign_markets !== 'None' && `${data.profile_investment_experience_foreign_markets} years`)
                      || noExperience
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 padding-x20">
                <div className="row">
                  <FieldComponent
                    col={6}
                    label="Cryptocurrencies"
                    value={
                      (data.profile_investment_experience_cryptocurrencies !== 'None' && `${data.profile_investment_experience_cryptocurrencies} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Borrowing money"
                    value={
                      (data.profile_investment_experience_borrowing_money !== 'None' && `${data.profile_investment_experience_borrowing_money} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Private Equity"
                    value={
                      (data.profile_investment_experience_private_equity !== 'None' && `${data.profile_investment_experience_private_equity} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Lending money"
                    value={
                      (data.profile_investment_experience_lending_money !== 'None' && `${data.profile_investment_experience_lending_money} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Margin accounts"
                    value={
                      (data.profile_investment_experience_margin_accounts !== 'None' && `${data.profile_investment_experience_margin_accounts} years`)
                      || noExperience
                    }
                  />
                  <FieldComponent
                    col={6}
                    label="Exotics"
                    value={
                      (data.profile_investment_experience_exotics !== 'None' && `${data.profile_investment_experience_exotics} years`)
                      || noExperience
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="final-review__navigation">
          <NavButtons
            tabName="final_review"
            tabIndex={1}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    registrationData: state.registration.registrationData || '',
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setTabPageIndex: index => dispatch(setTabPageIndex(index)),
    setTabName: tabName => dispatch(setTabName(tabName)),
    goBackToPart: status => dispatch(goBackToPart(status)),
  });
}

FinalReviewPage.propTypes = {
  registrationData: PropTypes.object.isRequired,
  setTabName: PropTypes.func.isRequired,
  setTabPageIndex: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(FinalReviewPage);
