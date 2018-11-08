import React, { Component } from 'react';


class AccountsUS extends Component {
  render() {
    const { accounts } = this.props;

    this.mappingComponent = item => {
      return (
        <div className="d-flex" key={item.id}>
          <div className="pseudo-input mw_208 mx-2 mt-12">
            <span className="pseudo-input__label">Account no</span>
            <input
              id="accounts_global_account_no"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.creator_member_id}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_350 mx-2 mt-12">
            <span className="pseudo-input__label">Account name</span>
            <input
              id="accounts_global_account_name"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              readOnly
            />
          </div>
          <div className="pseudo-input mw_150 mx-2 mt-12">
            <span className="pseudo-input__label">Customer Type</span>
            <input
              id="accounts_global_customer_type"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.customer_type}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_150 mx-2 mt-12">
            <span className="pseudo-input__label">Account Type</span>
            <input
              id="accounts_global_account_type"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
              value={item.account_type}
              readOnly
            />
          </div>
          <div className="pseudo-input mw_208 mx-2 mt-12">
            <span className="pseudo-input__label">Net value</span>
            <input
              id="accounts_global_net_value"
              type="text"
              className="pseudo-input__input pseudo-input__input_dark"
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
              <i className="icon-trash" />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="global-portfolio__container_payments">
          <h2 className="title-part mb-0">
            Accounts
          </h2>
          {
            [accounts].map(item => this.mappingComponent(item))
          }
        </div>
        <div className="global-portfolio__container_payments d-flex justify-content-end">
          <button className="profile-btn profile-btn_green mr-10">
            New Account
          </button>
        </div>
      </div>
    );
  }
}

export default AccountsUS;