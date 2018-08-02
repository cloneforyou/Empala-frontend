import React from 'react';
import EmpalaInput from '../../../registration/EmpalaInput';
import EmpalaSelect from '../../../registration/EmpalaSelect';
import { getFormattedNumber } from '../../../../utils/dashboardUtils';

const SecuritiesRow = props => (
  <div className="funding-partial-securities-content-row">
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item_width120
               no-gutters"
    >
      <EmpalaInput
        id="symbol"
        value={props.item.symbol}
        handleChange={e => props.setInputValueById(e, props.index)}
      />
    </div>
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item
               no-gutters"
    >
      <EmpalaInput
        id="quantity"
        value={getFormattedNumber(props.item.quantity)}
        handleChange={e => props.setInputValueById(e, props.index)}
      />
    </div>
    <div className="funding-partial-securities-content-row__item
               funding-partial-securities-content-row__item
               no-gutters"
    >
      <EmpalaSelect
        id="sec_type"
        options={[{ value: 'Shares', title: 'Shares' }]}
        value={props.item.sec_type}
        handleChange={(id, value) => props.setSelectedValueById(id, value, props.index)}
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
