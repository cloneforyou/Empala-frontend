import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaSelect from '../../../../registration/EmpalaSelect';
import Footer from './Components/Footer';
import { toggleCheckboxById } from '../../../../../actions/registration';
import { saveColorTheme, setInputFieldValueById } from '../../../../../actions/dashboard';

const timeouts = [5, 10, 15, 30, 45, 60];
const options = {
  colorTheme: [
    {
      value: 'light',
      title: 'Light',
    },
    {
      value: 'dark',
      title: 'Dark',
    },
  ],
  sessionTimeout: timeouts.map(el => ({
    value: el * 60 * 60,
    title: el === 0 ? 'Unlimited (not recommended)' : `${el} minutes`,
  })),
};

class AppSettings extends Component {
  render() {
    const {
      setSelectedValueById,
      fieldsErrors,
      appSettings,
      currentColorScheme,
      saveColorTheme,
    } = this.props;

    return (
      <div className="tab-container tab-container_height">
        <div className="tab-container__wrapper">
          <div className="row mb-5">
            <div className="col-md-6 app-settings-col">
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="app_settings_time_zone"
                  options={[
                    {
                      value: '(UTC-08:00) Pacific Time (US & Canada)',
                      title: '(UTC-08:00) Pacific Time (US & Canada)',
                    },
                  ]}
                  label="Time zone"
                  value="(UTC-08:00) Pacific Time (US & Canada)"
                  handleChange={setSelectedValueById}
                  errorText={fieldsErrors.app_settings_time_zone}
                  hint="Time zone"
                />
                <EmpalaSelect
                  id="app_settings_market_shortcut_one"
                  options={[
                    {
                      value: 'Default Individual Account',
                      title: 'Default Individual Account',
                    },
                  ]}
                  label="Default Market Access Shortcut One"
                  value={appSettings.app_settings_market_shortcut_one || "Default Individual Account"}
                  handleChange={setSelectedValueById}
                  errorText={fieldsErrors.app_settings_market_shortcut_one}
                  hint="Time zone"
                />
                <EmpalaSelect
                  id="app_settings_market_shortcut_two"
                  options={[
                    // {
                    //   value: '(UTC-08:00) Pacific Time (US & Canada)',
                    //   title: '(UTC-08:00) Pacific Time (US & Canada)',
                    // },
                  ]}
                  label="Default Market Access Shortcut Two"
                  value={appSettings.app_settings_market_shortcut_two || ''}
                  handleChange={setSelectedValueById}
                  errorText={fieldsErrors.app_settings_shortcut_two}
                  hint="Default Market Access Shortcut Two"
                />
              </div>
            </div>
            <div className="col-md-6 app-settings-col app-settings-col_margin">
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="app_settings_theme"
                  options={options.colorTheme}
                  label="Current color scheme"
                  value={currentColorScheme}
                  handleChange={(id, value) => saveColorTheme(value)}
                  errorText={fieldsErrors.app_settings_theme}
                  hint="Current color scheme"
                />
                <EmpalaSelect
                  id="app_settings_session_timeout"
                  options={options.sessionTimeout}
                  label="Default session timeout"
                  value={appSettings.app_settings_session_timeout.toString() || ''}
                  handleChange={setSelectedValueById}
                  errorText={fieldsErrors.app_settings_theme}
                  hint="Session timeout"
                />
              </div>
            </div>
          </div>
          <Footer
            deleteAccountBtnIsShow={false}
            updateEntity="settings"
          />
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    registrationData: state.registration.registrationData,
    appSettings: state.dashboard.currentAppSettings,
    fieldsErrors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
    currentColorScheme: state.dashboard.currentColorScheme,
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
    saveColorTheme: colorScheme => dispatch(saveColorTheme(colorScheme)),
  })),
)(AppSettings);
