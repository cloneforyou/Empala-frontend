import React, { PureComponent } from 'react';


class PendingTransaction extends PureComponent {
  render() {
    return (
      <div>
        {this.props.funding_type === 'ACH transfer' && this.props.ACHTransactionList.length > 0 && (
          <div className="ACH-transaction-list">
            <div className="ACH-transaction-list__title">
              Transactions list
            </div>
            <div className="ACH-transaction-list__description-row">
              <div className="ACH-transaction-list__description-label ACH-transaction-list__initiated-col">
                Intitiated
              </div>
              <div className="ACH-transaction-list__description-label ACH-transaction-list__from-col">
                From account
              </div>
              <div className="ACH-transaction-list__description-label ACH-transaction-list__to-col">
                To account
              </div>
              <div className="ACH-transaction-list__description-label ACH-transaction-list__amount-col">
                Amount
              </div>
              <div className="ACH-transaction-list__description-label ACH-transaction-list__status-col">
                Status
              </div>
              <div className="ACH-transaction-list__description-label ACH-transaction-list__cancel-col">
                Cancel
              </div>
            </div>
            {this.props.ACHTransactionList.map(item => (
              <TransactionRow
                {...item}
                getACHTransactionList={this.props.getACHTransactionList}
                key={item.id}
                cancelACHTransfer={this.props.cancelACHTransfer}
                openModal={this.props.openModal}
              />
              ))
            }
          </div>
        )}
      </div>
    );
  }
}

export default PendingTransaction;
