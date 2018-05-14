import React from 'react';
import NavButtons from './NavButtons';
import {getMenuItems, getRegistrationDataFromCache, setTabName, setTabPageIndex} from "../../actions/registration";
import {getMenuItemsByTabName, getPageFieldNames, getTabContentByTabName} from "../../utils/registrationUtils";
import { connect } from "react-redux";
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';
import InformationPage from "./InformationPage";
import FinalReviewPage from "./FinalReviewPage";
import AgreementPage from "./AgreementPage";
import { dataFields as memberPageData } from '../../localdata/memberPageData';



function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
    tabIndex: state.registration.tabIndex || 1,
    menuItems: state.registration.menuItems,
    registrationData: state.registration.registrationData,
    trustedContactActive: state.registration.identity_trusted_contact_person_trusted_contact_checkbox,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
      getMenuItems: (tabName) => {dispatch(getMenuItems(getMenuItemsByTabName(tabName)))},
      setTabName: (tabName) => dispatch(setTabName(tabName)),
      setTabPageIndex:(tabIndex) => dispatch(setTabPageIndex(tabIndex)),
      getRegistrationDataFromCache: () => dispatch(getRegistrationDataFromCache())
    })
}


class Content extends React.PureComponent {

  componentWillReceiveProps(nextProps) {
    // console.log(this.props);
    // console.log(nextProps);
    if (this.props.tabName !== nextProps.tabName) {
      this.props.getMenuItems(nextProps.tabName)
    }
  }

  componentDidMount() {
    console.log(' *** state', this.props.registrationData);
    if (localStorage.getItem('registrationData')) {
      this.props.getRegistrationDataFromCache();

    }
  }

  render() {
    if (this.props.tabName === 'info') {
      this.props.setTabName('info');
      this.props.setTabPageIndex(1);
      return (
        <div className='onboard'>
          <div className='onboard__container'>
            <div className='row no-gutters onboard__col'>
              <InformationPage />
            </div>
          </div>
        </div>
      )
    } else if (this.props.tabName === 'final_review') {
      this.props.setTabName('final_review');
      this.props.setTabPageIndex(1);
      return (
        <div className='onboard'>
          <div className='onboard__container'>
            <div className='row no-gutters onboard__col'>
              <FinalReviewPage />
            </div>
          </div>
        </div> )
    } else if (this.props.tabName === 'agreement') {
      this.props.setTabName('agreement');
      this.props.setTabPageIndex(1);
      return (
        <div className='onboard'>
          <div className='onboard__container'>
            <div className='row no-gutters onboard__col'>
              <AgreementPage />
            </div>
          </div>
        </div> )
    }

    const pageContent = getTabContentByTabName(this.props.tabName, this.props.tabIndex-1);

    if (!this.props.menuItems || this.props.menuItems.length === 0) {
      this.props.getMenuItems(this.props.tabName);
    }

    let fieldNames = getPageFieldNames(this.props.tabName, this.props.tabIndex);
    if (this.props.tabName === 'member' && this.props.tabIndex === 3) {
      fieldNames = fieldNames.filter((fieldName) => {
        return fieldName.includes(this.props.registrationData.memberDocument)})
    } else if (this.props.tabName === 'identity' && this.props.tabIndex === 1 ) {
      fieldNames = fieldNames.filter(fieldName => fieldName !== 'identity_residential_address_same_mailing_address_checkbox');
    } else if (this.props.tabName === 'identity' && this.props.tabIndex === 3) {
      if (!this.props.trustedContactActive) {
        fieldNames = [];
      } else {
        fieldNames = fieldNames.filter(fieldName => fieldName !== 'identity_trusted_contact_person_trusted_contact_checkbox');
      }
    } else if(this.props.tabName === 'profile' && this.props.tabIndex === 1 &&
        this.props.registrationData['profile_employment_employment_type'] !== 'Employed') {
      fieldNames = ['profile_employment_employment_type'];
    }

    // console.log(' *** >>>>>>>>>>', fieldNames, this.props.registrationData.memberDocument);

    return(
      <div className='onboard'>
        <div className='onboard__container'>
          <div className='row no-gutters onboard__col'>
            <div className='col-6 onboard__left-block'>

              <div className="onboard__left-block--top">
                <ContentMenuTabs tabName={this.props.tabName}/>
              </div>
              <div className="onboard__left-block--center">
                <ContentMenuItems menuItems={this.props.menuItems} tabIndex={this.props.tabIndex} />
              </div>
            </div>
            <div className='col-6 onboard__right-block'>

              <div className='onboard__right-block--center'>
                {/*<ContentFillingInformation {...props} />*/}
                {pageContent.tabContent}
              </div>
              <div className='onboard__right-block--bottom'>
                <NavButtons
                  tabName={this.props.tabName}
                  tabIndex={this.props.tabIndex}
                  fieldNames={fieldNames}
                  registrationData={this.props.registrationData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
