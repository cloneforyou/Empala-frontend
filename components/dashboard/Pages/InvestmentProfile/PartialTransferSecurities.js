import React from 'react';
import EmpalaInput from '../../../registration/EmpalaInput';
import EmpalaSelect from '../../../registration/EmpalaSelect';

const SecuritiesRow = props => (
  <div className="funding-partial-securities-content-row">
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item_width120
               no-gutters"
    >
      <EmpalaInput
        id="funding_partial_symbol"
        value={props.item.symbol}
        handleChange={props.setInputValueById}
      />
    </div>
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item
               no-gutters"
    >
      <EmpalaInput
        id="funding_partial_quantity"
        value={props.item.quantity}
        handleChange={props.setInputValueById}
      />
    </div>
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item
               no-gutters"
    >
      <EmpalaSelect
        id="funding_partial_sec_type"
        options={[{ value: 'Shares', title: 'Shares' }]}
        value={props.item.sec_type}
        handleChange={props.setSelectedValueById}
      />
    </div>
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item_width60
               funding-partial-securities-content-row__remove"
    >
      <span
        role="button"
        onClick={() => props.removeSecurity(props.index)}
      >&times;
      </span>
    </div>
  </div>
);

const PatrialTransferSecurities = props => (
  <div className="funding-partial-securities">
    <div className="funding-partial-securities-header">
      <div className="funding-partial-securities-header__item funding-partial-securities-header__item_width120">Symbol</div>
      <div className="funding-partial-securities-header__item">Quantity</div>
      <div className="funding-partial-securities-header__item">Unit</div>
      <div className="funding-partial-securities-header__item funding-partial-securities-header__item_width60">Remove</div>
    </div>
    <div className="funding-partial-securities-content">
      {props.partial_symbols.map((item, i) => (
        <SecuritiesRow
          key={Math.random()}
          {...props}
          item={item}
          index={i}
        />
      ))
      }
      <button
        className="funding-partial-securities-add-button"
        onClick={props.addSecurity}
      >
        <span className="funding-partial-securities-add-button__plus" />&nbsp;Add new line
      </button>
    </div>
  </div>
);

export default PatrialTransferSecurities;
