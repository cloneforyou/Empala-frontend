import React from 'react';
import {withReduxSaga} from "../../store";
import {changeTabPage} from "../../actions/registration";
import {connect} from "react-redux";
import NavButtons from './NavButtons';
import '../../assets/styles/modules/_final-review-page.scss';
import FieldComponent from './FieldComponent';

function mapStateToProps(state) {
  return {
    registrationData: state.registration.registrationData || ''
  }
}

function mapDispatchToProps(dispatch) {
  return ({

  })
}

class FinalReviewPage extends React.PureComponent {

  constructor(props){
    super(props);
  }

  render() {
    const data = this.props.registrationData;
    const empty = 'Missing data';
    return (
      <div className='final-review__outer-wrap'>
        <div className='final-review__inner-wrap'>
          <div className='final-review__title'>
            Final Review before submission
          </div>

          <div className='final-review__content'>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Member
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={40}
                  label={'Prefix'}
                  value={data.member_basic_information_prefix || empty}
                />
                <FieldComponent
                  width={145}
                  label={'First name'}
                  value={data.member_basic_information_first_name || empty}
                />
                <FieldComponent
                  width={145}
                  label={'Last name'}
                  value={data.member_basic_information_last_name || empty}
                />
                <FieldComponent
                  width={40}
                  label={'Suffix'}
                  value={data.member_basic_information_suffix || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Email address'}
                  value={data.member_account_email || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Contact number'}
                  value={data.member_account_contact_phone || empty}
                />
                <FieldComponent
                  width={95}
                  label={'Account no.'}
                  value={data.member_account_account_no || empty}
                />
                <FieldComponent
                  width={95}
                  label={'Account type'}
                  value={data.member_account_account_type || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Country'}
                  value={data.member_basic_information_residence || empty}
                />
              </div>
            </div>


            <div className='flex fd-row justify-content-between frc-block'>
              <div className='frc-mini'>
                <div className='frc-block__title'>
                  Passport
                </div>
                <div className='flex fd-row frc-block__fields'>
                  <FieldComponent
                    width={215}
                    label={'Country of issue'}
                    value={data.member_passport_countryOfIssue || empty}
                  />
                  <FieldComponent
                    width={215}
                    label={'Passport no.'}
                    value={data.member_passport_number || empty}
                  />
                  <FieldComponent
                    width={97}
                    label={'Date of issue'}
                    value={data.member_passport_issue_date || empty}
                  />
                  <FieldComponent
                    width={97}
                    label={'Date of expiry'}
                    value={data.member_passport_expiry_date || empty}
                  />
                </div>
              </div>
              <div className='frc-mini'>
                <div className='frc-block__title'>
                  Drivers License
                </div>
                <div className='flex fd-row frc-block__fields'>
                  <FieldComponent
                    width={215}
                    label={'Country of issue'}
                    value={data.member_drivers_license_state || empty}
                  />
                  <FieldComponent
                    width={215}
                    label={'License no.'}
                    value={data.member_drivers_license_number || empty}
                  />
                  <FieldComponent
                    width={97}
                    label={'Date of issue'}
                    value={data.member_drivers_license_issue_date || empty}
                  />
                  <FieldComponent
                    width={97}
                    label={'Date of expiry'}
                    value={data.member_drivers_license_expiry_date || empty}
                  />
                </div>
              </div>
            </div>


            <div className='frc-block'>
              <div className='frc-block__title'>
                Residental Address
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={450}
                  label={'Residental address line 1'}
                  value={data.identity_residential_address_residential_address_line_1 || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Residental address line 2'}
                  value={data.identity_residential_address_residential_address_line_2 || empty}
                />
                <FieldComponent
                  width={450}
                  label={'City'}
                  value={data.identity_residential_address_city || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Zip code'}
                  value={data.identity_residential_address_zip_code || empty}
                />
                <FieldComponent
                  width={450}
                  label={'State'}
                  value={data.identity_residential_address_state || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Country'}
                  value={data.identity_residential_address_country || empty}
                />
              </div>
            </div>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Mailing Address
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={450}
                  label={'Residental address line 1'}
                  value={data.identity_mailing_address_residential_address_line_1 || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Residental address line 2'}
                  value={data.identity_mailing_address_residential_address_line_2 || empty}
                />
                <FieldComponent
                  width={450}
                  label={'City'}
                  value={data.identity_mailing_address_city || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Zip code'}
                  value={data.identity_mailing_address_zip_code || empty}
                />
                <FieldComponent
                  width={450}
                  label={'State'}
                  value={data.identity_mailing_address_state || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Country'}
                  value={data.identity_mailing_address_country || empty}
                />
              </div>
            </div>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Trusted Contact Person
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={215}
                  label={'First name'}
                  value={data.identity_trusted_contact_person_first_name || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Last name'}
                  value={data.identity_trusted_contact_person_last_name || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Contact no.'}
                  value={data.identity_trusted_contact_person_phone || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Email address'}
                  value={data.identity_trusted_contact_person_email || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Relationship'}
                  value={data.identity_trusted_contact_person_relationship || empty}
                />
              </div>
            </div>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Identification
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={215}
                  label={'Date of birth'}
                  value={data.identity_trusted_contact_person_first_name || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Martial status'}
                  value={data.regulatory_family_martial_status || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Government tax id (SSN / SIN)'}
                  value={data.regulatory_identification_ssn || empty}
                />
                <FieldComponent
                  width={215}
                  label={'No. of dependents'}
                  value={data.regulatory_family_dependents || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Country of citizenship'}
                  value={data.regulatory_identification_citizenship || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Investment experience'}
                  value={data.regulatory_family_investment_experience || empty}
                />
              </div>
            </div>

          </div>

          <div className='final-review__content'>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Employment
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={450}
                  label={'Employment type'}
                  value={data.profile_employment_employment_type || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Employer name'}
                  value={data.profile_employment_employer_name || empty}
                />
                <FieldComponent
                  width={450}
                  label={'City'}
                  value={data.profile_employment_city || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Zip code'}
                  value={data.profile_employment_zip_code || empty}
                />
                <FieldComponent
                  width={215}
                  label={'State'}
                  value={data.profile_employment_state || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Country'}
                  value={data.profile_employment_employment_country || empty}
                />
              </div>
            </div>


            <div className='frc-block'>
              <div className='frc-block__no-title'/>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={450}
                  label={'Annual income'}
                  value={data.profile_financials_annual_income && '$' + data.profile_financials_annual_income || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Total net worth'}
                  value={data.profile_financials_total_net_worth && '$' + data.profile_financials_total_net_worth || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Liquid net worth'}
                  value={data.profile_financials_liquid_net_worth && '$' + data.profile_financials_liquid_net_worth || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Tax rate profile'}
                  value={data.profile_financials_tax_rate_profile || empty}
                />
                <FieldComponent
                  width={450}
                  label={'Investment objectives'}
                  value={data.profile_financials_investment_objectives || empty}
                />
              </div>
            </div>

          </div>


          <div className='final-review__content'>

            <div className='frc-block'>
              <div className='frc-block__title'>
                Investment experience
              </div>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={215}
                  label={'Equities'}
                  value={data.investment_experience_equities || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Currencies'}
                  value={data.investment_experience_margin_currencies || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Options'}
                  value={data.investment_experience_options || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Futures'}
                  value={data.investment_experience_futures || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Bonds'}
                  value={data.investment_experience_bonds || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Foreign markets'}
                  value={data.investment_experience_foreign_markets || empty}
                />
              </div>
            </div>


            <div className='frc-block'>
              <div className='frc-block__no-title'/>
              <div className='flex fd-row frc-block__fields'>
                <FieldComponent
                  width={215}
                  label={'Cryptocurrencies'}
                  value={data.investment_experience_cryptocurrencies || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Private Equity'}
                  value={data.investment_experience_private_equity || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Margin accounts'}
                  value={data.investment_experience_margin_accounts || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Borrowing money'}
                  value={data.investment_experience_borrowing_money || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Lending money'}
                  value={data.investment_experience_lending_money || empty}
                />
                <FieldComponent
                  width={215}
                  label={'Exotics'}
                  value={data.investment_experience_exotics || empty}
                />
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
