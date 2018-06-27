import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpalaSelect from '../../../../registration/EmpalaSelect';
import EmpalaCheckbox from '../../../../registration/EmpalaCheckbox';
import Footer from './Components/Footer';
import InsideVerticalTabBlock from './Components/InsideVerticalTabBlock';
import {
  setInputFieldValueById,
  toggleCheckboxById,
} from '../../../../../actions/registration';
import { setColorScheme } from '../../../../../actions/dashboard';

class OrderConfig extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('this.props.currentColorScheme -==> ', this.props.currentColorScheme);
    return (
      <div className="tab-container">
        <div className="tab-container__wrapper">
          <div className="row">
            <div className="col-md-6">
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="order_config_time_zone"
                  options={[
                    {
                      value: '(UTC-08:00) Pacific Time (US & Canada)',
                      title: '(UTC-08:00) Pacific Time (US & Canada)',
                    },
                  ]}
                  label="Time zone"
                  value="(UTC-08:00) Pacific Time (US & Canada)"
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.order_config_time_zone}
                  hint="Time zone"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="order_config_theme"
                  options={[
                    {
                      value: 'light',
                      title: 'Light',
                    },
                    {
                      value: 'dark',
                      title: 'Dark',
                    },
                  ]}
                  label="Current color scheme"
                  value={this.props.currentColorScheme}
                  handleChange={(id, value) => this.props.setColorScheme(value)}
                  errorText={this.props.fieldsErrors.order_config_theme}
                  hint="Current color scheme"
                />
              </div>
            </div>
          </div>
          <div className="row margin-bt-30">
            <div className="col-md-6">
              <div className="block-editable">
                <h2 className="title-part">Default Order</h2>
                <InsideVerticalTabBlock />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row margin-bt-30">
                <EmpalaSelect
                  id="order_config_quantity_increment_multiplier"
                  options={[
                    {
                      value: '100',
                      title: '100',
                    },
                  ]}
                  label="Quantity increment multiplier"
                  value="100"
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.order_config_quantity_increment_multiplier}
                  hint="Quantity increment multiplier"
                />
                <EmpalaSelect
                  id="order_config_price_increment_multiplier"
                  options={[
                    {
                      value: '100',
                      title: '100',
                    },
                  ]}
                  label="Price increment multiplier"
                  value="100"
                  handleChange={this.props.setSelectedValueById}
                  errorText={this.props.fieldsErrors.order_config_price_increment_multiplier}
                  hint="Quantity increment multiplier"
                />
              </div>
              <div className="row margin-bt-30">
                <div className="col-md-6">
                  <EmpalaCheckbox
                    id="order_config_verify_orders"
                    label="Do not verify orders"
                    handleCheck={this.props.toggleCheckboxById}
                    checked={this.props.checkboxes.order_config_verify_orders}
                  />
                  <EmpalaCheckbox
                    id="order_config_verify_orders_cancellations"
                    label="Do not verify orders cancellations"
                    handleCheck={this.props.toggleCheckboxById}
                    checked={this.props.checkboxes.order_config_verify_orders_cancellations}
                  />
                </div>
                <div className="col-md-6">
                  <EmpalaCheckbox
                    id="order_config_verify_closing"
                    label="Do not verify closing positions"
                    handleCheck={this.props.toggleCheckboxById}
                    checked={this.props.checkboxes.order_config_verify_closing}
                  />
                  <EmpalaCheckbox
                    id="order_config_modify_order_request"
                    label="Do not verify modify order request"
                    handleCheck={this.props.toggleCheckboxById}
                    checked={this.props.checkboxes.order_config_modify_order_request}
                  />
                </div>
              </div>
              <h2 className="title-part">Behaviour</h2>
              <div>
                <EmpalaCheckbox
                  id="order_config_confirm_dialog"
                  label="Show confirm dialog on tabs and widgets removal"
                  handleCheck={this.props.toggleCheckboxById}
                  checked={this.props.checkboxes.order_config_confirm_dialog}
                />
                <EmpalaCheckbox
                  id="order_config_turn_safe"
                  label="Turn safe mode on"
                  handleCheck={this.props.toggleCheckboxById}
                  checked={this.props.checkboxes.order_config_turn_safe}
                />
                <EmpalaCheckbox
                  id="order_config_renew_ssession"
                  label="Auto renew user session"
                  handleCheck={this.props.toggleCheckboxById}
                  checked={this.props.checkboxes.order_config_renew_ssession}
                />
              </div>
            </div>
          </div>
          <Footer deleteAccountBtnIsShow={false} />
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    registrationData: state.registration.registrationData,
    fieldsErrors: state.registration.fieldsErrors,
    checkboxes: state.registration.checkboxes,
    currentColorScheme: state.dashboard.currentColorScheme,
  }),
  (dispatch => ({
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
    toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
    setColorScheme: colorScheme => dispatch(setColorScheme(colorScheme)),
  })),
)(OrderConfig);
