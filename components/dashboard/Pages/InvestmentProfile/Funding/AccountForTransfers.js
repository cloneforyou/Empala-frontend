import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { formatNumberWithFixedPoint } from '../../../../../utils/dashboardUtils';
import { getETNAData } from '../../../../../actions/dashboard';
import { getGlobalAccounts } from '../../../../../actions/funding';


class AccountForTransfers extends PureComponent {
  componentDidMount() {
    this.props.getBalance();
    this.props.getGlobalAccounts();
  }

  getTotalBalance(accountBalance) {
    if (Object.keys(accountBalance).length === 0) return null;
    return accountBalance.ETNA.cash.Value;
  }

  render() {
    const { global_accounts, accountBalance } = this.props;
    const accounts = global_accounts.map(record => ({
      accountName: (record.account || {}).account_name,
      accountType: (record.account || {}).account_type,
      accountNumber: (record.apex || {}).account_number,
      customerType: (record.account || {}).customer_type,
    }))[0];

    return (
      <div className="d-flex">
        <div className="d-flex flex-column flex-grow-1 pseudo-input mw_208 mr-2">
          <span className="pseudo-input__label mb-1">Account no</span>
          <input
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            value={accounts.accountNumber}
            readOnly
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 pseudo-input mw_350 mx-2">
          <span className="pseudo-input__label mb-1">Account name</span>
          <input
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            value={accounts.accountName}
            readOnly
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 pseudo-input mw_150 mx-2">
          <span className="pseudo-input__label mb-1">Customer Type</span>
          <input
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            value={accounts.customerType}
            readOnly
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 pseudo-input mw_150 mx-2">
          <span className="pseudo-input__label mb-1">Account Type</span>
          <input
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            value={accounts.accountType}
            readOnly
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 pseudo-input mw_208 mx-2">
          <span className="pseudo-input__label mb-1">Net value</span>
          <input
            id="accounts_global_net_value"
            type="text"
            className="pseudo-input__input pseudo-input__input_dark"
            value={formatNumberWithFixedPoint(this.getTotalBalance(accountBalance), 2)}
            readOnly
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountBalance: state.dashboard.accountBalance || {
    ETNA: {},
  },
  global_accounts: state.funding.global_accounts,
});

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getETNAData('balance')),
  getGlobalAccounts: () => dispatch(getGlobalAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForTransfers);
