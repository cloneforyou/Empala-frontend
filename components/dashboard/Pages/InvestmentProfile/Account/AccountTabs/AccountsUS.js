import React, { Component } from 'react';

import ActionConfirm from '../../../../Modal/ActionConfirm';
import { formatNumberWithFixedPoint, generateId } from '../../../../../../utils/dashboardUtils';


class AccountsUS extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        textSubmit: '',
        funcSubmit: null,
        blockNewAccount: false,
      };

    this.setInputValueForAccount = (account, name) => {
      this.props.setInputValueForAccount(account, name);
    };

    this.textDeletingAcc = 'Are you sure to delete this account?';
    this.textCreatingAcc = 'Sorry... You are currently unable to create a new account.';

    this.saveChanging = (e) => {
      this.props.saveInputValueForAccount(e.target.id);
    };

    this.handleClick = (text, func) => {
      this.setState({
        textSubmit: text,
        funcSubmit: func,
      });
    };

    this.handleNewAccount = () => {
      this.setState(prevState => ({
        blockNewAccount: !prevState.blockNewAccount,
      }));
    };
    this.mappingComponent = (item, index) => {
      const { fieldsErrors, accountBalance, submitDelete } = this.props;
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
              value={item.apex_account_number}
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
              onChange={e => this.setInputValueForAccount(item.apex_account_number, e.target.value, e.target.id)}
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
              value={formatNumberWithFixedPoint(this.getTotalBalance(accountBalance), 2)}
              readOnly
            />
          </div>
          <div>
            <div className="pseudo-input__label text-center">Deliver Duplicates</div>
            <div className="icon-centering">
              <i className="icon-duplicate" />
            </div>
          </div>
          <div>
            <div className="pseudo-input__label text-center">Joint Members</div>
            <div className="icon-centering">
              <i className="icon-members" />
            </div>
          </div>
          <div>
            <div className="pseudo-input__label text-center">Account Delegates</div>
            <div className="icon-centering">
              <i className="icon-delegates" />
            </div>
          </div>
          <div>
            <div className="pseudo-input__label text-center">Delete Account</div>
            <div className="icon-centering">
              <button
                type="button"
                className="default-btn"
                onClick={() => {
                  this.handleClick(this.textDeletingAcc, submitDelete);
                  this.props.openModal('actionModal');
                }}
              >
                <i className="icon-trash" />
              </button>
            </div>
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
    const { accounts, openModal } = this.props;

    return (
      <div>
        <div className="global-portfolio__container_payments dark-theme">
          <h2 className="title-part mb-0">
            Accounts
          </h2>
          {
            [accounts.account].map(item => this.mappingComponent(item))
          }
          <ActionConfirm
            text={this.state.textSubmit}
            submitFunction={this.state.funcSubmit}
          />
        </div>
        {
          !this.state.blockNewAccount &&
          <div className="global-portfolio__container_payments d-flex justify-content-end dark-theme">
            <button
              className="profile-btn profile-btn_green mr-10"
              onClick={() => {
                this.handleNewAccount();
              }}
            >
              New Account
            </button>
          </div>
        }

        {
          this.state.blockNewAccount &&
          <div className="global-portfolio__container_payments mb-4 dark-theme">
            <div className="mb-4">
              {
                this.mappingComponent({})
              }
            </div>
            <div className="text-center mb-4">
              <button
                className="profile-btn profile-btn_green mr-5"
                onClick={() => {
                  this.handleClick(this.textCreatingAcc);
                  openModal('actionModal');
                }}
              >
                Apply
              </button>
              <button
                className="default-btn"
                onClick={() => {
                  this.handleNewAccount();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default AccountsUS;
