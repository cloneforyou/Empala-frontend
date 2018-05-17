import React from 'react';
import { withReduxSaga } from "../../store";
import { changeTabPage } from "../../actions/registration";
import { connect } from "react-redux";
import NavButtons from './NavButtons';
import '../../assets/styles/modules/_final-review-page.scss';
import FieldComponent from './FieldComponent';

function mapStateToProps(state) {
  return {
    registrationData: state.registration.registrationData || ''
  }
}

function mapDispatchToProps(dispatch) {
  return ({})
}


class FinalReviewPage extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  convertDate(date) {
    const createDate = new Date(date);
    const month = createDate.getMonth() ? createDate.getMonth() + 1 : 1;
    const year = createDate.getFullYear() ? createDate.getFullYear() : 1970;
    const day = createDate.getDate() ? createDate.getDate() : 1;
    return `${month}/${day}/${year}`
  }

  render() {
    const data = this.props.registrationData;
    const empty = ' ';
    return (
      <div className='final-review__outer-wrap'>
        <div className='final-review__inner-wrap'>
          <div className='final-review__title'>
            Final Review before submission
          </div>

          <div className='fields-group'>
            <div className='fields-group__row row'>
              <div className='col-md-6'>
                <div className='fields-group__title'>
                  Member
                </div>
                <div className='row'>
                  <FieldComponent
                    col={2}
                    label={'Prefix'}
                    value={data.member_basic_information_prefix || empty}
                  />
                  <FieldComponent
                    col={4}
                    label={'First name'}
                    value={data.member_basic_information_first_name || empty}
                  />
                  <FieldComponent
                    col={4}
                    label={'Last name'}
                    value={data.member_basic_information_last_name || empty}
                  />
                  <FieldComponent
                    col={2}
                    label={'Suffix'}
                    value={data.member_basic_information_suffix || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Email address'}
                    value={data.member_account_email || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Contact number'}
                    value={data.member_account_contact_phone || empty}
                  />
                  <FieldComponent
                    col={3}
                    label={'Account no.'}
                    value={data.member_account_account_no || empty}
                  />
                  <FieldComponent
                    col={3}
                    label={'Account type'}
                    value={data.member_account_account_type || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Country'}
                    value={data.member_basic_information_residence || empty}
                  />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='fields-group__title'>
                  Passport
                </div>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Country of issue'}
                    value={data.member_passport_countryOfIssue || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Passport no.'}
                    value={data.member_passport_number || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Date of issue'}
                    value={data.member_passport_issue_date
                    && this.convertDate(data.member_passport_issue_date) || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Date of expiry'}
                    value={data.member_passport_expiry_date
                    && this.convertDate(data.member_passport_expiry_date) || empty}
                  />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='fields-group__title'>
                  Drivers License
                </div>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Country of issue'}
                    value={data.member_drivers_license_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'License no.'}
                    value={data.member_drivers_license_number || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Date of issue'}
                    value={data.member_drivers_license_issue_date
                    && this.convertDate(data.member_drivers_license_issue_date) || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Date of expiry'}
                    value={data.member_drivers_license_expiry_date
                    && this.convertDate(data.member_drivers_license_expiry_date) || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='fields-group'>
            <div className='fields-group__row row'>
              <div className='col-md-6'>
                <div className='fields-group__title'>
                  Residential Address
                </div>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Residental address line 1'}
                    value={data.identity_residential_address_residential_address_line_1 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Residental address line 2'}
                    value={data.identity_residential_address_residential_address_line_2 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'City'}
                    value={data.identity_residential_address_residential_address_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Zip code'}
                    value={data.identity_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'State'}
                    value={data.identity_residential_address_residential_address_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Country'}
                    value={data.identity_residential_address_residential_address_country || empty}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='fields-group__title'>
                  Mailing Address
                </div>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Residental address line 1'}
                    value={data.identity_mailing_address_residential_address_line_1 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Residental address line 2'}
                    value={data.identity_mailing_address_residential_address_line_2 || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'City'}
                    value={data.identity_mailing_address_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Zip code'}
                    value={data.identity_mailing_address_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'State'}
                    value={data.identity_mailing_address_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Country'}
                    value={data.identity_mailing_address_country || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='fields-group'>
            <div className='fields-group__row row'>
              <div className='col-md-6'>
                <div className='fields-group__title'>
                  Trusted Contact Person
                </div>
                <div className='row'>
                  <FieldComponent
                    col={6}
                    label={'First name'}
                    value={data.identity_trusted_contact_person_first_name || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Last name'}
                    value={data.identity_trusted_contact_person_last_name || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Contact no.'}
                    value={data.identity_trusted_contact_person_phone || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Email address'}
                    value={data.identity_trusted_contact_person_email || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Relationship'}
                    value={data.identity_trusted_contact_person_relationship || empty}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='fields-group__title'>
                  Identification
                </div>
                <div className='row'>
                  <FieldComponent
                    col={6}
                    label={'Date of birth'}
                    value={data.identity_trusted_contact_person_first_name
                    && this.convertDate(data.identity_trusted_contact_person_first_name) || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Martial status'}
                    value={data.regulatory_family_martial_status || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Government tax id (SSN / SIN)'}
                    value={data.regulatory_identification_ssn || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'No. of dependents'}
                    value={data.regulatory_family_dependents || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Country of citizenship'}
                    value={data.regulatory_identification_citizenship || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Investment experience'}
                    value={data.regulatory_family_investment_experience || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='fields-group'>
            <div className='fields-group__title'>
              Employment
            </div>
            <div className='fields-group__row row'>
              <div className='col-md-6'>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Employment type'}
                    value={data.profile_employment_employment_type || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Employer name'}
                    value={data.profile_employment_employer_name || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'City'}
                    value={data.profile_employment_city || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Zip code'}
                    value={data.profile_employment_zip_code || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'State'}
                    value={data.profile_employment_state || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Country'}
                    value={data.profile_employment_employment_country || empty}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <FieldComponent
                    col={12}
                    label={'Annual income'}
                    value={data.profile_financials_annual_income && '$' + data.profile_financials_annual_income || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Total net worth'}
                    value={data.profile_financials_total_net_worth && '$' + data.profile_financials_total_net_worth || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Liquid net worth'}
                    value={data.profile_financials_liquid_net_worth && '$' + data.profile_financials_liquid_net_worth || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Tax rate profile'}
                    value={data.profile_financials_tax_rate_profile || empty}
                  />
                  <FieldComponent
                    col={12}
                    label={'Investment objectives'}
                    value={data.profile_financials_investment_objectives || empty}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='fields-group'>
            <div className='fields-group__title'>
              Investment experience
            </div>
            <div className='fields-group__row row'>
              <div className='col-md-6'>
                <div className='row'>
                  <FieldComponent
                    col={6}
                    label={'Equities'}
                    value={data.investment_experience_equities || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Currencies'}
                    value={data.investment_experience_margin_currencies || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Options'}
                    value={data.investment_experience_options || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Futures'}
                    value={data.investment_experience_futures || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Bonds'}
                    value={data.investment_experience_bonds || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Foreign markets'}
                    value={data.investment_experience_foreign_markets || empty}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <FieldComponent
                    col={6}
                    label={'Cryptocurrencies'}
                    value={data.investment_experience_cryptocurrencies || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Private Equity'}
                    value={data.investment_experience_private_equity || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Margin accounts'}
                    value={data.investment_experience_margin_accounts || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Borrowing money'}
                    value={data.investment_experience_borrowing_money || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Lending money'}
                    value={data.investment_experience_lending_money || empty}
                  />
                  <FieldComponent
                    col={6}
                    label={'Exotics'}
                    value={data.investment_experience_exotics || empty}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='final-review__navigation'>
          <NavButtons
            tabName='final_review'
            tabIndex={1}
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalReviewPage);
