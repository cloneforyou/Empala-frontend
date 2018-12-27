import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generateId, formatNumberWithFixedPoint } from '../../../../../../utils/dashboardUtils';


class AccountsGlobal extends Component {
  static propTypes = {
    fieldsErrors: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
  };

  constructor(props) {
    super(props);

    this.setInputValueForAccount = (account, name) => {
      this.props.setInputValueForAccount(account, name);
    };

    this.saveChanging = e => {
      this.props.saveInputValueForAccount(e.target.id);
    };

    this.mappingComponent = (item, index) => {
      const { fieldsErrors, accountBalance } = this.props;
      return (
        <div className="d-flex global-account_padding" key={generateId()}>
          <div className="d-flex align-items-center mx-2">
            <i className="icon-flag icon-flag_usa" />
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
              id={`accounts_global_account_name_${index}`}
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              defaultValue={item.account_name}
              onChange={e => this.setInputValueForAccount(item.accountNo, e.target.value, e.target.id)}
              onBlur={this.saveChanging}
            />
            {fieldsErrors[`accounts_global_account_name_${index}`] &&
            <span className="text-error fs-12">{fieldsErrors[`accounts_global_account_name_${index}`]}</span>}
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
              value={formatNumberWithFixedPoint(this.getTotalBalance(accountBalance),2)}
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
      <div className="global-portfolio__container_payments dark-theme">
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
