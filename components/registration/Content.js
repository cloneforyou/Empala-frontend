/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import NavButtons from './NavButtons';
import {
  changeTabPage, closeErrorModal,
  getMenuItems,
  getRegistrationDataFromCache,
  getUserID,
  setTabName,
  setTabPageIndex,
} from '../../actions/registration';
import { getMenuItemsByTabName, getPageFieldNames, getTabContentByTabName } from '../../utils/registrationUtils';
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';
import InformationPage from './InformationPage';
import FinalReviewPage from './FinalReviewPage';
import AgreementPage from './AgreementPage';
import ModalErrorWindow from './ModalErrorWindow';
import PopupPIN from './PopupPIN';

function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
    tabIndex: state.registration.tabIndex || 1,
    menuItems: state.registration.menuItems,
    registrationData: state.registration.registrationData,
    trustedContactActive: state.registration.checkboxes['identity_trusted_contact_person_trusted_contact_checkbox'],
    errorMessage: state.registration.errorMessage || '',
    showErrorModal: state.registration.showErrorModal,
    errors: state.fieldsErrors,
    showPopupPIN: state.registration.showPopupPIN,
    popupPINType: state.registration.popupPINType,
    verifyLoading: state.registration.verifyLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getMenuItems: (tabName) => {
      dispatch(getMenuItems(getMenuItemsByTabName(tabName)));
    },
    setTabName: (tabName) => dispatch(setTabName(tabName)),
    setTabPageIndex: (tabIndex) => dispatch(setTabPageIndex(tabIndex)),
    getRegistrationDataFromCache: () => dispatch(getRegistrationDataFromCache()),
    getUserID: () => dispatch(getUserID()),
    closeModal: () => {
      dispatch(closeErrorModal());
      dispatch(changeTabPage('info', 1, 'backward'));
    },
  });
}


class Content extends PureComponent {
  componentWillMount() {
    if (['info', 'final_review', 'agreement'].includes(this.props.tabName)) {
      this.props.setTabName(this.props.tabName);
      this.props.setTabPageIndex(1);
    }
  }

  componentDidMount() {
    if (localStorage.getItem('registrationData')) {
      this.props.getRegistrationDataFromCache();
    }
    this.props.getUserID();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tabName !== nextProps.tabName) {
      this.props.getMenuItems(nextProps.tabName);
    }
  }

  render() {
    const { showPopupPIN } = this.props;
    if (this.props.tabName === 'info') {
      return (
        <div className="onboard">
          <ModalErrorWindow
            open={this.props.showErrorModal}
            handleClose={this.props.closeModal}
            message={this.props.errorMessage}
          />
          <div className="onboard__container">
            <div className="row no-gutters onboard__col">
              <InformationPage />
            </div>
          </div>
        </div>
      );
    } else if (this.props.tabName === 'final_review') {
      return (
        <div className="onboard">
          <div className="onboard__container">
            <div className="row no-gutters onboard__col">
              <FinalReviewPage />
            </div>
          </div>
          {
            showPopupPIN && <PopupPIN type={this.props.popupPINType} />
          }
        </div>);
    } else if (this.props.tabName === 'agreement') {
      return (
        <div className="onboard">
          <div className="onboard__container">
            <div className="row no-gutters onboard__col">
              <AgreementPage />
            </div>
          </div>
        </div>);
    }
    if (!this.props.menuItems || this.props.menuItems.length === 0) {
      this.props.getMenuItems(this.props.tabName);
    }

    let fieldNames = getPageFieldNames(this.props.tabName, this.props.tabIndex);
    if (this.props.tabName === 'member' && this.props.tabIndex === 3) {
      fieldNames = fieldNames.filter((fieldName) => {
        return fieldName.includes(this.props.registrationData.memberDocument);
      });
    } else if (this.props.tabName === 'identity' && this.props.tabIndex === 1) {
      fieldNames = fieldNames.filter(fieldName => fieldName !== 'identity_residential_address_same_mailing_address_checkbox');
    } else if (this.props.tabName === 'identity' && this.props.tabIndex === 3) {
      if (!this.props.trustedContactActive) {
        fieldNames = [];
      } else {
        fieldNames = fieldNames.filter(fieldName => fieldName !== 'identity_trusted_contact_person_trusted_contact_checkbox');
      }
    } else if (this.props.tabName === 'profile' && this.props.tabIndex === 1 &&
      this.props.registrationData['profile_employment_employment_type'] !== 'Employed') {
      fieldNames = ['profile_employment_employment_type'];
    }

    const pageContent = getTabContentByTabName(this.props.tabName, this.props.tabIndex - 1);
    return (
      <div className="onboard">
        {
          this.props.verifyLoading &&
          <div className="loader__wrap">
            <div className="loader">
              <CircularProgress
                size={100}
                style={{ color: '#98c73a' }}
              />
            </div>
          </div>
        }
        <div className="onboard__container">
          <div className="row no-gutters onboard__col">
            <div className="col-6">
              <div className="onboard__left-block">
                <div className="onboard__left-block--top">
                  <ContentMenuTabs tabName={this.props.tabName} />
                </div>
                <div className="onboard__left-block--center">
                  <ContentMenuItems
                    menuItems={this.props.menuItems}
                    tabIndex={this.props.tabIndex}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="onboard__right-block">
                <div
                  className={`onboard__right-block--center ${this.props.tabName === 'experience' && 'experience-page'}`}>
                  {pageContent.tabContent}
                </div>
                {
                  showPopupPIN && <PopupPIN type={this.props.popupPINType} />
                }
                <div className="onboard__right-block--bottom">
                  <NavButtons
                    fieldNames={fieldNames}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  getRegistrationDataFromCache: PropTypes.func,
  tabName: PropTypes.string,
  setTabName: PropTypes.func,
  setTabPageIndex: PropTypes.func,
  getMenuItems: PropTypes.func,
  getUserID: PropTypes.func,
  tabIndex: PropTypes.number,
  showPopupPIN: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
