import React, { Component } from 'react';


class AccountsGlobal extends Component {
  render() {
    const { accounts } = this.props;

    this.mappingComponent = (item) => {
      return (
        <div className="d-flex global-account_padding" key={item.id}>
          <div className="d-flex align-items-center mx-2">
            <i className="icon-flag icon-flag_usa" />
          </div>
          <div className="pseudo-input mw_208 mx-2">
            <span className="pseudo-input__label">Account no</span>
            <input
              id="accounts_global_account_no"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.creator_member_id}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_350 mx-2">
            <span className="pseudo-input__label">Account name</span>
            <input
              id="accounts_global_account_name"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              readOnly
            />
          </div>
          <div className="pseudo-input mw_150 mx-2">
            <span className="pseudo-input__label">Customer Type</span>
            <input
              id="accounts_global_customer_type"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.customer_type}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_150 mx-2">
            <span className="pseudo-input__label">Account Type</span>
            <input
              id="accounts_global_account_type"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.account_type}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_208 mx-2">
            <span className="pseudo-input__label">Net value</span>
            <input
              id="accounts_global_net_value"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              readOnly
            />
          </div>
          <div className="pseudo-input position-relative mx-2">
            <span className="pseudo-input__label">Primary</span>
            <i className="icon-checked position-absolute" />
          </div>
        </div>
      );
    };

    return (
      <div className="global-portfolio__container_payments">
        <h2 className="title-part">
          Accounts
        </h2>
        {
          [accounts].map(item => this.mappingComponent(item))
        }
      </div>
    );
  }
}

export default AccountsGlobal;
