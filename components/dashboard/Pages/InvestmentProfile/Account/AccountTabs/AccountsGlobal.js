import React, { Component } from 'react';
import { generateId, formatNumberWithFixedPoint } from '../../../../../../utils/dashboardUtils';


class AccountsGlobal extends Component {
  constructor(props) {
    super(props);
    this.mappingComponent = (item) => {
      return (
        <div className="d-flex global-account_padding" key={generateId()}>
          <div className="d-flex align-items-center mx-2">
            <i className="icon-flag icon-flag_usa"/>
          </div>
          <div className="pseudo-input mw_208 mx-2">
            <span className="pseudo-input__label">Account no</span>
            <input
              id="accounts_global_account_no"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.accountNo}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_350 mx-2">
            <span className="pseudo-input__label">Account name</span>
            <input
              id="accounts_global_account_name"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.account_name}
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
              value={formatNumberWithFixedPoint(this.getTotalBalance(this.props.accountBalance),2)}
              readOnly
            />
          </div>
          <div className="pseudo-input position-relative mx-2">
            <span className="pseudo-input__label">Primary</span>
            <i className="icon-checked position-absolute"/>
          </div>
        </div>
      );
    };
  }

  getTotalBalance(accountBalance) {
    if (Object.keys(accountBalance).length === 0) return null;
    return (accountBalance.cash.Value + accountBalance.stockLongMarketValue.Value)
      - accountBalance.stockShortMarketValue.Value;
  }
  render() {
    const {
      account = {},
      apex = {},
    } = this.props.accounts;

    return (
      <div className="global-portfolio__container_payments">
        <h2 className="title-part">
          Accounts
        </h2>
        { // TODO modify for multi accounts and brokers
          [{
            ...account,
            accountNo:  apex.account_number || '',
          }].map(item => this.mappingComponent(item))
        }
      </div>
    );
  }
}

export default AccountsGlobal;
